import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NewsPageLoadingComponent = () => {
  const array = new Array(5).fill(null);

  return (
    <section className="p-5 flex flex-col gap-5">
      <Skeleton
        className="w-3/4 mx-auto bg-zinc-700
             p-5 rounded-xl border-[2px] border-zinc-800 
             flex flex-col gap-5 z-0"
      >
        <Skeleton className="w-full h-[550px] rounded-xl mx-auto bg-zinc-800" />
        <Skeleton className="w-3/4 h-12 mx-auto bg-zinc-800 " />
        <div className="flex flex-col gap-5">
          {array.map((_, i) => {
            return <Skeleton key={i} className={`h-7 w-3/4 bg-zinc-800`} />;
          })}
        </div>
      </Skeleton>
    </section>
  );
};

export default NewsPageLoadingComponent;
