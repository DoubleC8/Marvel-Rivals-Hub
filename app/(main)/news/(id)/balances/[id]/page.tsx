"use client";

import React, { useEffect, useState, use } from "react";
import NewsPageLoadingComponent from "../../loading";
import NewsPage from "@/components/news/NewsPage";
import { fetchNewsPageData } from "@/lib/actions";
import { toast } from "sonner";

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
  const formattedBalanceId = balanceId?.split("-")[0];

  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!formattedBalanceId) return;

      try {
        const data = await fetchNewsPageData("balance", formattedBalanceId);
        setBalance(data);

        console.log(data);
        toast.success(`Successfully loaded ${data.title}!`, {
          description: `Loaded on ${new Date().toLocaleString()}`,
        });
      } catch (error) {
        toast.error(`Unable to load news page data. Please try again later.`, {
          description: `Unable to load news data on ${new Date().toLocaleString()}`,
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
