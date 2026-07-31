import { memo } from "react";
import { BACKGROUND_IMAGE } from "../constants";

export const PageBackground = memo(function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        width={1920}
        height={1080}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/32 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/18" />
    </div>
  );
});
