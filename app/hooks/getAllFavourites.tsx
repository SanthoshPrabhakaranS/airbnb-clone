import prisma from "@/app/libs/prismadb";
import { getUserSession } from "../utils/GetUserSession";

export default async function getAllFavourites() {
  const currentUser = await getUserSession();

  if (!currentUser) {
    return [];
  }

  const favourites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...(currentUser.favouriteIds || [])],
      },
    },
  });

  const safeFavourites = favourites.map((favourite) => ({
    ...favourite,
    createdAt: favourite.createdAt.toISOString(),
  }));

  return safeFavourites;
}
