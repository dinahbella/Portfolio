import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { ModeToggle } from "./Mode";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/photos", label: "Photos" },
    { href: "/services", label: "Services" },
    { href: "/contacts", label: "Contacts" },
  ];

  return (
    <>
      <Head>
        <title>Dinah - Your Website</title>
        <meta name="description" content="Welcome to Dinah's website" />
      </Head>

      <header className="sticky top-0 z-50 w-full p-6 shadow-lg bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-800 ">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
              Dinah
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium text-white hover:text-blue-200 transition-colors ${
                  isActive(item.href)
                    ? "underline underline-offset-4 decoration-2"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden md:block text-white hover:bg-white/10 font-medium px-6 py-2 rounded-full transition-colors"
              >
                Admin
              </Button>
            </Link>

            <ModeToggle className="hidden md:block text-white hover:text-blue-200" />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-b from-blue-600 to-indigo-800 shadow-lg">
            <nav className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-white/10 underline underline-offset-4 decoration-2"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 py-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 font-medium px-6 py-2 rounded-full transition-colors"
                  >
                    Admin
                  </Button>
                </Link>
                <ModeToggle className="text-white hover:text-blue-200" />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
