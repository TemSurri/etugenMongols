/** Exact event shape returned by the backend event endpoints. */
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
