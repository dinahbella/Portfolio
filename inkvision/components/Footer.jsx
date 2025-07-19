"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaLinkedin, FaArrowRight } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";
import { InkisionLogo1 } from "./Logo2";

export default function Footer() {
  const router = useRouter();

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Works" },
    // { href: "/resume", label: "Resume" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#skills", label: "Skills" },
    { href: "/contacts", label: "Contact" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 py-10 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <InkisionLogo1 />

        {/* Navigation Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 text-sm font-medium"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {navLinks.map((item) => (
            <motion.div key={item.href} variants={linkVariants}>
              <Link
                href={item.href}
                className="relative text-md text-gray-300 dark:text-gray-800 hover:text-blue-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all hover:before:w-full"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Shortcut Button */}
        <button
          onClick={() => router.push("/contacts")}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FaArrowRight />
        </button>

        {/* Social Media Links */}
        <motion.ul
          className="flex gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { Icon: BsInstagram, label: "Instagram" },
            { Icon: FaFacebook, label: "Facebook" },
            { Icon: FaLinkedin, label: "LinkedIn" },
          ].map(({ Icon, label }, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 dark:text-gray-800 hover:text-blue-500 transition-colors"
            >
              <a
                href="#"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={20} />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-700 mt-8 font-semibold">
        © {new Date().getFullYear()} Inkvision. All rights reserved.
      </div>
    </motion.footer>
  );
}
