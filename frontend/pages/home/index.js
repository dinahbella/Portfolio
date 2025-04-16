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
        <title>Shella Tams — Writer + Designer</title>
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
              I am Shella Tams
            </motion.h3>

            <motion.h1
              className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 text-transparent bg-clip-text"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Writer + Designer
            </motion.h1>

            <motion.p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Shella is a passionate storyteller who explores all genres,
              weaving captivating narratives that transport readers into
              different worlds. With a love for crafting compelling characters
              and immersive plots, Shella brings stories to life through
              thrilling mysteries, heartfelt romances, and thought-provoking
              dramas.
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

        {/* PROJECT SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="p-5"
        >
          <motion.h1
            id="works"
            className="text-3xl text-center font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text"
          >
            Our Recent Projects
          </motion.h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {loading ? (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-12"
              variants={itemVariants}
            >
              <Spinner size="lg" />
              <motion.p className="mt-4 text-gray-500">
                Loading projects...
              </motion.p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredProjects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="relative group"
                  layout
                >
                  <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Image
                      src={project.images?.[0]}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
                    <motion.div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.category && (
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded mt-1 inline-block">
                          {project.category}
                        </span>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/projects">
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <GrLinkNext className="text-lg" />
            </motion.div>
          </Link>
        </motion.div>

        <Experience />
        <Skills />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
