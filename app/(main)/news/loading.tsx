import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const NewsLoadingPage = () => {
  const newsCardArray = new Array(6).fill(null);
  return (
    <div className="flex flex-col gap-10">
      <div className="w-3/4 flex flex-col gap-3 mx-auto">
        <h1
          className="text-5xl text-[var(--primary-text)]"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Balance Changes
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
            flex flex-col gap-5"
            >
              <div className="w-full bg-zinc-800 rounded-2xl mx-auto h-[400px]"></div>
              <div className="flex flex-col gap-5">
                <h2
                  className="h-9 w-1/2 bg-zinc-800 rounded-xl"
                  style={{ fontFamily: "var(--marvelFont)" }}
                ></h2>
                <p className="h-9 w-8/10 bg-zinc-800 rounded-xl"></p>
                <p className="h-9 w-1/10 bg-zinc-800 rounded-xl"></p>
              </div>
            </Skeleton>
          )
        )}
      </div>
      <div className="w-3/4 flex flex-col gap-3 mx-auto">
        <h1
          className="text-5xl text-[var(--primary-text)]"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Patch Notes
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
            flex flex-col gap-5"
            >
              <div className="w-full bg-zinc-800 rounded-2xl mx-auto h-[400px]"></div>
              <div className="flex flex-col gap-5">
                <h2
                  className="h-9 w-1/2 bg-zinc-800 rounded-xl"
                  style={{ fontFamily: "var(--marvelFont)" }}
                ></h2>
                <p className="h-9 w-8/10 bg-zinc-800 rounded-xl"></p>
                <p className="h-9 w-1/10 bg-zinc-800 rounded-xl"></p>
              </div>
            </Skeleton>
          )
        )}
      </div>
      <div className="w-3/4 flex flex-col gap-3 mx-auto">
        <h1
          className="text-5xl text-[var(--primary-text)]"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Dev Diaries
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
            flex flex-col gap-5"
            >
              <div className="w-full bg-zinc-800 rounded-2xl mx-auto h-[400px]"></div>
              <div className="flex flex-col gap-5">
                <h2
                  className="h-9 w-1/2 bg-zinc-800 rounded-xl"
                  style={{ fontFamily: "var(--marvelFont)" }}
                ></h2>
                <p className="h-9 w-8/10 bg-zinc-800 rounded-xl"></p>
                <p className="h-9 w-1/10 bg-zinc-800 rounded-xl"></p>
              </div>
            </Skeleton>
          )
        )}
      </div>
    </div>
  );
};

export default NewsLoadingPage;
