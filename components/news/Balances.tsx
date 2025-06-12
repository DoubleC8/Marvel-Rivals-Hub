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

const Balances = ({ balances }: { balances: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-[95%] mx-auto">
      <h1
        className="md:text-4xl
        text-3xl tracking-wide"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Balance Changes
      </h1>

      <div className="newsCardSection">
        {balances.map((balance, index) => (
          <NewsCard
            newsType="balances"
            date={balance.date}
            fullContent={balance.fullContent}
            id={balance.id}
            overview={balance.overview}
            title={balance.title}
            imagePath={formatPlayerImages(balance.imagePath)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Balances;
