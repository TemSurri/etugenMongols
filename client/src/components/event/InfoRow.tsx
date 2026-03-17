import { memo, type ReactNode } from "react";

type InfoRowProps = {
  label: string;
  value: ReactNode;
  light?: boolean;
};

const InfoRow = memo(function InfoRow({
  label,
  value,
  light = false,
}: InfoRowProps) {
  return (
    <div
      className={[
        "grid grid-cols-[62px_1fr] gap-2 border-b pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[72px_1fr]",
        light ? "border-black/8" : "border-white/8",
      ].join(" ")}
    >
      <div
        className={[
          "text-[10px] uppercase tracking-[0.16em]",
          light ? "text-black/44" : "text-white/40",
        ].join(" ")}
      >
        {label}
      </div>
      <div
        className={[
          "text-[13px] leading-relaxed sm:text-sm",
          light ? "text-black/72" : "text-white/84",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
});

export default InfoRow;