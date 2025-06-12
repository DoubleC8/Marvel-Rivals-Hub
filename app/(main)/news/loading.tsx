import { Skeleton } from "@/components/ui/skeleton";

const NewsCardLoadingComponent = () => {
  return (
    <>
      {[...Array(3)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-3 w-[95%] mx-auto">
          <Skeleton
            className="md:w-2/10 md:h-10
          w-1/2 h-8 bg-zinc-700"
          />

          <div className="newsCardSection">
            {[...Array(6)].map((_, cardIndex) => (
              <Skeleton key={cardIndex} className="newsCardLoader">
                <Skeleton className="w-full min-h-1/2 rounded-xl mx-auto bg-zinc-800" />
                <div className="w-full h-1/2 flex flex-col justify-between mt-4">
                  <Skeleton
                    className="h-5 w-full bg-zinc-800"
                    style={{ fontFamily: "var(--marvelFont)" }}
                  />

                  <div className="flex flex-col gap-3">
                    <Skeleton
                      className="h-5 w-9/10 bg-zinc-800"
                      style={{ fontFamily: "var(--marvelFont)" }}
                    />
                    <Skeleton
                      className="h-5 w-8/10 bg-zinc-800"
                      style={{ fontFamily: "var(--marvelFont)" }}
                    />
                    <Skeleton
                      className="h-5 w-7/10 bg-zinc-800"
                      style={{ fontFamily: "var(--marvelFont)" }}
                    />
                  </div>

                  <Skeleton className="w-1/4 h-5 bg-zinc-800 mt-3" />
                </div>
              </Skeleton>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsCardLoadingComponent;
