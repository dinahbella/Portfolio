import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import { Calendar1Icon, MessageSquare } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";
import Image from "next/image";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata } = useFetchData("/api/blogs");
  const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    maincomment: true,
    parent: null,
    parentName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data, Please try again later.");
          setLoading(false);
        }
      }
    };
    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex justify-center items-center min-h-screen text-red-500 dark:text-red-400"
      >
        {error}
      </motion.div>
    );
  }

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "Invalid date";
    }
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Blog Header */}
        <motion.div variants={slideUp} className="mb-12">
          {blogData.blog.images && blogData.blog.images[0] && (
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={blogData.blog.images[0]}
                alt={blogData.blog.title || "Blog cover"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-4 items-center mb-6"
          >
            <motion.div variants={slideUp} className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow">
                <Image
                  src={blogData.blog.authorImage || "/pp.jpg"}
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                By Inkvision
              </span>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <Calendar1Icon className="w-5 h-5" />
              <span>{formatDate(blogData.blog.createdAt)}</span>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{blogData.comments?.length || 0} Comments</span>
            </motion.div>

            {blogData.blog.blogcategory && (
              <motion.div variants={slideUp} className="flex flex-wrap gap-2">
                {blogData.blog.blogcategory.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {category}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {blogData.blog.title}
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-xl text-gray-600 dark:text-gray-300 mb-6"
          >
            {blogData.blog.description}
          </motion.p>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          variants={slideUp}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blogData.blog.content }}
        />

        {/* Comments Section */}
        <motion.section
          variants={fadeIn}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Comments ({blogData.comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <motion.div
            variants={slideUp}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Leave a Comment
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
              >
                Post Comment
              </motion.button>
            </form>
          </motion.div>

          {/* Comments List */}
          {blogData.comments?.length > 0 ? (
            <motion.div variants={staggerContainer} className="space-y-6">
              {blogData.comments.map((comment) => (
                <motion.div
                  key={comment._id}
                  variants={slideUp}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                      {comment.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {comment.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              variants={slideUp}
              className="text-gray-500 dark:text-gray-400 text-center py-8"
            >
              No comments yet. Be the first to comment!
            </motion.p>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}
