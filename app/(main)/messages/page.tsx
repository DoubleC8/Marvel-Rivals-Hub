import { MessageSquareMore } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="w-3/4 h-screen p-5">
      <div className="h-3/4 flex flex-col gap-5 text-[var(--secondary-text)] font-extrabold items-center justify-center">
        <MessageSquareMore className="size-40" />
        <h1 className="text-4xl">Select a Conversation and Start Chatting!</h1>
      </div>
    </section>
  );
};

export default page;
