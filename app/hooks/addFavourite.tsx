"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { SafeUser } from "../types";

interface HeartButtonProps {
  listingId?: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const router = useRouter();

  //Cheking if the listing is favourited
  const isFavourited = (id: any) => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(id);
  };

  //Toggling favourite
  const { mutate } = useMutation({
    mutationKey: ["addFavourite", listingId],
    mutationFn: async (id) => {
      if (!currentUser)
        return toast.error("You must be logged in to add a favourite");
      try {
        await axios.post(`/api/favourites/${id}`);
        toast.success("Success");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  const _addFavourite = async (
    id: any,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    if (!currentUser) return toast.error("You must be logged in!");
    mutate(id);
  };
  return (
    <div
      onClick={(e) => _addFavourite(listingId, e)}
      className="absolute right-2 top-2 z-10 cursor-pointer"
    >
      {isFavourited(listingId) ? (
        <AiFillHeart size="28" className="fill-rose-500" />
      ) : (
        <AiOutlineHeart size="28" className="fill-white" />
      )}
    </div>
  );
};

export default HeartButton;
