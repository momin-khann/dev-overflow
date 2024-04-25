import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/helpers/timeAndNumberFormats";

interface OwnProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: string;
}

type Props = OwnProps;

const Metric: FunctionComponent<Props> = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />

      <p className={`${textStyles} flex items-center gap-1`}>
        {formatNumber(Number(value))}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={"flex-center gap-1"}>
        {metricContent}
      </Link>
    );
  }

  return <div className={"flex-center flex-wrap gap-1"}>{metricContent}</div>;
};

export default Metric;
