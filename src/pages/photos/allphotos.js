import { PhotoTable } from "@/components/PhotoTable";
import React from "react";
import { IoImagesSharp } from "react-icons/io5";

export default function allphotos() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Photos
        </h2>
        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <IoImagesSharp className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>All Photos</span>
        </div>
      </div>
      <PhotoTable />
    </div>
  );
}
