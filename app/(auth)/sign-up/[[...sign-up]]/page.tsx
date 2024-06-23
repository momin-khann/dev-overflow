import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp - DevOverflow"
}

export default function Page() {
  return <SignUp path="/sign-up" />;
}
