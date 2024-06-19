import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const Spinner = () => {
  return (
    <div className={"mx-auto"}>
      <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
    </div>
  );
};
export default Spinner;
