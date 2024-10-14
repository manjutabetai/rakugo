"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/Post";
import PostPlayer from "./PostPlayer";
import { IsPlayContext } from "@/app/page";
type Props = {
  posts: Post[];
};

export default function InteractiveCards({ posts }: Props) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const { isPlay, setIsPlay } = useContext(IsPlayContext);

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(null);
    setIsPlay(false);
  };

  return (
    <div className="relative min-h-full w-full p-8 bg-customYellow">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <div
            className="flex justify-between items-center bg-customWhite p-4 relative"
            style={{ borderRadius: "10px" }}
          >
            <h1>{post.input_value.substring(0, 30)} ...</h1>
            <div className="absolute bottom-0 right-0">
              <PostPlayer post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
