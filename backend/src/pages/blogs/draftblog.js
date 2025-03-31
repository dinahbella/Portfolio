"use client";
import React, { useState } from "react";
import { FaFirstdraft } from "react-icons/fa";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { FaDraftingCompass } from "react-icons/fa";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/blogs");

  // Filter blogs based on search query and published status
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const publishedBlogs = filteredBlogs.filter(
    (blog) => blog.status === "draft"
  );

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Draft Blogs
        </h2>
        <div className="flex items-center gap-2 mt-1 text-blue-600 dark:text-blue-300">
          <FaDraftingCompass className="text-lg" />
          <span>/</span>
          <span>Work in Progress</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white dark:bg-gray-800 p-2 mt-4 rounded-lg shadow-lg border w-full sm:w-auto">
        <Search className="w-5 h-5 ml-2 text-blue-500" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full sm:w-64 px-3 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Blog Cards Section */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <Spinner />
          </div>
        ) : publishedBlogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-700 dark:text-gray-300 font-bold">
            No blogs available.
          </div>
        ) : (
          publishedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Blog Image */}
              <Link href={`/blogs/${blog.slug}`}>
                <Image
                  src={blog.images[0]}
                  width={400}
                  height={250}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
              </Link>

              {/* Blog Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {/* Action Buttons */}
                <div className="mt-3 flex justify-between">
                  <Link href={`/blogs/edit/${blog._id}`}>
                    <Button className="bg-green-500 text-white flex items-center gap-2 px-3 py-1 rounded-md hover:bg-green-600">
                      <MdEdit />
                      Edit
                    </Button>
                  </Link>

                  <Link href={`/blogs/delete/${blog._id}`}>
                    <Button className="bg-red-500 text-white flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-600">
                      <MdDelete />
                      Delete
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
