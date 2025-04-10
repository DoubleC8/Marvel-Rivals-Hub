"use client";

import React, { useEffect, useState } from "react";
import Balances from "@/components/news/Balances";
import PatchNotes from "@/components/news/PatchNotes";
import DevDiaries from "@/components/news/DevDiaries";
import NewsCardLoadingComponent from "./loading";
import { getNewsData } from "@/lib/actions";
import { toast } from "sonner";

interface ApiData {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const TABS = ["All", "Balances", "Patch Notes", "Dev Diaries"] as const;
type Tab = (typeof TABS)[number];

const Page = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [balances, setBalances] = useState<ApiData[]>([]);
  const [patchNotes, setPatchNotes] = useState<ApiData[]>([]);
  const [devDiaries, setDevDiaries] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(true); // 👈 Track loading state

  useEffect(() => {
    const fetchAllNewsData = async () => {
      setLoading(true);

      try {
        const newsData = await getNewsData();
        setBalances(newsData.balances);
        setPatchNotes(newsData.patchNotes);
        setDevDiaries(newsData.devDiaries);

        toast.success(`Successfully loaded news data!`, {
          description: `Loaded on ${new Date().toLocaleString()}`,
        });
      } catch (error) {
        toast.error(`Unable to load news data. Please try again later.`, {
          description: `Unable to load news data on ${new Date().toLocaleString()}`,
        });
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNewsData();
  }, []);

  const renderContent = () => {
    if (loading) return <NewsCardLoadingComponent />; // 👈 Show skeleton while loading

    switch (activeTab) {
      case "Balances":
        return <Balances balances={balances} />;
      case "Patch Notes":
        return <PatchNotes patchNotes={patchNotes} />;
      case "Dev Diaries":
        return <DevDiaries devDiaries={devDiaries} />;
      default:
        return (
          <div className="flex flex-col gap-10">
            <Balances balances={balances} />
            <PatchNotes patchNotes={patchNotes} />
            <DevDiaries devDiaries={devDiaries} />
          </div>
        );
    }
  };

  return (
    <section className="p-5 flex flex-col gap-5">
      {/* Tabs */}
      <nav
        className="h-fit w-3/4 mx-auto bg-[var(--yellow)] px-5 py-3 flex justify-around items-center 
        rounded-lg text-2xl shadow-2xl text-[var(--black)] tracking-wide"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`hover:cursor-pointer ${
              activeTab === tab ? "underline underline-offset-2" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div>{renderContent()}</div>
    </section>
  );
};

export default Page;
