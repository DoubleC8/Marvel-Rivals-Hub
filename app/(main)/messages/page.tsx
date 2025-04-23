import AddFriendButton from "@/components/buttons/AddFriendButton";
import React from "react";

const page = () => {
  return (
    <section className="w-3/4 h-screen p-5 flex flex-col gap-3">
      <h1 className="text-6xl" style={{ fontFamily: "marvelFont" }}>
        ADD FRIEND
      </h1>
      <AddFriendButton />
    </section>
  );
};

export default page;
