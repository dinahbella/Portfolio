import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function ProjectSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata, loading, error } = useFetchData(
    `/api/projects?slug=${slug}`
  );
  const project = alldata?.[0];

  const formatDate = (date) => {
    if (!date || isNaN(date)) return "";
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const createdAtDate = project?.createdAt ? new Date(project.createdAt) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">
            Error loading project.
          </p>
        ) : project ? (
          <>
            {/* Image Banner */}
            <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.images?.[0] || "/default-image.jpg"}
                alt={project.title || "Project Image"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 bg-black/40 backdrop-blur-sm text-white w-full px-6 py-4">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {project.title}
                </h1>
              </div>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Category
                </h3>
                <p className="text-lg font-semibold capitalize">
                  {project.projectcategory?.join(", ") || "N/A"}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Client
                </h3>
                <p className="text-lg font-semibold">
                  {project.client || "Confidential"}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Start Date
                </h3>
                <p className="text-lg font-semibold">
                  {createdAtDate ? formatDate(createdAtDate) : "Not available"}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Designer
                </h3>
                <p className="text-lg font-semibold">Blessing Edet</p>
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
              <h3 className="font-bold mb-4 text-2xl">Project Description</h3>
              <p>
                {project.description ||
                  "No description available for this project."}
              </p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Project not found.</p>
        )}
      </div>
    </div>
  );
}
