import { getIndividualListing } from "@/app/hooks/getIndividualListing";
import React from "react";
import ListingClient from "./ListingClient";
import { getUserSession } from "@/app/utils/GetUserSession";
import getReservations from "@/app/hooks/getReservations";

interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getIndividualListing(params);
  const currentUser = await getUserSession();
  const reservations = await getReservations(params);
  return (
    <div className="pt-[4.5rem]">
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default ListingPage;
