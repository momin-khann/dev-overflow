import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebars/LeftSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 text-dark100_light900 relative min-h-screen">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RightSidebar
      </div>
    </main>
  );
};

export default Layout;
