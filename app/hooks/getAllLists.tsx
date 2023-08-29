import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  searchGuestCount?: number;
  searchRoomCount?: number;
  searchBathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const getAllListings = async (params: IListingsParams) => {
  try {
    const {
      userId,
      category,
      endDate,
      locationValue,
      searchBathroomCount,
      searchGuestCount,
      searchRoomCount,
      startDate,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (searchRoomCount) {
      query.roomCount = {
        gte: +searchRoomCount,
      };
    }

    if (searchBathroomCount) {
      query.bathroomCount = {
        gte: +searchBathroomCount,
      };
    }

    if (searchGuestCount) {
      query.guestCount = {
        gte: +searchGuestCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};
