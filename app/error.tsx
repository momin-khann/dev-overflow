"use client";
/*
 * !! Imp Note: Error Boundaries are always client components
 * */

import Link from "next/link";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return (
    <main className="background-light850_dark100 text-dark100_light900 h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <Link
        className="inline-block bg-accent-500 text-primary-800 px-6 border border-light850_dark100 rounded-lg py-2"
        href={"/"}
      >
        Try again
      </Link>
    </main>
  );
}
