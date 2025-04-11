import { Skeleton } from "@/components/ui/skeleton";

const NewsCardLoadingComponent = () => {
  const newsCardArray = new Array(6).fill(null);
  const newsTitle = ["Balance Changes", "Patch Notes", "Dev Diaries"];
  return (
    <div className="flex flex-col gap-10">
      {newsTitle.map((title, index) => (
        <div className="w-3/4 flex flex-col gap-3 mx-auto" key={index}>
          <h1
            className="text-5xl text-[var(--primary-text)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            {title}
          </h1>
          <div className="flex flex-row flex-wrap gap-5 justify-between">
            {newsCardArray.map(
              (
                _,
                index // Use '_' for unused value
              ) => (
                <Skeleton
                  key={index} // Add a key!
                  className="w-[525px] h-[525px] bg-zinc-700
             p-5 rounded-xl border-[2px] border-zinc-800
             flex flex-col gap-5 relative z-0"
                >
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
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCardLoadingComponent;
