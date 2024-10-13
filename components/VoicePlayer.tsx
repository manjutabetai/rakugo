import { Play, Pause, Trash } from "lucide-react";
import { useState, useContext } from "react";
import { IsPlayContext } from "@/app/page";

const VoicePlayer = () => {
  const { isPlay, setIsPlay, soundUrl, setSoundUrl, isLoading, setIsLoading } =
    useContext(IsPlayContext);

  // togglePlay関数のリファクタリング
  const togglePlay = () => {
    setIsPlay(!isPlay); // 以前の値を基にトグル
  };

  // 削除のロジック
  const handleDelete = () => {
    console.log("音声ファイルが削除されました");
    setSoundUrl(""); // soundUrlを空にする
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-full shadow-md p-2 w-32">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label={isPlay ? "一時停止" : "再生"}
      >
        {isPlay ? (
          <Pause size={24} strokeWidth={2} className="text-blue-600" />
        ) : (
          <Play size={24} strokeWidth={2} className="text-blue-600" />
        )}
      </button>
      <div className="h-8 w-px bg-gray-300"></div>
      <button
        onClick={handleDelete}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="削除"
      >
        <Trash size={24} strokeWidth={2} className="text-red-500" />
      </button>
    </div>
  );
};

export default VoicePlayer;
