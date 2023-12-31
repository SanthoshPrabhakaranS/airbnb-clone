import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getUserSession = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  //getUser
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (!currentUser) return null;

  return {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  };
};
