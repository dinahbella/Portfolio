import React from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    {
      id: 1,
      name: "Technical Writing",
      percent: "90%",
    },
    {
      id: 2,
      name: "Marketing Knowledge",
      percent: "95%",
    },
    {
      id: 3,
      name: "Storytelling",
      percent: "98%",
    },
    {
      id: 4,
      name: "Adaptability",
      percent: "90%",
    },
    {
      id: 5,
      name: "Productivity",
      percent: "93%",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
              Our Skills
            </h1>
          </motion.div>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto p-6">
            We combine strong grammar, creativity, and editing with time
            management and storytelling to craft engaging content. Our knowledge
            of publishing, marketing, and SEO ensures it reaches the right
            audience.
          </p>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
                whileHover={{ scale: 1.03 }}
                className="p-4 sm:p-5 shadow-lg rounded-xl 
                  bg-gradient-to-br from-blue-50/50 via-teal-50/50 to-indigo-50/50
                  dark:from-blue-900/20 dark:via-teal-900/20 dark:to-indigo-900/20
                  border border-gray-200 dark:border-gray-700 hover:bg-[linear-gradient(to_bottom_right,rgba(59,130,246,0.3),rgba(34,197,94,0.3),rgba(79,70,229,0.3))]
                hover:dark:bg-[linear-gradient(to_bottom_right,rgba(29,78,216,0.5),rgba(21,128,61,0.5),rgba(55,48,163,0.5))]"
              >
                <div className="text-center">
                  <h2 className="font-bold text-base sm:text-lg text-blue-700 dark:text-blue-300 mb-2">
                    {skill.name}
                  </h2>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full"
                      style={{ width: skill.percent }}
                    ></div>
                  </div>
                  <p className="mt-2 font-bold text-gray-800 dark:text-white text-lg">
                    {skill.percent}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
