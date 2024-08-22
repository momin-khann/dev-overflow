import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebars/LeftSidebar";
import RightSidebar from "@/components/shared/sidebars/RightSidebar";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: "%s - DevOverflow",
    default: "Home - DevOverflow",
  },
  description: "DevOverflow - Community Website for Developers",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 text-dark100_light900 relative min-h-screen">
      <NextTopLoader
        color="#FF7000"
        height={2}
        showSpinner={false}
        easing="ease-in"
      />
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex flex-1 flex-col w-full max-w-5xl px-6 pb-6 pt-32 mx-auto max-md:pb-14 sm:px-14">
          {children}
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
