import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "@/components/shared/navbar/MobileNav";
import GlobalSearch from "@/components/shared/search/GlobalSearch";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

const Navbar = () => {
  const { sessionId } = auth();

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 px-6 py-3.5 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={20}
          height={20}
          alt="DevFlow"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />

        {sessionId ? (
          <SignedIn>
            <UserButton
              afterSignOutUrl={"/"}
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
                variables: {
                  colorPrimary: "#ff7000",
                },
              }}
            />
          </SignedIn>
        ) : (
          <Link href="/sign-in" className="flex justify-end max-sm:w-full">
            <Button className="primary-gradient min-h-[46px] px-4 py-3 font-semibold !text-light-900">
              Sign In
            </Button>
          </Link>
        )}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
