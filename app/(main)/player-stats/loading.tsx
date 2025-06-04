import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PlayerCardLoader = () => {
  return (
    <>
      <Skeleton className="searchedPlayerCardLoader">
        <div className="flex gap-3 w-1/4">
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

        <div className="flex flex-col gap-3 h-[100px] items-center w-1/4 ">
          <Skeleton className="bg-zinc-800 w-[50%] h-9" />
          <Skeleton className="bg-zinc-800 w-[70%] h-6" />
        </div>

        <div className="flex flex-col gap-3 h-[100px] w-1/4 items-end">
          <Skeleton className="bg-zinc-800 w-1/2 h-9" />
          <Skeleton className="bg-zinc-800 w-[45%] h-6" />
          <Skeleton className="bg-zinc-800 w-[30%] h-6" />
        </div>
      </Skeleton>

      <Skeleton className="mobileSearchedPlayerCardLoader">
        <div className="flex gap-5">
          <Skeleton className="w-[100px] h-[100px] bg-zinc-800 rounded-xl" />
          <div className="flex flex-col justify-between w-3/10">
            <Skeleton className="bg-zinc-800 w-5/10 h-6" />
            <Skeleton className="bg-zinc-800 w-5/10 h-6" />
            <Skeleton className="bg-zinc-800 w-7/10 h-6" />
          </div>
        </div>

        <div className="flex gap-5 w-full justify-between">
          <Skeleton className="w-1/3 h-8 bg-zinc-800 rounded-lg" />
          <div className="flex flex-col gap-3 w-[200px] items-end">
            <Skeleton className="bg-zinc-800 w-9/10 h-6" />
            <Skeleton className="bg-zinc-800 w-8/10 h-6" />
          </div>
        </div>

        <div className="flex gap-5 w-full justify-between">
          <Skeleton className="w-1/5 h-8 bg-zinc-800 rounded-lg" />
          <div className="flex flex-col gap-3 w-[200px] items-end">
            <Skeleton className="bg-zinc-800 w-7/10 h-6" />
            <Skeleton className="bg-zinc-800 w-6/10 h-6" />
          </div>
        </div>

        <div className="flex gap-5 w-full justify-between">
          <Skeleton className="w-1/4 h-8 bg-zinc-800 rounded-lg" />
          <div className="flex flex-col gap-3 w-[200px] items-end">
            <Skeleton className="bg-zinc-800 w-5/10 h-6" />
            <Skeleton className="bg-zinc-800 w-4/10 h-6" />
          </div>
        </div>

        <Skeleton className="w-full h-10 bg-zinc-800" />
      </Skeleton>
    </>
  );
};

export default PlayerCardLoader;
