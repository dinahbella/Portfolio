import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { ModeToggle } from "./Mode";
import { HiMenuAlt3 } from "react-icons/hi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  return (
    <div>
      <Head>
        <title>Dinah - Your Website</title>
        <meta name="description" content="Welcome to Dinah's website" />
      </Head>

      {/* Header with Gradient Background */}
      <header className="relative p-5 shadow-xl bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-800">
        {/* Mask (Semi-Transparent Overlay) */}
        <div className="absolute inset-0 bg-black/20 dark:bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-800 "></div>

        {/* Header Content */}
        <div className="relative z-10 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <h1 className="font-bold text-2xl text-blue-100 dark:text-gray-100">
            Dinah
          </h1>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            className="text-right md:hidden text-2xl text-white hover:text-blue-200 dark:hover:text-blue-300 focus:outline-none transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <HiMenuAlt3 />}
          </button>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center gap-5 absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-r from-blue-600 via-teal-500 to-indigo-800 md:bg-transparent p-5 md:p-0 shadow-lg md:shadow-none rounded-lg md:rounded-none transition-all duration-300 ease-in-out`}
          >
            <Link
              href="/"
              className="block font-bold text-xl text-white hover:underline p-3 transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block font-bold text-xl text-white hover:underline p-3 transition-all duration-300 hover:scale-105"
            >
              Projects
            </Link>
            <Link
              href="/photos"
              className="block font-bold text-xl text-white hover:underline p-3 transition-all duration-300 hover:scale-105"
            >
              Photos
            </Link>
            <Link
              href="/about"
              className="block font-bold text-xl text-white hover:underline p-3 transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
            <Link
              href="/contacts"
              className="block font-bold text-xl text-white hover:underline p-3  transition-all duration-300 hover:scale-105"
            >
              Contacts
            </Link>
          </nav>

          {/* Search Icon */}
          <ModeToggle className="hidden md:block text-2xl text-white cursor-pointer hover:text-blue-200 dark:hover:text-blue-300 transition-all duration-300" />
        </div>
      </header>
    </div>
  );
}
