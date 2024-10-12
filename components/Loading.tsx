"use client";

import { motion } from "framer-motion";

export default function ColorfulSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 via-pink-700 to-red-700">
      <motion.div
        className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["50%", "30%", "50%", "30%", "50%"],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />
    </div>
  );
}
