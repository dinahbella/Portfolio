"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X, FileText, Phone, Home } from "lucide-react";
import { FaFirstdraft } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoImage } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { RiBringToFront } from "react-icons/ri";
import { ModeToggle } from "./Mode";
import Logout from "./Logout";

export default function SideSheet() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    // Update active menu item based on current route
    if (pathname.includes("dashboard")) setActiveItem("Dashboard");
    else if (pathname.includes("blogs")) setActiveItem("All Blogs");
    else if (pathname.includes("projects")) setActiveItem("All Projects");
    else if (pathname.includes("photos")) setActiveItem("All Photos");
    else if (pathname.includes("referrall")) setActiveItem("Referrals");
    else if (pathname.includes("contact")) setActiveItem("Contact");
  }, [pathname]);

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

            {/* Sidebar Sheet */}
            <SheetContent
              side="left"
              className="bg-white dark:bg-gray-900 w-[280px] p-0 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Admin Panel
                  </h2>
                </div>

                {/* Nav Menu */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  <MenuSection title="Dashboard">
                    <MenuItem
                      href="/admin/dashboard"
                      label="Dashboard"
                      icon={<Home className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                  </MenuSection>

                  <MenuSection title="Blog Management">
                    <MenuItem
                      href="/admin/blogs"
                      label="All Blogs"
                      icon={<FileText className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/blogs/addblog"
                      label="Add Blog"
                      icon={<IoIosAddCircleOutline className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/blogs/draftblog"
                      label="Draft Blog"
                      icon={<FaFirstdraft className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                  </MenuSection>

                  <MenuSection title="Project Management">
                    <MenuItem
                      href="/admin/projects/allprojects"
                      label="All Projects"
                      icon={<AiOutlineProject className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/projects/addproject"
                      label="Add Project"
                      icon={<BsFillPostcardFill className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/projects/draftproject"
                      label="Draft Project"
                      icon={<BsFillPostcardFill className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                  </MenuSection>

                  <MenuSection title="Media Management">
                    <MenuItem
                      href="/admin/photos/allphotos"
                      label="All Photos"
                      icon={<IoImage className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/photos/addphoto"
                      label="Add Photo"
                      icon={<CiImageOn className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/aiphotos/allaiphotos"
                      label="All Ai Photos"
                      icon={<IoImage className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/aiphotos/addaiphoto"
                      label="Add ai Photo"
                      icon={<CiImageOn className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                  </MenuSection>

                  <MenuSection title="Settings">
                    <MenuItem
                      href="/admin/contact"
                      label="Contact"
                      icon={<Phone className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                    <MenuItem
                      href="/admin/referrall"
                      label="Referrals"
                      icon={<RiBringToFront className="w-5 h-5" />}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      closeSheet={() => setOpen(false)}
                    />
                  </MenuSection>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Logout />
        </div>
      </header>
      <main className="pt-14"></main>
    </>
  );
}

// Reusable MenuItem
function MenuItem({
  href,
  label,
  icon,
  activeItem,
  setActiveItem,
  closeSheet,
}) {
  const isActive = activeItem === label;

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        onClick={() => {
          setActiveItem(label);
          closeSheet();
        }}
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

// Reusable MenuSection
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
