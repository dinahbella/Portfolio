import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrLinkNext } from "react-icons/gr";

import { Geist, Geist_Mono } from "next/font/google";

import Num from "@/components/Num";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Spinner from "@/components/Spinner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Strength from "@/components/Strength";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const categories = ["All", "Blogs", "Projects", "Book Covers"];
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectResponse, blogResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs"),
        ]);

        const projectData = await projectResponse.json();
        const blogsData = await blogResponse.json();

        setAlldata(Array.isArray(projectData) ? projectData : []);
        setAllwork(Array.isArray(blogsData) ? blogsData : []);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? alldata.filter((p) => p.status === "publish")
        : alldata.filter(
            (p) =>
              p.status === "publish" &&
              p.projectcategory?.[0] === selectedCategory
          );

    setFilteredProjects(filtered);
  }, [selectedCategory, alldata]);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? allwork.filter((b) => b.status === "publish")
        : allwork.filter(
            (b) =>
              b.status === "publish" &&
              b.projectcategory?.[0] === selectedCategory
          );

    setFilteredBlogs(filtered);
  }, [selectedCategory, allwork]);

  return (
    <>
      <Header />

      <Head>
        <title>Inkvision— Writer + Designer</title>
        <meta
          name="description"
          content="Portfolio of Shella Tams, a dark, mysterious, and immersive storyteller."
        />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {/* HERO SECTION */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              About Inkvision
            </motion.h3>

            <motion.h1
              className="lg:text-5xl md:text-4xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 text-transparent bg-clip-text"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Professional Ghostwriting Team
            </motion.h1>

            <motion.p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              We're a team of experienced writers passionate about bringing your
              stories to life.
              <br />
              <br />
              At <strong>Inkvision</strong>, we specialize in creating engaging
              content for webnovels and Amazon publishing platforms, with
              particular expertise in:
              <ul className="list-disc list-inside mt-2">
                <li>Romance</li>
                <li>Fantasy</li>
                <li>Contemporary fiction</li>
                <li>Similar reader-friendly genres</li>
              </ul>
              <br />
              Our writers work closely with you to transform your ideas into
              polished, professional stories that capture readers' attention and
              keep them coming back for more.
              <br />
              <br />
              Whether you're looking to launch a new series or expand your
              existing catalog, <strong>Inkvision</strong> delivers quality
              content that resonates with online readers.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              initial={{ rotate: 4 }}
              animate={{ rotate: [4, -4, 4] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="rounded-3xl shadow-2xl border-4 p-1 bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800"
            >
              <Image
                src="/pp.jpg"
                alt="Shella Tams"
                width={240}
                height={240}
                className="rounded-3xl object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <Num />
        <Services />

        <Experience />
        <Skills />
        <Strength />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
