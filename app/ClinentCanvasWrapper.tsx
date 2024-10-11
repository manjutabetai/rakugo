// ClientCanvasWrapper.tsx
"use client";

import { Canvas } from "@react-three/fiber";

const ClientCanvasWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 75,
      }}
    >
      {children}
    </Canvas>
  );
};

export default ClientCanvasWrapper;
