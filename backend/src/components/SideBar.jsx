"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X, FileText, Phone, Settings2, Home } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./Mode";
import { FaFirstdraft } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoImage } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

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
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </SheetTrigger>
          </Sheet>
          <motion.h1
            className="text-xl font-bold flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="dark:text-white">Admin</span>
            <span className="text-blue-600 dark:text-blue-400">Panel</span>
          </motion.h1>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </header>

      {/* Sidebar Content */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="bg-white dark:bg-gray-900 w-[280px] p-0 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <motion.div
              className="p-4 border-b border-gray-200 dark:border-gray-700"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Navigation
              </h2>
            </motion.div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              <MenuSection title="Dashboard">
                <MenuItem
                  href="/"
                  label="Dashboard"
                  icon={<Home className="w-5 h-5" />}
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

      <main className="pt-16 px-4 pb-4 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Main Content */}
      </main>
    </>
  );
}

function MenuItem({ href, label, icon, activeItem, setActiveItem }) {
  const isActive = activeItem === label;

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        onClick={() => setActiveItem(label)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <span
          className={`transition-colors duration-200 ${
            isActive
              ? "text-blue-700 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {icon}
        </span>
        <span>{label}</span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

function MenuSection({ title, children }) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </motion.div>
  );
}
