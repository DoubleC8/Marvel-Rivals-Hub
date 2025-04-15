import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardLoadingPage = () => {
  const array = new Array(15).fill(null);
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-5 justify-center z-0">
      <Skeleton className="w-3/10 h-6 bg-zinc-700" />
      <Skeleton className="w-full h-[80vh] border-[2px] border-zinc-800 rounded-lg bg-zinc-700 flex flex-col">
        <div className="h-[5%] flex py-2 px-1">
          <div className="w-1/2 flex gap-3">
            <Skeleton className="w-1/10 h-8 bg-zinc-800" />
            <Skeleton className="w-1/10 h-8 bg-zinc-800" />
          </div>
          <div className="w-1/2 flex justify-between">
            <Skeleton className="w-2/10 h-8 bg-zinc-800" />
            <Skeleton className="w-2/10 h-8 bg-zinc-800" />
            <Skeleton className="w-2/10 h-8 bg-zinc-800" />
          </div>
        </div>
        <div className="flex flex-col gap-1 py-2 px-1">
          {array.map((_, i) => (
            <Skeleton
              key={i}
              className="h-2/10 w-full py-1 px-2 bg-zinc-800 flex"
            >
              <div className="w-1/2 flex items-center gap-3">
                <Skeleton className="rounded-lg w-[50px] h-[50px] bg-zinc-900" />
                <Skeleton className="rounded-lg w-[50px] h-[50px] bg-zinc-900" />
                <Skeleton className="rounded-lg w-3/10 h-6 bg-zinc-900" />
              </div>

              <div className="w-1/2 flex items-center gap-3 justify-between">
                <div className="w-1/3 flex gap-1 items-center justify-center">
                  <Skeleton className="rounded-lg w-[50px] h-[50px] bg-zinc-900" />
                  <Skeleton className="rounded-lg w-3/4 h-6 bg-zinc-900" />
                </div>
                <Skeleton className="rounded-lg w-2/10 h-6 bg-zinc-900" />
                <Skeleton className="rounded-lg w-3/10 h-6 bg-zinc-900" />
              </div>
            </Skeleton>
          ))}
        </div>
      </Skeleton>
    </div>
  );
};

export default LeaderboardLoadingPage;
