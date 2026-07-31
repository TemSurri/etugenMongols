import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sectionMotion } from "../animations";
import type { EventsCopy } from "../types";

function YearlyEvent({ title, body }: { title: string; body: string }) {
  return <article><h3 className="text-lg font-normal leading-tight md:text-xl">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#cfc8b5]">{body}</p></article>;
}

function DarkAction({ to, label }: { to: string; label: string }) {
  return <Link to={to} className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fffaf0] transition-colors hover:text-[#d6ba72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#303824]">{label}<span aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-1">→</span></Link>;
}

function EventInformation({ copy }: { copy: EventsCopy }) {
  return (
    <motion.section variants={sectionMotion} aria-labelledby="yearly-events-title" className="order-3 flex bg-[#303824] px-6 py-16 text-[#fffaf0] sm:px-8 sm:py-20 md:px-10 lg:order-4 lg:px-14 lg:py-20 xl:px-20">
      <div className="mx-auto w-full max-w-[660px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d6ba72]">{copy.yearlyEyebrow}</p>
        <h2 id="yearly-events-title" className="mt-3 text-2xl font-normal leading-tight tracking-tight md:text-3xl">{copy.yearlyTitle}</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#d8d1bf]">{copy.yearlyBody}</p>
        <div className="mt-7 space-y-7 border-t border-[#fffaf0]/15 pt-7">
          <article>
            <h3 className="text-lg font-normal leading-tight md:text-xl">{copy.naadamTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cfc8b5]">
              {copy.naadamBefore}<a href="https://en.wikipedia.org/wiki/Naadam" target="_blank" rel="noreferrer" className="font-medium text-[#fffaf0] underline decoration-[#d6ba72]/60 underline-offset-4 transition-colors hover:text-[#d6ba72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]/50">{copy.naadamLink}</a>{copy.naadamAfter}
            </p>
          </article>
          <YearlyEvent title={copy.winterTitle} body={copy.winterBody} />
          <YearlyEvent title={copy.performancesTitle} body={copy.performancesBody} />
        </div>
        <div className="mt-7 border-t border-[#fffaf0]/15 pt-7">
          <h3 className="text-lg font-normal leading-tight md:text-xl">{copy.involvedTitle}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#cfc8b5]">{copy.involvedBody}</p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4">
            <DarkAction to="/volunteer" label={copy.volunteerButton} />
            <DarkAction to="/donate" label={copy.donateButton} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(EventInformation);
