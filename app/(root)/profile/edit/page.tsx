import React from "react";
import Profile from "@/components/forms/Profile";
import { getMongoUser } from "@/helpers/getMongoUser";

export async function generateMetadata() {
  const { name } = await getMongoUser();
  return { title: `Edit ${name.split(" ")[0]}'s Profile` };
}

const Page = async () => {
  const mongoUser = await getMongoUser();
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile
          userId={mongoUser?._id.toString()}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </div>
  );
};
export default Page;
