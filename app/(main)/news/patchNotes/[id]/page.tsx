"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { formatText } from "@/lib/utils";

import NewsLoadingPage from "../../loading";

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
    return <NewsLoadingPage />;
  }

  return (
    <section className="my-10">
      <div
        className="bg-[var(--secondary-background)] 
      w-3/4 mx-auto p-5 rounded-2xl border-[2px] 
      border-[var(--purple)] flex flex-col gap-5 text-[var(--primary-text)]"
      >
        <img
          src={`https://marvelrivalsapi.com/rivals${patchNote?.imagePath}`}
          alt="balance image"
          className="w-full rounded-2xl mx-auto"
        ></img>
        <h2
          className="text-5xl tracking-wider text-center"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {patchNote?.title || "Loading..."}
        </h2>
        {patchNote?.fullContent ? (
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(patchNote.fullContent),
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
