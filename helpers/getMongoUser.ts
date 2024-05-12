import { auth } from "@clerk/nextjs/server";
import { getUserById, getUserId } from "@/lib/actions/user.action";

export const getMongoUserId = async () => {
  // const { userId: clerkId } =  getAuth();

  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const id = await getUserId(clerkId);

  if (!id) return null;

  return id.toString();
};

export const getMongoUser = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const user = await getUserById(clerkId);

  if (!user) return null;

  return user;
};
