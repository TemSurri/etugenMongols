import type { ReactNode } from "react";

type AboutLayoutProps = {
  children: ReactNode;
};

function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#2f3320]">
      <div className="fixed inset-0 z-0">
        <img
          src="/about/bg.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/28 to-black/60" />
      </div>

      <div className="relative z-10">{children}</div>
    </main>
  );
}

export default AboutLayout;