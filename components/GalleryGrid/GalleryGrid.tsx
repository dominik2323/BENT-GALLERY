"use client";

import React, { useEffect, useRef } from "react";
import {
  GalleryColumn,
  GalleryGridI,
  GalleryItem,
  SGalleryGrid,
} from "./SGalleryGrid";
import {
  useScrollRig,
  useScrollbar,
  useTracker,
} from "@14islands/r3f-scroll-rig";
import { useTrackerMotionValue } from "../../hooks/useTrackerMotionValue";

interface GalleryGridProps {
  bind: any;
  children?: React.ReactNode[];
}

const GalleryGrid = ({ bind, children }: GalleryGridProps) => {
  console.log(children.length);
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { onScroll } = useScrollbar();

  const { reflow } = useScrollRig();
  const tracker = useTracker(gridRef);
  const progress = useTrackerMotionValue(tracker);
  console.log();

  useEffect(() => {
    return () => {
      onScroll((e) => {
        if (!ref.current) return;
        ref.current.style.transform = `translateY(${e.progress * 100}%)`;
        // ref.current.style.marginTop = `${e.progress * 100}%`;
        reflow();
        // tracker.update({ onlyUpdateInViewport: false });
      });
    };
  }, [onScroll, reflow]);

  return (
    <SGalleryGrid {...bind} ref={gridRef}>
      <GalleryGridI>
        <GalleryColumn ref={ref}>
          {children.map((item, i) => {
            if (i % 2 === 0) {
              return <GalleryItem key={i}>{item}</GalleryItem>;
            }
          })}
        </GalleryColumn>
        <GalleryColumn>
          {children.map((item, i) => {
            if (i % 2 !== 0) {
              return <GalleryItem key={i}>{item}</GalleryItem>;
            }
          })}
        </GalleryColumn>
      </GalleryGridI>
    </SGalleryGrid>
  );
};

export default GalleryGrid;
