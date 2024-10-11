import React, { useContext, useMemo, useRef, useState } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { IsPlayContext } from "../page";

const Blob = () => {
  const mesh = useRef<any>();
  const hover = useRef(false);
  const { isPlay, setIsPlay } = useContext(IsPlayContext); // アニメーション再生状態

  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 }, // 経過時間
      u_intensity: { value: 0.3 }, //hover: 膨らみ
    };
  }, []);

  useFrame((state) => {
    // const tes = useContext(MyContext);
    // console.log("usecontext: ");
    // console.log(tes);
    const { clock } = state;
    if (mesh.current && isPlay) {
      // isPlaying が true の場合のみアニメーション実行 ,スピードを設定
      mesh.current.material.uniforms.u_time.value = 1 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 1 : 0.15,
        0.02
      );
    }
  });

  const handleClick = () => {
    setIsPlay(!isPlay); // クリックで再生状態を切り替える
  };

  return (
    <mesh
      ref={mesh}
      scale={0.5}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onClick={handleClick} // クリックイベントに handleClick を設定
    >
      {/* 20面体 */}
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
