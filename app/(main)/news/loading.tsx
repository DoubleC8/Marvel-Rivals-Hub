import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingPage = () => {
  const array = new Array(6).fill(null);
  return (
    <div className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
        Balance Changes
      </h1>

      <div className="flex flex-col gap-5">
        {array.map((_, i) => (
          <Skeleton
            key={i}
            className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
          >
            <Skeleton />
            <Skeleton>
              <Skeleton
                className="text-2xl tracking-wider"
                style={{ fontFamily: "var(--marvelFont)" }}
              />
              <Skeleton />
              <Skeleton className="font-extrabold hover:underline" />
            </Skeleton>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
