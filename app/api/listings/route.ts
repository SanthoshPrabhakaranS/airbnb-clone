import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getUserSession } from "@/app/utils/GetUserSession";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getUserSession();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    title,
    description,
    price,
    location,
    category,
    imageSrc,
    roomCount,
    guestCount,
    bathroomCount,
  } = body;

  const newListing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      locationValue: location.value,
      category,
      imageSrc,
      roomCount,
      guestCount,
      bathroomCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newListing);
}
