"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ChildrenProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
