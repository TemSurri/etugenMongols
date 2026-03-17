import { memo, type ReactNode } from "react";

const SectionLabel = memo(function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="text-[10px] uppercase tracking-[0.2em] text-white/42">
      {children}
    </div>
  );
});

export default SectionLabel;