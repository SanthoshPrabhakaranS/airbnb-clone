import React from "react";
import Container from "../components/Container";
import { getUserSession } from "../utils/GetUserSession";
import EmptyState from "../components/empty-state/EmptyState";
import getAllFavourites from "../hooks/getAllFavourites";
import Heading from "../components/inputs/Heading";
import ListingCard from "../components/listings/ListingCard";
import ClientOnly from "../components/ClientOnly";

const Favourites = async () => {
  const currentUser = await getUserSession();
  const favourites = await getAllFavourites();

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

  if (favourites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          heading="No favourites found!"
          description="Looks like you have'nt favourited any property yet."
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
            title="Favourites"
            desc="List of places you have favourited"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-8">
            {favourites.map((item: any, Idx) => {
              return (
                <ListingCard key={Idx} currentUser={currentUser} data={item} />
              );
            })}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Favourites;
