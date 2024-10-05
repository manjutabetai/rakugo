import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF, PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042

const Radio = () => {
  // 3Dモデルの参照を作成
  const birdRef = useRef<THREE.Group | null>(null);
  const [play, setPlay] = useState(false);

  // GLTFモデルとアニメーションを読み込み
  const { scene } = useGLTF("/model/radio.glb");

  const togglePlay = () => {
    console.log("click");
    setPlay(!play); // 再生ステートを反転
  };

  return (
    <>
      {play && <PositionalAudio url="/rakugo/speech.mp3" autoplay />}
      <primitive
        castShadow
        ref={birdRef} // モデルの参照を設定
        object={scene} // GLTFファイルから読み込んだシーンを指定
        scale={[0.3, 0.3, 0.3]} // モデルのスケールを調整
        rotation-y={Math.PI * 1.5}
        onClick={togglePlay}
      ></primitive>
    </>
  );
};

export default Radio;
