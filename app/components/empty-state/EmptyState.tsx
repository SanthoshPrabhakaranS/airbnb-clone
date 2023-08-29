"use client";

import React from "react";
import Container from "../Container";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  heading: string;
  description: string;
  button: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({heading, description, button}) => {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col items-center justify-center pt-[15rem] font-semibold">
        <h1 className="text-lg">{heading}</h1>
        <p className="text-neutral-500">
          {description}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-2 p-3 border-2 rounded-md border-neutral-600 font-medium hover:scale-105 transition"
        >
          {button}
        </button>
      </div>
    </Container>
  );
};

export default EmptyState;
