"use client";
import React, { useState } from "react";
import { FaSearch, FaDraftingCompass } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import SideSheet from "@/components/SideBar";

export default function DraftblogsGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/blogs");

  // Filter and sort draft blogs
  const filteredblogs = (alldata || [])
    .filter(
      (blog) =>
        blog.status === "draft" &&
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      <SideSheet />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              Draft blogs
            </h1>
            <div className="flex items-center gap-2 mt-1 text-blue-600 dark:text-blue-300">
              <FaDraftingCompass className="text-lg" />
              <span>/</span>
              <span>Work in Progress</span>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full sm:w-80"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-blue-500" />
            </div>
            <input
              type="search"
              placeholder="Search drafts..."
              className="block w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* blogs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredblogs.length > 0 ? (
                  filteredblogs.map((blog, index) => (
                    <motion.div
                      key={blog._id}
                      variants={cardVariants}
                      whileHover="hover"
                      className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
                      layout
                    >
                      {/* Draft Badge */}
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        DRAFT
                      </div>

                      {/* blog Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.images?.[0] || "/default-blog.jpg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      </div>

                      {/* blog Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
                          {blog.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span>Last updated:</span>
                          <span>
                            {new Date(blog.updatedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between mt-auto">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={`/blogs/edit/${blog._id}`}>
                              <Button
                                size="sm"
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <MdEdit size={16} />
                                Continue Editing
                              </Button>
                            </Link>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={`/blogs/delete/${blog._id}`}>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="flex items-center gap-1"
                              >
                                <MdDelete size={16} />
                                Discard
                              </Button>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FaDraftingCompass className="text-5xl text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                        {searchQuery
                          ? "No matching drafts found"
                          : "No draft blogs yet"}
                      </h3>
                      {searchQuery && (
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                          Try a different search term
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="text-blue-800 dark:text-blue-200 font-medium">
                Showing {filteredblogs.length} draft blogs
              </div>

              <div className="flex gap-3">
                <Link href="/blogs/addblog">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    Start New blog
                  </Button>
                </Link>

                <Link href={"/blogs/allblogs"}>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                    size="sm"
                  >
                    View Published
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
