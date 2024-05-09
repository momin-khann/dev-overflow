import React from "react";
import { getMongoUser } from "@/helpers/getMongoUser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import ProfileLink from "@/components/shared/ProfileLink";
import { getJoinedDate, getTimestamp } from "@/helpers/sanitizer";
import { auth } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Stats from "@/components/shared/Stats";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswersTab from "@/components/shared/AnswerTab";

const Page = async () => {
  const user = await getMongoUser();
  const { userId: clerkId } = auth();

  return (
    <main>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @ {user.username ?? user.email}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats totalQuestions={10} totalAnswers={3} />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              // searchParams={""}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              // searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default Page;
