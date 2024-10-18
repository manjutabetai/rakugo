import { useState, useEffect, useContext } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatar from "@/public/avatar.jpg";
import { IsPlayContext } from "@/app/page";
export default function RadioHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);
  const { isPlay, setIsPlay } = useContext(IsPlayContext);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const soundPath = "/271_long_BPM110.mp3";

  useEffect(() => {
    if (!speechSoundRef) {
      const newSound = new Howl({
        src: [soundPath],
        html5: true,
        format: "mp3",
        onload: () => console.log("音声ファイルが正常にロードされました"),
        onend: () => {
          console.log("音声の再生が終了しました");
          setIsPlay(false);
        },
      });
      setSpeechSoundRef(newSound);
    }

    // コンポーネントがアンマウントされたらクリーンアップ
    return () => {
      speechSoundRef?.unload();
    };
  }, [speechSoundRef, setIsPlay]);

  const handleClick = () => {
    if (soundPath && speechSoundRef) {
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
    <div className="w-full bg-customWhite ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <div className="bg-customRed text-white px-3 py-1 rounded-full text-sm font-semibold">
              NOW ON AIR
            </div>
            <div className="text-sm">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 py-2">
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
            <Image src={avatar} alt="Album art" width={60} height={60} />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold">アナログな水平線 897</h2>
            <p className="text-sm text-gray-600">KIKIMIMI Radio</p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="bg-customRed text-white  py-2 flex items-center space-x-2 justify-center w-32
            "
              style={{ borderRadius: "4px" }}
            >
              <span className="font-semibold">{isPlay ? "Pause" : "Play"}</span>{" "}
              {isPlay ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleClick}
                  className="rounded-full"
                >
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleClick}
                  className="rounded-full"
                >
                  <Play className="h-4 w-4 " />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="py-2 overflow-hidden bg-customYellow">
          <MarqueeText
            text="募集中!!: 「あなたの話、聞かせてください」
仕事、恋愛、人間関係…モヤモヤしてる？そんな時は、パーソナリティにメッセージを送ってみて！今の気持ち、言葉にしてみませんか？"
          />
        </div>
      </div>
    </div>
  );
}

function MarqueeText({ text }: { text: string }) {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap py-2">
        <span className="text-lg mx-4">{text}</span>
        {/* <span className="text-lg mx-4">{text}</span> */}
      </div>
      {/* <div className="absolute top-0  animate-marquee2 whitespace-nowrap py-2">
        <span className="text-lg text-white mx-4">{text}</span>
        <span className="text-lg text-white mx-4">{text}</span>
      </div> */}
    </div>
  );
}
