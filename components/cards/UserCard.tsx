import React, { FunctionComponent } from "react";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import { Badge } from "@/components/ui/badge";
import { TagType, UserType } from "@/types";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tags.action";

interface OwnProps {
  user: UserType;
}

type Props = OwnProps;

const UserCard: FunctionComponent<Props> = async ({ user }) => {
  const interactedTags: Array<TagType> = await getTopInteractedTags(user._id);

  return (
    user && (
      <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[240px]">
        <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-6">
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />

          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <Link
              href={`/profile/${user.clerkId}`}
              className="body-regular text-dark500_light500 mt-2"
            >
              @{user.username ?? user.email}
            </Link>
          </div>

          <div className="mt-5">
            {interactedTags.length > 0 ? (
              <div className="flex items-center gap-2">
                {interactedTags.map((tag: TagType) => (
                  <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                ))}
              </div>
            ) : (
              <Badge>No tags yet</Badge>
            )}
          </div>
        </article>
      </div>
    )
  );
};

export default UserCard;
