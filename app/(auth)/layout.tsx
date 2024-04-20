import React, { FunctionComponent } from "react";

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

const layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <main className={"flex justify-center items-center min-h-screen w-full"}>
      {children}
    </main>
  );
};

export default layout;
