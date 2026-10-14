import { TeamSection } from "./team/components/TeamSection";
import {
  COPY,
  type Copy,
  type Lang,
} from "./content/MeetTeamMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import impactValley from "./impactValley.svg";

type MeetTeamMainProps = {
  lang: Lang;
};

const smoothEase = cubicBezier(0.22, 1, 0.36, 1);

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <TeamSection lang={lang} />

      <ImpactSection copy={copy} />
    </main>
  );
}

function ImpactSection({ copy }: { copy: Copy }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#27301d] px-5 py-24 text-center sm:px-6 md:px-10 md:py-32">
      <img
        src={impactValley}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-fill"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl md:text-5xl">
          {copy.impactTitle}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#d3d8ca] md:text-base md:leading-8">
          {copy.impactBody}
        </p>

        <Link
          to="/about/impact"
          className={[
            "mt-9 inline-flex min-h-12 items-center justify-center",
            "border border-white bg-white px-8 py-3.5",
            "text-[10px] font-bold uppercase tracking-[0.22em] text-[#27301d]",
            "no-underline",
            "transition-colors duration-300",
            "hover:bg-transparent hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-white focus-visible:ring-offset-4",
            "focus-visible:ring-offset-[#27301d]",
          ].join(" ")}
        >
          {copy.impactButton}
        </Link>
      </motion.div>
    </section>
  );
}

export default memo(MeetTeamMain);
