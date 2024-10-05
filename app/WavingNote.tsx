import React, { RefObject, useState } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { Text } from "@react-three/drei";

type Props = {
  cameraRef: RefObject<THREE.Camera>;
};
// 音符が揺れるアニメーション付きのコンポーネント
const WavingNote = ({ cameraRef }: Props) => {
  const [hovered, setHovered] = useState(false);

  const { y, scale, opacity } = useSpring({
    from: { y: 0.9, scale: 0.04, opacity: 0.3 },
    to: { y: 1, scale: 0.1, opacity: 1 },

    // frictionを上げるとtensionが早く終る
    config: { duration: 1200, mass: 50, tension: 300, friction: 5 },
    loop: { reverse: true },

    onStart: () => {},
    onRest: () => {},
    onPause: () => {},
    onResume: () => {},
  });

  const clickHandler = () => {
    console.log(cameraRef.current);
  };
  return (
    <a.group // アニメーションを適用するために a.group を使用

    // onPointerOver={() => } // ホバー時にアニメーション開始
    // onPointerOut={() => } // ホバーを外したときにアニメーション終了
    // rotation-y={rotationZ.to((rz) => rz)} // rotationZ のアニメーションを適用
    >
      <a.mesh
        position-x={0}
        position-y={y}
        position-z={-0.6}
        scale={scale}
        onClick={clickHandler}
        // ホバー中にsetHoveredをtrueにして、ポインターを変更する
        onPointerOver={(e) => {
          setHovered(true);
          document.body.style.cursor = "pointer"; // カーソルをポインターに変更
        }}
        // ホバーが外れたら、setHoveredをfalseにしてポインターを元に戻す
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = "auto"; // カーソルを通常の状態に戻す
        }}
      >
        <a.sphereGeometry />
        <a.meshBasicMaterial
          transparent
          opacity={opacity}
          color={hovered ? "orange" : "white"}
        />
      </a.mesh>
    </a.group>
  );
};

export default WavingNote;
