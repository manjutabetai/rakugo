import { Play, Pause, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { IsPlayContext } from "@/app/page";
import { Howl, Howler } from "howler";
import { Post } from "@/types/Post";

type Props = {
  post: Post;
};
const PostPlayer = ({ post }: Props) => {
  const soundUrl = post.audio_url;
  const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);
  const { isPlay, setIsPlay } = useContext(IsPlayContext);

  // 音声ファイルの削除
  const handleDelete = () => {
    console.log("音声ファイルが削除されました");
  };

  useEffect(() => {
    // Howオブジェクト作成しrefに持たせる
    if (soundUrl) {
      const newSound = new Howl({
        src: [soundUrl],
        html5: true,
        format: "mp3",
        onload: () => {
          console.log("音声ファイルが正常にロードされました");
          // newSound.play(); //自動プレイ
        },
        onloaderror: (id, error) => {
          console.error("音声のロード中にエラーが発生しました:", error);
        },
        onplayerror: (id, error) => {
          console.error("音声の再生中にエラーが発生しました:", error);
          newSound.play(); // 自動的に再試行
        },
        onend: () => {
          console.log("音声の再生が終了しました");
          setIsPlay(false);
        },
      });
      setSpeechSoundRef(newSound);
    }
  }, [soundUrl]);

  const handleClick = () => {
    if (soundUrl && speechSoundRef) {
      if (speechSoundRef.playing()) {
        speechSoundRef.pause();
        setIsPlay(false);
      } else {
        speechSoundRef.play();
        setIsPlay(true);
      }
    } else {
      console.error("Howlでエラーが出ました");
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent ">
      {/* 再生・一時停止ボタン */}
      <button
        onClick={handleClick}
        className="button p-2 rounded-full hover:shadow-inset transition-shadow duration-200 focus:outline-none  focus:ring-customYellow"
        aria-label={isPlay ? "一時停止" : "再生"}
      >
        {speechSoundRef?.playing() ? (
          <Pause
            size={20}
            strokeWidth={2}
            className="text-[#c7c7c7] hover:text-customYellow"
          />
        ) : isPlay ? (
          <EyeOff
            size={20}
            strokeWidth={3}
            className="text-[#c7c7c7] hover:text-customYellow opacity-50 cursor-not-allowed" // 非活性化
          />
        ) : (
          <Play
            size={20}
            strokeWidth={3}
            className="text-[#c7c7c7] hover:text-customYellow"
          />
        )}
      </button>
    </div>
  );
};

export default PostPlayer;
