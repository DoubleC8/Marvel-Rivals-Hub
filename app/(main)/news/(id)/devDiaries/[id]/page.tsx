"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import NewsPage from "@/components/news/NewsPage";
import NewsPageLoadingComponent from "../../loading";

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

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchDevDiary = async () => {
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/balance/${devDiaryId}`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        setDevDiary(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (devDiaryId) {
      fetchDevDiary();
    }
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
