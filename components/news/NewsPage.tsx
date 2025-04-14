import { formatNewsPageDate, formatText } from "@/lib/utils";
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
    <div
      className="w-3/4 mx-auto bg-[var(--secondary-background)]
                 p-5 rounded-xl border-[2px] border-[var(--purple)] 
                 flex flex-col gap-5"
    >
      {imagePath && (
        <img
          src={`https://marvelrivalsapi.com/rivals${imagePath}`}
          alt="Dev Dairy Image"
          className="w-full h-[550px] rounded-xl mx-auto"
        />
      )}
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2
            className="text-5xl tracking-wider"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            {title}
          </h2>
          <p className="text-xl text-[var(--secondary-text)]">
            {formatNewsPageDate(date || "")}
          </p>
        </div>
        <p
          className="text-lg"
          dangerouslySetInnerHTML={{
            __html: fullContent ? formatText(fullContent) : "",
          }}
        />
      </div>
    </div>
  );
};

export default NewsPage;
