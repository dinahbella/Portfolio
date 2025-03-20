import { BlogTable } from "@/components/BlogTable";
import { ProjectTable } from "@/components/ProjectTable";
import React from "react";
import { BsPostcardFill } from "react-icons/bs";

export default function draftproject() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Published Projects
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <BsPostcardFill className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>All Projects</span>
        </div>
      </div>
      <ProjectTable />
    </div>
  );
}
