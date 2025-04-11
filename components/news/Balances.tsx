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

const Balances = ({ balances }: { balances: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1
        className="text-5xl text-[var(--primary-text)]"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Balance Changes
      </h1>

      <div className="flex flex-row flex-wrap gap-5 justify-between">
        {balances.map((balance, index) => (
          <NewsCard
            newsType="balances"
            date={balance.date}
            fullContent={balance.fullContent}
            id={balance.id}
            overview={balance.overview}
            title={balance.title}
            imagePath={`https://marvelrivalsapi.com/rivals${balance.imagePath}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Balances;
