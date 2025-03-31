import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaCalendarAlt,
  FaTags,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { FiBookmark, FiShare2 } from "react-icons/fi";

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

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata = [], loading } = useFetchData("/api/projects");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredBlogs = alldata.filter((project) => {
    if (searchQuery.trim() === "") return true;
    return project.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
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
  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Head>
        <title>Inkvision Blog | Writing Tips & Content Strategies</title>
        <meta
          name="description"
          content="Explore our collection of writing tips, content strategies, and industry insights"
        />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
              Latest Articles & Guides
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800">
              Inkvision
            </span>{" "}
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover expert writing tips, content strategies, and industry
            insights to elevate your craft.
          </p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="Search articles, guides, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-32 py-3 rounded-xl border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg transition-all duration-200"
            />
            <Button
              type="submit"
              className="absolute right-2 inset-y-1 px-6 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </Button>
          </motion.form>
        </motion.section>

        {/* Featured Posts Slider */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FaStar className="text-yellow-500" />
              Featured Posts
            </h2>
            <Link
              href="/blog/featured"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <Swiper
            slidesPerView={"auto"}
            freeMode={true}
            spaceBetween={24}
            modules={[FreeMode, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="featured-swiper"
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 16 },
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              sliderPubData.map((project, index) => (
                <SwiperSlide
                  key={project._id}
                  className="!w-[300px] sm:!w-[320px] lg:!w-[340px]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full h-full flex flex-col group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Featured
                    </div>

                    {/* Bookmark Button */}
                    <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm">
                      <FiBookmark className="text-gray-700 dark:text-gray-300" />
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="relative block aspect-[4/3]"
                    >
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </Link>

                    <div className="p-5 bg-white dark:bg-gray-800 flex-grow flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.projectcategory
                          ?.slice(0, 2)
                          .map((cat, index) => (
                            <Link
                              key={index}
                              href={`/project/category/${cat}`}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                tagColors[index % tagColors.length]
                              } backdrop-blur-sm hover:scale-105 transition-transform shadow-sm`}
                            >
                              {cat}
                            </Link>
                          ))}
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
                        <Link
                          href={`/project/${project.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {project.excerpt ||
                          project.description?.substring(0, 100)}
                        ...
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                            <Image
                              src="/pp.jpg"
                              alt="Author"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Inkvision
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(project.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </motion.section>

        {/* Latest Blog Posts */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FiBookmark className="text-blue-500" />
              Latest Articles
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentBlogs.length < perPage}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : publishedData.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-12"
            >
              {currentBlogs.map((project, index) => (
                <motion.article
                  key={project._id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="lg:w-2/5 xl:w-1/3 flex-shrink-0"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                      >
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </Link>
                    <div className="lg:flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.projectcategory
                          ?.slice(0, 3)
                          .map((cat, index) => (
                            <Link
                              key={index}
                              href={`/project/category/${cat}`}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                tagColors[index % tagColors.length]
                              } hover:scale-105 transition-transform shadow-sm flex items-center gap-1`}
                            >
                              <FaTags className="opacity-70" />
                              {cat}
                            </Link>
                          ))}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-2">
                        {project.excerpt ||
                          project.description?.substring(0, 200)}
                        ...
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                            <Image
                              src="/pp.jpg"
                              alt="Author"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Inkvision
                            </span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              {new Date(project.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <FiBookmark />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <FiShare2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery
                  ? "No articles found matching your search"
                  : "No articles published yet"}
              </h3>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {publishedData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-12"
            >
              <nav className="flex items-center gap-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <FaChevronLeft className="text-sm" />
                  Previous
                </motion.button>

                {pageNumbers
                  .slice(
                    Math.max(currentPage - 2, 0),
                    Math.min(currentPage + 1, pageNumbers.length)
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
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next
                  <FaChevronRight className="text-sm" />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </motion.section>

        {/* Popular Tags */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-inner">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FaTags className="text-blue-500" />
              Popular Topics
            </h2>
            <div className="flex flex-wrap gap-3">
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
                    href={`/project/category/${tag}`}
                    className={`px-4 py-2 rounded-full ${
                      tagColors[index % tagColors.length]
                    } hover:shadow-md transition-all text-sm font-medium flex items-center gap-2`}
                  >
                    {tag}
                    <span className="text-xs bg-white/30 dark:bg-black/30 px-2 py-0.5 rounded-full">
                      {tagCounts[tag]}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-white shadow-xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the best writing tips
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-lg border-white/30 bg-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <Button
                type="submit"
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 rounded-lg shadow-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
