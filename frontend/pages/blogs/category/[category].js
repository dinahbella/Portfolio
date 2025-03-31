import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading, error } = useFetchData(
    `/api/blogs?blogcategory=${category}`
  );

  const filteredBlogs = useMemo(() => {
    if (!alldata) return [];
    return alldata
      .filter((item) => item.status === "publish")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [alldata]);

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfFirstBlog + perPage
  );
  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading blogs: {error.message}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {category ? `${category} Articles` : "Blog Category"} | MySite
        </title>
        <meta
          name="description"
          content={`Browse all articles in the ${category} category`}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Category:{" "}
            <span className="text-blue-600 dark:text-blue-400">{category}</span>
          </h1>

          <hr className="border-gray-300 dark:border-gray-600 mb-10" />

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog, index) => (
                    <motion.article
                      key={blog._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link href={`/blogs/${blog.slug}`} passHref>
                        <Image
                          src={blog.images?.[0] || "/default-blog.jpg"}
                          alt={blog.title}
                          width={600}
                          height={350}
                          className="w-full h-48 object-cover"
                        />
                      </Link>

                      <div className="p-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {blog.blogcategory?.map((cat, i) => (
                            <Link
                              key={i}
                              href={`/blog/category/${encodeURIComponent(
                                cat.toLowerCase()
                              )}`}
                              className="bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium"
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {blog.description ||
                            blog.content?.substring(0, 150) + "..."}
                        </p>

                        <div className="flex items-center gap-3">
                          <Image
                            src={blog.authorImage || "/pp.jpg"}
                            alt={blog.author || "Author"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            by {blog.author || "Inkvision"}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-300">
                    No articles found in this category.
                  </p>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="inline-flex gap-2">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-4 py-2 text-sm rounded-md border ${
                          currentPage === number
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        } hover:scale-105 transition-transform`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
