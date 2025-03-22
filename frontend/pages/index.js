import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { motion } from "framer-motion";

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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-gray-800">I am Shella Tams</h3>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text">
            Writer + <br />
            Designer
          </h1>
          <p className="text-md text-gray-700 leading-relaxed">
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
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="space-y-6"
        >
          <div className="flex justify-center md:justify-end">
            <Image
              src="/pp.jpg" // Replace with your actual image path
              alt="Shella Tams"
              width={200}
              height={200}
              className="rounded-3xl transform rotate-4 shadow-xl border-4 ml-5 border-blue-500"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
