"use client";

import Loader from "@/components/Loader";

import Blob from "./_blobs/Blob";
import { Canvas } from "@react-three/fiber";
import { createContext, Suspense, useState } from "react";
import InputArea from "./InputArea";

interface IsPlayContextType {
  isPlay: boolean;
  soundUrl: string;
  setIsPlay: (value: boolean) => void;
  setSoundUrl: (value: string) => void;
}

export const IsPlayContext = createContext<IsPlayContextType>({
  isPlay: false,
  soundUrl: "",
  setIsPlay: () => {},
  setSoundUrl: () => {},
});

export default function Home() {
  const [isPlay, setIsPlay] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");

  return (
    <>
      <IsPlayContext.Provider
        value={{ isPlay, setIsPlay, soundUrl, setSoundUrl }}
      >
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-pink-800 to-orange-900">
          <div className="px-4">
            <Canvas
              camera={{
                position: [0, 0, 10],
                fov: 75,
              }}
            >
              <Suspense fallback={<Loader />}>
                {/* <OrbitControls /> */}
                <directionalLight
                  position={[1, 1, 1]}
                  intensity={2}
                  castShadow
                />
                <ambientLight intensity={0.5} />
                <Blob />
              </Suspense>
            </Canvas>
          </div>

          <InputArea />
        </div>
      </IsPlayContext.Provider>
    </>
  );
}
