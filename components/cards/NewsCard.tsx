import { formatDate } from "@/lib/utils";
import Image from "next/image";
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
    <div className="newsCard">
      {/* Image Container */}
      <div className="relative w-full h-60 rounded-xl overflow-hidden">
        <Image
          src={imagePath}
          alt={`${title} image`}
          fill
          className="object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="w-full h-1/2 flex flex-col justify-between">
        <h2
          className="text-lg tracking-wide"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {title} • {formatDate(date)}
        </h2>
        <p className="text-md">{overview}</p>
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
