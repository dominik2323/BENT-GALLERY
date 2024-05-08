"use client";

import { useSpring } from "@react-spring/three";
import { ThreeEvent, Vector3, extend, useFrame } from "@react-three/fiber";
import { geometry } from "maath";
import { ForwardedRef, forwardRef, useCallback, useRef } from "react";
import { Mesh, Texture, Vector2 } from "three";
import {
  AnimatedMousePositionMaterial,
  MousePositionMaterial,
} from "./MousePositionMaterial";
import { MousePositionMaterialRefType } from "./MousePositionMaterial/types";
export const ImageCardGeo = forwardRef(
  ({ children, scale, ...props }, ref: ForwardedRef<Mesh>) => {
    extend(geometry);

    return (
      <mesh ref={ref} {...props}>
        <planeGeometry
          args={[
            ...((Array.isArray(scale) ? scale : [scale, scale]) as [
              number,
              number
            ]),
            // 0.08,
          ]}
        />
        {children}
      </mesh>
    );
  }
);

export const MousePositionDistortedImage = ({
  position,
  scale,
  name,
  texture,
}: {
  position?: Vector3;
  texture: Texture;
  scale: number | [x: number, y: number];
  name?: string;
}) => {
  const mesh = useRef<Mesh>(null!);
  const material = useRef<MousePositionMaterialRefType>(null!);
  const mousePosition = useRef(new Vector2(0, 0));

  // const [hovered, setHovered] = useState(false)
  // useCursor(hovered)

  const [springs, api] = useSpring(() => ({
    uStrength: 0,
    clamp: true,
  }));

  const onPointerOver = useCallback(() => {
    // setHovered(true)
    api.start({
      uStrength: 1,
      config: { mass: 5, friction: 50, tension: 120 },
    });
  }, [api]);

  const onPointerOut = useCallback(() => {
    // setHovered(false)
    api.start({
      uStrength: 0,
      config: { mass: 5, friction: 50, tension: 120 },
    });
  }, [api]);

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (e.uv) {
      mousePosition.current.set(e.uv.x, e.uv.y);
    } else {
      console.error("NO UV 😭");
    }
  }, []);

  // useEffect(() => {
  //   const el = document.getElementById('body')
  //   const onMouseMove = (e: MouseEvent) => {
  //     const { clientX, clientY } = e
  //     const { innerWidth, innerHeight } = window
  //     const x = clientX / innerWidth
  //     const y = 1 - clientY / innerHeight
  //     mousePosition.current.set(x, y)
  //   }
  //   el?.addEventListener('mousemove', onMouseMove)
  //   return () => {
  //     el?.removeEventListener('mousemove', onMouseMove)
  //   }
  // }, [])

  useFrame((state) => {
    material.current.uTime = state.clock.getElapsedTime();
    material.current.uMouse.copy(mousePosition.current);
  });

  return (
    <>
      <ImageCardGeo
        ref={mesh}
        scale={scale}
        name={name}
        position={position}
        onPointerOver={onPointerOver}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        {/* @ts-ignore don't worry */}
        <AnimatedMousePositionMaterial
          ref={material}
          map={texture}
          uScale={
            Array.isArray(scale)
              ? new Vector2(scale[0], scale[1])
              : new Vector2(scale, scale)
          }
          key={MousePositionMaterial.key}
          uTime={0}
          {...springs}
        />
      </ImageCardGeo>
    </>
  );
};
