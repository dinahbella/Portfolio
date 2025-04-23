import { SiBloglovin } from "react-icons/si";
import AddBlog from "@/components/AddBlog";

export default function AddBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-300">
            Add{" "}
            <span className="text-indigo-500 dark:text-indigo-400">Blog</span>
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 tracking-wide">
            Welcome to the admin blog creation panel.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
          <SiBloglovin className="text-blue-500 dark:text-blue-400" />
          <span>/</span>
          <span className="font-semibold">Add Blog</span>
        </div>
      </div>

      {/* Blog Editor Section */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
        <AddBlog />
      </div>
    </div>
  );
}
