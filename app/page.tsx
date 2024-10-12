"use client";

import Blob from "./_blobs/Blob";
import { Canvas } from "@react-three/fiber";
import { createContext, Suspense, useState } from "react";
import InputArea from "./InputArea";
import Loading from "@/components/Loading";
import ColorfulSpinner from "@/components/Loading";
import Header from "@/components/Header";

interface IsPlayContextType {
  isPlay: boolean;
  soundUrl: string;
  isLoading: boolean;
  // speechSoundRef: Howl | null;
  setIsPlay: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setSoundUrl: (value: string) => void;
}

export const IsPlayContext = createContext<IsPlayContextType>({
  isPlay: false,
  isLoading: false,
  soundUrl: "",
  // speechSoundRef: null,
  setIsPlay: () => {},
  setSoundUrl: () => {},
  setIsLoading: () => {},
});

export default function Home() {
  const [isPlay, setIsPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");
  // const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);

  return (
    <>
      <IsPlayContext.Provider
        value={{
          isPlay,
          setIsPlay,
          soundUrl,
          setSoundUrl,
          isLoading,
          setIsLoading,
        }}
      >
        <Header />
        <Suspense fallback={<ColorfulSpinner />}>
          <div className="h-screen w-full flex flex-col">
            {/* 上部 */}
            <div className=" flex h-full w-full">
              {/* h1 h2 */}
              <div className="flex flex-col items-center  ml-4 p-20">
                <div>
                  <h1 className="text-5xl mb-12 leading-tight">
                    あなたの失敗大丈夫！AIが心に寄り添い、元気をお届け！
                  </h1>
                </div>
                <div>
                  <h2 className="leading-relaxed">
                    落ち込んだ時や悩んだ時、誰かに話したくてもなかなか相談できないことってありますよね。そんな時は、私たちのAIにお任せ！あなたの失敗談や悩みを聞いて、ちょっと元気が出るようなアドバイスや励ましの言葉を音声でお届けします。いつでも、どこでも、気軽に話せるあなた専用の応援団です！
                  </h2>
                </div>
              </div>

              {/* AI */}
              <div
                className="px-4 h-1/2 w-full border-4 border-gray-800 bg-black"
                style={{ borderRadius: "1.5rem" }}
              >
                <Canvas
                  camera={{
                    position: [0, 0, 10],
                    fov: 75,
                  }}
                >
                  {/* <OrbitControls /> */}
                  <directionalLight
                    position={[1, 1, 1]}
                    intensity={2}
                    castShadow
                  />
                  <ambientLight intensity={0.5} />
                  <Blob />
                </Canvas>
              </div>
            </div>

            {/* {isLoading ? <></> : <InputArea />} */}
          </div>
        </Suspense>
      </IsPlayContext.Provider>
    </>
  );
}
