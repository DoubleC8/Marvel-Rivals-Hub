import React from "react";
import Form from "next/form";
import LoginButton from "@/components/buttons/LoginButton";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const marvelRivalsLogo = "/images/Marvel_Rivals_Logo.webp";
  const githubLogo = "/images/github_logo.png";
  const googleLogo = "/images/google_logo.png";

  return (
    <>
      {/**Landscape tablet and up */}
      <section className="hidden md:flex h-screen">
        <div className="w-1/2 h-full bg-[var(--yellow)] flex flex-col justify-center">
          <div className="w-10/12 mx-auto relative aspect-[4/1]">
            <Image
              src={marvelRivalsLogo}
              alt="Marvel Rivals Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col gap-5 items-center justify-center">
          <h1
            className="text-center text-6xl text-[var(--white)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Marvel Rivals Hub
          </h1>

          <div className="w-11/12 mx-auto p-8 bg-[var(--white)] flex flex-col gap-3 rounded-2xl shadow-2xl">
            <h2
              className="text-center text-4xl tracking-wider text-[var(--black)]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              LOGIN
            </h2>
            <p className="text-[var(--secondary-text)] text-lg text-center">
              Your ultimate companion for Marvel Rivals! Find the perfect
              teammates, track player stats, and stay updated with the latest
              tips and game updates. Whether you’re strategizing for victory or
              looking to improve, Marvel Rivals Hub has everything you need to
              dominate the battlefield!
            </p>

            {/* <Form action="/" className="flex flex-col gap-3">
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
              bg-[var(--yellow)] text-[var(--black)] rounded-lg shadow-lg transition-all hover:opacity-85 cursor-pointer hover:underline"
                style={{ fontFamily: "var(--marvelFont)" }}
              >
                Login
              </button>
            </Form> */}
            <div className="flex flex-col gap-3 mx-auto w-full justify-center items-center">
              <LoginButton name="github" logo={githubLogo} />
              <LoginButton name="google" logo={googleLogo} />
            </div>
          </div>
          <div className="flex gap-3 justify-center text-[var(--secondary-text)]">
            <Link
              href={"https://marvelrivalsapi.com/"}
              rel="noopener noreferrer"
              className="ease-in-out duration-100 hover:text-[var(--yellow)]"
              target="_blank"
            >
              Developer API
            </Link>
            <Link
              href={`mailto:christophercortes@ucsb.edu?subject=Marvel%20Rivals%20Hub%20Feedback`}
              rel="noopener noreferrer"
              className="ease-in-out duration-100 hover:text-[var(--yellow)]"
              target="_blank"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/**Portrait Tablet and phone login page */}
      <section className="md:hidden flex flex-col items-center justify-between h-[100vh] w-full py-15">
        <div className="flex flex-col gap-3 items-center justify-center w-9/10">
          <h1
            className="text-center text-6xl text-[var(--white)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Marvel Rivals Hub
          </h1>

          <div className="mx-auto p-8 bg-[var(--white)] flex flex-col gap-3 rounded-2xl shadow-2xl">
            <h2
              className="text-center text-4xl tracking-wider text-[var(--black)]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              LOGIN
            </h2>
            <p className="text-[var(--secondary-text)] text-lg text-center">
              Your ultimate companion for Marvel Rivals! Find the perfect
              teammates, track player stats, and stay updated with the latest
              tips and game updates. Whether you’re strategizing for victory or
              looking to improve, Marvel Rivals Hub has everything you need to
              dominate the battlefield!
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
              bg-[var(--yellow)] text-[var(--black)] rounded-lg shadow-lg transition-all hover:opacity-85 cursor-pointer hover:underline"
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
                <LoginButton name="github" logo={githubLogo} />
                <LoginButton name="google" logo={googleLogo} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center text-[var(--secondary-text)]">
          <Link
            href={"https://marvelrivalsapi.com/"}
            rel="noopener noreferrer"
            className="ease-in-out duration-100 hover:text-[var(--yellow)]"
            target="_blank"
          >
            Developer API
          </Link>
          <Link
            href={`mailto:christophercortes@ucsb.edu?subject=Marvel%20Rivals%20Hub%20Feedback`}
            rel="noopener noreferrer"
            className="ease-in-out duration-100 hover:text-[var(--yellow)]"
            target="_blank"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default page;
