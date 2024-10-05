// ClientCanvasWrapper.tsx
"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";

function CameraController() {
  const { camera } = useThree();
  const { x, y, z } = useControls("Camera Position", {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: 1.2, min: -10, max: 10, step: 0.1 },
    z: { value: 8.6, min: -10, max: 10, step: 0.1 },
  });

  useEffect(() => {
    camera.position.set(x, y, z);
  }, [camera, x, y, z]);

  return null;
}

const ClientCanvasWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      className="w-full h-screen bg-transparent"
      camera={{
        near: 0.1,
        far: 1000,
        position: [0, 0, 0],
      }}
    >
      <CameraController />
      {children}
    </Canvas>
  );
};

export default ClientCanvasWrapper;
