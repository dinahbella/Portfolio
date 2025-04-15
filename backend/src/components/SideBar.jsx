"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X, FileText, Phone, Settings2 } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./Mode";
import { FaFirstdraft } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { IoIosAddCircleOutline, IoIosImages } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoImage } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";

export default function SideSheet() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Menu"
              >
                {open ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </SheetTrigger>
          </Sheet>
          <h1 className="text-xl font-bold flex items-center gap-1">
            <span className="dark:text-white">Admin</span>
            <span className="text-blue-600 dark:text-blue-400">Panel</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </header>

      {/* Sidebar Content */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="bg-white dark:bg-gray-900 w-[280px] p-0"
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Navigation
              </h2>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              <MenuSection title="Dashboard">
                <MenuItem
                  href="/"
                  label="Dashboard"
                  icon={<span className="text-lg">🏠</span>}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </MenuSection>

              <MenuSection title="Blog Management">
                <MenuItem
                  href="/blogs"
                  label="All Blogs"
                  icon={<FileText className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/blogs/addblog"
                  label="Add Blog"
                  icon={<IoIosAddCircleOutline className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/blogs/draftblog"
                  label="Draft Blog"
                  icon={<FaFirstdraft className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </MenuSection>

              <MenuSection title="Project Management">
                <MenuItem
                  href="/projects/allprojects"
                  label="All Projects"
                  icon={<AiOutlineProject className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/projects/addproject"
                  label="Add Project"
                  icon={<BsFillPostcardFill className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/projects/draftproject"
                  label="Draft Project"
                  icon={<BsFillPostcardFill className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </MenuSection>

              <MenuSection title="Media Management">
                <MenuItem
                  href="/photos/allphotos"
                  label="All Photos"
                  icon={<IoImage className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/photos/addphoto"
                  label="Add Photo"
                  icon={<CiImageOn className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/photos/addaiphoto"
                  label="Add Ai Photo"
                  icon={<CiImageOn className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </MenuSection>

              <MenuSection title="Settings">
                <MenuItem
                  href="/contact"
                  label="Contact"
                  icon={<Phone className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <MenuItem
                  href="/settings"
                  label="Settings"
                  icon={<Settings2 className="w-5 h-5" />}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </MenuSection>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <main className="pt-16 px-4 pb-4 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Main Content */}
      </main>
    </>
  );
}

function MenuItem({ href, label, icon, activeItem, setActiveItem }) {
  const isActive = activeItem === label;
  return (
    <Link
      href={href}
      onClick={() => setActiveItem(label)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <span
        className={`${
          isActive
            ? "text-blue-700 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

function MenuSection({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
