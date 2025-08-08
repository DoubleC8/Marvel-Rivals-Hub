import { formatNewsPageDate, formatText } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const NewsPage = ({
  imagePath,
  title,
  date,
  fullContent,
}: {
  imagePath: string;
  title: string;
  date: string;
  fullContent: string;
}) => {
  return (
    <div className="flex flex-col w-9/10 mx-auto gap-8">
      {imagePath && (
        <div className="relative w-full h-[250px] sm:h-[500px] rounded-xl overflow-hidden mx-auto">
          <Image
            src={`https://marvelrivalsapi.com/rivals${imagePath}`}
            alt="Dev Diary Image"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2
            className="sm:text-3xl
            text-center text-xl tracking-wider"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            {title}
          </h2>
          <p
            className="sm:text-lg
          text-sm font-semibold text-[var(--secondary-text)]"
          >
            {formatNewsPageDate(date || "")}
          </p>
        </div>
        <p
          className="sm:text-md  sm:font-semibold
          text-sm overflow-x-clip"
          dangerouslySetInnerHTML={{
            __html: fullContent ? formatText(fullContent) : "",
          }}
        />
      </div>
    </div>
  );
};

export default NewsPage;
