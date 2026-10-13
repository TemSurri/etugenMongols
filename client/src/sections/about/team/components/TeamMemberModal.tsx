import { X } from "lucide-react";
import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTeamInteraction } from "../hooks/useTeamInteraction";
import type { Lang, TeamMember } from "../types/teamTypes";

export function TeamMemberModal({ member, lang, onClose }: {
  member: TeamMember; lang: Lang; onClose: () => void;
}) {
  const { dialogRef, closing, close } = useTeamInteraction(onClose);
  const titleId = useId();
  const pointerStartedOutside = useRef(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const image = [member.images.hover, member.images.default].find((src) => !failedImages.includes(src));
  const name = member.name[lang] || member.name.en || (lang === "en" ? "To be announced" : "Удахгүй зарлана");
  const description = member.biography[lang] || (lang === "en" ? "Biography coming soon." : "Намтрыг удахгүй нэмнэ.");
  function outside(clientX: number, clientY: number) {
    const rect = dialogRef.current?.getBoundingClientRect();
    return !!rect && (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom);
  }
  return createPortal(
    <dialog ref={dialogRef} className="team-modal" data-closing={closing} aria-labelledby={titleId} lang={lang}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onPointerDown={(event) => { pointerStartedOutside.current = event.target === event.currentTarget && outside(event.clientX, event.clientY); }}
      onClick={(event) => {
        if (pointerStartedOutside.current && event.target === event.currentTarget && outside(event.clientX, event.clientY)) close();
        pointerStartedOutside.current = false;
      }}>
      <div className="team-modal-toolbar">
        <button type="button" className="team-modal-close" autoFocus onClick={close}
          aria-label={lang === "en" ? "Close profile" : "Танилцуулгыг хаах"}>
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <div className="team-modal-content">
        <div className="team-modal-portrait">
          {image ? <img src={image} alt={name} decoding="async"
            onError={() => setFailedImages((current) => [...current, image])} /> :
            <span className="team-placeholder" aria-hidden="true">{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}
        </div>
        <div className="team-modal-details" tabIndex={0} role="region" aria-labelledby={titleId}>
        <h2 id={titleId} lang={member.name[lang] ? lang : "en"}>{name}</h2>
        <p className="team-modal-role" lang={member.role[lang] ? lang : "en"}>{member.role[lang] || member.role.en}</p>
        <p className="team-modal-biography">{description}</p>
        </div>
      </div>
    </dialog>, document.body,
  );
}
