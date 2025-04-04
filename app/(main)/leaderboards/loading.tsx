import React from "react";
import { Spinner } from "@/components/ui/spinner";

const LeaderboardLoadingPage = () => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <Spinner size="large" className="text-[var(--purple)]" />
    </div>
  );
};

export default LeaderboardLoadingPage;
