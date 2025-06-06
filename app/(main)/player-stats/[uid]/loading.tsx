import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-5 min-h-[100vh] p-1 md:p-5">
      {/**Header section loader */}
      <div className="playerStatsHeader !bg-zinc-700 !border-zinc-800">
        <div
          className="md:w-1/2
        w-full flex gap-3"
        >
          <Skeleton
            className="md:w-[125px] md:h-[125px] 
          w-[100px] h-[100px] rounded-lg border-[3px] bg-zinc-700 border-zinc-800"
          />

          <div
            className="md:h-[125px] md:w-1/4
        h-[100px] w-1/2 flex flex-col justify-evenly"
          >
            <Skeleton
              className="md:h-6 md:w-8/10
              h-5 w-6/10 bg-zinc-800"
            />

            <Skeleton
              className="md:h-6 md:w-8/10
              h-5 w-6/10 bg-zinc-800"
            />

            <Skeleton
              className="md:h-6 md:w-9/10
              h-5 w-8/10 bg-zinc-800"
            />
          </div>
        </div>

        <Skeleton
          className="sm:h-6 sm:w-1/10 sm:mx-0
              mx-auto h-5 w-3/10 bg-zinc-800 "
        />
      </div>

      <div className="playerStatsPageSectionContainer">
        <Skeleton className="playerStatsCard !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-1/2 bg-zinc-800" />
        </Skeleton>
        <Skeleton className="playerChartStatsCard !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-1/3 bg-zinc-800" />
        </Skeleton>
      </div>

      <div className="playerStatsPageSectionContainer">
        <Skeleton className="playerStatsCard !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-1/2 bg-zinc-800" />
        </Skeleton>
        <Skeleton className="playerStatsCard !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-1/2 bg-zinc-800" />
        </Skeleton>
        <Skeleton className="playerStatsCard !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-1/2 bg-zinc-800" />
        </Skeleton>
      </div>

      <div className="playerStatsPageSectionContainer">
        <Skeleton className="playerMatchHistoryStatCard !min-h-[500px] !bg-zinc-700 !border-zinc-800">
          <Skeleton className="h-6 w-3/10 bg-zinc-800" />
        </Skeleton>
      </div>
    </section>
  );
};

export default loading;
