"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="w-full max-w-[1800px] mx-auto px-3 md:px-10">{children}</div>;
};

export default Container;
