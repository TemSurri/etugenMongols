import { useCallback, useEffect, useState } from "react";
import { SLIDESHOW_INTERVAL_MS } from "../constants";
import type { SlideshowImage } from "../types";

export function useSlideshow(images: SlideshowImage[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [activeIndex, images.length]);

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    activeImage: images[activeIndex],
    selectImage,
  };
}
