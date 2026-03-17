import DarkCard from "./DarkCard";
import SectionLabel from "./SectionLabel";

type EventHeaderProps = {
  title: string;
  date: string;
  time: string;
  location?: string;
  onlinePay?: boolean;
  donate?: boolean;
};

export default function EventHeader({
  title,
  date,
  time,
  location,
  onlinePay,
  donate,
}: EventHeaderProps) {
  return (
    <DarkCard className="md:col-span-12">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <SectionLabel>Event</SectionLabel>

          <h1 className="mt-1.5 text-xl font-semibold uppercase leading-tight tracking-[0.06em] text-white sm:text-2xl lg:text-3xl">
            {title}
          </h1>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <div className="border border-white/12 bg-white/0.05 px-2.5 py-1 text-[11px] text-white/82">
              {date}
            </div>
            <div className="border border-white/12 bg-white/0.05 px-2.5 py-1 text-[11px] text-white/82">
              {time}
            </div>
            {location && (
              <div className="border border-white/12 bg-white/0.05 px-2.5 py-1 text-[11px] text-white/82">
                {location}
              </div>
            )}
          </div>
        </div>

        {(onlinePay || donate) && (
          <div className="w-full lg:w-auto lg:max-w-[360px]">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
              {onlinePay && (
                <div className="border border-white/10 bg-white/0.04 px-3 py-2.5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Payment
                  </div>
                  <div className="mt-1 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                    Online payment will appear here.
                  </div>
                </div>
              )}

              {donate && (
                <div className="border border-white/10 bg-white/0.04 px-3 py-2.5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Donate
                  </div>
                  <div className="mt-1 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                    Donation support will appear here.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DarkCard>
  );
}