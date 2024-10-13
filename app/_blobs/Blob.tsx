import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { IsPlayContext } from "../page";

const Blob = () => {
  const mesh = useRef<any>();
  const hover = useRef(false);
  const { isPlay, setIsPlay, soundUrl, isLoading } = useContext(IsPlayContext); // アニメーション再生状態

  const uniforms = useMemo(() => {
    console.log("blob ; " + soundUrl);
    return {
      u_time: { value: 0 }, // 経過時間
      u_intensity: { value: 0.3 }, //hover: 膨らみ
      u_isMonochrome: { value: soundUrl === "" ? 1 : 0 }, // モノクロフラグ (1: モノクロ, 0: 通常)
    };
  }, [soundUrl]);

  useFrame((state) => {
    const { clock } = state;

    // 再生中アニメーション
    if (mesh.current && isPlay) {
      // isPlaying が true の場合のみアニメーション実行 ,スピードを設定
      mesh.current.material.uniforms.u_time.value = 1 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 1 : 0.15,
        0.02
      );
    }
    // isLoading が true の場合、スケールアップ＆回転
    if (mesh.current && isLoading) {
      // スケールを大きく
      mesh.current.scale.set(1, 1, 1); // スケールを大きく設定

      // z 軸で回転し続ける
      mesh.current.rotation.z += 0.05; // 回転スピードを設定
    } else if (mesh.current) {
      // isLoading が false の場合、スケールを元に戻す
      mesh.current.scale.set(1, 1, 1); // 元のスケールに戻す
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      {/* 20面体 */}
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        key={soundUrl}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
