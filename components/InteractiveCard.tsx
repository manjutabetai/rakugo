"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/Post";

type Props = {
  posts: Post[];
};

export default function InteractiveCards({ posts }: Props) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <div className="relative min-h-screen p-8 bg-gray-100">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity:
                  selectedCard === null || selectedCard === post.id ? 1 : 0.5,
                scale: selectedCard === post.id ? 1.1 : 1,
                transition: { duration: 0.3 },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`cursor-pointer bg-white rounded-lg shadow-md overflow-hidden ${
                selectedCard === post.id
                  ? "fixed inset-0 m-auto z-50 w-4/5 h-3/5 max-w-2xl max-h-96"
                  : "h-48"
              }`}
              onClick={() => handleCardClick(post.id)}
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.input_value}</h2>
                <p>{post.prompt}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="fixed top-4 right-4 z-50"
              variant="outline"
              size="icon"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleClose}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
