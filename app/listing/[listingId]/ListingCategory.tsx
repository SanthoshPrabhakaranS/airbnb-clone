"use client";

import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType | any;
  label: string | undefined;
  description: string | undefined;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  description,
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Icon size={"38"} />
      <div className="font-bold">
        <p>{label}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
