import { COPY } from "../../content/MeetTeamMainContent";
import { BOARD_MEMBERS, CREATIVE_TEAM } from "../data/teamMembers";
import type { Lang } from "../types/teamTypes";
import { TeamGrid } from "./TeamGrid";
import "../team.css";
import "../teamBackground.css";

export function TeamSection({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <div className="team-background">
      <div className="team-section">
        <h1 className="sr-only">{lang === "en" ? "Meet the Team" : "Манай баг"}</h1>
        <TeamGrid title={copy.boardTitle} members={BOARD_MEMBERS} lang={lang} layout="board" />
        <TeamGrid title={copy.creativeTitle} members={CREATIVE_TEAM} lang={lang} layout="creative" />
      </div>
    </div>
  );
}
