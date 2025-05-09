import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tagColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
];

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9); // Changed to 9 for 3x3 grid
  const { alldata = [], loading } = useFetchData("/api/projects");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = alldata.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedData = alldata.filter(
    (project) => project.status === "publish"
  );
  const sliderPubData = publishedData.slice(0, 6);

  // Extract all unique tags with count
  const tagCounts = publishedData.reduce((acc, project) => {
    if (project.projectcategory) {
      project.projectcategory.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const pageNumbers = [];
  const totalPages = Math.ceil(publishedData.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Projects</title>
        <meta name="description" content="Explore our collection of projects" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
                Projects
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Explore our portfolio of completed projects across various
              categories and technologies.
            </p>
          </motion.div>

          <div className="shadow-lg mt-4 mb-8">
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            {loading ? (
              <Spinner />
            ) : publishedData.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentBlogs.map((project, index) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.projectcategory
                            ?.slice(0, 2)
                            .map((cat, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  tagColors[index % tagColors.length]
                                }`}
                              >
                                {cat}
                              </span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {project.excerpt ||
                            project.description?.substring(0, 150)}
                          ...
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                          <Button variant="outline" className="text-sm">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-12">
                No projects found.
              </p>
            )}
          </motion.div>

          {/* Pagination */}
          {publishedData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-12"
            >
              <nav className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </motion.button>

                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <motion.button
                      key={number}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-md transition-all ${
                        currentPage === number
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {number}
                    </motion.button>
                  ))}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentBlogs.length < perPage}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </motion.button>
              </nav>
            </motion.div>
          )}

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6 text-center">
              Project Categories
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.slice(0, 15).map((tag, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p
                    q1q
                    className={`px-4 py-2 rounded-full ${
                      tagColors[index % tagColors.length]
                    } hover:shadow-md transition-all text-sm font-medium flex items-center gap-1`}
                  >
                    {tag}
                    <span className="text-xs opacity-80">
                      ({tagCounts[tag]})
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
