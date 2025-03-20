import { BlogTable } from "@/components/BlogTable";
import React from "react";
import { FaFirstdraft } from "react-icons/fa";

export default function draftproject() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Draft Projects
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaFirstdraft className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Draft Projects</span>
        </div>
      </div>
      <BlogTable />
    </div>
  );
}
