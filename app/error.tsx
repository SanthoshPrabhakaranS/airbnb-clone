"use client";

import { error } from "@material-tailwind/react/types/components/input";
import React, { useEffect } from "react";
import EmptyState from "./components/empty-state/EmptyState";

interface ErrorStateProps {
  error: error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <EmptyState
      heading="Uh Oh"
      description="Something went wrong!"
      button="Refresh"
    />
  );
};

export default ErrorState;
