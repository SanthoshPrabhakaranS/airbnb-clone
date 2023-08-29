import { getUserSession } from "@/app/utils/GetUserSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { el } from "date-fns/locale";

interface ParamsId {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: ParamsId }) {
  const currentUser = await getUserSession();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId) throw new Error("Invalid ID");

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  if (favouriteIds.includes(listingId)) {
    favouriteIds = favouriteIds.filter((id) => id !== listingId);
  } else {
    favouriteIds.push(listingId);
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}