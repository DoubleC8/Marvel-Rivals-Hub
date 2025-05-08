import React from "react";
import NewsCard from "../cards/NewsCard";

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
    <div className="flex flex-col gap-3 w-full mx-auto">
      <h1
        className="text-5xl text-[var(--primary-text)]"
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
            imagePath={`https://marvelrivalsapi.com/rivals${devDiary.imagePath}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DevDiaries;
