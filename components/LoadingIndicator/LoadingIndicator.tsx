import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function LoadingIndicator({ scale }) {
  const box = useRef();
  useFrame((_, delta) => {
    //@ts-ignore
    box.current.rotation.x = box.current.rotation.y += delta * Math.PI;
  });
  return (
    <Box ref={box} scale={scale.xy.min() * 0.25}>
      <meshNormalMaterial />
    </Box>
  );
}
