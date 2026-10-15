import type { Lang } from "../../../../context/language";

export type { Lang };
export interface TeamMember {
  id: string;
  name: {
    givenName: string;
    familyName: string | null;
    mn: string;
  };
  role: Record<Lang, string>;
  roleDescription: Record<Lang, string>;
  biography: Record<Lang, string>;
  images: {
    default: string;
    hover: string;
  };
  imagePosition?: string;
}
