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

const DevDiaries = ({ devDiaries }: { devDiaries: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
        Dev Diares
      </h1>

      <div className="flex flex-col gap-5">
        {devDiaries.map((devDiary, index) => (
          <div
            key={index}
            className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
          >
            <div>
              <h2
                className="text-2xl tracking-wider"
                style={{ fontFamily: "var(--marvelFont)" }}
              >
                {devDiary.title} • {formatDate(devDiary.date)}
              </h2>
              <p>{devDiary.overview}</p>
              <Link
                href={`/news/devDiares/${devDiary.id}`}
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

export default DevDiaries;
