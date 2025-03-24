"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { formatText } from "@/lib/utils";
import NewsLoadingPage from "./loading";

interface Balance {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: balanceId } = use(params);
  const formattedBalanceId = balanceId?.substring(0, balanceId.indexOf("-"));

  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/balance/${formattedBalanceId}`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (formattedBalanceId) {
      fetchBalance();
    }
  }, [formattedBalanceId]);

  if (loading) {
    return <NewsLoadingPage />;
  }

  return (
    <section className="my-10">
      <div className="bg-white w-3/4 mx-auto p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5">
        <img
          src={`https://marvelrivalsapi.com/rivals${balance?.imagePath}`}
          alt="balance image"
          className="w-full rounded-2xl mx-auto"
        ></img>
        <h2
          className="text-5xl tracking-wider text-center"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {balance?.title || "Loading..."}
        </h2>
        {balance?.fullContent ? (
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(balance.fullContent),
            }}
          />
        ) : (
          <p>Loading content...</p>
        )}
      </div>
    </section>
  );
};

export default Page;
