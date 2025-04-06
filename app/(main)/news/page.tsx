"use client";

import React, { useEffect, useState } from "react";
import Balances from "@/components/news/Balances";
import PatchNotes from "@/components/news/PatchNotes";
import DevDiaries from "@/components/news/DevDiaries";
import axios from "axios";
import NewsLoadingPage from "./loading";

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

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchData = async (
      endpoint: string,
      setter: React.Dispatch<React.SetStateAction<ApiData[]>>,
      key: string
    ) => {
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/${endpoint}?page=1&limit=10`,
          {
            headers: { "x-api-key": apiKey },
          }
        );
        setter(response.data[key] || []);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    setLoading(true); // 👈 Start loading

    Promise.all([
      fetchData("balances", setBalances, "balances"),
      fetchData("patch-notes", setPatchNotes, "formatted_patches"),
      fetchData("dev-diaries", setDevDiaries, "dev_diaries"),
    ]).finally(() => setLoading(false)); // 👈 End loading when all calls complete
  }, []);

  const renderContent = () => {
    if (loading) return <NewsLoadingPage />; // 👈 Show skeleton while loading

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
    <section className="m-5 flex flex-col gap-5">
      {/* Tabs */}
      <nav
        className="bg-[var(--yellow)] py-2 px-5 flex justify-around items-center 
        rounded-full text-2xl shadow-2xl text-[var(--black)] font-bold"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`hover:cursor-pointer ${
              activeTab === tab ? "border-b-2" : ""
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
