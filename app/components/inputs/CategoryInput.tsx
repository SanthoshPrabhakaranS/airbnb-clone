"use client"

import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-2 ${selected ? "border-neutral-700" : "border-neutral-300"}  border p-3 rounded-md cursor-pointer transition`}
    >
      <Icon size="30" />
      <p>{label}</p>
    </div>
  );
};

export default CategoryInput;
