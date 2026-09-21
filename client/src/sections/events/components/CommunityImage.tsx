import { motion } from "framer-motion";
import { memo } from "react";
import StableImageReveal from "../../../components/media/StableImageReveal";
import { imageMotion } from "../animations";
import { EVENT_IMAGES } from "../constants";

function CommunityImage() {
  return (
    <motion.section
      variants={imageMotion}
      aria-hidden="true"
      className="order-4 relative min-h-[380px] overflow-hidden sm:min-h-[460px] lg:order-3 lg:min-h-full"
    >
      <StableImageReveal
        src={EVENT_IMAGES.community}
        alt=""
        loading="lazy"
        decoding="async"
        width={1200}
        height={900}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 z-20 bg-black/8" />
    </motion.section>
  );
}

export default memo(CommunityImage);
