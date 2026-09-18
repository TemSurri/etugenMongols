import { sharedCommunityBackgrounds, siteMedia } from "../../media/siteMedia";

export const paymentMedia = {
  logo: siteMedia.logo,
  backgrounds: sharedCommunityBackgrounds,
  donationImages: [
    sharedCommunityBackgrounds[4],
    sharedCommunityBackgrounds[5],
  ],
} as const;
