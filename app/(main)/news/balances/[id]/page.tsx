"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/balance/${formattedBalanceId}`,
          {
            headers: {
              "x-api-key":
                "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f",
            },
          }
        );

        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (formattedBalanceId) {
      fetchBalance();
    }
  }, [formattedBalanceId]);

  return (
    <section className="my-10">
      <div className="bg-white w-3/4 mx-auto p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5">
        <img
          src={`https://marvelrivalsapi.com/rivals${balance?.imagePath}`}
          alt="balance image"
          className="w-full rounded-2xl mx-auto"
        ></img>
        <h2
          className="text-3xl tracking-wider text-center"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          {balance?.title || "Loading..."}
        </h2>
        {balance?.fullContent ? (
          <p
            dangerouslySetInnerHTML={{
              __html: formatText(balance.fullContent),
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

const formatText = (text: string = ""): string => {
  return text
    .replace(/\n{2,}/g, "</p><p>") // Convert double new lines to paragraphs
    .replace(/^\d+\.\s*(.*)$/gm, "<h2>$1</h2>") // Convert numbered sections into headers
    .replace(/-\s*(.*)$/gm, "<li>$1</li>") // Convert list items into bullets
    .replace(
      /(Discord|X|Facebook|Instagram|TikTok|YouTube|Twitch) \[(.*?)\]/g,
      '<a href="$2" target="_blank">$1</a>'
    ); // Convert links
};
