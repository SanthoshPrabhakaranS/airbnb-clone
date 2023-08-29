import { getUserSession } from "@/app/utils/GetUserSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getUserSession();
  const { reservationId } = params;

  if (!currentUser) return NextResponse.error();

  const reservation = await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  return NextResponse.json(reservation);
}
