import { useEffect, useRef } from "react";

export function useTeamEntrance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const cards = section.querySelectorAll<HTMLElement>(".team-card");
    cards.forEach((card, index) => {
      card.style.setProperty("--team-entrance-delay", `${Math.min(index * 50, 350)}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.dataset.entrance = "visible";
        observer.disconnect();
      }
    }, { threshold: 0 });

    // Only hide content after the browser's enhancement support is confirmed.
    section.dataset.entrance = "pending";
    observer.observe(section);

    function revealImmediately() {
      delete section!.dataset.entrance;
      observer.disconnect();
    }
    // Keyboard users must never land on an invisible card. A preference change
    // also cancels any pending animation, without replaying it later.
    section.addEventListener("focusin", revealImmediately);
    motion.addEventListener("change", revealImmediately);
    return () => {
      observer.disconnect();
      section.removeEventListener("focusin", revealImmediately);
      motion.removeEventListener("change", revealImmediately);
      delete section.dataset.entrance;
      cards.forEach((card) => card.style.removeProperty("--team-entrance-delay"));
    };
  }, []);

  return sectionRef;
}
