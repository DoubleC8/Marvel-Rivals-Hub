import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PlayerCardLoader = () => {
  return (
    <Skeleton
      className="flex w-3/4 h-[150px] p-5 bg-zinc-700
      border-[2px] border-zinc-800 items-center rounded-xl mx-auto justify-between"
    >
      <div className="flex w-1/4 gap-3 ">
        <Skeleton className="w-[100px] h-[100px] bg-zinc-800 rounded-xl" />
        <div className="flex flex-col justify-between w-1/2">
          <Skeleton className="bg-zinc-800 w-5/10 h-6" />
          <Skeleton className="bg-zinc-800  w-5/10 h-6" />
          <Skeleton className="bg-zinc-800 w-7/10 h-6" />
        </div>
      </div>

      <div className="flex flex-col gap-2 h-[100px] items-center w-1/4">
        <Skeleton className="bg-zinc-800 w-[80%] h-9" />
        <Skeleton className="bg-zinc-800 w-[50%] h-6" />
        <Skeleton className="bg-zinc-800 w-[55%] h-6" />
      </div>

      <div className="flex flex-col gap-2 h-[100px] items-center w-1/4 ">
        <Skeleton className="bg-zinc-800 w-[50%] h-9" />
        <Skeleton className="bg-zinc-800 w-[70%] h-6" />
      </div>

      <div className="flex flex-col gap-3 h-[100px]  w-1/4 items-end">
        <Skeleton className="bg-zinc-800 w-1/2 h-9" />
        <Skeleton className="bg-zinc-800 w-[45%] h-6" />
      </div>
    </Skeleton>
  );
};

export default PlayerCardLoader;
