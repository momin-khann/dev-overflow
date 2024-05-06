import { auth } from "@clerk/nextjs/server";
import { getUserId } from "@/lib/actions/user.action";

export const getMongoUserId = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const id = await getUserId(clerkId);

  if (!id) return null;

  return id.toString();
};
