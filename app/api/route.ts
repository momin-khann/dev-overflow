import { connectDB } from "@/lib/connectDB";

export async function GET(): Promise<Response> {
  await connectDB();

  return Response.json({ message: "Api running..." });
}
