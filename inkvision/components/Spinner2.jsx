import React from "react";
import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <motion.div
        className="w-3 h-3 rounded-full bg-indigo-500"
        style={{
          boxShadow: `
            44px 0 0 0 #766DF4,
            31px 31px 0 2px #766DF4,
            0 44px 0 4px #766DF4,
            -31px 31px 0 6px #766DF4,
            -44px 0 0 8px #766DF4,
            -31px -31px 0 10px #766DF4,
            0 -44px 0 12px #766DF4
          `,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </div>
  );
}
