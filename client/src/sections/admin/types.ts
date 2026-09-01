export type AdminSection =
  | "overview"
  | "events";


export type ApiEvent = {
  id: string;
  slug: string;

  titleEn: string;
  titleMn: string;

  descriptionEn: string;
  descriptionMn: string;

  startsAt: string;
  endsAt: string | null;

  location: string;

  published: boolean;

  registerable: boolean;
  registrationCost: number | null;

  coverImage: string | null;
  coverImageAltEn: string | null;
  coverImageAltMn: string | null;

  contactEmail: string | null;
  contactPhone: string | null;

  createdAt: string;
};


export type EventUpdateType =
  | "TITLE_EN"
  | "TITLE_MN"
  | "DESCRIPTION_EN"
  | "DESCRIPTION_MN"
  | "STARTS_AT"
  | "ENDS_AT"
  | "LOCATION"
  | "PUBLISHED"
  | "REGISTERABLE"
  | "REGISTRATION_COST"
  | "COVER_IMAGE"
  | "COVER_IMAGE_ALT_EN"
  | "COVER_IMAGE_ALT_MN"
  | "CONTACT_EMAIL"
  | "CONTACT_PHONE";


export type EventCreateRequest = {
  slug: string;

  titleEn: string;
  titleMn: string;

  descriptionEn: string;
  descriptionMn: string;

  startsAt: string;
  endsAt: string | null;

  location: string;

  registerable: boolean;
  registrationCost: number | null;

  coverImage: string | null;
  coverImageAltEn: string | null;
  coverImageAltMn: string | null;

  contactEmail: string | null;
  contactPhone: string | null;
};