import { useEffect, useRef, useState } from "react";

// Native dialog contains focus and makes the underlying page inert.
export function useTeamInteraction(onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    if (!closing) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);
  return { dialogRef, closing, close: () => setClosing(true) };
}
