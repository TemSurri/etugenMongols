import { sharedCommunityBackgrounds, siteMedia } from "../../media/siteMedia";

export const authMedia = {
  logo: siteMedia.logo,
  backgrounds: [...sharedCommunityBackgrounds],
} as const;
