import { cubicBezier, type Variants } from "framer-motion";

const mediaEase = cubicBezier(0.22, 1, 0.36, 1);

/** One lightweight entrance per complete media block; no scale or child stagger. */
export const mediaReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: mediaEase },
  },
};
