import { getUserSession } from "@/app/utils/GetUserSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getUserSession();

  const { listingId } = params;

  if (!currentUser) return NextResponse.error();

  const listing = await prisma.listing.delete({
    where: {
      id: listingId,
    },
  });

  return NextResponse.json(listing);
}
