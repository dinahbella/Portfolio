"use client";
import React, { useState } from "react";
import { FaImages } from "react-icons/fa6";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { BsPostcardFill } from "react-icons/bs";
import SideSheet from "@/components/SideBar";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/project");

  const filteredprojects =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const publishedprojects = filteredprojects.filter(
    (project) => project.status === "publish"
  );

  return (
    <>
      <SideSheet />
      <div className="p-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-2xl text-blue-600 font-semibold">
            All Published Projects
          </h2>
          <div className="text-blue-600 flex items-center gap-2">
            <BsPostcardFill className="text-xl" />
            <span>/</span>
            <span>All Projects</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center p-2 my-4 gap-3 w-full sm:w-96 border border-gray-300 rounded-xl shadow-lg">
          <Search className="w-5 h-5 ml-2 text-blue-500" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-2 py-2 outline-none bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <Spinner />
            </div>
          ) : publishedprojects.length === 0 ? (
            <div className="col-span-full text-center">
              <h2 className="font-bold">No projects available.</h2>
            </div>
          ) : (
            publishedprojects.map((project) => (
              <div
                key={project._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col gap-3"
              >
                <Image
                  src={project.images[0]}
                  width={200}
                  height={150}
                  alt="project"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {project.title}
                </h3>
                <div className="flex justify-between mt-auto">
                  <Link href={`/projects/edit/${project._id}`}>
                    <Button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-2">
                      <MdEdit /> Edit
                    </Button>
                  </Link>
                  <Link href={`/projects/delete/${project._id}`}>
                    <Button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2">
                      <MdDelete /> Delete
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
