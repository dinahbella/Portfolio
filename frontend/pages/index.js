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
import Testimonials from "@/components/Testimonials";
import { GrLinkNext } from "react-icons/gr";

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
          id="works"
          className=" text-3xl text-center font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text"
          whileHover={{ scaleX: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          Our Recent Projects
        </motion.h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 max-w-7xl mx-auto"
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
            <motion.h1
              className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading projects...
            </motion.h1>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredProjects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                className="relative group"
                layout
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={400}
                    height={400}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 2} // Only prioritize first 2 images
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{
                      y: 0,
                      transition: { delay: 0.1 },
                    }}
                  >
                    <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
                      {project.title}
                    </h3>
                    {project.category && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-600 rounded-md">
                        {project.category}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* See All Projects Button */}
        <motion.div
          className="col-span-full mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/projects" passHref>
            <motion.div
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 flex justify-center items-center gap-2 rounded-xl max-w-xs mx-auto transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <GrLinkNext className="text-xl" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      <Experience />
      <Skills />

      <div>
        <Testimonials />
      </div>
    </div>
  );
}
