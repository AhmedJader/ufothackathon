import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = ({ userId }: { userId: string | null }) => {
  return (
    <div className="bg-blue-600 rounded-b-xl text-white navbar-container"> {/* Added max-width */}
      <ul className="flex justify-between py-2 px-4 text-sm items-center w-full">
        {/* Left Section */}
        <div>
          <Link href="/">
            <li className="hover:underline">Home</li>
          </Link>
        </div>

        {/* Center Section */}
        <div>
          <Link href="/client">
            <li className="hover:underline">Client Page</li>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          {!userId ? (
            <>
              <Link href="/sign-in">
                <li className="hover:underline">Login</li>
              </Link>
              <Link href="/sign-up">
                <li className="hover:underline">Sign Up</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <li className="hover:underline">Profile</li>
              </Link>
              <li>
                <UserButton />
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
