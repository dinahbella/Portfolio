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
  const sliderPubData = publishedData.slice(0, 6);

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
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
                Dinah Blogs!
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
          </div>

          <div className="shadow-lg mt-4 mb-8">
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* Featured Posts Slider */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              Featured Posts
            </h2>
            <Swiper
              slidesPerView={"auto"}
              freeMode={true}
              spaceBetween={24}
              modules={[FreeMode]}
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
                sliderPubData.map((blog) => (
                  <SwiperSlide
                    key={blog._id}
                    className="!w-[280px] sm:!w-[300px]"
                  >
                    <div className="w-full h-full flex flex-col group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="relative block aspect-[4/3]"
                      >
                        <Image
                          src={blog.images[0]}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Category Badge - Bottom Left */}
                        {blog.blogcategory?.length > 0 && (
                          <div className="absolute bottom-3 left-3 z-10">
                            <div className="flex flex-wrap gap-2">
                              {blog.blogcategory
                                .slice(0, 2)
                                .map((cat, index) => (
                                  <Link
                                    key={index}
                                    href={`/blog/category/${cat}`}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
                                  >
                                    {cat}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}
                      </Link>

                      <div className="p-4 flex-grow flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {blog.title}
                          </Link>
                        </h2>

                        <div className="mt-auto flex items-center space-x-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                            <Image
                              src="/pp.jpg"
                              alt="Author"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            By Inkvision
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* Latest Blog Posts */}
          <div className="mt-8">
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              Latest Blog Posts
            </h2>

            {loading ? (
              <Spinner />
            ) : publishedData.length > 0 ? (
              <div className="grid gap-8">
                {publishedData.map((blog) => (
                  <article
                    key={blog._id}
                    className="border-b pb-8 border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="md:w-1/3 lg:w-1/4 flex-shrink-0"
                      >
                        <div
                          title={blog.title}
                          className="relative aspect-video rounded-lg overflow-hidden shadow-sm"
                        >
                          <Image
                            src={blog.images[0]}
                            alt={blog.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="md:flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.blogcategory?.slice(0, 3).map((cat, index) => (
                            <Link
                              key={index}
                              href={`/blog/category/${cat}`}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-12">
                No blog posts found.
              </p>
            )}
          </div>
          <div className="mt-8">
            <h2 className="font-bold text-2xl dark:text-gray-200 mb-6">
              Popular Tags
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
