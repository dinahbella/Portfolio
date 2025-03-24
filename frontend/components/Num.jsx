import React from "react";
import { motion } from "framer-motion";

export default function Num() {
  return (
    <div>
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
    </div>
  );
}
