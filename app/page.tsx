import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/empty-state/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { IListingsParams, getAllListings } from "./hooks/getAllLists";
import { getUserSession } from "./utils/GetUserSession";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getAllListings(searchParams);
  const currentUser = await getUserSession();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          heading={"No match found!"}
          description={"Try changing or removing some of your filters"}
          button={"Remove filters"}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-8 pt-[11rem]">
          {listings?.map((item: any) => {
            return (
              <ListingCard
                key={item.id}
                data={item}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
