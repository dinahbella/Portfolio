import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { ModeToggle } from "./Mode";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { InkisionLogo } from "./Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  useEffect(() => {
    const closeMenuOnRouteChange = () => setIsMenuOpen(false);
    router.events.on("routeChangeComplete", closeMenuOnRouteChange);
    return () =>
      router.events.off("routeChangeComplete", closeMenuOnRouteChange);
  }, [router]);

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/photos", label: "Covers" },
    { href: "/services", label: "Services" },
    { href: "/contacts", label: "Contacts" },
    { href: "/referral", label: "Referral" },
  ];

  return (
    <>
      <Head>
        <title>Dinah - Your Website</title>
        <meta name="description" content="Welcome to Dinah's website" />
      </Head>

      <header className="sticky top-0 z-50 w-full backdrop-blur bg-gradient-to-r from-indigo-800 via-teal-700 to-blue-900 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 text-white">
            <div className="w-32 md:w-48">
              <InkisionLogo />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white font-medium hover:text-blue-200 transition-colors ${
                  isActive(item.href)
                    ? "underline underline-offset-4 decoration-2"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden md:inline-block text-white hover:bg-white/10 px-5 py-2 font-medium rounded-full"
              >
                Admin
              </Button>
            </Link>

            <ModeToggle className="hidden md:block text-white" />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FaTimes /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-800 to-indigo-900 px-4 py-6 space-y-4 transition-all duration-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-white text-lg font-medium px-3 py-2 rounded-lg transition ${
                  isActive(item.href)
                    ? "bg-white/10 underline underline-offset-4 decoration-2"
                    : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center justify-between mt-6">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white px-6 py-2 rounded-full hover:bg-white/20 transition"
                >
                  Admin
                </Button>
              </Link>
              <ModeToggle className="text-white" />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
