import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NewsPageLoadingComponent = () => {
  const lines = new Array(6).fill(null);

  return (
    <section className="p-5">
      <div className="flex flex-col w-9/10 mx-auto gap-8">
        {/* Image */}
        <Skeleton className="w-full h-[250px] sm:h-[500px] rounded-xl bg-zinc-800" />

        {/* Title and Date */}
        <div className="flex flex-col justify-center items-center gap-3">
          <Skeleton className="w-3/4 h-10 sm:h-14 bg-zinc-800 rounded-md" />
          <Skeleton className="w-1/4 h-6 bg-zinc-800 rounded-md" />
        </div>

        {/* Body content */}
        <div className="flex flex-col gap-4">
          {lines.map((_, i) => (
            <Skeleton
              key={i}
              className="w-full sm:w-3/4 h-6 bg-zinc-800 rounded"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPageLoadingComponent;
