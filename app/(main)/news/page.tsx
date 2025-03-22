"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface apiData {
  date: string;
  fullContent: string;
  id: string;
  overview: string;
  title: string;
  imagePath: string;
}

const Page = () => {
  const apikey =
    "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f";
  const [balances, setBalances] = useState<apiData[]>([]);
  const [patchNotes, setPatchNotes] = useState<apiData[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await axios.get(
          "https://marvelrivalsapi.com/api/v1/balances?page=1&limit=10",
          {
            headers: {
              "x-api-key": apikey,
            },
          }
        );

        console.log("API Response:", response.data); // Check the structure of the response

        // If the data is inside an object, extract the array properly
        setBalances(response.data.balances || []);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    };

    const fetchPatchNotes = async () => {
      try {
        const response = await axios.get(
          "https://marvelrivalsapi.com/api/v1/patch-notes?page=1&limit=10",
          {
            headers: {
              "x-api-key":
                "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f",
            },
          }
        );
        console.log("API Patch Notes Response:", response.data); // Check the structure of the response

        setPatchNotes(response.data.formatted_patches || []);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    };

    fetchBalances();
    fetchPatchNotes();
  }, []);

  return (
    <section className="m-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3 w-3/4 mx-auto">
        <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
          Balance Changes
        </h1>

        <div className="flex flex-col gap-5">
          {balances.map((balance, index) => (
            <div
              key={index}
              className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
            >
              <img
                src={`https://marvelrivalsapi.com/rivals${balance.imagePath}`}
                alt="balance image"
                className="w-full rounded-2xl mx-auto"
              ></img>
              <div>
                <h2
                  className="text-2xl tracking-wider"
                  style={{ fontFamily: "var(--marvelFont)" }}
                >
                  {balance.title} • {formatDate(balance.date)}
                </h2>
                <p>{balance.overview}</p>
                <Link
                  href={`/news/balances/${balance.id}`}
                  className="font-extrabold hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-3/4 mx-auto">
        <h1 className="text-5xl" style={{ fontFamily: "var(--marvelFont)" }}>
          Balance Changes
        </h1>

        <div className="flex flex-col gap-5">
          {patchNotes.map((patchNote, index) => (
            <div
              key={index}
              className="bg-[var(--white)] p-5 rounded-2xl border-[2px] border-[var(--yellow)] flex flex-col gap-5"
            >
              <img
                src={`https://marvelrivalsapi.com/rivals${patchNote.imagePath}`}
                alt="patch note image"
                className="w-full rounded-2xl mx-auto"
              ></img>
              <div>
                <h2
                  className="text-2xl tracking-wider"
                  style={{ fontFamily: "var(--marvelFont)" }}
                >
                  {patchNote.title} • {formatDate(patchNote.date)}
                </h2>
                <p>{patchNote.overview}</p>
                <Link
                  href={`/news/balances/${patchNote.id}`}
                  className="font-extrabold hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
