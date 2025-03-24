import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NewsLoadingPage = () => {
  return (
    <Skeleton className="my-10 w-3/4 mx-auto">
      <div className="bg-zinc-700 rounded-2xl h-96">
        <Skeleton className="w-full rounded-2xl mx-auto" />
        <Skeleton className="text-5xl tracking-wider text-center" />
        <Skeleton />
      </div>
    </Skeleton>
  );
};

export default NewsLoadingPage;
