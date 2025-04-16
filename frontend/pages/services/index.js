import Head from "next/head";
import React from "react";
import { motion } from "framer-motion";
import {
  FaPenFancy,
  FaSearchDollar,
  FaBusinessTime,
  FaQuoteLeft,
  FaArrowRight,
} from "react-icons/fa";
import { GiSpellBook, GiCommercialAirplane } from "react-icons/gi";
import { BsGraphUp, BsChatSquareQuote } from "react-icons/bs";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const services = [
  {
    id: 1,
    title: "Creative & Story Writing",
    icon: <FaPenFancy className="text-4xl text-indigo-500" />,
    points: [
      "Short Stories & Fiction",
      "Scripts for YouTube, Podcasts, or Skits",
      "Ghostwriting for Books or eBooks",
      "Comic Book/Graphic Novel Scripting",
    ],
    description:
      "Bring your ideas to life with compelling storytelling, scriptwriting, and fictional content that captivates readers and viewers.",
    bgGradient:
      "from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-700",
  },
  {
    id: 2,
    title: "Content & SEO Writing",
    icon: <FaSearchDollar className="text-4xl text-emerald-500" />,
    points: [
      "Blog Posts & Articles",
      "Product Descriptions",
      "Website Copywriting",
      "Newsletter Content",
    ],
    description:
      "Boost your brand visibility and engagement with SEO-optimized, audience-driven content tailored to your goals.",
    bgGradient:
      "from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-700",
  },
  {
    id: 3,
    title: "Business & Branding Copy",
    icon: <FaBusinessTime className="text-4xl text-amber-500" />,
    points: [
      "Sales Copy / Ad Campaigns",
      "Email Sequences",
      "Landing Page Texts",
      "Taglines & Brand Messaging",
    ],
    description:
      "Turn readers into buyers with persuasive, brand-aligned copy designed to convert and inspire action.",
    bgGradient:
      "from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20",
    borderColor: "border-amber-200 dark:border-amber-700",
  },
  {
    id: 4,
    title: "Academic & Technical Writing",
    icon: <GiSpellBook className="text-4xl text-blue-500" />,
    points: [
      "Research Papers & Essays",
      "Technical Documentation",
      "White Papers & Reports",
      "Instruction Manuals",
    ],
    description:
      "Precision-crafted academic and technical content with rigorous research and clear communication.",
    bgGradient:
      "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20",
    borderColor: "border-blue-200 dark:border-blue-700",
  },
  {
    id: 5,
    title: "Marketing Collateral",
    icon: <BsGraphUp className="text-4xl text-rose-500" />,
    points: [
      "Brochures & Flyers",
      "Press Releases",
      "Social Media Content",
      "Case Studies",
    ],
    description:
      "Professionally crafted marketing materials that elevate your brand and drive results.",
    bgGradient:
      "from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/20",
    borderColor: "border-rose-200 dark:border-rose-700",
  },
  {
    id: 6,
    title: "Speech & Presentation Writing",
    icon: <BsChatSquareQuote className="text-4xl text-violet-500" />,
    points: [
      "Keynote Speeches",
      "Conference Presentations",
      "Wedding Toasts",
      "Award Acceptance Speeches",
    ],
    description:
      "Eloquent and impactful speeches tailored to your voice and occasion.",
    bgGradient:
      "from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/20",
    borderColor: "border-violet-200 dark:border-violet-700",
  },
];

export default function Services() {
  return (
    <>
      <Header />
      <Head>
        <title>Our Services | Inkvision</title>
        <meta
          name="description"
          content="Professional writing services including creative writing, content creation, business copywriting, and more."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-indigo-200/30 dark:bg-indigo-800/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-emerald-200/30 dark:bg-emerald-800/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Header Section */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-6">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                Professional Writing Services
              </span>
            </div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Crafting Words That Inspire
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              We transform ideas into compelling narratives that engage
              audiences and drive results.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 10,
                  delay: index * 0.8,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative overflow-hidden rounded-2xl border ${service.borderColor} bg-gradient-to-br ${service.bgGradient} p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div
                  className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    backgroundColor: service.icon.props.className.includes(
                      "indigo"
                    )
                      ? "#6366f1"
                      : service.icon.props.className.includes("emerald")
                      ? "#10b981"
                      : service.icon.props.className.includes("amber")
                      ? "#f59e0b"
                      : service.icon.props.className.includes("blue")
                      ? "#3b82f6"
                      : service.icon.props.className.includes("rose")
                      ? "#f43f5e"
                      : "#8b5cf6",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        SERVICE {service.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mb-6 space-y-2">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic flex items-start">
                      <FaQuoteLeft className="text-gray-300 dark:text-gray-600 mr-2 mt-1 flex-shrink-0" />
                      {service.description}
                    </p>
                    <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to elevate your content?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can craft the perfect words for your project.
            </p>
            <Link href={"/contacts"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
