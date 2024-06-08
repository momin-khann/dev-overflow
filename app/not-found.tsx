import Link from "next/link";

function NotFound() {
  return (
    <main className="background-light850_dark100 text-dark100_light900 h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-black text-primary-800 px-6 my-12 text-lg border border-light850_dark100 rounded-lg py-2"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
