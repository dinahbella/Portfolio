import React, { useState } from "react";
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

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata = [], loading } = useFetchData("/api/blogs");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredBlogs = alldata.filter((blog) => {
    if (searchQuery.trim() === "") return true;
    return blog.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedData = alldata.filter((blog) => blog.status === "publish");
  const sliderPubData = publishedData.slice(0, 6); // Take first 6 published blogs for slider

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
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Explore our collection of writing tips, content strategies, and industry insights"
        />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-gray-900 dark:text-white mb-6">
            Welcome to{" "}
            <span className="font-bold font-mono bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
              Dinah Blogs!
            </span>
          </h1>

          <p className="text-sm md:text-md text-gray-700 font-mono dark:text-gray-300 leading-relaxed mb-8">
            This area covers a wide range of topics, from practical writing tips
            and grammar guides to advanced content marketing strategies and SEO
            best practices. Readers can explore industry trends, freelance
            writing advice, and editing techniques to refine their work. The
            blog also features case studies, success stories, and
            recommendations for useful writing tools and software.
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
                  className="block w-full pl-10 pr-4 py-2 rounded-2xl border-blue-600 shadow-2xl dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                />
                <Button
                  type="submit"
                  className="absolute right-0 inset-y-0 px-4 text-white bg-gradient-to-tr from-blue-500 via-teal-600 to-indigo-800 hover:bg-blue-800 rounded-r-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Featured Posts Slider */}
          <div className="mt-10 mb-12">
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-4">
              Featured Posts:
            </h2>
            <Swiper
              slidesPerView={"auto"}
              freeMode={true}
              spaceBetween={30}
              modules={[FreeMode]}
              className="featured-swiper"
            >
              {loading ? (
                <Spinner />
              ) : (
                sliderPubData.map((blog) => (
                  <SwiperSlide key={blog._id} style={{ width: "200px" }}>
                    <div className="w-full">
                      <Link href={`/blogs/${blog.slug}`}>
                        <div className="relative aspect-square">
                          <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-lg shadow-xl border"
                          />
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* All Blog Posts
          <div className="mt-8">
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              All Blog Posts
            </h2>

            {loading ? (
              <Spinner />
            ) : publishedData.length > 0 ? (
              <div className="space-y-8">
                {publishedData.map((blog) => (
                  <div
                    key={blog._id}
                    className="border-b pb-6 border-gray-200 dark:border-gray-700"
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {blog.excerpt || blog.description?.substring(0, 150)}...
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No blog posts found.
              </p>
            )}

            {/* Pagination */}
          {/* {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>  */}
        </div>
      </main>
    </div>
  );
}
