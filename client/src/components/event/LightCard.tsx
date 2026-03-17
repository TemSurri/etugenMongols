import { memo, type ReactNode } from "react";

type LightCardProps = {
  title?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
};

const LightCard = memo(function LightCard({
  title,
  rightSlot,
  children,
  className = "",
}: LightCardProps) {
  return (
    <section
      className={[
        "border border-black/8 bg-white/88 shadow-[0_10px_24px_rgba(0,0,0,0.08)]",
        className,
      ].join(" ")}
    >
      <div className="h-full px-3 py-3 sm:px-4 sm:py-4">
        {title && (
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-black/14" />
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-black/62">
                {title}
              </h2>
            </div>
            {rightSlot}
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

export default LightCard;