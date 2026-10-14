import { useCallback, useState } from "react";
import type { Lang, TeamMember } from "../types/teamTypes";
import { TeamMemberModal } from "./TeamMemberModal";
import { TeamMemberCard } from "./TeamMemberCard";
import { useTeamEntrance } from "../hooks/useTeamEntrance";

export function TeamGrid({ title, members, lang, layout }: {
  title: string; members: TeamMember[]; lang: Lang; layout: "board" | "creative";
}) {
  const sectionRef = useTeamEntrance();
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeModal = useCallback(() => setActiveId(null), []);
  const selectedMember = members.find((member) => member.id === activeId);
  return (
    <section ref={sectionRef} className="team-group" aria-label={title}>
      <h2>{title}</h2>
      <div className={`team-grid team-grid--${layout}`}>
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} lang={lang}
            onOpen={() => setActiveId(member.id)} />
        ))}
      </div>
      {selectedMember && <TeamMemberModal key={selectedMember.id} member={selectedMember} lang={lang} onClose={closeModal} />}
    </section>
  );
}
