"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setOpenSearchModal }) => {
  return (
    <div
      onClick={() => setOpenSearchModal(true)}
      className="flex flex-row items-center justify-between sm:justify-normal gap-3 p-2 border shadow-sm rounded-full text-sm font-semibold hover:shadow-md transition cursor-pointer w-full sm:w-auto"
    >
      <div className="border-r px-2">
        <p>Anywhere</p>
      </div>
      <div className="border-r px-2 hidden sm:flex">
        <p>Any Week</p>
      </div>
      <div className="flex flex-row items-center pl-2 gap-2">
        <p className="text-gray-500 hidden md:flex">Add Guests</p>
        <div className="bg-rose-500 p-[.5rem] rounded-full text-white">
          <FiSearch />
        </div>
      </div>
    </div>
  );
};

export default Search;
