"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full h-14 shadow-lg px-3 flex items-center justify-between bg-[#16181c]">
      <Link href="/" className="text-sky-700 font-semibold text-xl">
        FriendForge
      </Link>
      <ul className="flex gap-x-16 text-white">
        <li>
          <Link href="/yourpost">Your Post</Link>
        </li>
        <li>
          <Link href="/allpost">All Post</Link>
        </li>
      </ul>
      <UserButton />
    </header>
  );
};

export default Header;
