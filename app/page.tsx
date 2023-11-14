"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6 justify-center items-center h-[calc(100vh-56px)]">
        <h2 className="text-4xl text-center">Post Image in simple 3 steps</h2>
        <Link
          href="/createpost"
          className="w-44 h-10 mx-auto bg-sky-100 text-sky-600 font-semibold rounded flex justify-center items-center"
        >
          <span>Create Post</span>
        </Link>
      </div>
    </>
  );
}
