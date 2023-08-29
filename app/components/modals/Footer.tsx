"use client"

import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="flex flex-col gap-2 mt-1">
      <button
        onClick={() => signIn("google")}
        className="p-3 w-full border-2 border-black font-semibold rounded-md flex flex-row items-center justify-center relative"
      >
        <span className="absolute left-3">
          <FcGoogle size="25" />
        </span>
        Continue with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="p-3 w-full border-2 border-black font-semibold rounded-md flex flex-row items-center justify-center relative"
      >
        <span className="absolute left-3">
          <FcGoogle size="25" />
        </span>
        Continue with Github
      </button>
    </div>
  );
};

export default Footer;
