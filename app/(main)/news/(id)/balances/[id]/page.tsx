"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import NewsPageLoadingComponent from "../../loading";
import NewsPage from "@/components/news/NewsPage";

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
    return <NewsPageLoadingComponent />;
  }

  return (
    <section className="p-5 flex flex-col gap-5">
      {balance && (
        <NewsPage
          imagePath={balance.imagePath}
          title={balance.title}
          date={balance.date}
          fullContent={balance.fullContent}
        />
      )}
    </section>
  );
};

export default Page;
