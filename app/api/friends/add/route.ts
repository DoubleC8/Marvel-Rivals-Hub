"use server"

import { auth } from '@/auth';
import { fetchRedis } from '@/helpers/redis';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { addFriendValidator } from '@/lib/validations/add-friend';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body);

    // Get the user ID of the person to add
    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: 'no-store',
      }
    );

    const data = (await RESTResponse.json()) as { result: string };
    const idToAdd = data.result;

    if (!idToAdd) {
      return new Response(JSON.stringify({ message: 'This person does not exist.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (idToAdd === session.user.id) {
      return new Response(JSON.stringify({ message: 'You cannot add yourself as a friend.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response(JSON.stringify({ message: 'Friend request already sent to this user' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response(JSON.stringify({ message: 'Already friends with this user' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      'incoming_friend_requests',
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
        senderImage: session.user.image
      }
    )

    // Add friend request using sadd to ensure uniqueness
    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    
    // Also store the reverse relationship for easier querying
    await db.sadd(`user:${session.user.id}:outgoing_friend_requests`, idToAdd);

    return new Response(JSON.stringify({ message: 'Friend request sent successfully' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ message: 'Invalid email format' }), { 
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.error('Error in add friend route:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
