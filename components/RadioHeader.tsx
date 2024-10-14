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

  const handlePlay = () => {
    const newSound = new Howl({
      src: ["/271_long_BPM110.mp3"],
      html5: true,
      format: "mp3",

      onload: () => {
        console.log("音声ファイルが正常にロードされました");
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
    speechSoundRef?.volume(0.5);
    speechSoundRef?.play();
    setIsPlay(true);
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
            <div className="bg-[#f4a7a7] text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <span className="font-semibold">Play</span>
              {isPlay ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handlePlay}
                  className="rounded-full"
                >
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handlePlay}
                  className="rounded-full"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="py-2 overflow-hidden bg-[#f4a7a7]">
          <MarqueeText text="現在放送中: 真面目に、でも笑いながら。パーソナリティが優しく答えるラジオ相談室" />
        </div>
      </div>
    </div>
  );
}

function MarqueeText({ text }: { text: string }) {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap py-2">
        <span className="text-lg text-white mx-4">{text}</span>
        <span className="text-lg text-white mx-4">{text}</span>
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2">
        <span className="text-lg text-white mx-4">{text}</span>
        <span className="text-lg text-white mx-4">{text}</span>
      </div>
    </div>
  );
}
