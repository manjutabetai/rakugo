"use client";

import { createContext, Suspense, useRef, useState } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Loader from "@/components/Loader";
import Radio from "./Radio";
import Room from "./Room";
import WavingNote from "./WavingNote";
import MessageBoard from "./MessageBord";

import Blob from "./_blobs/Blob";

interface IsPlayContextType {
  isPlay: boolean;
  setIsPlay: (value: boolean) => void;
}

export const IsPlayContext = createContext<IsPlayContextType>({
  isPlay: false,
  setIsPlay: () => {},
});
export default function Home() {
  const radioRef = useRef<THREE.Group | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const [isPlay, setIsPlay] = useState(false);

  const value = { isPlay, setIsPlay };

  return (
    <IsPlayContext.Provider value={{ isPlay, setIsPlay }}>
      <Suspense fallback={<Loader />}>
        <OrbitControls />
        <directionalLight position={[1, 1, 1]} intensity={2} castShadow />
        <ambientLight intensity={0.5} />
        <gridHelper args={[20, 20, 0xff0000, "teal"]} />

        {/* <Room /> */}
        {/* <group position={[2.8, 0, -2.5]} ref={radioRef}> */}
        {/* <Radio /> */}
        {/* <WavingNote cameraRef={cameraRef} /> */}
        {/* </group> */}
        <Blob />
        <group>
          <MessageBoard
            title1="まいどおおきに浜村淳です。"
            title2="椿鬼奴のパチンコ大好き！"
            title3="明日の天気は・・"
          />
        </group>

        {/* <mesh receiveShadow rotation-x={Math.PI * 0.5} position-y={0}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
          </mesh> */}
      </Suspense>
    </IsPlayContext.Provider>
  );
}
