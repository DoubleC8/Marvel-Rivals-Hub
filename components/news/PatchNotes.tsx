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

const PatchNotes = ({ patchNotes }: { patchNotes: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-[95%] mx-auto">
      <h1
        className="md:text-4xl
        text-3xl tracking-wide"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Patch Notes
      </h1>

      <div className="newsCardSection">
        {patchNotes.map((patchNote, index) => (
          <NewsCard
            newsType="patchNotes"
            date={patchNote.date}
            fullContent={patchNote.fullContent}
            id={patchNote.id}
            overview={patchNote.overview}
            title={patchNote.title}
            imagePath={formatPlayerImages(patchNote.imagePath)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PatchNotes;
