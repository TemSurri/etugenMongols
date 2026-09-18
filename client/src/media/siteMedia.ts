export const siteMedia = {
  logo: "/logo.webp",
  landing: "/landingpage.webp",
  homeSlideshow: [
    "/images/site/home/slideshow/1.webp",
    "/images/site/home/slideshow/2.webp",
    "/images/site/home/slideshow/3.webp",
    "/images/site/home/slideshow/4.webp",
  ],
  communityCulture: [
    "/images/site/impact/culture/1.webp",
    "/images/site/impact/culture/2.webp",
    "/images/site/impact/culture/3.webp",
    "/images/site/impact/culture/4.webp",
  ],
  communityArchery: "/images/site/impact/archery/3.webp",
} as const;

export const sharedCommunityBackgrounds = [
  ...siteMedia.homeSlideshow,
  siteMedia.communityCulture[3],
  siteMedia.communityArchery,
] as const;
