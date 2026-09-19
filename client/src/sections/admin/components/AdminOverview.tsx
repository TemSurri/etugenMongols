import { useMemo, useState } from "react";
import { adminOverviewCopy } from "../content/AdminOverviewCopy";
import { HistoryRow, StatCard, StateMessage } from "./AdminOverviewContent";

import type { UserHistoryItem } from "../../account/types/accountTypes";

import type { ApiEvent } from "../types";

const ACTIVITY_PAGE_SIZE = 5;

type Props = {
  events: ApiEvent[];

  publishedCount: number;

  draftCount: number;

  eventsLoading: boolean;

  activity: UserHistoryItem[];

  activityLoading: boolean;

  activityError: boolean;

  lang: "en" | "mn";
};

export default function AdminOverview({
  events,
  publishedCount,
  draftCount,
  eventsLoading,
  activity,
  activityLoading,
  activityError,
  lang,
}: Props) {
  const [activityPage, setActivityPage] = useState(0);

  const totalActivityPages = Math.max(
    1,
    Math.ceil(activity.length / ACTIVITY_PAGE_SIZE),
  );

  const visibleActivity = useMemo(() => {
    const start = activityPage * ACTIVITY_PAGE_SIZE;

    return activity.slice(start, start + ACTIVITY_PAGE_SIZE);
  }, [activity, activityPage]);

  if (activityPage >= totalActivityPages) {
    setActivityPage(Math.max(0, totalActivityPages - 1));
  }

  const canGoPrevious = activityPage > 0;

  const canGoNext = activityPage < totalActivityPages - 1;

  return (
    <div>
      <div
        className="
                    grid
                    gap-4

                    sm:grid-cols-3
                "
      >
        <StatCard
          label={adminOverviewCopy[lang].totalEvents}
          value={eventsLoading ? "—" : events.length}
        />

        <StatCard
          label={adminOverviewCopy[lang].published}
          value={eventsLoading ? "—" : publishedCount}
        />

        <StatCard
          label={adminOverviewCopy[lang].drafts}
          value={eventsLoading ? "—" : draftCount}
        />
      </div>

      <section
        className="
                    mt-5
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#fffdf8]/95
                    p-6
                    shadow-lg
                    shadow-black/10

                    sm:p-7
                "
      >
        <div
          className="
                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
        >
          <div>
            <p
              className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-[#9a7b26]
                            "
            >
              {adminOverviewCopy[lang].activity}
            </p>

            <h2
              className="
                                mt-1
                                text-xl
                                font-semibold
                                tracking-tight
                                text-[#27301d]

                                sm:text-2xl
                            "
            >
              {adminOverviewCopy[lang].recentUpdates}
            </h2>

            <p
              className="
                                mt-2
                                text-sm
                                leading-6
                                text-[#667056]
                            "
            >
              {adminOverviewCopy[lang].theMostRecentAdministrativeChangesMadeTo}
            </p>
          </div>

          {!activityLoading && !activityError && activity.length > 0 && (
            <p
              className="
                                shrink-0
                                text-xs
                                text-[#7b8372]
                            "
            >
              {lang === "mn"
                ? `Сүүлийн ${activity.length} өөрчлөлт`
                : `Latest ${activity.length} updates`}
            </p>
          )}
        </div>

        {activityError ? (
          <StateMessage
            text={adminOverviewCopy[lang].couldNotLoadRecentUpdates}
            error
          />
        ) : activityLoading ? (
          <StateMessage text={adminOverviewCopy[lang].loadingUpdates} />
        ) : activity.length === 0 ? (
          <StateMessage text={adminOverviewCopy[lang].noRecentEventActivity} />
        ) : (
          <>
            <div
              className="
                                mt-5
                                divide-y
                                divide-[#27301d]/10
                                border-y
                                border-[#27301d]/10
                            "
            >
              {visibleActivity.map((item, index) => (
                <HistoryRow
                  key={`${item.createdAt}-${index}`}
                  item={item}
                  lang={lang}
                />
              ))}
            </div>

            {totalActivityPages > 1 && (
              <div
                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
              >
                <button
                  type="button"
                  disabled={!canGoPrevious}
                  onClick={() => setActivityPage((current) => current - 1)}
                  className="
                                        rounded-lg
                                        border
                                        border-[#27301d]/10
                                        bg-white
                                        px-3.5
                                        py-2
                                        text-sm
                                        font-medium
                                        text-[#667056]
                                        transition-colors
                                        duration-150

                                        hover:border-[#9a7b26]/30
                                        hover:bg-[#f6efdf]/60
                                        hover:text-[#27301d]

                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                        disabled:hover:border-[#27301d]/10
                                        disabled:hover:bg-white
                                        disabled:hover:text-[#667056]
                                    "
                >
                  {adminOverviewCopy[lang].previous}
                </button>

                <div
                  className="
                                        text-center
                                        text-xs
                                        text-[#7b8372]
                                    "
                >
                  <p
                    className="
                                            font-medium
                                            text-[#667056]
                                        "
                  >
                    {lang === "mn"
                      ? `${activityPage + 1} / ${totalActivityPages} хуудас`
                      : `Page ${activityPage + 1} of ${totalActivityPages}`}
                  </p>

                  <p className="mt-0.5">
                    {adminOverviewCopy[lang].mostRecentActivityOnly}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={() => setActivityPage((current) => current + 1)}
                  className="
                                        rounded-lg
                                        border
                                        border-[#27301d]/10
                                        bg-white
                                        px-3.5
                                        py-2
                                        text-sm
                                        font-medium
                                        text-[#667056]
                                        transition-colors
                                        duration-150

                                        hover:border-[#9a7b26]/30
                                        hover:bg-[#f6efdf]/60
                                        hover:text-[#27301d]

                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                        disabled:hover:border-[#27301d]/10
                                        disabled:hover:bg-white
                                        disabled:hover:text-[#667056]
                                    "
                >
                  {adminOverviewCopy[lang].next}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
