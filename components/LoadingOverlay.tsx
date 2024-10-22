"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IsSoundUrlContext } from "./IsSoundUrlContext";

export default function LoadingOverlay() {
  const [noiseDataUrl, setNoiseDataUrl] = useState("");
  const { isLoading } = useContext(IsSoundUrlContext);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = Math.floor(Math.random() * 255);
          ctx.fillStyle = `rgba(${value},${value},${value},0.1)`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    setNoiseDataUrl(canvas.toDataURL());
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        backgroundImage: `url(${noiseDataUrl})`,
      }}
    >
      <motion.div
        animate={{
          y: [0, -30, 50],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          times: [0, 0.5, 1],
        }}
        className="w-44 h-44 bg-customOrange opacity-70 rounded-xl mr-4"
      />
      <motion.div
        animate={{
          y: [0, -50, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          times: [0, 0.8, 1],
        }}
        className="w-44 h-44 bg-green-400 opacity-70 rounded-xl mr-4"
      />
      <motion.div
        animate={{
          y: [0, -10, 30],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          times: [0, 0.2, 1],
        }}
        className="w-44 h-44 bg-pink-500 opacity-70 rounded-xl"
      />
    </motion.div>
  );
}
