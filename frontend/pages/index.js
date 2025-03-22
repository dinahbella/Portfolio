import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { X } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
        {/* Text Content */}
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
            Writer + <br />
            Designer
          </h1>
          <p className="text-md text-gray-700 leading-relaxed dark:text-gray-200">
            Shella is a passionate storyteller who explores all genres, weaving
            captivating narratives that transport readers into different worlds.
            With a love for crafting compelling characters and immersive plots,
            Shella brings stories to life—whether through thrilling mysteries,
            heartfelt romances, epic fantasies, or thought-provoking dramas.
            Always eager to push creative boundaries, Shella continues to write
            stories that entertain, inspire, and leave a lasting impact.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <div className="flex justify-center ">
            <Image
              src="/pp.jpg" // Replace with your actual image path
              alt="Shella Tams"
              width={200}
              height={200}
              className="rounded-3xl transform rotate-4  hover:translate-3.5 duration-500 transition-all shadow-xl border-4 ml-5 border-blue-500"
            />
          </div>
        </motion.div>
      </div>
      <div className="p-4 mt-10 w-full flex flex-col items-center hover:scale-x-110 duration-500">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 5 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {/* Year of Experience */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-bold text-3xl md:text-4xl">2 +</h2>
            <p className="text-sm md:text-base">
              Years of <br /> Experience
            </p>
          </div>

          {/* Projects Completed */}
          <div className="flex flex-col items-center gap-1 ">
            <h2 className="font-bold text-3xl md:text-4xl">20 +</h2>
            <p className="text-sm md:text-base">
              Projects <br /> Completed
            </p>
          </div>

          {/* Open Library */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-bold text-3xl md:text-4xl">12 +</h2>
            <p className="text-sm md:text-base">
              Open <br /> Library
            </p>
          </div>

          {/* Happy Customers */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-bold text-3xl md:text-4xl">20 +</h2>
            <p className="text-sm md:text-base">
              Happy <br /> Customers
            </p>
          </div>
        </motion.div>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <h1 className="text-3xl mt-5 text-center font-bold bg-gradient-to-br  from-blue-500 to-green-500 text-transparent hover:scale-x-115 duration-500 bg-clip-text">
            My Quality Services{" "}
          </h1>
          <div className="w-full p-2">
            {/* Description Section */}
            <p className="text-sm font-normal font-mono text-center p-2 text-wrap">
              We have the ability to shape ideas into impactful words, whether
              for businesses, individuals, or entertainment. Your work can
              involve creating blog posts, articles, and website content that
              inform and inspire, or developing fictional stories, scripts, and
              poetry that transport audiences to different worlds.
            </p>
          </div>
        </motion.div>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          {/* Services Grid */}
          <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
            {/* Content Writing & Blogging */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📖 Content Writing & Blogging
            </div>

            {/* Creative Writing */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📚 Creative Writing
            </div>

            {/* Copywriting & Marketing */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📢 Copywriting & Marketing
            </div>

            {/* Editing & Proofreading */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📑 Editing & Proofreading
            </div>

            {/* Technical & Academic Writing */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📜 Technical & Academic Writing
            </div>
            <div className="bg-gradient-to-r  from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              🎙 Scriptwriting & Speech Writing
            </div>
          </div>
        </motion.div>
      </div>
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <h1 className="text-3xl text-center font-bold bg-gradient-to-br  from-blue-500 to-green-500 text-transparent hover:scale-x-115 duration-500 bg-clip-text">
            My Recent Works{" "}
          </h1>
          <p className="text-sm font-normal font-mono text-center p-2 text-wrap">
            Whether you focus on creative projects, business communication, or
            professional writing, your words hold the power to inform, persuade,
            and entertain.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
