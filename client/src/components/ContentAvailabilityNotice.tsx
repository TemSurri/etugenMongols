import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import type { Lang } from "../context/language";
import { useDialogFocus } from "./useDialogFocus";

type NoticeKind = "story" | "team" | "gallery";

type NoticeCopy = {
  label: string;
  title: string;
  body: string;
  dismiss: string;
};

// Keep temporary media notices here so their wording can be changed or removed
// without touching the pages that display them.
const NOTICE_COPY: Record<Lang, Record<NoticeKind, NoticeCopy>> = {
  en: {
    story: {
      label: "A quick note",
      title: "Story photos are coming soon",
      body: "We are still selecting the photographs that will accompany this story.",
      dismiss: "Continue",
    },
    team: {
      label: "A quick note",
      title: "Team photos are coming soon",
      body: "We are still selecting the photographs that will introduce our team and community.",
      dismiss: "Continue",
    },
    gallery: {
      label: "A quick note",
      title: "Our gallery is being prepared",
      body: "We are still processing and organizing photos from our galleries. You will be able to browse our wonderful events soon.",
      dismiss: "Continue",
    },
  },
  mn: {
    story: {
      label: "Товч мэдээлэл",
      title: "Түүхийн зургууд удахгүй нэмэгдэнэ",
      body: "Бид энэ түүхэнд оруулах гэрэл зургуудыг сонгож байна.",
      dismiss: "Үргэлжлүүлэх",
    },
    team: {
      label: "Товч мэдээлэл",
      title: "Багийн зургууд удахгүй нэмэгдэнэ",
      body: "Бид баг болон хамт олноо танилцуулах гэрэл зургуудыг сонгож байна.",
      dismiss: "Үргэлжлүүлэх",
    },
    gallery: {
      label: "Товч мэдээлэл",
      title: "Зургийн цомог бэлтгэгдэж байна",
      body: "Бид арга хэмжээний зургуудаа боловсруулж, цэгцэлж байна. Удахгүй та манай гайхалтай арга хэмжээнүүдийн зургийг үзэх боломжтой болно.",
      dismiss: "Үргэлжлүүлэх",
    },
  },
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

function getSessionKey(kind: NoticeKind) {
  return `etugen-content-notice-${kind}-seen`;
}

export default function ContentAvailabilityNotice({
  kind,
  lang,
}: {
  kind: NoticeKind;
  lang: Lang;
}) {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      return window.sessionStorage.getItem(getSessionKey(kind)) !== "true";
    } catch {
      return true;
    }
  });
  const dialogRef = useDialogFocus(isOpen);
  const copy = NOTICE_COPY[lang][kind];

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(getSessionKey(kind), "true");
    } catch {
      // Keep the notice dismissible when browser storage is unavailable.
    }

    setIsOpen(false);
  }, [kind]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [dismiss, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`availability-notice-${kind}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#27301d]/60 px-5 py-8 backdrop-blur-[2px]"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="w-full max-w-md border border-[#27301d] bg-[#fffaf0] p-7 shadow-2xl shadow-black/25 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b26]">
              {copy.label}
            </p>

            <h2
              id={`availability-notice-${kind}`}
              className="mt-4 text-2xl font-semibold leading-tight text-[#27301d]"
            >
              {copy.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#59604d]">
              {copy.body}
            </p>

            <button
              type="button"
              onClick={dismiss}
              className="mt-7 bg-[#27301d] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#9a7b26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a7b26] focus-visible:ring-offset-2"
            >
              {copy.dismiss}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
