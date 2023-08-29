"use client";

import { SafeUser } from "@/app/types";
import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";
import UserImg from "../../../public/images/user.jpg";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";

interface ListingInfoProps {
  user?: SafeUser;
  category:
    | {
        label: string;
        description: string;
        icon: IconType;
      }
    | undefined;
  description?: string;
  roomCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  locationValue?: string | undefined;
}

const Map = dynamic(() => import("../../components/inputs/Map"), {
  ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  bathroomCount,
  category,
  description,
  locationValue,
  roomCount,
  guestCount,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue as string)?.latlng;
  return (
    <div className="flex flex-col gap-5 col-span-4">
      <div className="flex flex-col">
        <div className="font-bold flex flex-row items-center gap-2 text-lg">
          Hosted by {user?.name}{" "}
          <div>
            <Image
              alt="profile"
              height={"30"}
              width={"30"}
              src={user?.image ? user?.image : UserImg}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center text-sm font-bold text-neutral-500">
          <p>{guestCount} Guests</p>
          <p>{roomCount} Rooms</p>
          <p>{bathroomCount} Bathrooms</p>
        </div>
      </div>
      <ListingCategory
        icon={category?.icon}
        label={category?.label}
        description={category?.description}
      />
      <p className="font-bold text-neutral-500">{description}</p>
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
