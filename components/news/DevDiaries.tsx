import React from "react";
import NewsCard from "../cards/NewsCard";
import { formatPlayerImages } from "@/lib/utils";

interface apiData {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const DevDiaries = ({ devDiaries }: { devDiaries: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-[95%] mx-auto">
      <h1
        className="md:text-4xl
        text-3xl tracking-wide"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Dev Diaries
      </h1>

      <div className="newsCardSection">
        {devDiaries.map((devDiary, index) => (
          <NewsCard
            newsType="devDiaries"
            date={devDiary.date}
            fullContent={devDiary.fullContent}
            id={devDiary.id}
            overview={devDiary.overview}
            title={devDiary.title}
            imagePath={formatPlayerImages(devDiary.imagePath)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DevDiaries;
