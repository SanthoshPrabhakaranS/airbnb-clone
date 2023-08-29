"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { use, useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  icon: IconType;
  description: string;
  selected: Boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  description,
  icon: Icon,
  label,
  selected,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleClick = useCallback(() => {
    const currentQuery = params ? Object.fromEntries(params.entries()) : {};

    const updatedQuery = { ...currentQuery };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    } else {
      updatedQuery.category = label;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col gap-1 justify-center items-center hover:text-neutral-800 cursor-pointer transition p-1 ${
        selected ? "border-b-neutral-800 border-b-2" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500 "}`}
    >
      <Icon size={"26"} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default CategoryItem;
