import React from "react";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          <h1 className="text-3xl mt-5 text-center font-bold bg-gradient-to-br  from-blue-500 via-teal-600 to-indigo-800 text-transparent hover:scale-x-115 duration-500 bg-clip-text">
            Our Quality Services{" "}
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
      <div className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="space-y-6"
        >
          {/* Services Grid */}
          <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
            <div className=" hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📖 Content Writing & Blogging
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📚 Creative Writing
            </div>
            <div className=" hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📢 Copywriting & Marketing
            </div>
            <div className=" hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📑 Editing & Proofreading
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📜 Technical & Academic Writing
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r  from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              🎙 Scriptwriting & Speech Writing
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
