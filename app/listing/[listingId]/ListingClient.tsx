"use client";

import Container from "@/app/components/Container";
import HeartButton from "@/app/hooks/addFavourite";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import ListingInfo from "./ListingInfo";
import { categoryList } from "@/app/components/navbar/Categories";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

interface ListingClientProps {
  listing:
    | (SafeListing & {
        user: SafeUser;
      })
    | null;
  reservations?: any[];
  currentUser?: SafeUser | null;
}

//initial date range
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing?.locationValue as string);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const category = useMemo(() => {
    return categoryList.find((item) => item.label === listing?.category);
  }, [listing?.category]);

  //disabled dates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  //adding Reservation
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createReservation"],
    mutationFn: async () => {
      await axios.post("/api/reservations", {
        listingId: listing?.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      });
    },
    onSuccess: () => {
      toast.success("Reservation Created!");
      setDateRange(initialDateRange);
      router.refresh();
      router.push("/trips")
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onCreateReservation = () => {
    if (!currentUser) return toast.error("You must be logged in!");
    mutate();
  };

  //calculating total price
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (daysCount && listing?.price) {
        setTotalPrice(daysCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  return (
    <Container>
      <div className="py-5 max-w-screen-xl w-full mx-auto flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-extrabold">
            {listing?.title}, {listing?.category}
          </h1>
          <p className="font-bold text-neutral-500">
            {location?.region}, {location?.label}
          </p>
        </div>
        <div className="h-[60vh] overflow-hidden rounded-xl relative">
          <Image
            alt="listing-image"
            src={listing?.imageSrc as string}
            height={"800"}
            width={"800"}
            className="h-full w-full"
          />
          <HeartButton listingId={listing?.id} currentUser={currentUser} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <ListingInfo
            user={listing?.user}
            category={category}
            description={listing?.description}
            roomCount={listing?.roomCount}
            bathroomCount={listing?.bathroomCount}
            guestCount={listing?.guestCount}
            locationValue={listing?.locationValue}
          />
          <div className="col-span-3">
            <ListingReservation
              price={listing?.price}
              totalPrice={totalPrice}
              dateRange={dateRange}
              onChangeDate={(value: any) => setDateRange(value)}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
