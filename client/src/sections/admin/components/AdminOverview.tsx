import { adminOverviewCopy } from "../content/AdminOverviewCopy";
import { StatCard, StateMessage } from "./AdminOverviewContent";
import type { ApiEvent } from "../types";

type Props = {
  events: ApiEvent[];
  publishedCount: number;
  draftCount: number;
  eventsLoading: boolean;
  lang: "en" | "mn";
};

export default function AdminOverview({ events, publishedCount, draftCount, eventsLoading, lang }: Props) {
  const copy = adminOverviewCopy[lang];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={copy.totalEvents} value={eventsLoading ? "—" : events.length} />
        <StatCard label={copy.published} value={eventsLoading ? "—" : publishedCount} />
        <StatCard label={copy.drafts} value={eventsLoading ? "—" : draftCount} />
      </div>
      <section className="mt-5 rounded-2xl border border-white/10 bg-[#fffdf8]/95 p-6 shadow-lg shadow-black/10 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a7b26]">{copy.activity}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#27301d] sm:text-2xl">{copy.recentUpdates}</h2>
        <StateMessage text={copy.historyUnavailable} />
      </section>
    </div>
  );
}
