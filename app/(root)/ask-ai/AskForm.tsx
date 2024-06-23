"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

const AskForm = () => {
  const { debounceValue, setDebounceValue } = useDebounce("", 400);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");

  async function handleQuery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setDebounceValue(event.target.value);
    console.log(input.trim());
  }

  return (
    <main className="flex-1 flex flex-col">
      {/* search bar for AI */}
      <form
        onSubmit={handleQuery}
        className="flex justify-between gap-5 max-sm:flex-col sm:items-center"
      >
        <div className="background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 flex-1">
          <Image
            src={"/assets/icons/search.svg"}
            alt="search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />

          <Input
            type="text"
            placeholder={"Ask AI"}
            name={"ask"}
            onChange={(e) => setInput(e.target.value)}
            className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
          />
        </div>

        <Button
          type={"submit"}
          className="primary-gradient min-h-[46px] px-6 py-3 text-xl !text-light-900"
        >
          Ask
        </Button>
      </form>

      {!data && <NoData />}
    </main>
  );
};
export default AskForm;

function NoData() {
  return (
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

      <h2 className="h2-bold text-dark200_light900 mt-8">Ask From AI</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        Ask a Question❓ or any Query and kickstart the discussion.
      </p>
    </div>
  );
}
