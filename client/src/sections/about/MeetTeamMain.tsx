import { TeamSection } from "./team/components/TeamSection";
import {
  COPY,
  type Copy,
  type Lang,
} from "./content/MeetTeamMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";

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

      <ImpactSection copy={copy} lang={lang} />
    </main>
  );
}

function ImpactSection({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <section className="team-mission" aria-label={copy.impactButton} lang={lang}>
      <motion.div
        className="team-impact-container relative z-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="mb-8 text-xl leading-relaxed text-[#e0e4d8] md:text-2xl lg:whitespace-nowrap">{copy.impactIntro}</p>
        <Link
          to="/about/impact"
          className={[
            "inline-flex min-h-14 items-center justify-center",
            "border border-white bg-white px-10 py-5",
            "text-xs font-bold uppercase tracking-[0.22em] text-[#27301d]",
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
