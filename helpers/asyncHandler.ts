import { connectDB } from "@/lib/connectDB";

export const asyncHandler = (fn: any) => {
  return async function (params?: any) {
    try {
      await connectDB();

      if (!params) return await fn();

      return await fn(params);
    } catch (error: any) {
      console.error("error -> ", error.message);
    }
  };
};
