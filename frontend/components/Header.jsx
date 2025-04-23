import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { ModeToggle } from "./Mode";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import Image from "next/image";

const InkisionLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlnsXodm="http://www.corel.com/coreldraw/odm/2003"
    xmlSpace="preserve"
    width="1.32in"
    height="0.419429in"
    version="1.1"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 2520.01 719.43"
  >
    <defs>
      <style>
        {`
          @font-face {
            font-family: "Arial";
            font-variant: normal;
            font-style: normal;
            font-weight: normal;
            src: url("#FontID0") format(svg);
          }
          .str0 {
            stroke: black;
            stroke-width: 6.67;
            stroke-miterlimit: 2.61313;
          }
          .fil0 {
            fill: white;
          }
          .fnt0 {
            font-weight: normal;
            font-size: 649.9px;
            font-family: 'Arial';
          }
        `}
      </style>
    </defs>
    <g id="Layer_x0020_1">
      <text x="-60.44" y="643.71" className="fil0 fnt0">
        I
      </text>
      <text x="120.13" y="643.71" className="fil0 fnt0">
        n
      </text>
      <text x="481.58" y="643.71" className="fil0 fnt0">
        k
      </text>
      <text x="1228.32" y="643.71" className="fil0 fnt0">
        i
      </text>
      <text x="1372.71" y="643.71" className="fil0 fnt0">
        s
      </text>
      <text x="1697.66" y="643.71" className="fil0 fnt0">
        i
      </text>
      <text x="1842.05" y="643.71" className="fil0 fnt0">
        o
      </text>
      <text x="2203.5" y="643.71" className="fil0 fnt0">
        n
      </text>
      <g id="_1727037583904">
        <path
          className="fil0"
          d="M887.45 78.02c9.35,16.39 -15.56,139.37 -21.35,165.84 -41.38,189.09 -56.91,47.42 66.61,284.75 12.54,24.1 23.68,44.21 34.1,68.84 4.91,11.64 9.77,22.92 14.54,36.37l10.77 29.91c6.35,12.91 3.23,7.23 8.49,13.74 0.94,-57.15 8.13,-235.31 0.14,-280.5 -7.13,-40.2 -20.47,-8.71 -28.19,-45.91 -10.71,-51.61 64.74,-59.76 69,-11.56 2.57,29.09 -13.58,32.17 -29.71,44.72l9.01 273.33c2.96,-5.74 3.96,-8.65 6.33,-14.7 33.83,-86.48 44.56,-104.25 94.17,-188.74 12.36,-21.05 56.25,-80.58 54.97,-100 -0.08,-1.29 -30.8,-112.57 -34.65,-124.25 -44.17,-25.13 -91.45,-34.89 -136.21,-63.14 -23.37,-14.75 -40.25,-27.44 -59.31,-43.73 -74.95,-64.08 65.9,-96.81 108.11,-97.81 71.07,-1.69 120.84,25.4 155.65,63.13 -12.76,14.15 -51.53,42.43 -69.33,46.11 4.92,-28.2 4.05,-48.8 -10.42,-70.49 -9.85,-14.78 -34.35,-27.15 -61.44,-25.68 -100.26,5.47 -92.07,192.73 77.37,125.33 31.74,-12.63 91.51,-48.26 101.58,-80.42 -29.37,-19.96 -32.19,-37.36 -72.37,-58.1 -80.86,-41.72 -246.12,-36.05 -287.85,52.96z"
        />
        <circle className="fil0 str0" cx="1013.45" cy="701.93" r="14.17" />
      </g>
    </g>
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
            <InkisionLogo />
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
