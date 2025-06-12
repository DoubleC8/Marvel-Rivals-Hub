import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PlayerCardLoader = () => {
  return (
    <Skeleton
      className="lg:flex-row lg:h-fit
    w-[95%] h-[95%] flex flex-col justify-between p-3 mx-auto bg-zinc-700 border-[2px] border-zinc-800 rounded-lg"
    >
      {/**Contains profile image, level, adn login_os */}
      <div
        className="lg:items-center lg:w-1/5
      flex gap-3"
      >
        <Skeleton
          className="lg:min-w-[125px] lg:min-h-[125px]
        w-[100px] h-[100px] bg-zinc-700 rounded-lg border-[2px] border-zinc-800"
        />
        <div
          className="
        h-[100px] w-full flex flex-col font-bold text-lg justify-between"
        >
          <Skeleton
            className="lg:w-1/2
          h-5 w-1/3 bg-zinc-800"
          />
          <Skeleton
            className="lg:w-1/2
          h-5 w-1/3 bg-zinc-800"
          />
          <Skeleton
            className="lg:w-7/10
          h-5 w-1/2 bg-zinc-800"
          />
        </div>
      </div>

      <div
        className="lg:w-1/5 lg:flex-col lg:justify-start lg:h-[125px]
      w-full flex items-center justify-between gap-5"
      >
        <Skeleton className="h-5 w-1/4 bg-zinc-800" />
        <div className="flex justify-end w-3/4 items-center gap-3 text-end text-lg font-bold">
          <Skeleton className="w-[50px] h-[50px] bg-zinc-800 rounded-lg border-transparent" />
          <Skeleton className="h-5 w-1/2 bg-zinc-800" />
        </div>
      </div>

      {/**Contains rank */}
      <div
        className="lg:w-1/5 lg:flex-col lg:justify-start lg:h-[125px] lg:items-center
      w-full flex items-center justify-between gap-5"
      >
        <Skeleton
          className="lg:w-1/2
        h-5 w-1/4 bg-zinc-800"
        />
        <div className="flex flex-col justify-end w-3/4 items-end gap-3 text-end text-lg font-bold">
          <Skeleton
            className="lg:w-8/10
          h-5 w-1/2 bg-zinc-800"
          />
          <Skeleton
            className="lg:w-8/10
          h-5 w-1/2 bg-zinc-800"
          />
        </div>
      </div>

      <div
        className="lg:w-1/5 lg:flex-col lg:justify-start lg:h-[125px]
      w-full flex items-center justify-between gap-5"
      >
        <Skeleton className="h-5 w-1/5 bg-zinc-800" />
        <div className="flex justify-end w-3/4 items-center gap-3 text-end text-lg font-bold">
          <Skeleton className="w-[50px] h-[50px] bg-zinc-800 rounded-lg border-zinc-800" />
          <Skeleton className="h-5 w-1/2 bg-zinc-800" />
        </div>
      </div>

      <Skeleton
        className="lg:w-[15%] lg:my-auto
      w-full h-8 bg-zinc-800 flex items-center justify-center rounded-lg"
      />
    </Skeleton>
  );
};

export default PlayerCardLoader;
