import { HistoryItem } from "./HistoryItem";

import { AnimatePresence, motion } from "framer-motion";

import { useUserHistory } from "../hooks/useUserHistory";

interface HistoryCopy {
  title: string;
  emptyTitle: string;
  emptyBody: string;
}

interface HistorySectionProps {
  copy: HistoryCopy;
}

export function HistorySection({ copy }: HistorySectionProps) {
  const { history, page, loading, error, nextPage, previousPage, reload } =
    useUserHistory();

  const paymentCount = history
    ? history.content.filter((item) => item.type === "PAYMENT").length
    : 0;

  const activityCount = history
    ? history.content.filter((item) => item.type === "ACTIVITY").length
    : 0;

  return (
    <section
      className="
                rounded-2xl
                border
                border-[#27301d]/10
                bg-white
                p-6
                shadow-sm
            "
    >
      <div
        className="
                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
      >
        <h2
          className="
                        text-xl
                        font-semibold
                        text-[#27301d]
                    "
        >
          {copy.title}
        </h2>

        {history && history.totalElements > 0 && (
          <div
            className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-1

                            text-sm
                            text-[#667056]
                        "
          >
            <span>
              <span
                className="
                                    font-semibold
                                    text-[#27301d]
                                "
              >
                {history.totalElements}
              </span>{" "}
              total
            </span>

            <span>
              <span
                className="
                                    font-semibold
                                    text-[#27301d]
                                "
              >
                {paymentCount}
              </span>{" "}
              {paymentCount === 1 ? "payment" : "payments"}
            </span>

            <span>
              <span
                className="
                                    font-semibold
                                    text-[#27301d]
                                "
              >
                {activityCount}
              </span>{" "}
              account {activityCount === 1 ? "activity" : "activities"}
            </span>
          </div>
        )}
      </div>

      {loading && !history && (
        <div
          className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
        >
          <p
            className="
                            text-sm
                            text-[#667056]
                        "
          >
            Loading history...
          </p>
        </div>
      )}

      {error && !history && (
        <div
          className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
        >
          <p
            className="
                            text-sm
                            text-[#667056]
                        "
          >
            Unable to load your history.
          </p>

          <button
            type="button"
            onClick={reload}
            className="
                            mt-4
                            text-sm
                            font-medium
                            text-[#9a7b26]
                            transition
                            hover:text-[#27301d]
                        "
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && history && history.content.length === 0 && (
        <div
          className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
        >
          <p
            className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
          >
            {copy.emptyTitle}
          </p>

          <p
            className="
                            mt-2
                            text-sm
                            leading-6
                            text-[#667056]
                        "
          >
            {copy.emptyBody}
          </p>
        </div>
      )}

      {history && history.content.length > 0 && (
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
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.18,
                }}
              >
                {history.content.map((item) => (
                  <HistoryItem
                    key={`${item.type}-${item.createdAt}-${item.title}`}
                    item={item}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
          >
            <button
              type="button"
              onClick={previousPage}
              disabled={history.first || loading}
              className="
                                text-sm
                                font-medium
                                text-[#27301d]
                                transition
                                hover:text-[#9a7b26]
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
            >
              ← Previous
            </button>

            <p
              className="
                                text-sm
                                text-[#667056]
                            "
            >
              {history.number + 1}
              {" / "}
              {history.totalPages}
            </p>

            <button
              type="button"
              onClick={nextPage}
              disabled={history.last || loading}
              className="
                                text-sm
                                font-medium
                                text-[#27301d]
                                transition
                                hover:text-[#9a7b26]
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
            >
              {loading ? "Loading..." : "Next →"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
