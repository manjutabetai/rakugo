import { useRef, useEffect, useState, useContext } from "react";
import { Html } from "@react-three/drei";
import axios from "axios";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IsPlayContext } from "./page";

const MessageBoard = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const { isPlay, setIsPlay } = useContext(IsPlayContext);
  const [inputValue, setInputValue] = useState("");
  const [soundUrl, setSoundUrl] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const backSoundRef = useRef<Howl | null>(null);
  const speechSoundRef = useRef<Howl | null>(null);

  const formattedDate = useFormattedDate();

  useEffect(() => {
    if (backSoundRef.current) {
      backSoundRef.current.volume(volume);
    }
  }, [volume]);

  const startDify = async () => {
    console.log("input value: " + inputValue);

    setLoading(true);
    setResponse("");

    try {
      const difyRes = await fetch("/api/dify", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const difyData = await difyRes.json();
      if (difyData.result !== "No result found") {
        await getGpt(difyData, inputValue);
      } else {
        alert("ニュース原稿の取得に失敗しました。もう一度お願いします。");
      }
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setResponse("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const getGpt = async (prompt: string, inputValue: string) => {
    try {
      const response = await fetch("/api/openai", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt, inputValue: inputValue }),
      });

      // ステータスコードをログに出力
      console.log(
        "Fetch response status: ",
        response.status,
        response.statusText
      );
      if (!response.ok) {
        console.error(
          `Fetch error: ${response.status} - ${response.statusText}`
        );
        return;
      }

      console.log("getGpt response : " + response);
      const data = await response.json();
      const filePath = data.url;
      setSoundUrl(filePath);
      // speech(filePath);
    } catch (error) {
      console.error(error);
      setResponse("エラーが発生しました");
    }
  };

  const testSpeech = () => {
    speechSoundRef.current = new Howl({
      src: [
        "https://qowgsmftnhetuvgiudox.supabase.co/storage/v1/object/sign/audio-bucket/audio/2024-10-06T20-33-57-350Z?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdWRpby1idWNrZXQvYXVkaW8vMjAyNC0xMC0wNlQyMC0zMy01Ny0zNTBaIiwiaWF0IjoxNzI4MjQ2ODQyLCJleHAiOjE3MjgyNDk4NDJ9.PjJcp3ZP19T0ZQIFrnsunvqYURmidC1-jx1Ecfd6Pw8",
      ],
      onload: () => {
        console.log("音声ファイルが正常にロードされました");
        speechSoundRef.current?.play();
      },
      format: ["mp3"], // 音声ファイルの形式を指定（省略可）

      onloaderror: (id, error) => {
        console.error("音声のロード中にエラーが発生しました:", error);
      },
      onplayerror: (id, error) => {
        console.error("音声の再生中にエラーが発生しました:", error);
        // 再度再生を試みる
        if (speechSoundRef) {
          speechSoundRef.current?.play();
        }
      },
    });
  };

  const speech = (filePath: string) => {
    if (!filePath || typeof filePath !== "string") {
      console.error("再生するファイルパスが無効です:", filePath);
      return;
    }
    console.log("speech()が受け取ったurl::" + filePath);
    speechSoundRef.current = new Howl({
      src: [filePath],
      onload: () => {
        console.log("音声ファイルが正常にロードされました");
        speechSoundRef.current?.play();
      },
      onplayerror: (error) => {
        console.error("音声の再生中にエラーが発生しました:", error);
        speechSoundRef.current?.play(); // 自動的に再試行
      },
      onend: () => {
        console.log("音声の再生が終了しました");
        backSoundRef.current?.stop(); // 背景音を停止（必要であれば）
      },
      onloaderror: (id, error) => {
        console.error("音声のロード中にエラーが発生しました:", error);
      },
    });
    // startBack();
  };

  const startBack = () => {
    backSoundRef.current = new Howl({
      src: ["/rakugo/Sunny_Smiles.mp3"],
      // src: ["/rakugo/保護犬_2024-10-05T20-51-25-971Z.mp3"],
      onload: () => {
        backSoundRef.current?.play();
        setIsPlay(true);
      },
      onend: () => setIsPlay(false),
      volume: volume,
      loop: true,
    });
  };

  const soundStop = () => {
    setIsPlay(false);
    if (speechSoundRef.current?.playing()) {
      speechSoundRef.current.stop();
    }

    if (backSoundRef.current?.playing()) {
      backSoundRef.current.stop();
    }
  };
  useFrame(() => {
    // testSpeech();
  });
  return (
    <group position={[0, 1, -3]}>
      <Html position={[0, 0.5, 0.02]} transform occlude>
        <div className="w-full p-5 rounded-2xl backdrop-blur-md backdrop-brightness-75 bg-white bg-opacity-10 border border-white border-opacity-30 text-white overflow-hidden">
          <Input
            className="text-black"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={!inputValue}
            onClick={startDify}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "通信中..." : "送信"}
          </Button>
          {isPlay && (
            <Button className="ml-6" onClick={soundStop}>
              STOP
            </Button>
          )}
          {soundUrl && (
            <div>
              <audio controls src={soundUrl}></audio>
            </div>
          )}

          <div>
            <label htmlFor="volume">BGM:</label>
            <input
              type="range"
              id="volume"
              min="0"
              max=".2"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </Html>
    </group>
  );
};

const ScrollingTitle = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const animationDuration = scrollWidth / 50;

      container.style.setProperty("--scroll-width", `${scrollWidth}px`);
      container.style.setProperty(
        "--animation-duration",
        `${animationDuration}s`
      );
    }
  }, [title]);

  return (
    <div
      ref={containerRef}
      className="whitespace-nowrap overflow-hidden relative"
      onClick={onClick}
    >
      <div className="inline-block animate-scroll">
        <p className="inline-block px-4">{title}</p>
      </div>
      <div className="inline-block animate-scroll">
        <p className="inline-block px-4">{title}</p>
      </div>
    </div>
  );
};
import React, { useCallback } from "react";
import { useFrame } from "@react-three/fiber";

interface InputSectionProps {
  inputValue: string;
  loading: boolean;
  handleClick: () => void;
  soundStop: () => void;
  onInputChange: (value: string) => void;
  isPlay: boolean;
}

const InputSection = ({
  inputValue,
  loading,
  handleClick,
  isPlay,
  soundStop,
  onInputChange,
}: InputSectionProps) => {
  const [composing, setComposing] = React.useState(false);

  const handleInput = (e: any) => {
    console.log(e);
    if (composing) {
      console.log("入力中");
    } else {
      console.log("入力確定");
    }
  };

  return (
    <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-lg w-full">
      <Label
        htmlFor="3d-input"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        ペラペララジオ
      </Label>
      <div className="flex space-x-2">
        <Input
          id="3d-input"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)} // 変更点
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          type="text"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          placeholder="お題を入力してください..."
        />
        <Button
          disabled={!inputValue}
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "通信中..." : "送信"}
        </Button>
        {isPlay && (
          <Button className="ml-6" onClick={soundStop}>
            STOP
          </Button>
        )}
      </div>
    </div>
  );
};

const useFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export default MessageBoard;
