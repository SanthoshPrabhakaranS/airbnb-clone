import React from "react";
import Container from "../components/Container";
import getReservations from "../hooks/getReservations";
import { getUserSession } from "../utils/GetUserSession";
import EmptyState from "../components/empty-state/EmptyState";
import Heading from "../components/inputs/Heading";
import ListingCard from "../components/listings/ListingCard";
import { getAllProperties } from "../hooks/getAllProperties";
import ClientOnly from "../components/ClientOnly";

const Trips = async () => {
  const properties = await getAllProperties();
  const currentUser = await getUserSession();

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

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          heading="No properties found!"
          description="Looks like you have'nt created any properties yet."
          button="Refresh"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-[5rem] flex flex-col gap-5">
          <Heading title="Properties" desc="List of your properties" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-8">
            {properties.map((item: any, Idx) => {
              return (
                <ListingCard
                  key={Idx}
                  currentUser={currentUser}
                  data={item}
                  properties={"properties"}
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
