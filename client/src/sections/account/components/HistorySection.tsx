import { HistoryItem } from "./HistoryItem";
import { useActivityHistory } from "../hooks/useActivityHistory";
import type { accountCopy } from "../content/accountCopy";

type HistoryCopy = (typeof accountCopy)["en" | "mn"]["history"];
const buttonClass = "text-sm font-medium text-[#27301d] transition hover:text-[#9a7b26] disabled:cursor-not-allowed disabled:opacity-30";

export function HistorySection({ copy }: { copy: HistoryCopy }) {
  const { history, currentPageIndex, category, setCategory, loading, error, nextPage, previousPage, retry, refresh } = useActivityHistory();
  const hasNext = history?.nextCursorTime != null && history?.nextCursorId != null;
  return (
    <section className="rounded-2xl border border-[#27301d]/10 bg-white p-6 shadow-sm" aria-busy={loading}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[#27301d]">{copy.title}</h2>
        <button type="button" className={buttonClass} onClick={refresh}>{copy.refresh}</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={copy.title}>
        {(["account", "participation"] as const).map(kind => (
          <button key={kind} type="button" aria-pressed={category === kind} onClick={() => setCategory(kind)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${category === kind ? "border-[#9a7b26]/30 bg-[#f0eadc] text-[#27301d]" : "border-[#27301d]/10 text-[#667056]"}`}>
            {copy[kind]}
          </button>
        ))}
      </div>
      {loading && <p role="status" className="mt-5 text-sm text-[#667056]">{copy.loading}</p>}
      {error && <div role="alert" className="mt-5 text-sm text-[#8b4a42]">
        <p>{copy.error}</p>
        <button type="button" onClick={retry} className={`${buttonClass} mt-2`}>{copy.retry}</button>
      </div>}
      {history && history.activities.length === 0 && !loading && !error && <div className="mt-6 border-t border-[#27301d]/10 pt-5">
        <p className="text-sm font-semibold text-[#27301d]">{copy.emptyTitle}</p>
        <p className="mt-2 text-sm text-[#667056]">{copy.emptyBody}</p>
      </div>}
      {history && <>
        <div className="mt-5 divide-y divide-[#27301d]/10 border-y border-[#27301d]/10">
          {history.activities.map(item => <HistoryItem key={item.id} item={item} />)}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <button type="button" className={buttonClass} disabled={currentPageIndex === 0 || loading} onClick={previousPage}>← {copy.previous}</button>
          <p className="text-sm text-[#667056]">{copy.page} {currentPageIndex + 1}</p>
          <button type="button" className={buttonClass} disabled={!hasNext || loading} onClick={nextPage}>{copy.next} →</button>
        </div>
        {!hasNext && <p className="mt-3 text-center text-xs text-[#667056]">{copy.end}</p>}
      </>}
    </section>
  );
}
