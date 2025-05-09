import { Skeleton } from "@/components/ui/skeleton";

const NewsCardLoadingComponent = () => {
  const newsCardArray = new Array(6).fill(null);
  const newsTitle = ["Balance Changes", "Patch Notes", "Dev Diaries"];

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1100px] mx-auto">
      {newsTitle.map((title, index) => (
        <div className="flex flex-col gap-3 w-full mx-auto" key={index}>
          <h1
            className="text-5xl text-[var(--primary-text)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            {title}
          </h1>

          <div className="newsLoadingSection">
            {newsCardArray.map((_, index) => (
              <Skeleton key={index} className="newsCardLoader">
                <Skeleton className="w-full bg-zinc-800 rounded-2xl mx-auto min-h-[250px]" />

                <div className="flex flex-col justify-between h-[250px]">
                  <div className="flex flex-col gap-5">
                    <Skeleton
                      className="h-9 w-1/2 bg-zinc-800 rounded-xl"
                      style={{ fontFamily: "var(--marvelFont)" }}
                    />
                    <Skeleton className="h-7 w-9/10 bg-zinc-800 rounded-xl" />
                    <Skeleton className="h-7 w-7/10 bg-zinc-800 rounded-xl" />
                  </div>
                  <p className="h-7 w-3/10 bg-zinc-800 rounded-xl"></p>
                </div>
              </Skeleton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCardLoadingComponent;
