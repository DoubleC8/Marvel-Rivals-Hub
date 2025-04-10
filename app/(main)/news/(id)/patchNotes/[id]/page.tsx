"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";

import NewsPage from "@/components/news/NewsPage";
import NewsPageLoadingComponent from "../../loading";

interface PatchNote {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: patchNoteId } = use(params);

  const [patchNote, setPatchNote] = useState<PatchNote | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchPatchNote = async () => {
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/patch-note/${patchNoteId}`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        setPatchNote(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patchNoteId) {
      fetchPatchNote();
    }
  }, [patchNoteId]);

  if (loading) {
    return <NewsPageLoadingComponent />;
  }

  return (
    <section className="p-5 flex flex-col gap-5">
      {patchNote && (
        <NewsPage
          imagePath={patchNote.imagePath}
          title={patchNote.title}
          date={patchNote.date}
          fullContent={patchNote.fullContent}
        />
      )}
    </section>
  );
};

export default Page;
