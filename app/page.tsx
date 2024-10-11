"use client";

import { createContext, Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

import Loader from "@/components/Loader";
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
  const [isPlay, setIsPlay] = useState(false);

  const value = { isPlay, setIsPlay };

  return (
    <IsPlayContext.Provider value={{ isPlay, setIsPlay }}>
      <Suspense fallback={<Loader />}>
        {/* <OrbitControls /> */}
        <directionalLight position={[1, 1, 1]} intensity={2} castShadow />
        <ambientLight intensity={0.5} />
        {/* <gridHelper args={[20, 20, 0xff0000, "teal"]} /> */}

        {/* <Room /> */}
        {/* <group position={[2.8, 0, -2.5]} ref={radioRef}> */}
        {/* <Radio /> */}
        {/* <WavingNote cameraRef={cameraRef} /> */}
        {/* </group> */}
        <Blob />

        {/* <MessageBoard /> */}

        {/* <mesh receiveShadow rotation-x={Math.PI * 0.5} position-y={0}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
          </mesh> */}
      </Suspense>
    </IsPlayContext.Provider>
  );
}
