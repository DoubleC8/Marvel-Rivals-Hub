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
      className="w-[525px] h-[525px] bg-[var(--secondary-background)]
             p-5 rounded-xl border-[2px] border-[var(--purple)] 
             flex flex-col gap-5"
    >
      <img
        src={`${imagePath}`}
        alt={`${title} image`}
        className="w-full min-h-[250px] rounded-xl mx-auto"
      ></img>
      <div className="flex flex-col justify-between h-[250px] ">
        <div className="flex flex-col gap-5">
          <h2
            className="text-2xl tracking-wide"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            {title} • {formatDate(date)}
          </h2>
          <p className="text-[17px]">{overview}</p>
        </div>
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
