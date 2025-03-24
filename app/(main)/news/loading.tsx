import { Skeleton } from "@/components/ui/skeleton";

const SECTIONS = ["Balance Changes", "Patch Notes", "Dev Diaries"];

const LoadingSection = ({ title }: { title: string }) => {
  return (
    <section className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
        {title}
      </h1>

      <div className="flex flex-col gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="bg-zinc-700 px-5 py-15 rounded-2xl flex flex-col gap-5"
          >
            <Skeleton className="w-full rounded-2xl mx-auto h-40" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </Skeleton>
        ))}
      </div>
    </section>
  );
};

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-10">
      {SECTIONS.map((title) => (
        <LoadingSection key={title} title={title} />
      ))}
    </div>
  );
};

export default LoadingPage;
