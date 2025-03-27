import { Spinner } from "@/components/ui/spinner";

const NewsLoadingPage = () => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <Spinner size="large" className="text-[var(--purple)]" />
    </div>
  );
};

export default NewsLoadingPage;
