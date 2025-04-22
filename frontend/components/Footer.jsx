"use client";

import Link from "next/link";
import React from "react";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "#works", label: "Works" },
    { href: "/resume", label: "Resume" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
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
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold tracking-wide"
        >
          <img
            src="/logo1.svg"
            alt="logo"
            className="h-20 w-40 dark:text-white text-gray-900"
          />
        </motion.h1>

        {/* Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 text-sm font-medium"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {navLinks.map((item) => (
            <motion.div key={item.href} variants={linkVariants}>
              <Link
                href={item.href}
                className="relative text-gray-300 dark:text-gray-800 hover:text-blue-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all hover:before:w-full"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media */}
        <motion.ul
          className="flex gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { Icon: FaXTwitter, label: "Twitter" },
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
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </motion.footer>
  );
}
