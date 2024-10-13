"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { Howl } from "howler";
import { Button } from "@/components/ui/button";
import { IsPlayContext } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { Canvas } from "@react-three/fiber";
import Blob from "./_blobs/Blob";
import VoicePlayer from "@/components/VoicePlayer";

import { OrbitControls } from "@react-three/drei";

const InputArea = () => {
  const [response, setResponse] = useState("");
  const [volume, setVolume] = useState(0.05);
  const [inputValue, setInputValue] = useState("");

  const { isPlay, setIsPlay, soundUrl, setSoundUrl, isLoading, setIsLoading } =
    useContext(IsPlayContext);

  const backSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (backSoundRef.current) {
      backSoundRef.current.volume(volume);
    }
  }, [volume]);

  const startDify = async () => {
    setIsLoading(true);
    console.log("input value: " + inputValue);

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setResponse("エラーが発生しました。もう一度お試しください。");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
    <div className="flex h-[300px] flex-col justify-end w-full px-12 pb-4 ml-4 rounded-xl backdrop-blur-xl shadow-2xl">
      <div>
        {!isLoading && !soundUrl && (
          <Textarea
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="相談したいことを入力してください。"
            className="w-full h-32 mb-4 bg-customWhite border-gray-500"
            maxLength={200}
          />
        )}
        {isLoading && (
          <div id="loader" className=" relative h-full ">
            <div id="box"></div>
            <div id="hill"></div>
          </div>
        )}

        {soundUrl && (
          <>
            <Canvas
              className="hover:cursor-pointer"
              camera={{
                position: [0, 0, 4],
                fov: 75,
              }}
            >
              <OrbitControls />
              <directionalLight position={[1, 1, 1]} intensity={2} castShadow />
              <ambientLight intensity={0.5} />
              <Blob />
            </Canvas>
          </>
        )}
      </div>
      {!soundUrl && (
        <Button
          disabled={!inputValue}
          onClick={startDify}
          className="px-4 py-2 bg-customRed text-white rounded-md hover:bg-customYellow hover:text-black"
        >
          {isLoading ? "台本作成中..." : "送信"}
        </Button>
      )}
      {soundUrl && <VoicePlayer />}

      {/* <Button className="ml-6" onClick={test}>
        test
      </Button> */}
    </div>
  );
};

export default InputArea;
