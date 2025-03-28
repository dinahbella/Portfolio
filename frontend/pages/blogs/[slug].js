import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import { Calendar1Icon, MessageSquare } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BsCopy } from "react-icons/bs";
import Head from "next/head";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";

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
  const [copied, setCopied] = useState(false);
  const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    content: "",
    maincomment: true,
    parent: null,
    parentName: "",
  });
  const replyFormRef = useRef(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/${slug}`);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleUpdateComment = async () => {
    try {
      await axios.put(`/api/comment/${editingCommentId}`, {
        content: editingContent,
      });

      setBlogData((prevData) => {
        const updateComment = (comments) =>
          comments.map((c) => {
            if (c._id === editingCommentId) {
              return { ...c, content: editingContent };
            } else if (c.children) {
              return { ...c, children: updateComment(c.children) };
            }
            return c;
          });

        return {
          ...prevData,
          comments: updateComment(prevData.comments),
        };
      });

      handleCancelEdit();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comment/${commentId}`);

      setBlogData((prevData) => {
        const removeComment = (comments) =>
          comments
            .filter((c) => c._id !== commentId)
            .map((c) =>
              c.children ? { ...c, children: removeComment(c.children) } : c
            );

        return {
          ...prevData,
          comments: removeComment(prevData.comments),
        };
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);

      if (newComment.parent) {
        setBlogData((prevData) => {
          const updateChildrenComment = (children, parentId, newReply) => {
            return children.map((child) => {
              if (child._id === parentId) {
                return {
                  ...child,
                  children: [...(child.children || []), newReply],
                };
              } else if (child.children && child.children.length > 0) {
                return {
                  ...child,
                  children: updateChildrenComment(
                    child.children,
                    parentId,
                    newReply
                  ),
                };
              }
              return child;
            });
          };

          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [...(comment.children || []), response.data],
              };
            } else if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: updateChildrenComment(
                  comment.children,
                  newComment.parent,
                  response.data
                ),
              };
            }
            return comment;
          });

          return {
            ...prevData,
            comments: updatedComments,
          };
        });
      } else {
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments],
        }));
      }

      setMessageOk("✅ Comment posted successfully");
      setTimeout(() => setMessageOk(""), 5000);

      setNewComment({
        name: "",
        email: "",
        title: "",
        content: "",
        maincomment: true,
        parent: null,
        parentName: "",
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      setMessageOk("❌ Failed to post comment. Please try again.");
    }
  };

  const handleReply = (parentCommentId, parentName) => {
    setNewComment({
      ...newComment,
      parent: parentCommentId,
      parentName: parentName,
      maincomment: false,
    });
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRemoveReply = () => {
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      maincomment: true,
    });
  };

  const handleCopyUrl = async () => {
    try {
      const url = `${window.location.origin}/blogs/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const renderComments = (comments, depth = 0) => {
    if (!comments || comments.length === 0) return null;

    return comments.map((comment) => {
      // Limit content to 50 words
      const limitedContent = comment.content.split(" ").slice(0, 50).join(" ");
      const showEllipsis = comment.content.split(" ").length > 50;

      return (
        <motion.div
          key={comment._id}
          variants={slideUp}
          className={`mb-4 ${depth > 0 ? "ml-8" : ""}`}
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {comment.name}
                </h4>
                <time
                  className="text-xs text-gray-500 dark:text-gray-400"
                  dateTime={comment.createdAt}
                >
                  {formatDate(comment.createdAt)}
                </time>
              </div>
            </div>

            {/* Show comment title if it exists */}
            {comment.title && (
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {comment.title}
              </h5>
            )}

            {editingCommentId === comment._id ? (
              <div className="my-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    onClick={handleUpdateComment}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="dark:border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {limitedContent}
                  {showEllipsis && (
                    <span className="text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleReply(comment._id, comment.name)}
                    className="text-xs"
                  >
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(comment)}
                    variant="ghost"
                    className="text-xs dark:hover:bg-gray-700"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(comment._id)}
                    variant="destructive"
                    className="text-xs"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>

          {comment.children && renderComments(comment.children, depth + 1)}
        </motion.div>
      );
    });
  };

  const shareUrl = `${window.location.origin}/blogs/${slug}`;
  const socialLinks = [
    {
      icon: <FaFacebook className="text-blue-600 hover:text-blue-700" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      icon: <FaLinkedin className="text-blue-500 hover:text-blue-600" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      icon: (
        <FaSquareXTwitter className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300" />
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
  ];

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

  return (
    <>
      <Head>
        <title>{blogData.blog.title || "Blog Post"} | Inkvision</title>
        <meta
          name="description"
          content={
            blogData.blog.description || "Read this interesting blog post"
          }
        />
        <meta
          property="og:title"
          content={blogData.blog.title || "Blog Post"}
        />
        <meta
          property="og:description"
          content={blogData.blog.description || ""}
        />
        {blogData.blog.images?.[0] && (
          <meta property="og:image" content={blogData.blog.images[0]} />
        )}
      </Head>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          {/* Blog Header */}
          <motion.article variants={slideUp} className="mb-12">
            {blogData.blog.images?.[0] && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={blogData.blog.images[0]}
                  alt={blogData.blog.title || "Blog cover"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            )}

            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-4 items-center justify-between mb-6"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <motion.div
                  variants={slideUp}
                  className="flex items-center gap-2"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow">
                    <Image
                      src={"/pp.jpg"}
                      alt="Author"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    By {blogData.blog.author || "Inkvision"}
                  </span>
                </motion.div>

                <motion.div
                  variants={slideUp}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  <Calendar1Icon className="w-5 h-5" />
                  <time dateTime={blogData.blog.createdAt}>
                    {formatDate(blogData.blog.createdAt)}
                  </time>
                </motion.div>

                <motion.div
                  variants={slideUp}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{blogData.comments?.length || 0} Comments</span>
                </motion.div>
              </div>

              <div className="flex items-center gap-4">
                <motion.div variants={slideUp} className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${social.icon.type.displayName}`}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {social.icon}
                    </a>
                  ))}
                </motion.div>

                <motion.div variants={slideUp}>
                  <button
                    onClick={handleCopyUrl}
                    aria-label="Copy blog URL"
                    className="flex items-center gap-2 p-2 hover:text-blue-500 transition-colors"
                    disabled={copied}
                  >
                    <BsCopy className="text-xl" />
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-emerald-500"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {blogData.blog.blogcategory?.length > 0 && (
              <motion.div
                variants={slideUp}
                className="flex flex-wrap gap-2 mb-6"
              >
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
          </motion.article>

          {/* Blog Content */}
          <motion.section
            variants={slideUp}
            className="prose dark:prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: blogData.blog.content }}
          />

          {/* Comments Section */}
          <motion.section
            variants={fadeIn}
            className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700"
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
                {newComment.parentName
                  ? `Replying to ${newComment.parentName}`
                  : "Leave a Comment"}
              </h3>
              {newComment.parentName && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveReply}
                  className="mb-4 dark:hover:bg-gray-700"
                >
                  Cancel Reply
                </Button>
              )}
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1 dark:text-gray-300"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newComment.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1 dark:text-gray-300"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newComment.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newComment.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                  >
                    Comment *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="4"
                    value={newComment.content}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="flex gap-3 items-center">
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-800 hover:from-blue-600 hover:to-indigo-900 text-white"
                  >
                    {newComment.parentName ? "Post Reply" : "Post Comment"}
                  </Button>
                  {messageOk && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm"
                    >
                      {messageOk}
                    </motion.span>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Comments List */}
            <div ref={replyFormRef}>
              {blogData.comments?.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {renderComments(blogData.comments)}
                </motion.div>
              ) : (
                <motion.p
                  variants={slideUp}
                  className="text-gray-500 dark:text-gray-400 text-center py-8"
                >
                  No comments yet. Be the first to comment!
                </motion.p>
              )}
            </div>
          </motion.section>

          {/* Tags Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Tags:
              </h2>
              <div className="flex flex-wrap gap-2">
                {blogData.blog.tags?.map((tag, index) => {
                  const colorClasses = [
                    "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-100",
                    "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-800 dark:text-green-100",
                    "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-100",
                    "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-100",
                    "bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-800 dark:text-pink-100",
                    "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-100",
                    "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-800 dark:text-red-100",
                    "bg-teal-100 hover:bg-teal-200 dark:bg-teal-900 dark:hover:bg-teal-800 text-teal-800 dark:text-teal-100",
                  ];

                  const colorClass = colorClasses[index % colorClasses.length];

                  return (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/blog/tag/${tag
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${colorClass}`}
                      >
                        #{tag}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}
