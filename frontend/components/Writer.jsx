import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, Users, BarChart2, ArrowRight } from "lucide-react";

export default function Writer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const benefits = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Creative Freedom",
      description: "Express your unique voice and style",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Growing Audience",
      description: "Reach thousands of engaged readers",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Performance Insights",
      description: "Track your article performance",
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900/90 dark:to-gray-800/90" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-200/70 dark:border-gray-700/50"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <PenTool className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                WRITER OPPORTUNITY
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Passionate About Writing?
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Join our growing community of creative writers and contribute to
              our platform. Share your voice, grow your audience, and get the
              exposure you deserve.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href="https://surveyheart.com/form/6808a8249626186679d72dbc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Apply to be a Writer
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Benefits */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
