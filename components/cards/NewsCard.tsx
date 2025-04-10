import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const NewsCard = ({
  newsType,
  date,
  id,
  overview,
  title,
  imagePath,
}: {
  newsType: string;
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}) => {
  return (
    <div
      className="bg-[var(--secondary-background)]
             p-5 rounded-xl border-[2px] border-[var(--purple)] 
             flex flex-col gap-5"
    >
      <img
        src={`${imagePath}`}
        alt={`${title} image`}
        className="w-full h-[500px] rounded-xl mx-auto"
      ></img>
      <div>
        <h2
          className="text-2xl tracking-wider"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {title} • {formatDate(date)}
        </h2>
        <p>{overview}</p>
        <Link
          href={`/news/${newsType}/${id}`}
          className="font-extrabold hover:underline text-[var(--secondary-text)] 
          hover:text-[var(--yellow)] ease-in-out duration-100"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
