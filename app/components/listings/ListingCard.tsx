"use client";

import HeartButton from "@/app/hooks/addFavourite";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface ListingCardProps {
  data: SafeListing;
  currentUser: SafeUser | null;
  reservation?: SafeReservation;
  properties?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  properties,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(data?.locationValue);
  const router = useRouter();

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  //cancel reservation
  const { mutate } = useMutation({
    mutationKey: ["cancelReservation"],
    mutationFn: async (id: string | undefined) => {
      await axios.delete(`/api/reservations/${id}`);
    },
    onSuccess: () => {
      toast.success("Reservation cancelled!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const _cancelReservation = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      mutate(reservation?.id);
    },
    [reservation?.id, mutate]
  );

  //Delete property
  const { mutate: deleteProperty } = useMutation({
    mutationKey: ["deleteProperty"],
    mutationFn: async (id: string | undefined) => {
      await axios.delete(`/api/listings/${id}`);
    },
    onSuccess: () => {
      toast.success("Property deleted!");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const _deleteProperty = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      deleteProperty(data?.id);
    },
    [data?.id]
  );

  return (
    <div
      onClick={() => router.push(`/listing/${data?.id}`)}
      className="col-span-1 flex flex-col gap-1 cursor-pointer overflow-hidden rounded-xl relative"
    >
      <HeartButton listingId={data?.id} currentUser={currentUser} />
      <div>
        <Image
          src={data?.imageSrc}
          alt="image"
          width={"300"}
          height={"300"}
          className="w-full h-[230px] object-cover rounded-xl transition duration-500 hover:scale-105"
        />
      </div>
      <p className="font-bold">
        {location?.region}, {location?.label}
      </p>
      <p
        className={`${
          reservationDate ? "text-[.8rem]" : "text-sm"
        } font-bold text-neutral-500`}
      >
        {reservationDate || data?.category}
      </p>
      <p className="font-bold">
        ${reservation?.totalPrice ? reservation?.totalPrice : data?.price}{" "}
        <span className="text-neutral-500 text-sm">
          {reservation ? "" : "/ night"}
        </span>{" "}
      </p>
      {reservation ? (
        <button
          onClick={(e) => _cancelReservation(e)}
          className="p-1 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-500/80 transition"
        >
          Cancel
        </button>
      ) : null}
      {properties ? (
        <button
          onClick={(e) => _deleteProperty(e)}
          className="p-1 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-500/80 transition"
        >
          Delete property
        </button>
      ) : null}
    </div>
  );
};

export default ListingCard;
