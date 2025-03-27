import React from "react";
import Form from "next/form";
import GitHubLoginButton from "@/components/buttons/GitHubLoginButton";

const page = () => {
  const marvelRivalsLogo = "/images/Marvel_Rivals_Logo.webp";
  return (
    <section className="flex h-screen">
      <div className="w-1/2 h-full bg-[var(--yellow)] flex flex-col justify-center">
        <img
          src={marvelRivalsLogo}
          alt="Marvel Rivals Logo"
          className="w-10/12 mx-auto"
        ></img>
      </div>

      <div className="w-1/2 h-full flex flex-col gap-3 items-center justify-center">
        <h1
          className="text-center text-6xl text-[var(--white)]"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Marvel Rivals Hub
        </h1>

        <div className="w-11/12 mx-auto p-8 bg-[var(--white)] flex flex-col gap-3 rounded-2xl shadow-2xl">
          <h2
            className="text-center text-4xl tracking-wider"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            LOGIN
          </h2>
          <p className="text-[var(--secondary-text)]">
            Your ultimate companion for Marvel Rivals! Find the perfect
            teammates, track player stats, and stay updated with the latest tips
            and game updates. Whether you’re strategizing for victory or looking
            to improve, Marvel Rivals Hub has everything you need to dominate
            the battlefield!
          </p>

          <Form action="/" className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-medium text-[var(--black)]"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-[var(--border)] p-2 rounded-md border-[2px]
                focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-medium text-[var(--black)]"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border-[2px] border-[var(--border)] p-2 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-2xl font-semibold text-center
              bg-[var(--yellow)] rounded-lg shadow-lg transition-all hover:opacity-85 cursor-pointer hover:underline"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Login
            </button>
          </Form>
          <div className="flex flex-col gap-3">
            <p className="text-center text-[var(--secondary-text)]">
              Or Login with:{" "}
            </p>
            <div className="flex flex-row gap-3 justify-center">
              <GitHubLoginButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
