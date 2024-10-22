import { useEffect, useRef, useContext, useState } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { Howl } from "howler";
import { cn } from "@/lib/utils";

import { IsSoundUrlContext } from "@/components/IsSoundUrlContext";

const Player = () => {
  const bgmRef = useRef<Howl | null>(null);
  const audioRef = useRef<Howl | null>(null);
  const messageRef = useRef<Howl | null>(null);

  const [isMessage, setIsMessage] = useState(false);

  const { radioUrl, isLoading, isPlaying, setIsPlaying, messageResUrl } =
    useContext(IsSoundUrlContext);

  // 初回ロード時
  useEffect(() => {
    console.log("player 初回ロード bgm初期化");
    // 音声ファイルのロード (bgmRef)
    const bgmSound = new Howl({
      src: ["/bgm.mp3"],
      html5: true, // HTML5 オーディオを使用
      volume: 0.05,
      loop: true,
    });

    bgmRef.current = bgmSound;

    // コンポーネントがアンマウントされたときにサウンドを停止
    return () => {
      if (bgmRef.current) {
        bgmRef.current.stop();
        bgmRef.current.unload();
      }
      if (audioRef.current) {
        // 新しい Howl インスタンスのアンロード
        audioRef.current.stop();
        audioRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    console.log("1");
    // 停止中にradioUrlを取得したら再生
    if (radioUrl && !audioRef.current?.playing()) {
      const audioSound = new Howl({
        src: [radioUrl],
        html5: true,
        volume: 1,
        onend: () => {
          bgmRef.current?.pause();
          setIsPlaying(false);
        },
      });
      audioRef.current = audioSound;
      audioRef.current.play(); //　newRadio
      bgmRef.current?.play(); // BGM
      setIsPlaying(true);
    }
  }, [radioUrl]);

  useEffect(() => {
    console.log("2");

    if (messageResUrl) {
      if (audioRef.current?.playing()) {
        audioRef.current?.pause();
      }

      const messageSound = new Howl({
        src: [messageResUrl],
        html5: true,
        volume: 1,
        onend: () => {
          bgmRef.current?.pause();
          setIsPlaying(false);
        },
      });
      messageRef.current = messageSound;
      messageRef.current.play();
    }
  }, [messageResUrl]);

  const handlePlay = () => {
    // メッセージを停止中
    if (isMessage && messageRef.current) {
      messageRef.current.play();
      bgmRef.current?.play();
      setIsPlaying(true);
      setIsMessage(false);
    } else if (!isMessage && audioRef.current) {
      audioRef.current.play();
      bgmRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current?.playing()) {
      // 新しい Howl インスタンスを停止
      audioRef.current.pause();
      bgmRef.current?.pause();
      setIsPlaying(false);
    } else if (messageRef.current?.playing()) {
      messageRef.current.pause();
      bgmRef.current?.pause();
      setIsPlaying(false);
      setIsMessage(true);
    }
  };

  // const listenHandle = async () => {
  //   console.log(radioUrl);
  //   setIsLoading(true);
  //   try {
  //     // difyから
  //     const newsData = await getNews();
  //     console.log("newsData::" + newsData);
  //     // gptから
  //     const filePath = await getGpt(newsData, "newData");
  //     console.log(filePath);

  //     if (filePath) {
  //       setRadioUrl(filePath);
  //       console.log(radioUrl);
  //     }
  //   } catch (error) {
  //     console.error("Error ニュース台本の取得に失敗しました。:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <div
        className={cn(``, {
          "animate-wave": isPlaying,
        })}
      >
        {isLoading ? (
          <p>loading...</p>
        ) : isPlaying ? (
          <Button onClick={handleStop} className="bg-customOrange rounded-lg">
            <Pause className="w-4 h-4 mr-2" />
            停止
          </Button>
        ) : radioUrl ? (
          <Button onClick={handlePlay} className="bg-customOrange rounded-lg">
            <Play className="w-4 h-4 mr-2" />
            再生
          </Button>
        ) : (
          <Button
            // onClick={listenHandle}
            className={cn("bg-customOrange rounded-lg  animate-wave", {})}
          >
            聞いてみる
          </Button>
        )}
      </div>
      {/* <Button onClick={test1}>text1</Button> */}
      {/* <Button onClick={test2}>text2</Button> */}
    </>
  );
};

export default Player;
