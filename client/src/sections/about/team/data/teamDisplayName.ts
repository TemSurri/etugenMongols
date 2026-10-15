import type { Lang, TeamMember } from "../types/teamTypes";

export function teamDisplayName(name: TeamMember["name"], lang: Lang): string {
  if (lang === "mn") return name.mn;
  // Preserve the known name until missing family information is supplied.
  return name.familyName ? `${name.givenName[0]}. ${name.familyName}` : name.givenName;
}
