import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = ({ userId }: { userId: string | null }) => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-700 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
        {/* Left Section: Branding */}
        <h1 className="text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform">
          MyBank
        </h1>

        {/* Center Section: Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            href="/"
            className="text-white text-lg font-medium hover:text-indigo-300 hover:underline transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/client"
            className="text-white text-lg font-medium hover:text-indigo-300 hover:underline transition duration-200"
          >
            Client Page
          </Link>
          <Link
            href="/profile"
            className="text-white text-lg font-medium hover:text-indigo-300 hover:underline transition duration-200"
          >
            Profile
          </Link>
        </nav>

        {/* Right Section: User Authentication */}
        <div className="flex gap-4 items-center">
          {!userId ? (
            <>
              <Link
                href="/sign-in"
                className="text-white text-lg font-medium hover:text-indigo-300 hover:underline transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="text-white text-lg font-medium hover:text-indigo-300 hover:underline transition duration-200"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
