"use client";

import { login } from "@/lib/actions";
import Image from "next/image";

const GitHubLoginButton = () => {
  const githubLogo = "/images/github-mark.svg";

  return (
    <button
      onClick={() => login()}
      className="bg-[var(--yellow)] p-1 rounded-2xl border-[2px] border-[var(--border)] hover:opacity-85"
    >
      <Image src={githubLogo} alt="Github Logo" width={45} height={45} />
    </button>
  );
};

export default GitHubLoginButton;
