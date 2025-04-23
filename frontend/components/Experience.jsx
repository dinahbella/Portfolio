import React from "react";
import { motion } from "framer-motion";
import { IoDiamondSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";

export default function Experience() {
  const experienceItems = [
    {
      id: 1,
      period: "2 - 5 Years",
      company: "Various Web Novel Platforms",
      role: "Our writers are experienced professionals passionate about storytelling.",
    },
    {
      id: 2,
      period: "Signed Contracts",
      company: "Webnovel, Dreame, etc.",
      role: "All writers are verified and signed on global writing platforms.",
    },
    {
      id: 3,
      period: "Proven Writing History",
      company: "Previous Works",
      role: "Our writers have a consistent track record of delivering quality stories.",
    },
    {
      id: 4,
      period: "Creative Excellence",
      company: "Inkvision",
      role: "We have a history of successful publications and reader engagement.",
    },
  ];

  const assistanceItems = [
    {
      id: 1,
      period: "Support Agent",
      institution: "Yamini",
      degree: "WhatsApp ",
    },
    {
      id: 2,
      period: "Support Agent",
      institution: " Jane",
      degree: "https://wa.me/2349070629472",
    },
    {
      id: 3,
      period: "Support Agent",
      institution: "Heppie",
      degree: "WhatsApp ",
    },
    {
      id: 4,
      period: "Support Agent",
      institution: "Tatiana",
      degree: "WhatsApp ",
    },
  ];

  const cardStyle =
    "p-4 shadow-xl rounded-lg bg-[linear-gradient(to_bottom_right,rgba(59,130,246,0.3),rgba(34,197,94,0.3),rgba(79,70,229,0.3))] dark:bg-[linear-gradient(to_bottom_right,rgba(29,78,216,0.5),rgba(21,128,61,0.5),rgba(55,48,163,0.5))]";

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="space-y-6"
        >
          <div className="flex gap-3 justify-center lg:justify-start items-center hover:scale-105 transition-transform duration-300">
            <IoDiamondSharp className="text-3xl text-teal-500" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
              Writers Qualification
            </h1>
          </div>

          <div className="space-y-4">
            {experienceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3, delay: index * 0.5 }}
                className={cardStyle}
              >
                <div>
                  <h2 className="font-bold text-lg text-blue-800 dark:text-blue-300">
                    {item.period}
                  </h2>
                  <h1 className="font-bold text-gray-900 dark:text-white text-xl">
                    {item.company}
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Assistance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col lg:flex-row gap-3 justify-center lg:justify-start items-center hover:scale-105 transition-transform duration-300 text-center lg:text-left">
            <FaGraduationCap className="text-3xl text-teal-500" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text">
              Writers Assistance
              <br className="hidden lg:block" />
            </h1>
          </div>

          <div className="space-y-4">
            {assistanceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cardStyle}
              >
                <div>
                  <h2 className="font-bold text-lg text-blue-800 dark:text-blue-300">
                    {item.period}
                  </h2>
                  <h1 className="font-bold text-gray-900 dark:text-white text-xl">
                    {item.institution}
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.degree.startsWith("http") ? (
                      <a
                        href={item.degree}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.degree}
                      </a>
                    ) : (
                      item.degree
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
