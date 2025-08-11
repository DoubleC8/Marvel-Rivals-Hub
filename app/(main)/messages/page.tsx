import { MessageSquareMore } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-screen p-5">
      <div
        className="text-center
      h-3/4 flex flex-col gap-5 text-[var(--secondary-text)] font-extrabold items-center justify-center"
      >
        <MessageSquareMore
          className="size-10
        lg:size-20"
        />
        <h1
          className="lg:text-lg
        text-sm"
        >
          Select a conversation and start chatting!
        </h1>
      </div>
    </section>
  );
};

export default page;
