"use client";

import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import { Calendar1Icon, MessageSquare } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BsCopy } from "react-icons/bs";
import Head from "next/head";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import useFetchData from "@/hooks/useFetchData";
import Header from "@/components/Header";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ProjectSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata, loading, error } = useFetchData(
    `/api/projects?slug=${slug}`
  );
  const project = alldata?.[0];

  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      setShareUrl(`${window.location.origin}/projects/${slug}`);
    }
  }, [slug]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      toast.success("URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

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
        <FaSquareXTwitter className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300" />
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-20 text-red-500 dark:text-red-400">
        <p>{error || "Project not found"}</p>
        <Button onClick={() => router.push("/projects")} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title || "Project Post"} | Inkvision</title>
        <meta
          name="description"
          content={project.description || "Project post"}
        />
        <meta property="og:title" content={project.title || "Project Post"} />
        <meta property="og:description" content={project.description || ""} />
        {project.images?.[0] && (
          <meta property="og:image" content={project.images[0]} />
        )}
      </Head>

      <Header />

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="lg:col-span-2"
        >
          <div className="mb-12">
            {project.images?.[0] && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex gap-4 items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Image
                    src="/pp.jpg"
                    alt="Author"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{project.author || "Inkvision"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar1Icon className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
                <button onClick={handleCopyUrl} aria-label="Copy Link">
                  <BsCopy className="text-xl" />
                  {copied && (
                    <span className="ml-2 text-emerald-500 text-sm">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {project.title}
            </h1>

            {/* Wrap the markdown component in a styled div */}
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {project.description || "*No content available.*"}
              </ReactMarkdown>
            </div>
          </div>

          {project.tags?.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <p
                    key={idx}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-100"
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </section>
          )}
        </motion.main>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Projects
            </h3>
            {alldata.slice(0, 3).map((p) => (
              <Link
                key={p._id}
                href={`/projects/${p.slug}`}
                className="flex items-center gap-4 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                <Image
                  src={p.images?.[0] || "/placeholder.jpg"}
                  alt={p.title}
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-xs">
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(p.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {project.projectcategory?.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Categories
              </h3>
              <div className="space-y-2">
                {project.projectcategory.map((category, i) => {
                  const count = alldata.filter((p) =>
                    p.projectcategory?.includes(category)
                  ).length;
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <span>{category}</span>
                      <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-xs">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
