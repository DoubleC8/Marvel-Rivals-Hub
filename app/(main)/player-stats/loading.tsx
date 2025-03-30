import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardLoader = () => {
  return (
    <Skeleton
      className="bg-zinc-700 flex 
    w-3/4 h-1/2 items-center py-5 px-10 rounded-2xl mx-auto justify-around border-[2px] border-zinc-800"
    >
      <div className="flex mr-3">
        <Skeleton className="w-[100px] h-[100px] bg-zinc-800 rounded-full" />
      </div>

      <div className="flex flex-col tracking-wider justify-between h-[100px] w-1/4">
        <Skeleton className="bg-zinc-800 mb-2 w-[90%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[70%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[80%] h-6" />
      </div>

      <div className="flex flex-col tracking-wider gap-3 h-[100px] items-center w-1/4">
        <Skeleton className="bg-zinc-800 mb-2 w-[50%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[85%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[90%] h-6" />
      </div>

      <div className="flex flex-col tracking-wider gap-3 h-[100px] items-center w-1/4">
        <Skeleton className="bg-zinc-800 mb-2 w-[50%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[90%] h-6" />
      </div>

      <div className="flex flex-col tracking-wider gap-3 h-[100px] items-center  w-1/4">
        <Skeleton className="bg-zinc-800 mb-2 w-[75%] h-6" />
        <Skeleton className="bg-zinc-800 mb-2 w-[50%] h-6" />
      </div>
    </Skeleton>
  );
};

export default CardLoader;
