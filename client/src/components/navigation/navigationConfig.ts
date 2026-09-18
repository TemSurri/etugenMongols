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


export const NAV_ITEMS: NavItem[] = [
  {
    label: "Who We Are",
    to: "/about",
    children: [
      { label: "Our Story", to: "/about/story" },
      { label: "Meet the Bigger Team", to: "/about/team" },
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
];


export const isRouteActive = (
  currentPath: string,
  to: string,
) => {

  if (to.includes("#")) return currentPath === to;

  if (to === "/") return currentPath === "/";

  return (
    currentPath === to ||
    currentPath.startsWith(`${to}/`)
  );
};


export const isParentActive = (
  currentPath: string,
  item: NavItem,
) =>
  Boolean(
    item.children?.some(
      (child) =>
        isRouteActive(
          currentPath,
          child.to,
        ),
    ),
  );


export const scrollToHashTarget = (
  to: string,
) => {

  const hash =
    to.split("#")[1];

  if (!hash) return;


  requestAnimationFrame(() => {

    document
      .getElementById(hash)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

  });
};


