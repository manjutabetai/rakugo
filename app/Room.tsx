import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
const Room = () => {
  // 3Dモデルの参照を作成
  const roomRef = useRef<THREE.Group | null>(null);

  // GLTFモデルとアニメーションを読み込み
  const { scene } = useGLTF("/model/tiny_isometric_room.glb");

  return (
    <primitive
      castShadow
      ref={roomRef}
      object={scene}
      scale={[0.01, 0.01, 0.01]}
      position={[0, 0, -3]}
      rotation-y={Math.PI * 1.8}
    />
  );
};

export default Room;
