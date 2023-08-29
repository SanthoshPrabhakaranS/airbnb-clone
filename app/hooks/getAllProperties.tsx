import prisma from "@/app/libs/prismadb";
import { getUserSession } from "../utils/GetUserSession";
export const getAllProperties = async () => {
  const currentUser = await getUserSession();

  if (!currentUser) {
    return [];
  }

  const listings = await prisma.listing.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return safeListings;
};
