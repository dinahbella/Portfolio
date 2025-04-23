import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { ModeToggle } from "./Mode";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import Image from "next/image";

const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlnsXodm="http://www.corel.com/coreldraw/odm/2003"
    xmlSpace="preserve"
    width="0.411642in"
    height="0.719429in"
    viewBox="0 0 31.84 55.65"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    {...props}
  >
    <style>{`.svg-icon { fill: currentColor; }`}</style>
    <path
      className="svg-icon"
      d="M3.98 6.04c0.72,1.27 -1.2,10.78 -1.65,12.83 -3.2,14.63 -4.4,3.67 5.15,22.03 0.97,1.86 1.83,3.42 2.64,5.33 0.38,0.9 0.76,1.77 1.12,2.81l0.83 2.31c0.49,1 0.25,0.56 0.66,1.06 0.07,-4.42 0.63,-18.2 0.01,-21.7 -0.55,-3.11 -1.58,-0.67 -2.18,-3.55 -0.83,-3.99 5.01,-4.62 5.34,-0.89 0.2,2.25 -1.05,2.49 -2.3,3.46l0.7 21.14c0.23,-0.44 0.31,-0.67 0.49,-1.14 2.62,-6.69 3.45,-8.06 7.28,-14.6 0.96,-1.63 4.35,-6.23 4.25,-7.74 -0.01,-0.1 -2.38,-8.71 -2.68,-9.61 -3.42,-1.94 -7.07,-2.7 -10.54,-4.88 -1.81,-1.14 -3.11,-2.12 -4.59,-3.38 -5.8,-4.96 5.1,-7.49 8.36,-7.57 5.5,-0.13 9.35,1.96 12.04,4.88 -0.99,1.09 -3.99,3.28 -5.36,3.57 0.38,-2.18 0.31,-3.77 -0.81,-5.45 -0.76,-1.14 -2.66,-2.1 -4.75,-1.99 -7.76,0.42 -7.12,14.91 5.99,9.69 2.46,-0.98 7.08,-3.73 7.86,-6.22 -2.27,-1.54 -2.49,-2.89 -5.6,-4.49 -6.26,-3.23 -19.04,-2.79 -22.27,4.1z"
    />
    <circle className="svg-icon str0" cx="13.73" cy="54.3" r="1.1" />
  </svg>
);

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
    { href: "/photos", label: "Photos" },
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
        <div className="container mx-auto px-2 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/home"
            className="text-2xl font-extrabold text-white hover:text-blue-200 transition"
          >
            <SvgIcon className="w-8 h-8 inline-block mr-2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center md:gap-4 lg:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white font-medium transition-colors hover:text-blue-200 ${
                  isActive(item.href)
                    ? "underline underline-offset-4 decoration-2"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-1">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden md:inline-block text-white hover:bg-white/10 rounded-full px-5 py-2 font-medium transition"
              >
                Admin
              </Button>
            </Link>

            <ModeToggle className="hidden md:block text-white" />

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FaTimes /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-800 to-indigo-900 px-4 py-6 space-y-4 shadow-xl transition-all duration-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-white text-lg font-medium px-3 py-2 rounded-lg transition-all ${
                  isActive(item.href)
                    ? "bg-white/10 underline underline-offset-4 decoration-2"
                    : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center justify-between mt-4">
              <Button variant="outline">
                <Link
                  href="/login"
                  className="text-white font-mono hover:bg-white/20 px-6 py-2 rounded-full transition"
                >
                  Admin
                </Link>
              </Button>
              <ModeToggle className="text-white" />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
