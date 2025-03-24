import React from "react";
import { motion } from "framer-motion";
import { IoDiamondSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";

export default function Experience() {
  const experienceItems = [
    {
      id: 1,
      period: "2020 - Present",
      company: "DINAH SOLUTION",
      role: "Fiction Writing",
    },
    {
      id: 2,
      period: "2018 - 2020",
      company: "XYZ COMPANY",
      role: "Web Development",
    },
    {
      id: 3,
      period: "2016 - 2018",
      company: "ABC AGENCY",
      role: "Content Creation",
    },
    {
      id: 4,
      period: "2014 - 2016",
      company: "FREELANCE",
      role: "Creative Writing",
    },
  ];

  const educationItems = [
    {
      id: 1,
      period: "2016 - 2018",
      institution: "DI University of XYZ",
      degree: "Bachelor's in Literature",
    },
    {
      id: 2,
      period: "2011 - 2015",
      institution: "High School ABC",
      degree: "Diploma in Arts",
    },
    {
      id: 3,
      period: "2020 - Present",
      institution: "Online Courses",
      degree: "Advanced Writing Techniques",
    },
    {
      id: 4,
      period: "2019 - 2020",
      institution: "Creative Writing Institute",
      degree: "Professional Certification",
    },
  ];

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
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text">
              My Experience
            </h1>
          </div>

          <div className="space-y-4">
            {experienceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3, delay: index * 0.5 }}
                className="p-4 shadow-xl rounded-lg 
                bg-[linear-gradient(to_bottom_right,rgba(59,130,246,0.3),rgba(34,197,94,0.3),rgba(79,70,229,0.3))]
                dark:bg-[linear-gradient(to_bottom_right,rgba(29,78,216,0.5),rgba(21,128,61,0.5),rgba(55,48,163,0.5))]"
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

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex gap-3 justify-center lg:justify-start items-center hover:scale-105 transition-transform duration-300">
            <FaGraduationCap className="text-3xl text-teal-500" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text">
              My Education
            </h1>
          </div>

          <div className="space-y-4">
            {educationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 shadow-xl rounded-lg 
                bg-[linear-gradient(to_bottom_right,rgba(59,130,246,0.3),rgba(34,197,94,0.3),rgba(79,70,229,0.3))]
                dark:bg-[linear-gradient(to_bottom_right,rgba(29,78,216,0.5),rgba(21,128,61,0.5),rgba(55,48,163,0.5))]"
              >
                <div>
                  <h2 className="font-bold text-lg text-blue-800 dark:text-blue-300">
                    {item.period}
                  </h2>
                  <h1 className="font-bold text-gray-900 dark:text-white text-xl">
                    {item.institution}
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.degree}
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
