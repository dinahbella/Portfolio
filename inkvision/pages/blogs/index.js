import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata = [], loading } = useFetchData("/api/blogs");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredBlogs = alldata.filter((blog) => {
    if (searchQuery.trim() === "") return true;
    return blog.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedData = alldata.filter((blog) => blog.status === "publish");
  const sliderPubData = publishedData.slice(0, 6);

  // Extract all unique tags with count
  const tagCounts = publishedData.reduce((acc, blog) => {
    if (blog.blogcategory) {
      blog.blogcategory.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Explore our collection of writing tips, content strategies, and industry insights"
        />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
                Inkvision Blogs!
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              This area covers a wide range of topics, from practical writing
              tips and grammar guides to advanced content marketing strategies
              and SEO best practices.
            </p>

            <div className="w-full mb-8">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-grow max-w-lg mr-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 rounded-2xl border-blue-600 shadow-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  />
                  <Button
                    type="submit"
                    className="absolute right-0 inset-y-0 px-4 text-white bg-gradient-to-tr from-blue-500 via-teal-600 to-indigo-800 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-r-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <div className="shadow-lg mt-4 mb-8">
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* Latest Blog Posts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              Latest Blog Posts
            </h2>

            {loading ? (
              <Spinner />
            ) : publishedData.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-8"
              >
                {currentBlogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    variants={itemVariants}
                    className="border-b pb-8 border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="md:w-1/3 lg:w-1/4 flex-shrink-0"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          title={blog.title}
                          className="relative aspect-video rounded-lg overflow-hidden shadow-sm"
                        >
                          <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </Link>
                      <div className="md:flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.blogcategory?.slice(0, 3).map((cat, index) => (
                            <Link
                              key={index}
                              href={`/blog/category/${cat}`}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                tagColors[index % tagColors.length]
                              } hover:scale-105 transition-transform shadow-sm`}
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {blog.excerpt || blog.description?.substring(0, 180)}
                          ...
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                            <Image
                              src="/pp.jpg"
                              alt="Author"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            By Inkvision •{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-12">
                No blog posts found.
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
              className="flex justify-center mt-8"
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
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              Popular Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tag, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/blog/category/${tag}`}
                    className={`px-4 py-2 rounded-full ${
                      tagColors[index % tagColors.length]
                    } hover:shadow-md transition-all text-sm font-medium flex items-center gap-1`}
                  >
                    {tag}
                    <span className="text-xs opacity-80">
                      ({tagCounts[tag]})
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
