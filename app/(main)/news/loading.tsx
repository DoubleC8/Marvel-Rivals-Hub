import { Spinner } from "@/components/ui/spinner";

const NewsLoadingPage = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-red-500">
      <Spinner size="large" className="text-[var(--purple)]" />
    </div>
  );
};

export default NewsLoadingPage;
