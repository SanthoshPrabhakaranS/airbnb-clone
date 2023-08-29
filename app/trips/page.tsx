import React from "react";
import Container from "../components/Container";
import getReservations from "../hooks/getReservations";
import { getUserSession } from "../utils/GetUserSession";
import EmptyState from "../components/empty-state/EmptyState";
import Heading from "../components/inputs/Heading";
import ListingCard from "../components/listings/ListingCard";
import ClientOnly from "../components/ClientOnly";

const Trips = async () => {
  const currentUser = await getUserSession();
  const reservation = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          heading="Unauthorized!"
          description="Looks like you have'nt logged in yet."
          button="Refresh"
        />
      </ClientOnly>
    );
  }

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          heading="No trips found!"
          description="Looks like you have'nt reserved any trips yet."
          button="Refresh"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-[5rem] flex flex-col gap-5">
          <Heading
            title="Trips"
            desc="Where you've been and where you're going"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-8">
            {reservation.map((item: any, Idx) => {
              return (
                <ListingCard
                  key={Idx}
                  currentUser={currentUser}
                  data={item.listing}
                  reservation={item}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Trips;
