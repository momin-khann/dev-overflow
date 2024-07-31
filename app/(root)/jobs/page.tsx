import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <main className={"flex flex-1 flex-col"}>
      <div className="flex flex-col justify-center items-center flex-grow">
        <Image
          src="/assets/images/light-illustration.png"
          alt="No result illustration"
          width={270}
          height={200}
          className="block object-contain dark:hidden"
        />

        <Image
          src="/assets/images/dark-illustration.png"
          alt="No result illustration"
          width={270}
          height={200}
          className="hidden object-contain dark:flex"
        />

        <h2 className="h2-bold text-dark200_light900 mt-8">Coming Soon..</h2>
      </div>
    </main>
  );
};

export default page;
