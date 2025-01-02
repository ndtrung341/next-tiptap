import Image from "next/image";
import React from "react";
import { LuCalendarDays, LuClock } from "react-icons/lu";

interface PostHeaderProps {
  title: string;
  cover: string;
  author: string;
  createdAt: string;
  readingTime: number;
}

const PostHeader = ({ title, author, cover, createdAt, readingTime }: PostHeaderProps) => {
  return (
    <div className="lg:max-w-[45rem] mx-auto">
      <h1 className="text-3xl leading-snug md:text-4xl md:leading-normal font-bold">{title}</h1>

      <div className="flex items-center mt-6 gap-4">
        <Image src={"/avatar.jpg"} width={50} height={50} alt="" className="rounded-full" />
        <div className="">
          <div className="font-semibold mb-3">
            By <u>{author}</u>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 text-sm">
              <LuCalendarDays size={18} />
              <span>{createdAt}</span>
            </div>
            <div className="h-1.5 w-1.5 mx-3 rounded-full bg-gray-500 dark:bg-gray-300"></div>
            <div className="flex items-center gap-2 text-sm">
              <LuClock size={18} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={cover}
        alt={title}
        width={1932}
        height={1087}
        className="my-10 rounded-lg"
        priority
      />
    </div>
  );
};

export default PostHeader;
