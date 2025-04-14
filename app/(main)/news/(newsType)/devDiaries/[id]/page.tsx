"use client";

import React, { useEffect, useState, use } from "react";
import NewsPage from "@/components/news/NewsPage";
import NewsPageLoadingComponent from "../../loading";
import { fetchNewsPageData } from "@/lib/actions";
import { toast } from "sonner";

interface DevDiary {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: devDiaryId } = use(params);

  const [devDiary, setDevDiary] = useState<DevDiary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!devDiaryId) return;

      try {
        const data = await fetchNewsPageData("dev-diary", devDiaryId);
        setDevDiary(data);

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
  }, [devDiaryId]);

  if (loading) {
    return <NewsPageLoadingComponent />;
  }

  return (
    <section className="p-5 flex flex-col gap-5">
      {devDiary && (
        <NewsPage
          imagePath={devDiary.imagePath}
          title={devDiary.title}
          date={devDiary.date}
          fullContent={devDiary.fullContent}
        />
      )}
    </section>
  );
};

export default Page;
