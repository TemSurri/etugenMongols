import type { EventAction } from "../../static_events";

type EventHeaderProps = {
  title: string;
  date: string;
  time: string;
  location?: string;
  actions: EventAction[];
  lang: "mn" | "en";
};

export default function EventHeader({
  title,
  date,
  time,
  location,
  actions,
  lang,
}: EventHeaderProps) {
  const hasActions = actions.length > 0;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
        Event
      </div>

      <h1 className="mt-2 text-3xl font-semibold uppercase leading-tight tracking-[0.05em] text-white sm:text-4xl">
        {title}
      </h1>

      <div className="mt-3 space-y-1.5 text-sm text-white/72">
        <p>{date}</p>
        <p>{time}</p>
        {location && <p>{location}</p>}
      </div>

      {hasActions && (
        <div className="mt-5 space-y-2">
          {actions.map((action) => {
            const label = lang === "mn" ? action.label_mn : action.label;

            return (
              <button
                key={action.type}
                type="button"
                className="w-full rounded-xl border border-white/12 bg-white text-sm font-medium uppercase tracking-[0.12em] text-black transition hover:bg-white/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <span>{label}</span>

                  {action.type === "payment" && action.price !== undefined && (
                    <span className="text-black/55">${action.price}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}