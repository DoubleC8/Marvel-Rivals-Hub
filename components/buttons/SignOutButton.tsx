"use client";

import { logout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import React from "react";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => logout()}
      className="flex gap-1 font-extralight tracking-wider"
    >
      <p className="tracking-wider text-[var(--white)]">Sign Out</p>
      <LogOut color="var(--white)" />
    </button>
  );
};
export default SignOutButton;
