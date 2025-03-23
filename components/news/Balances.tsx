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

const Balances = ({ balances }: { balances: apiData[] }) => {
  return (
    <div className="flex flex-col gap-3 w-3/4 mx-auto">
      <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
        Balance Changes
      </h1>

      <div className="flex flex-col gap-5">
        {balances.map((balance, index) => (
          <div
            key={index}
            className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
          >
            <img
              src={`https://marvelrivalsapi.com/rivals${balance.imagePath}`}
              alt="balance image"
              className="w-full rounded-2xl mx-auto"
            ></img>
            <div>
              <h2
                className="text-2xl tracking-wider"
                style={{ fontFamily: "var(--marvelFont)" }}
              >
                {balance.title} • {formatDate(balance.date)}
              </h2>
              <p>{balance.overview}</p>
              <Link
                href={`/news/balances/${balance.id}`}
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

export default Balances;
