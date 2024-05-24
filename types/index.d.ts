import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface QuestionType {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: Array<string>;
  views: number;
  answers: object[];
  createdAt: Date;
}

export interface AnswerType {
  _id: string;
  question: object;
  answer: string;
  author: Partial<UserType>;
  upvotes?: Array<string>;
  downvotes?: Array<string>;
  createdAt?: Date;
}

export interface UserType {
  _id: string;
  clerkId: string;
  picture: string;
  name: string;
  username: string;
  email?: string;
}

export interface TagType {
  _id: string;
  name: string;
  description?: string;
  questions?: object[];
  followers?: object[];
  createdOn?: Date;
}

export interface JobType {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

export interface CountryType {
  name: {
    common: string;
  };
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
