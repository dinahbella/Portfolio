import Link from "next/link";
import React from "react";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 shadow-xl dark:bg-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold dark:text-black">Logo</h1>
        </div>

        <div className="flex flex-wrap dark:text-gray-800 font-bold justify-center md:justify-start gap-4 text-gray-300 text-sm">
          {[
            { href: "/services", label: "Services" },
            { href: "/works", label: "Works" },
            { href: "/resume", label: "Resume" },
            { href: "/testimonials", label: "Testimonials" },
            { href: "/skills", label: "Skills" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative hover:text-blue  transition duration-500 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <ul className="flex gap-4 dark:text-gray-800">
          <li>
            <a
              href="#"
              target="_blank"
              className="hover:text-blue-500 transition "
            >
              <FaXTwitter size={20} />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              <FaFacebook size={20} />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="text-center font-bold text-gray-400 text-xs mt-6 dark:text-gray-800">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
