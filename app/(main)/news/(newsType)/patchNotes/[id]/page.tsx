"use client";

import React, { useEffect, useState, use } from "react";

import NewsPage from "@/components/news/NewsPage";
import NewsPageLoadingComponent from "../../loading";
import { fetchNewsPageData } from "@/lib/actions";
import { toast } from "sonner";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!patchNoteId) return;

      try {
        const data = await fetchNewsPageData("balance", patchNoteId);
        setPatchNote(data);

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
