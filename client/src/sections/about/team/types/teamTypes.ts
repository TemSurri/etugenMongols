import type { Lang } from "../../../../context/language";

export type { Lang };
export interface TeamMember {
  id: string;
  name: Record<Lang, string>;
  role: Record<Lang, string>;
  biography: Record<Lang, string>;
  images: {
    default: string;
    hover: string;
  };
  imagePosition?: string;
}
