import { memo } from "react";

const DONATE_IMAGES = [
  "/impact/culture/4.webp",
  "/impact/archery/3.webp",
] as const;

function DonationImages() {
  return (
    <aside
      className="
        hidden
        min-w-0
        overflow-hidden
        bg-[#303824]
        lg:block
      "
    >
      <div
        className="
          flex
          flex-col
          gap-px
          bg-[#fffaf0]/10
        "
      >
        {DONATE_IMAGES.map(
          (image, index) => (
            <div
              key={image}
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden
                bg-[#303824]
              "
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                loading={
                  index === 0
                    ? "eager"
                    : "lazy"
                }
                decoding="async"
                fetchPriority={
                  index === 0
                    ? "high"
                    : "auto"
                }
                draggable={false}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  select-none
                  object-cover
                  object-center
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#303824]/10
                  via-transparent
                  to-transparent
                "
              />
            </div>
          )
        )}
      </div>
    </aside>
  );
}

export default memo(
  DonationImages
);