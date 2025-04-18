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
                <p className="text-lg font-semibold">Inkvision</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md mb-5">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Project File
              </h3>
              <p className="font-semibold text-gray-500 dark:text-gray-400 mb-2">
                This project is available for download. Click the button below
                to know more about this project.
              </p>
              {project.file ? (
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 dark:text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                        {project.file.split("/").pop()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Click to download
                      </p>
                    </div>
                  </div>
                  <a
                    href={project.file}
                    download={project.file.split("/").pop()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                  >
                    Download
                  </a>
                </div>
              ) : (
                <div className="text-center py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No file available
                  </p>
                </div>
              )}
            </div>
            {/* Description */}
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed mt-4 ">
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
