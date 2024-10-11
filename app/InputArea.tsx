"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IsPlayContext } from "./page";

const InputArea = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [inputValue, setInputValue] = useState("");
  const { isPlay, setIsPlay, soundUrl, setSoundUrl } =
    useContext(IsPlayContext);

  const backSoundRef = useRef<Howl | null>(null);

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
        "Fetch response status:",
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

  const test = () => {
    setSoundUrl("aaa");
  };
  return (
    <div className="w-full max-w-md p-8 rounded-xl mb-10 bg-black bg-opacity-50 backdrop-blur-xl shadow-2xl border border-opacity-30 border-pink-300 animate-pulse-slow">
      <Textarea
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="あなたの失敗を教えてください。"
        className="w-full h-32 mb-4 bg-transparent text-pink-300 placeholder-pink-500 border-2 border-pink-500 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out resize-none"
        maxLength={200}
      />
      <Button
        disabled={!inputValue}
        onClick={startDify}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? "通信中..." : "送信"}
      </Button>

      <Button className="ml-6" onClick={test}>
        test
      </Button>

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
import { Textarea } from "@/components/ui/textarea";

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

export default InputArea;
