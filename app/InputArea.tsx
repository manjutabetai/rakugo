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
import { Input } from "@/components/ui/input";
import { Post } from "@/types/Post";

const InputArea = () => {
  const [volume, setVolume] = useState(0.05);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");

  const { isPlay, setIsPlay, soundUrl, setSoundUrl, isLoading, setIsLoading } =
    useContext(IsPlayContext);

  let finalInputValue = "";

  const startDify = async () => {
    setIsLoading(true);
    console.log("name: " + name);
    finalInputValue = inputValue;
    // ニックネームがある場合は名前を追加する
    if (name) {
      console.log("true");
      finalInputValue =
        `"ラジオネーム「${name}」さんの投稿です。"` + inputValue;
    } else {
      finalInputValue = `"投稿者の名前は「匿名ちゃん」さんです。"` + inputValue;
    }

    console.log("input value: " + finalInputValue);

    try {
      const difyRes = await fetch("/api/dify", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalInputValue }),
      });
      const difyData = await difyRes.json();
      if (difyData.result !== "No result found") {
        await getGpt(difyData, finalInputValue);
      } else {
        alert("ニュース原稿の取得に失敗しました。もう一度お願いします。");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error calling Dify API:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getGpt = async (prompt: string, finalInputValue: string) => {
    try {
      const response = await fetch("/api/openai", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          finalInputValue: finalInputValue,
        }),
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
    }
  };

  return (
    <div className="flex h-[300px] flex-col justify-end w-full px-12 pb-4 ml-4 rounded-xl backdrop-blur-xl shadow-2xl">
      <div>
        {!isLoading && !soundUrl && (
          <>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="ニックネームを入力してください"
              className="w-full h-12 mb-4 bg-customWhite border-gray-500"
            />
            <Textarea
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="相談や失敗などをボヤいてみましょう"
              className="w-full h-32 mb-4 bg-customWhite border-gray-500"
              maxLength={200}
            />
          </>
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
