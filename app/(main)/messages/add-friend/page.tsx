import AddFriendButton from "@/components/buttons/AddFriendButton";
import { Users } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-[80vh] flex flex-col p-5 justify-center">
      <div>
        <h1
          className="text-7xl flex gap-3"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          <Users size={60} color={`var(--secondary-text)`} />
          Add Friend
        </h1>
      </div>
      <AddFriendButton />
    </section>
  );
};

export default page;
