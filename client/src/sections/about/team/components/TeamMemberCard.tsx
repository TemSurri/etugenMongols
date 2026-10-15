import { teamDisplayName } from "../data/teamDisplayName";
import { useState } from "react";
import type { Lang, TeamMember } from "../types/teamTypes";

export function TeamMemberCard({ member, lang, onOpen }: {
  member: TeamMember; lang: Lang; onOpen: () => void;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const name = teamDisplayName(member.name, lang);
  return (
    <article className="team-card">
      <button type="button" className="team-card-button" aria-haspopup="dialog"
        aria-label={name + " — " + (lang === "en" ? "About" : "Тухай")}
        onClick={onOpen}>
      <span className="team-portrait">
        <span className="team-placeholder" aria-hidden="true">{name ? name.split(" ").map((part) => part[0]).slice(0, 2).join("") : "—"}</span>
        {[member.images.default, member.images.hover].map((src, index) => !failedImages.includes(src) && (
          <img key={src} src={src} alt="" loading="lazy" decoding="async"
            className={index === 1 ? "team-hover-image" : "team-default-image"}
            style={{ objectPosition: member.imagePosition ?? "center top" }}
            onError={() => setFailedImages((images) => [...images, src])} />
        ))}
        <span className="team-profile-hint" aria-hidden="true">{lang === "en" ? "About ↗" : "Тухай ↗"}</span>
      </span>
      <div className="team-caption"><h3 lang={lang}>{name}</h3><p lang={lang}>{member.role[lang]}</p></div>
      </button>
    </article>
  );
}
