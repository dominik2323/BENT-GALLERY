"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MousePositionDistortedImage } from "./MousePositionImage";

interface WebGLImageProps {}

function WebGLImage({ src, ...props }) {
  // useImageAsTexture() causes "too much recursion" error when this is used multiple times
  // const texture = useImageAsTexture(imgRef);
  const texture = useLoader(
    TextureLoader,
    "https://source.unsplash.com/random/500x500"
  );

  return (
    <MousePositionDistortedImage
      texture={texture}
      scale={[1, 1.618]}
      {...props}
    />
  );
}

export default WebGLImage;
