import { BlogTable } from "@/components/BlogTable";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";

export default function index() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Published Blogs
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaImages className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>All blogs</span>
        </div>
      </div>
      <BlogTable />
    </div>
  );
}
