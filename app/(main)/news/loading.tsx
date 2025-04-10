import { Skeleton } from "@/components/ui/skeleton";

const NewsCardLoadingComponent = () => {
  const newsCardArray = new Array(3).fill(null);
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
          {newsCardArray.map(
            (
              _,
              index // Use '_' for unused value
            ) => (
              <Skeleton
                key={index} // Add a key!
                className="w-full mx-auto bg-zinc-700
            p-5 rounded-2xl border-[2px] border-zinc-900 
            flex flex-col gap-5 relative z-0"
              >
                <div className="w-full bg-zinc-800 rounded-2xl mx-auto h-[500px]"></div>
                <div className="flex flex-col gap-5">
                  <h2
                    className="h-9 w-1/2 bg-zinc-800 rounded-xl"
                    style={{ fontFamily: "var(--marvelFont)" }}
                  ></h2>
                  <p className="h-7 w-8/10 bg-zinc-800 rounded-xl"></p>
                  <p className="h-7 w-1/10 bg-zinc-800 rounded-xl"></p>
                </div>
              </Skeleton>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsCardLoadingComponent;
