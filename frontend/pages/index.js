import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import Num from "@/components/Num";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Spinner from "@/components/Spinner";
import Spinner2 from "@/components/Spinner2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

const hoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
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
    if (selectedCategory === "All") {
      setFilteredProjects(
        alldata.filter((project) => project.status === "publish")
      );
    } else {
      setFilteredProjects(
        alldata.filter(
          (project) =>
            project.status === "publish" &&
            project.projectcategory?.[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, alldata]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBlogs(allwork.filter((blog) => blog.status === "publish"));
    } else {
      setFilteredBlogs(
        allwork.filter(
          (blog) =>
            blog.status === "publish" &&
            blog.projectcategory?.[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, allwork]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.h3
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
          >
            I am Shella Tams
          </motion.h3>

          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Writer + Designer
          </motion.h1>

          <motion.p
            className="text-md text-gray-700 leading-relaxed dark:text-gray-200"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
          >
            Shella is a passionate storyteller who explores all genres, weaving
            captivating narratives that transport readers into different worlds.
            With a love for crafting compelling characters and immersive plots,
            Shella brings stories to life—whether through thrilling mysteries,
            heartfelt romances, epic fantasies, or thought-provoking dramas.
            Always eager to push creative boundaries, Shella continues to write
            stories that entertain, inspire, and leave a lasting impact.
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ rotate: 4 }}
              animate={{
                rotate: [4, -4, 4],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              className="rounded-3xl border-5 shadow-xl ml-5 bg-gradient-to-tl from-blue-500 via-teal-600 to-indigo-800 p-1"
            >
              <Image
                src="/pp.jpg"
                alt="Shella Tams"
                width={240}
                height={200}
                className="rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Num />
      <Services />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="p-5"
      >
        <motion.h1
          className="text-3xl text-center font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text"
          whileHover={{ scaleX: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          Our Recent Works
        </motion.h1>
      </motion.div>

      <motion.div
        className="flex w-full justify-center gap-8 items-center p-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-full sm:w-auto p-4 sm:px-6 py-2 sm:py-3 shadow-xl font-bold text-blue-600 rounded-2xl text-center 
            ${
              selectedCategory === category
                ? "bg-gradient-to-bl from-blue-500 via-teal-600 to-indigo-800 text-white"
                : "bg-white hover:bg-gradient-to-r from-blue-500 to-indigo-800 hover:text-white"
            }`}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            custom={index}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {loading ? (
          <motion.p
            className="col-span-full text-center"
            variants={itemVariants}
          >
            <div>
              {" "}
              <Spinner />
              <h1>Loading...</h1>
            </div>
          </motion.p>
        ) : (
          <AnimatePresence>
            {filteredProjects.slice(0, 5).map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  y: -10,
                  transition: { duration: 1.3 },
                }}
                className="relative group"
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-lg shadow-xl border border-transparent transition-all duration-300 group-hover:opacity-75 group-hover:border-blue-600"
                  />
                  <motion.span
                    className="absolute bottom-0 text-center left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-800 px-3 py-1 sm:px-4 sm:py-2 rounded-b-lg text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0 },
                    }}
                  >
                    {project.title}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      <Experience />
      <Skills />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="p-5"
      >
        <motion.h1
          className="text-3xl text-center font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text"
          whileHover={{ scaleX: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          Our Recent Blogs
        </motion.h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {loading ? (
          <motion.p
            className="col-span-full text-center"
            variants={itemVariants}
          >
            <div>
              {" "}
              <Spinner2 />
              <h1>Loading...</h1>
            </div>
          </motion.p>
        ) : Array.isArray(filteredBlogs) && filteredBlogs.length > 0 ? (
          <AnimatePresence>
            {filteredBlogs.slice(0, 5).map((blog, index) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} passHref>
                <motion.div
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  className="relative"
                >
                  <motion.div
                    className="relative group overflow-hidden rounded-lg shadow-lg border border-transparent"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      width={300}
                      height={300}
                      className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-lg transition-all duration-300 group-hover:opacity-80 group-hover:border-blue-600"
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-800 px-3 py-2 text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="flex flex-col items-center text-center gap-1 sm:gap-[2px]">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <SlCalender className="text-base sm:text-lg" />
                          <span className="text-[10px] sm:text-xs">
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>
                        <h2 className="text-xs sm:text-sm font-medium">
                          {blog.title}
                        </h2>
                      </div>
                    </motion.span>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        ) : (
          <motion.div
            className="col-span-full text-center py-3 font-bold text-gray-700 dark:text-gray-200"
            variants={itemVariants}
          >
            No blogs available.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
