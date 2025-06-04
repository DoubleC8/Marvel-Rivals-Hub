import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-5 min-h-[100vh] p-5">
      {/**Header loader */}
      <Skeleton
        className="w-9/10 mx-auto flex items-center justify-between bg-zinc-700 p-3 rounded-lg
       border-[2px] border-zinc-800 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="w-[125px] h-[125px] bg-zinc-800 border-[3px] border-zinc-900 rounded-lg"></Skeleton>
          <div className="h-[125px] w-[250px] flex flex-col justify-evenly">
            <Skeleton className="h-6 w-6/10 bg-zinc-800"></Skeleton>
            <Skeleton className="h-6 w-7/10 bg-zinc-800"></Skeleton>
            <Skeleton className="h-6 w-9/10 bg-zinc-800"></Skeleton>
          </div>
        </div>
        <Skeleton className="h-8 w-[150px] bg-zinc-800 "></Skeleton>
      </Skeleton>

      {/**Rank and kda trend loader */}
      <div className="w-9/10 mx-auto flex justify-between">
        <Skeleton className="playerStatsContainer !bg-zinc-700 border-zinc-800">
          <Skeleton className="h-8 w-6/10 bg-zinc-800"></Skeleton>
        </Skeleton>
        <Skeleton className="playerStatsContainer !bg-zinc-700 !w-[66%] border-zinc-800 flex flex-col gap-1">
          <Skeleton className="h-6 w-3/10 bg-zinc-800"></Skeleton>
          <Skeleton className="h-4 w-5/10 bg-zinc-800"></Skeleton>
        </Skeleton>
      </div>

      {/**Top hereos, team mates, and roles loader */}
      <div className="w-9/10 mx-auto flex justify-between">
        <Skeleton className="playerStatsContainer !bg-zinc-700 border-zinc-800">
          <Skeleton className="h-6 w-6/10 bg-zinc-800"></Skeleton>
        </Skeleton>
        <Skeleton className="playerStatsContainer !bg-zinc-700 border-zinc-800">
          <Skeleton className="h-6 w-6/10 bg-zinc-800"></Skeleton>
        </Skeleton>
        <Skeleton className="playerStatsContainer !bg-zinc-700 border-zinc-800">
          <Skeleton className="h-6 w-6/10 bg-zinc-800"></Skeleton>
        </Skeleton>
      </div>
      <Skeleton className="playerStatsContainer !w-9/10 mx-auto !bg-zinc-700 border-zinc-800">
        <Skeleton className="h-6 w-6/10 bg-zinc-800"></Skeleton>
      </Skeleton>
    </section>
  );
};

export default loading;
