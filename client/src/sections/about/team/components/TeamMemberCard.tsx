import { useState } from "react";
import type { Lang, TeamMember } from "../types/teamTypes";

export function TeamMemberCard({ member, lang, onOpen }: {
  member: TeamMember; lang: Lang; onOpen: () => void;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const name = member.name[lang] || member.name.en || (lang === "en" ? "To be announced" : "Удахгүй зарлана");
  return (
    <article className="team-card">
      <button type="button" className="team-card-button" aria-haspopup="dialog"
        aria-label={name + " — " + (lang === "en" ? "Read Biography" : "Намтар унших")}
        onClick={onOpen}>
      <span className="team-portrait">
        <span className="team-placeholder" aria-hidden="true">{name ? name.split(" ").map((part) => part[0]).slice(0, 2).join("") : "—"}</span>
        {[member.images.default, member.images.hover].map((src, index) => !failedImages.includes(src) && (
          <img key={src} src={src} alt="" loading="lazy" decoding="async"
            className={index === 1 ? "team-hover-image" : "team-default-image"}
            style={{ objectPosition: member.imagePosition ?? "center top" }}
            onError={() => setFailedImages((images) => [...images, src])} />
        ))}
        <span className="team-profile-hint" aria-hidden="true">{lang === "en" ? "Read Biography ↗" : "Намтар унших ↗"}</span>
      </span>
      <div className="team-caption"><h3 lang={member.name[lang] ? lang : "en"}>{name}</h3><p lang={member.role[lang] ? lang : "en"}>{member.role[lang] || member.role.en}</p></div>
      </button>
    </article>
  );
}
