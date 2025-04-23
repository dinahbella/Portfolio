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
            <p className="text-sm font-normal font-mono text-center p-10 text-wrap">
              We turn your ideas into captivating fiction for Webnovels and
              Amazon. Our team crafts stories that hook readers and keep them
              coming back.
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
              📚 Romance Writing
              <p>
                From sweet to steamy, we craft love stories that connect with
                readers{" "}
              </p>
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📜 Series Development
              <p>
                Structured narratives designed for multiple episodes or books
              </p>
            </div>
            <div className=" hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📢 Platform-Optimized Content
              <p>Stories formatted perfectly for webnovels and Amazon</p>
            </div>
            <div className=" hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              📑 Editing & Proofreading
              <p>Polishing your existing work to professional standards</p>
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              🎨 Book Cover Design{" "}
              <p>
                {" "}
                Eye-catching covers that attract readers and complement your
                story
              </p>
            </div>
            <div className="  hover:bg-gradient-to-bl bg-gradient-to-r  from-blue-500 to-indigo-800 p-4 rounded-lg text-white font-mono text-center">
              🌎 World Creation Assistance
              <p>
                Detailed world-building guidance and development for your
                fictional universe
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
