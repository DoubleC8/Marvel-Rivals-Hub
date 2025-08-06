"use client";

import React from "react";
import Image from "next/image";
import { login } from "@/lib/actions";

const LoginButton = ({ name, logo }: { name: string; logo: string }) => {
  const companyName = name;
  const companyLogo = logo;

  return (
    <button
      onClick={() => login({ name: companyName })}
      className="bg-[var(--secondary-background)] p-1 rounded-2xl border-[2px] border-[var(--border)] hover:opacity-85"
    >
      <Image
        src={companyLogo}
        alt={`${companyName} Logo`}
        width={45}
        height={45}
      />
    </button>
  );
};

export default LoginButton;
