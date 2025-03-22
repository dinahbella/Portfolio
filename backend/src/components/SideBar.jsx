"use client";
import React, { useState } from "react";
import {
  X,
  Menu,
  FileText,
  Phone,
  PlusCircle,
  Settings2Icon,
} from "lucide-react"; // Icons
import Link from "next/link"; // For navigation
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaFirstdraft } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoImage } from "react-icons/io5";
import { ModeToggle } from "./Mode";

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home"); // Track active menu item
  const [isBlogsOpen, setIsBlogsOpen] = useState(false); // Submenu state for Blogs
  const [isProjectsOpen, setIsProjectsOpen] = useState(false); // Submenu state for Projects
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);

  return (
    <>
      {/* Header with Menu Button */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-5 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold">
          <span className="dark:text-white">Admin</span>{" "}
          <span className="text-blue-600 dark:text-blue-400">Panel</span>
        </h1>
        <div className="gap-3 flex">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={open ? "Close sidebar" : "Open sidebar"}
          >
            {open ? (
              <X className="w-6 h-6 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 dark:text-white" />
            )}
          </button>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 dark:bg-gray-900">
        {" "}
        {/* Add padding-top to account for the fixed header */}
        {/* Your main content goes here */}
      </main>

      {/* Sidebar */}
      {open && (
        <aside className="fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-2xl w-64 z-40">
          {/* Close Button */}
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 cursor-pointer dark:text-white" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="p-4">
            <ul className="space-y-4">
              {/* Home */}
              <li
                className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                  activeItem === "Home" ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
                onClick={() => setActiveItem("Home")}
              >
                <Link href="/" className="flex items-center space-x-2">
                  🏠 <span className="dark:text-white">Dashboard</span>
                </Link>
              </li>

              {/* Blogs */}
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200">
                <div
                  className="flex items-center justify-between"
                  onClick={() => setIsBlogsOpen(!isBlogsOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 dark:text-white" />
                    <span className="dark:text-white">Blogs</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {isBlogsOpen ? "▲" : "▼"}
                  </span>
                </div>
                {isBlogsOpen && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "All blogs"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("All blogs")}
                    >
                      <Link
                        href="/blogs"
                        className="flex items-center space-x-2"
                      >
                        📱 <span className="dark:text-white">All blogs</span>
                      </Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "Add blog"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("Add blog")}
                    >
                      <Link
                        href="/blogs/addblog"
                        className="flex items-center space-x-2"
                      >
                        <IoIosAddCircleOutline className="dark:text-white" />
                        <span className="dark:text-white"> Add blog</span>
                      </Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "Draft blog"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("Draft blog")}
                    >
                      <Link
                        href="/blogs/draftblog"
                        className="flex items-center space-x-2"
                      >
                        <FaFirstdraft className="dark:text-white" />
                        <span className="dark:text-white">Draft blog</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Projects */}
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200">
                <div
                  className="flex items-center justify-between"
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <BsFillPostcardFill className="dark:text-white" />
                    <span className="dark:text-white">Projects</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {isProjectsOpen ? "▲" : "▼"}
                  </span>
                </div>
                {isProjectsOpen && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "All Projects"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("All Projects")}
                    >
                      <Link
                        href="/projects/allprojects"
                        className="flex items-center space-x-2"
                      >
                        <AiOutlineProject className="dark:text-white" />
                        <span className="dark:text-white">All Projects</span>
                      </Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "Add project"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("Add project")}
                    >
                      <Link
                        href="/projects/addproject"
                        className="flex items-center space-x-2"
                      >
                        <PlusCircle className="dark:text-white" />
                        <span className="dark:text-white">Add project</span>
                      </Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "Draft project"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("Draft project")}
                    >
                      <Link
                        href="/projects/draftproject"
                        className="flex items-center space-x-2"
                      >
                        <FaFirstdraft className="dark:text-white" />
                        <span className="dark:text-white">Draft project</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Photos */}
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200">
                <div
                  className="flex items-center justify-between"
                  onClick={() => setIsPhotosOpen(!isPhotosOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <IoIosImages className="dark:text-white" />
                    <span className="dark:text-white">Photos</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {isPhotosOpen ? "▲" : "▼"}
                  </span>
                </div>
                {isPhotosOpen && (
                  <ul className="pl-6 mt-2 space-y-2">
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "All Photos"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("All Photos")}
                    >
                      <Link
                        href="/photos/allphotos"
                        className="flex items-center space-x-2"
                      >
                        <IoImage className="dark:text-white" />
                        <span className="dark:text-white">All Photos</span>
                      </Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                        activeItem === "Add Photo"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setActiveItem("Add Photo")}
                    >
                      <Link
                        href="/photos/addphoto"
                        className="flex items-center space-x-2"
                      >
                        <CiImageOn className="dark:text-white" />
                        <span className="dark:text-white">Add Photo</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Contact */}
              <li
                className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                  activeItem === "Contact" ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
                onClick={() => setActiveItem("Contact")}
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 dark:text-white" />
                  <span className="dark:text-white">Contact</span>
                </Link>
              </li>

              {/* Settings */}
              <li
                className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors duration-200 ${
                  activeItem === "Settings"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => setActiveItem("Settings")}
              >
                <Link href="/settings" className="flex items-center space-x-2">
                  <Settings2Icon className="w-5 h-5 dark:text-white" />
                  <span className="dark:text-white">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
