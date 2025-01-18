"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Hero from "@/components/chatbot.jsx";
import Navbar from "@/components/Navbar"; // Import Navbar component

const ClientPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      {/* Navbar */}
      <Navbar userId={user.id} />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center text-center px-4">
        {/* Animated Welcome Message */}
        <div
          className={`${
            showWelcome
              ? "translate-y-0 opacity-100"
              : "-translate-y-32 opacity-0"
          } transform transition-all duration-1000 ease-in-out bg-opacity-40 bg-black p-8 rounded-xl shadow-2xl`}
        >
          <h2 className="text-4xl font-bold mb-4">
            Welcome, {user.firstName}, to Clerk!!
          </h2>
        </div>
      </main>

      {/* Chatbot */}
      <Hero />

      {/* Placeholder for additional content */}
      {!showWelcome && (
        <div className="flex flex-col items-center justify-center text-center px-4 mt-8">
          <p className="text-xl">Explore your dashboard below!</p>
        </div>
      )}
    </div>
  );
};

export default ClientPage;