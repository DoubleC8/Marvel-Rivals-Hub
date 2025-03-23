import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

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
      <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
        Patch Notes
      </h1>

      <div className="flex flex-col gap-5">
        {patchNotes.map((patchNote, index) => (
          <div
            key={index}
            className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
          >
            <img
              src={`https://marvelrivalsapi.com/rivals${patchNote.imagePath}`}
              alt="patch note image"
              className="w-full rounded-2xl mx-auto"
            ></img>
            <div>
              <h2
                className="text-2xl tracking-wider"
                style={{ fontFamily: "var(--marvelFont)" }}
              >
                {patchNote.title} • {formatDate(patchNote.date)}
              </h2>
              <p>{patchNote.overview}</p>
              <Link
                href={`/news/patchNotes/${patchNote.id}`}
                className="font-extrabold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatchNotes;
