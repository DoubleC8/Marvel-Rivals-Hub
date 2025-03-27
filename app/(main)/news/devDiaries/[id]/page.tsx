"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { formatText } from "@/lib/utils";
import NewsLoadingPage from "../../loading";

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
    return <NewsLoadingPage />;
  }

  return (
    <section className="my-10">
      <div
        className="bg-[var(--secondary-background)]
       w-3/4 mx-auto p-5 rounded-2xl border-[2px] 
       border-[var(--purple)] flex flex-col gap-5 text-[var(--primary-text)]"
      >
        <h2
          className="text-5xl tracking-wider text-center"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {devDiary?.title || "Loading..."}
        </h2>
        {devDiary?.fullContent ? (
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(devDiary.fullContent),
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
