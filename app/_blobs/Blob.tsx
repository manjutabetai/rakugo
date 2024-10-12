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
  const [speechSoundRef, setSpeechSoundRef] = useState<Howl | null>(null);
  useEffect(() => {
    console.log("soundUrl::" + soundUrl);
    console.log("speechSoundRef::" + speechSoundRef);

    if (soundUrl) {
      const newSound = new Howl({
        src: [soundUrl],
        html5: true,
        format: "mp3",
        onload: () => {
          console.log("音声ファイルが正常にロードされました");
          // newSound.play(); //自動プレイ
        },
        onloaderror: (id, error) => {
          console.error("音声のロード中にエラーが発生しました:", error);
        },
        onplayerror: (id, error) => {
          console.error("音声の再生中にエラーが発生しました:", error);
          newSound.play(); // 自動的に再試行
        },
        onend: () => {
          console.log("音声の再生が終了しました");
          setIsPlay(false);
        },
      });
      setSpeechSoundRef(newSound);
    }
  }, [soundUrl]);

  const handleClick = () => {
    console.log(speechSoundRef?.playing());
    if (soundUrl && speechSoundRef) {
      if (speechSoundRef.playing()) {
        speechSoundRef.pause();
        setIsPlay(false);
      } else {
        speechSoundRef.play();
        setIsPlay(true);
      }
    } else {
      console.error("Howlでエラーが出ました");
    }
  };

  return (
    <mesh
      ref={mesh}
      scale={0.1}
      position={[0, 0, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onClick={handleClick} // クリックイベントに handleClick を設定
    >
      {/* 20面体 */}
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        key={soundUrl}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={
          uniforms
          // soundUrlが空の場合はモノクロ
        }
      />
    </mesh>
  );
};

export default Blob;
