import { memo, type ReactNode } from "react";

type DarkCardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

const DarkCard = memo(function DarkCard({
  title,
  children,
  className = "",
}: DarkCardProps) {
  return (
    <section
      className={[
        "border border-white/10 bg-white/0.065 shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
        className,
      ].join(" ")}
    >
      <div className="h-full px-3 py-3 sm:px-4 sm:py-4">
        {title && (
          <div className="mb-2.5 flex items-center gap-2">
            <div className="h-px w-5 bg-white/16" />
            <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/74">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

export default DarkCard;