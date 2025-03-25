import React from "react";
import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <motion.div
        className="w-12 h-12 rounded-full bg-indigo-500"
        style={{
          WebkitMask:
            "radial-gradient(circle closest-side at 50% 40%, #0000 94%, #000)",
          mask: "radial-gradient(circle closest-side at 50% 40%, #0000 94%, #000)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
