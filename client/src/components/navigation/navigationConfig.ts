export type NavChild = {
  label: string;
  to: string;
};

export type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

export type UserMenuItem = {
  label: string;
  to: string;
};

const NAV_ITEMS: Record<Lang, NavItem[]> = {
  en: [
    {
      label: "Who We Are",
      to: "/about",
      children: [
        { label: "Our Story", to: "/about/story" },
        { label: "Meet the Team", to: "/about/team" },
        { label: "Our Impact", to: "/about/impact" },
      ],
    },
    {
      label: "What We Do",
      to: "/what-we-do",
      children: [
        { label: "Events", to: "/events" },
        { label: "Programs", to: "/programs" },
      ],
    },
    {
      label: "Get Involved",
      to: "/get-involved",
      children: [
        { label: "Volunteer", to: "/get-involved/volunteer" },
        { label: "Donate", to: "/get-involved/donate" },
        { label: "Contact", to: "/contact" },
      ],
    },
    { label: "Gallery", to: "/gallery" },
  ],
  mn: [
    {
      label: "Бидний тухай",
      to: "/about",
      children: [
        { label: "Бидний түүх", to: "/about/story" },
        { label: "Манай хамт олон", to: "/about/team" },
        { label: "Бидний нөлөө", to: "/about/impact" },
      ],
    },
    {
      label: "Үйл ажиллагаа",
      to: "/what-we-do",
      children: [
        { label: "Арга хэмжээ", to: "/events" },
        { label: "Хөтөлбөрүүд", to: "/programs" },
      ],
    },
    {
      label: "Нэгдээрэй",
      to: "/get-involved",
      children: [
        { label: "Сайн дурын ажил", to: "/get-involved/volunteer" },
        { label: "Хандив өгөх", to: "/get-involved/donate" },
        { label: "Холбоо барих", to: "/contact" },
      ],
    },
    { label: "Зургийн сан", to: "/gallery" },
  ],
};

export const getNavigationItems = (lang: Lang) => NAV_ITEMS[lang];

export const isRouteActive = (currentPath: string, to: string) => {
  if (to.includes("#")) return currentPath === to;

  if (to === "/") return currentPath === "/";

  return currentPath === to || currentPath.startsWith(`${to}/`);
};

export const isParentActive = (currentPath: string, item: NavItem) =>
  Boolean(item.children?.some((child) => isRouteActive(currentPath, child.to)));

export const scrollToHashTarget = (to: string) => {
  const hash = to.split("#")[1];

  if (!hash) return;

  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};
import type { Lang } from "../../context/language";
