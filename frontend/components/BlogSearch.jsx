import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Spinner from "./Spinner";

const extractFirstParagraph = (markdown) => {
  if (!markdown) return "";
  const paragraphs = markdown.split("\n\n").filter((p) => p.trim().length > 0);
  return paragraphs[0] || "";
};

export default function BlogSearch({ cls }) {
  const { alldata = [], loading } = useFetchData("/api/blogs");
  const [searchResult, setSearchResult] = useState([]);
  const [blogtitle, setBlogTitle] = useState("");

  const publishedData = alldata?.filter((ab) => ab.status === "publish") || [];

  useEffect(() => {
    if (!blogtitle.trim()) {
      setSearchResult([]);
      return;
    }
    const filteredblogs = publishedData.filter((blog) =>
      blog.title.toLowerCase().includes(blogtitle.toLowerCase())
    );
    setSearchResult(filteredblogs);
  }, [blogtitle, publishedData]);

  const handleBlogClick = () => {
    setBlogTitle("");
    cls(); // Close the search modal if needed
  };
  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300">
        {/* Search Header */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <input
            type="text"
            placeholder="Search blog here..."
            value={blogtitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            autoFocus
          />
          <button
            onClick={cls}
            className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Close search"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {blogtitle && (
            <>
              {searchResult.length === 0 ? (
                <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                  <h3>
                    No blog found{" "}
                    <span className="text-sm">
                      (please check your spelling)
                    </span>
                  </h3>
                </div>
              ) : (
                <ul>
                  {searchResult.slice(0, 10).map((blog) => (
                    <li
                      key={blog._id}
                      className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <Link
                        href={`/blogs/${blog.slug}`}
                        onClick={handleBlogClick}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {extractFirstParagraph(blog.description)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
          {blogtitle && searchResult.length > 0 && (
            <p>
              Showing {Math.min(searchResult.length, 10)} of{" "}
              {searchResult.length} results
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
