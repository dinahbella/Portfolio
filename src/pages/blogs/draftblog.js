import { BlogTable } from "@/components/BlogTable";
import React from "react";
import { FaFirstdraft } from "react-icons/fa";
import { Search } from "lucide-react";

export default function draftblog() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Draft Blogs
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaFirstdraft className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Draft blogs</span>
        </div>
      </div>
      <div className="flex items-center p-1 m-3 gap-3 w-full sm:w-auto border border-gray-300 rounded-xl shadow-lg">
        <Search className="w-5 h-5 ml-2 text-blue-500" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full sm:w-64 px-2 py-2 outline-none bg-transparent"
        />
      </div>
      <BlogTable />
    </div>
  );
}
