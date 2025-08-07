import { MessageSquareMore } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-screen p-5">
      <div className="h-3/4 flex flex-col gap-5 text-[var(--secondary-text)] font-extrabold items-center justify-center">
        <MessageSquareMore
          className="size-10
        lg:size-30"
        />
        <h1
          className="text-sm
        lg:text-xl"
        >
          Select a Conversation and Start Chatting!
        </h1>
      </div>
    </section>
  );
};

export default page;
