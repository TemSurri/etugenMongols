import type { ActivityDTO } from "../contracts/activityContracts";

const label = (value: string) => value.toLowerCase().replaceAll("_", " ").replace(/^./, char => char.toUpperCase());

export function HistoryItem({ item }: { item: ActivityDTO }) {
  return (
    <div className="py-5 sm:flex sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-semibold text-[#27301d]">{item.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-[#f0eadc] px-2 py-0.5 text-[#7b682d]">{label(item.type)}</span>
          <span className={item.status === "FAILED" ? "text-[#8b4a42]" : item.status === "SUCCESS" ? "text-[#9a7b26]" : "text-[#667056]"}>{label(item.status)}</span>
        </div>
      </div>
      <time dateTime={item.createdAt} className="mt-2 block shrink-0 text-sm text-[#667056] sm:mt-0 sm:text-right">
        {new Date(item.createdAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
      </time>
    </div>
  );
}
