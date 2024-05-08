"use client";

import { UseCanvas } from "@14islands/r3f-scroll-rig";
import { ParallaxScrollScene } from "@14islands/r3f-scroll-rig/powerups";
import { Suspense, useRef } from "react";
import { Image, SImageCard, WebGLW } from "./SImageCard";
import WebGLImage from "./WebGLImage";

interface ImageCardProps {
  src: string;
}

const ImageCard = ({ src }: ImageCardProps) => {
  const el = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div>
      <SImageCard ref={el}>
        <Image ref={imgRef} src={src} alt='random' />
        <p>Lorem ipsum dolor sit amet consectetur </p>
      </SImageCard>
      <WebGLW>
        <UseCanvas>
          <ParallaxScrollScene track={el} speed={-1}>
            {(props) => {
              return (
                <Suspense>
                  <WebGLImage src={src} {...props} />
                </Suspense>
              );
            }}
          </ParallaxScrollScene>
        </UseCanvas>
      </WebGLW>
    </div>
  );
};

export default ImageCard;
