"use client";
import React, { useState } from "react";
import { FaImages, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { BsPostcardFill } from "react-icons/bs";

export default function PhotoGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/aiphoto");

  // Filter photos based on search query
  const filteredPhotos =
    alldata?.filter((photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Photo Gallery
          </h2>
          <div className="flex items-center gap-2 mt-1 text-blue-600 dark:text-blue-300">
            <BsPostcardFill className="text-lg" />
            <span>/</span>
            <span>All Ai Photos</span>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-full sm:w-64"
        >
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="search"
            placeholder="Search photos..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </motion.div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo._id}
                  variants={item}
                  whileHover="hover"
                  className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  layout
                >
                  {/* Image with overlay */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={photo.images[0]}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Photo Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-1">
                      {photo.title}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/photos/edit/${photo._id}`}>
                          <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <MdEdit />
                            Edit
                          </Button>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/photos/delete/${photo._id}`}>
                          <Button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white">
                            <MdDelete />
                            Delete
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Index Badge */}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
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
                  <FaImages className="text-5xl text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                    No photos found
                  </h3>
                  {searchQuery && (
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      No results for "{searchQuery}"
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Footer Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-blue-100 dark:bg-blue-900 rounded-xl p-4 flex justify-between items-center"
      >
        <div className="text-blue-800 dark:text-blue-200 font-medium">
          Showing {filteredPhotos.length} of {alldata?.length || 0} photos
        </div>
        <Link href={"/photos/addphoto"}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Upload New Ai Photo
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
