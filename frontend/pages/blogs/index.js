import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Blogs() {
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

          <p className="text-sm md:text-md text-gray-700 font-sans dark:text-gray-300 leading-relaxed mb-8">
            This area covers a wide range of topics, from practical writing tips
            and grammar guides to advanced content marketing strategies and SEO
            best practices. Readers can explore industry trends, freelance
            writing advice, and editing techniques to refine their work. The
            blog also features case studies, success stories, and
            recommendations for useful writing tools and software.
          </p>
          <div className="w-full">
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center"
            >
              <div className="relative flex-grow max-w-lg mr-4">
                {/* Search Icon */}
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

                {/* Input Field */}
                <Input
                  type="text"
                  placeholder="Search here..."
                  className="block w-full pl-10 pr-4 py-2 rounded-2xl border-blue-600 shadow-2xl dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                />

                {/* Search Button */}
                <Button
                  type="submit"
                  className="absolute right-0 inset-y-0 px-4 text-white bg-blue-500 hover:bg-blue-800 rounded-r-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
