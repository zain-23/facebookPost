"use client";
import MyContext from "@/utils/context/createContext";
import { useUser } from "@clerk/nextjs";
import { useContext, useState } from "react";

const ShowPost = () => {
  const [like, setLike] = useState(false);
  const { user, postData }: any = useContext(MyContext);
  return (
    <div className="max-w-lg shadow-2xl rounded-md mx-auto my-20 ">
      <div className="w-full flex justify-between px-2 py-2">
        <div className="flex items-center gap-x-2">
          <div
            className="w-9 h-9 rounded-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${user?.imageUrl})` }}
          ></div>
          <h2 className="text-sm font-semibold">{user?.fullName}</h2>
        </div>
        <div className="flex items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className="text-sm">{postData?.description}</p>
      </div>
      <img src={postData?.imgage} className="w-full" alt="" />
      <div className="px-2 py-2">
        <div className="grid grid-cols-2">
          <button
            className={`flex items-center col-span-1 gap-x-2 hover:bg-slate-200 rounded justify-center py-1 ${
              like ? "text-[#0866ff]" : "text-[#65676b]"
            }`}
            onClick={() => setLike(!like)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 ${like ? "scale-125" : ""}`}
            >
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
            <span className="font-semibold">Like</span>
          </button>
          <button className="flex items-center col-span-1 gap-x-2 hover:bg-slate-200 rounded justify-center py-1 text-[#65676b]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            <span className="font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
