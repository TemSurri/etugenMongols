import type {
  ApiEvent
} from "../types";


type Props = {
  events: ApiEvent[];

  publishedCount: number;
  draftCount: number;

  loading: boolean;
};


export default function AdminOverview({
  events,
  publishedCount,
  draftCount,
  loading
}: Props) {

  return (
    <div>

      <div className="mb-6">

        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#92752b]">
          Overview
        </p>

        <h2 className="mt-2 text-2xl font-normal tracking-tight">
          Organization Content
        </h2>

      </div>


      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          label="Total Events"
          value={
            loading
              ? "—"
              : events.length
          }
        />

        <StatCard
          label="Published"
          value={
            loading
              ? "—"
              : publishedCount
          }
        />

        <StatCard
          label="Drafts"
          value={
            loading
              ? "—"
              : draftCount
          }
        />

      </div>


      <div className="mt-6 border border-[#d7caa8] bg-[#fffaf0] p-6 sm:p-8">

        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#92752b]">
          Administration
        </p>

        <h3 className="mt-3 text-xl font-normal">
          Event management is ready.
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#59604d]">
          Create new events, edit their content,
          control registration information and
          choose when they become visible on the
          public website.
        </p>

      </div>

    </div>
  );
}


function StatCard({
  label,
  value
}: {
  label: string;
  value: number | string;
}) {

  return (
    <div className="border border-[#d7caa8] bg-[#fffaf0] p-6">

      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#92752b]">
        {label}
      </p>

      <p className="mt-3 text-3xl font-normal tracking-tight">
        {value}
      </p>

    </div>
  );
}