import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <LoaderCircle size={100} color="var(--purple)" className="animate-spin" />
    </div>
  );
};

export default loading;
