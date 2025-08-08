import { fetchRedis } from "./redis"

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export const getFriendsByUserId = async (userId: string) => {
    //retrieving friends for logged in user
    const friendIds = await fetchRedis("smembers", `user:${userId}:friends`) as string[];

    const friends = await Promise.all(
        friendIds.map(async(friendId) => {
            const friend = await fetchRedis("get", `user:${friendId}`) as string | null
            
            // Skip if friend doesn't exist in Redis
            if (!friend) {
                return null;
            }
            
            try {
                const parsedFriend = JSON.parse(friend) as User
                return parsedFriend
            } catch (error) {
                console.error(`Error parsing user data for friendId ${friendId}:`, error);
                return null;
            }
        })
    )

    // Filter out null values (users that don't exist or have invalid data)
    return friends.filter((friend): friend is User => friend !== null);
}