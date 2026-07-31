import { cubicBezier, type Variants } from "framer-motion";

export const eventsEaseOut = cubicBezier(0.22, 1, 0.36, 1);

export const pageMotion: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: eventsEaseOut },
  },
};

export const imageMotion: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.65, ease: eventsEaseOut },
  },
};
