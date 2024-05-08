"use client";

import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import GalleryGrid from "../components/GalleryGrid/GalleryGrid";
import ImageCard from "../components/ImageCard/ImageCard";

// export const metadata: Metadata = {};

interface PageProps {}

const page = ({}: PageProps) => {
  return (
    <main>
      <GlobalCanvas>
        <ambientLight />
      </GlobalCanvas>
      <SmoothScrollbar enabled={true} config={{ infinite: true }}>
        {(bind) => {
          return (
            <GalleryGrid bind={bind}>
              {new Array(10).fill(0).map((_, i) => (
                <ImageCard
                  src={"https://source.unsplash.com/random/500x500"}
                  key={i}
                />
              ))}
            </GalleryGrid>
          );
        }}
      </SmoothScrollbar>
    </main>
  );
};

export default page;
