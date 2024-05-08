"use client";

import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  } 
`;
