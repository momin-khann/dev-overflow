import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const Spinner = () => {
  return (
    <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
  );
};
export default Spinner;
