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
      className="lg:w-1/2 
      w-5/6 flex rounded-2xl gap-3 text-[var(--secondary-text)] justify-center items-center py-1
      border-[2px] border-[var(--secondary-text)] font-semibold ease-in-out duration-150 hover:bg-[var(--secondary-background)]"
    >
      <Image
        src={companyLogo}
        alt={`${companyName} Logo`}
        width={35}
        height={35}
      />
      <p>Login in with {companyName}</p>
    </button>
  );
};

export default LoginButton;
