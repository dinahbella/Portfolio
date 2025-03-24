import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import Num from "@/components/Num";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const categories = ["All", "Blogs", "Projects", "Book Covers"];
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false); // Fix: should be a boolean

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

        // Ensure both are arrays before setting state
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Fix: should use setSelectedCategory
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
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            I am Shella Tams
          </h3>
          <h1 className="text-5xl font-bold bg-gradient-to-r hover:scale-y-115 duration-500 from-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text">
            Writer + <br /> Designer
          </h1>
          <p className="text-md text-gray-700 leading-relaxed dark:text-gray-200">
            Shella is a passionate storyteller who explores all genres, weaving
            captivating narratives...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <div className="flex justify-center ">
            <Image
              src="/pp.jpg"
              alt="Shella Tams"
              width={240}
              height={200}
              className="rounded-3xl transform rotate-4 border-5 hover:translate-3.5 duration-500 transition-all shadow-xl ml-5 bg-gradient-to-tl from-blue-500 via-teal-600 to-indigo-800 p-1"
            />
          </div>
        </motion.div>
      </div>

      <Num />
      <Services />

      <div className="p-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <h1 className="text-3xl text-center font-bold bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text">
            My Recent Works
          </h1>
        </motion.div>
      </div>

      <div className="flex w-full justify-center gap-8 items-center p-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-full sm:w-auto p-4 sm:px-6 py-2 sm:py-3 shadow-xl font-bold text-blue-600 rounded-2xl transition-all duration-300 text-center
            ${
              selectedCategory === category
                ? "bg-gradient-to-bl from-blue-500 via-teal-600 to-indigo-800 text-white"
                : "bg-white hover:bg-gradient-to-r from-blue-500 to-indigo-800 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProjects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.4,
                ease: "easeOut",
              }}
              className="relative group"
            >
              <Image
                src={project.image}
                alt={project.name}
                width={200}
                height={250}
                className="p-2 shadow-xl bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-800 border-transparent rounded-lg"
              />
            </motion.div>
          ))
        )}
      </div>

      <Experience />
      <Skills />

      <div className="p-5">
        <h1 className="text-3xl text-center font-bold bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text">
          Recent Blogs
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center p-4">
        {Array.isArray(allwork) && allwork.length > 0 ? (
          allwork.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <Image
                src={blog.image}
                alt={blog.name}
                width={200}
                height={250}
              />
            </Link>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}
