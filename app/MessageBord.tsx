"use client";

import { useRef, useEffect, useState, useCallback, useContext } from "react";
import { Html } from "@react-three/drei";
import axios from "axios";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { context } from "@react-three/fiber";
import { IsPlayContext } from "./page";

type Props = {
  title1: string;
  title2: string;
  title3: string;
};

const MessageBoard = ({ title1, title2, title3 }: Props) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const { isPlay, setIsPlay } = useContext(IsPlayContext);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const backSoundRef = useRef<Howl | null>(null);
  const speechSoundRef = useRef<Howl | null>(null);

  const formattedDate = useFormattedDate();

  const updateInputValue = useCallback(() => {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.addEventListener("input", updateInputValue);
      return () => {
        input.removeEventListener("input", updateInputValue);
      };
    }
  }, [inputRef.current]);

  useEffect(() => {
    if (backSoundRef.current) {
      backSoundRef.current.volume(volume);
    }
  }, [volume]);

  const handleClick = async () => {
    console.log("input value: " + inputValue);

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("/api/dify", { prompt: inputValue });
      await getGpt(res.data.result);
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setResponse("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const getGpt = async (text: string) => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      console.log("gpy response: " + response);
      const data = await response.json();
      setResponse(data.result);
      speech();
    } catch (error) {
      console.error(error);
      setResponse("エラーが発生しました");
    }
  };

  const speech = () => {
    speechSoundRef.current = new Howl({
      src: ["/rakugo/speech.mp3"],
      onload: () => speechSoundRef.current?.play(),
      onend: () => backSoundRef.current?.stop(),
    });
    startBack();
  };

  const startBack = () => {
    backSoundRef.current = new Howl({
      src: ["/rakugo/Sunny_Smiles.mp3"],
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

  return (
    <group position={[0, 1, -3]}>
      <Html position={[0, 0.5, 0.02]} transform occlude>
        <div className="w-full p-5 rounded-2xl backdrop-blur-md backdrop-brightness-75 bg-white bg-opacity-10 border border-white border-opacity-30 text-white overflow-hidden">
          <h1 className="text-sm font-bold mb-2">{formattedDate}</h1>
          <ScrollingTitle title={title1} onClick={() => {}} />
          <ScrollingTitle title={title2} onClick={() => {}} />
          <ScrollingTitle title={title3} onClick={() => {}} />
          <InputSection
            inputRef={inputRef}
            loading={loading}
            handleClick={handleClick}
            isPlay={isPlay}
            soundStop={soundStop}
            inputValue={inputValue}
          />
          {/* 音量調整 */}
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

interface InputSectionProps {
  inputRef: React.RefObject<HTMLInputElement>;
  loading: boolean;
  handleClick: () => void;
  soundStop: () => void;
  isPlay: boolean;
  inputValue: string;
}

const InputSection = ({
  inputRef,
  loading,
  handleClick,
  isPlay,
  soundStop,
  inputValue,
}: InputSectionProps) => (
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
        ref={inputRef}
        type="text"
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        placeholder="お題を入力してください..."
      />
      <Button
        disabled={inputValue ? false : true}
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

const useFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export default MessageBoard;
