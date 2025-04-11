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

const PatchNotes = ({ patchNotes }: { patchNotes: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1
        className="text-5xl text-[var(--primary-text)]"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Patch Notes
      </h1>

      <div className="flex flex-row flex-wrap gap-5 justify-between">
        {patchNotes.map((patchNote, index) => (
          <NewsCard
            newsType="patchNotes"
            date={patchNote.date}
            fullContent={patchNote.fullContent}
            id={patchNote.id}
            overview={patchNote.overview}
            title={patchNote.title}
            imagePath={`https://marvelrivalsapi.com/rivals${patchNote.imagePath}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PatchNotes;
