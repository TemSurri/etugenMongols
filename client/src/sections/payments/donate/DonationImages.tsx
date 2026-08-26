import { memo } from "react";

const DONATE_IMAGES = {
  main: "/impact/dance/2.webp",
  secondary: "/impact/archery/4.webp",
} as const;

function DonationImages() {
  return (
    <aside
      className="
        hidden
        bg-[#303824]
        lg:flex
        lg:flex-col
      "
    >
      <div
        className="
          relative
          min-h-[58%]
          flex-1
          overflow-hidden
        "
      >
        <img
          src={DONATE_IMAGES.main}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#303824]/30
            via-transparent
            to-transparent
          "
        />
      </div>

      <div
        className="
          relative
          min-h-[340px]
          overflow-hidden
          border-t
          border-[#fffaf0]/10
        "
      >
        <img
          src={
            DONATE_IMAGES.secondary
          }
          alt=""
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />
      </div>
    </aside>
  );
}

export default memo(
  DonationImages
);