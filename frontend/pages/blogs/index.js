import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner2 from "@/components/Spinner2";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/blogs");

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
  const publishedData = currentBlogs.filter(
    (blog) => blog.status === "publish"
  );
  const sliderPubData = alldata.filter((blog) => blog.status === "publish");

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset to first page when searching
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

          <div className="mt-6 mb-8">
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
                <Spinner2 />
              ) : (
                sliderPubData.slice(0, 6).map((blog) => (
                  <SwiperSlide key={blog._id}>
                    <div className="w-[200px]">
                      <Link href={`/blogs/${blog.slug}`}>
                        <Image
                          src={blog.images[0]} // Fixed typo from 'scr' to 'src'
                          alt={blog.title}
                          width={200}
                          height={200}
                          className="object-cover rounded-lg"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  );
}
