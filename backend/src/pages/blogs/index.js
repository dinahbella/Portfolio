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
  const { alldata = [], loading } = useFetchData("/api/blogs"); // Provide default empty array

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Safe filtering with optional chaining and nullish coalescing
  const filteredBlogs =
    alldata?.filter((blog) => {
      if (searchQuery.trim() === "") return true;
      return blog?.title?.toLowerCase()?.includes(searchQuery.toLowerCase());
    }) ?? [];

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedData = currentBlogs.filter(
    (blog) => blog?.status === "publish"
  );
  const sliderPubData =
    alldata?.filter((blog) => blog?.status === "publish") ?? [];

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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner2 />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* ... rest of your JSX remains the same ... */}
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
                {sliderPubData.slice(0, 6).map((blog) => (
                  <SwiperSlide key={blog?._id || Math.random()}>
                    <div className="w-[200px]">
                      <Link href={`/blogs/${blog?.slug}`}>
                        <Image
                          src={blog?.images?.[0] || "/placeholder-image.jpg"}
                          alt={blog?.title || "Blog post"}
                          width={200}
                          height={200}
                          className="object-cover rounded-lg"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
