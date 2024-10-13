import { Play, Pause, Trash } from "lucide-react";
import { useContext } from "react";
import { IsPlayContext } from "@/app/page";

const VoicePlayer = () => {
  const { isPlay, setIsPlay, soundUrl, setSoundUrl, isLoading, setIsLoading } =
    useContext(IsPlayContext);

  // 再生・一時停止の切り替え
  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  // 音声ファイルの削除
  const handleDelete = () => {
    console.log("音声ファイルが削除されました");
    setSoundUrl(""); // soundUrlを空にする
  };

  return (
    <div
      className="flex items-center justify-between bg-customWhite rounded-full p-2 w-40 mx-auto mt-8"
      style={{
        boxShadow: "inset 7px 7px 14px #c7c7c7, inset -7px -7px 14px #f8f8f8",
      }}
    >
      {/* 再生・一時停止ボタン */}
      <button
        onClick={togglePlay}
        className="button p-2 rounded-full hover:shadow-inset transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-customRed"
        aria-label={isPlay ? "一時停止" : "再生"}
      >
        {isPlay ? (
          <Pause
            size={24}
            strokeWidth={2}
            className="text-[#c7c7c7] hover:text-customYellow"
          />
        ) : (
          <Play
            size={24}
            strokeWidth={2}
            className="text-[#c7c7c7] hover:text-customYellow"
          />
        )}
      </button>

      <div className="h-8 w-px bg-gray-300"></div>

      {/* 削除ボタン */}
      <button
        onClick={handleDelete}
        className="button p-2 rounded-full"
        aria-label="削除"
      >
        <Trash
          size={24}
          strokeWidth={2}
          className="text-[#c7c7c7] hover:text-customYellow"
        />
      </button>
    </div>
  );
};

export default VoicePlayer;
