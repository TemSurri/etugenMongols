import type { UserHistoryItem } from "../../account/contracts/accountContracts";
import { adminOverviewContentCopy } from "../content/AdminOverviewContentCopy";
export function StatCard({
  label,
  value,
}: {
  label: string;

  value: number | string;
}) {
  return (
    <div
      className="
                rounded-xl
                border
                border-white/10
                bg-[#fffdf8]/95
                p-5
                shadow-lg
                shadow-black/10
            "
    >
      <p
        className="
                    text-xs
                    font-medium
                    text-[#667056]
                "
      >
        {label}
      </p>

      <p
        className="
                    mt-2
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-[#27301d]
                "
      >
        {value}
      </p>
    </div>
  );
}

export function StateMessage({
  text,
  error = false,
}: {
  text: string;

  error?: boolean;
}) {
  return (
    <p
      className={`
                mt-6
                border-t
                border-[#27301d]/10
                pt-5
                text-sm

                ${error ? "text-[#8b4a42]" : "text-[#667056]"}
            `}
    >
      {text}
    </p>
  );
}

export function HistoryRow({
  item,
  lang,
}: {
  item: UserHistoryItem;

  lang: "en" | "mn";
}) {
  const isCreate = item.operation === "CREATE";

  return (
    <div
      className="
                flex
                flex-col
                gap-3
                px-2
                py-4
                transition-colors
                duration-150
                hover:bg-[#f6efdf]/45

                sm:flex-row
                sm:items-start
                sm:justify-between
                sm:px-3
            "
    >
      <div
        className="
                    min-w-0
                    flex-1
                "
      >
        <div
          className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
        >
          <p
            className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
          >
            {item.title}
          </p>

          <OperationBadge operation={item.operation} />
        </div>

        <p
          className="
                        mt-1
                        text-sm
                        leading-6
                        text-[#667056]
                    "
        >
          {item.description}
        </p>

        {!isCreate && <UpdateDetails item={item} lang={lang} />}
      </div>

      <div
        className="
                    shrink-0

                    sm:min-w-[125px]
                    sm:text-right
                "
      >
        <p
          className="
                        text-sm
                        font-medium
                        text-[#27301d]
                    "
        >
          {formatDate(item.createdAt, lang)}
        </p>

        <p
          className="
                        mt-0.5
                        text-xs
                        text-[#7b8372]
                    "
        >
          {formatTime(item.createdAt, lang)}
        </p>
      </div>
    </div>
  );
}

function OperationBadge({ operation }: { operation: string | null }) {
  if (operation === null) {
    return null;
  }

  return (
    <span
      className="
                rounded-md
                bg-[#f0eadc]
                px-2
                py-0.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#7b682d]
            "
    >
      {formatEnum(operation)}
    </span>
  );
}

function UpdateDetails({
  item,
  lang,
}: {
  item: UserHistoryItem;

  lang: "en" | "mn";
}) {
  if (item.field === null && item.oldValue === null && item.newValue === null) {
    return null;
  }

  return (
    <div
      className="
                mt-3
                flex
                flex-wrap
                gap-x-5
                gap-y-2
                text-xs
                text-[#7b8372]
            "
    >
      {item.field !== null && (
        <Detail
          label={adminOverviewContentCopy[lang].field}
          value={formatEnum(item.field)}
        />
      )}

      {item.oldValue !== null && (
        <Detail
          label={adminOverviewContentCopy[lang].previous}
          value={formatHistoryValue(item.oldValue)}
        />
      )}

      {item.newValue !== null && (
        <Detail
          label={adminOverviewContentCopy[lang].new}
          value={formatHistoryValue(item.newValue)}
        />
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <span
      className="
                min-w-0
                break-words
            "
    >
      <span
        className="
                    font-medium
                    text-[#667056]
                "
      >
        {label}:
      </span>{" "}
      <span>{value}</span>
    </span>
  );
}

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatHistoryValue(value: string) {
  if (value === "true") {
    return "Yes";
  }

  if (value === "false") {
    return "No";
  }

  return value;
}

function formatDate(value: string, lang: "en" | "mn") {
  return new Intl.DateTimeFormat(adminOverviewContentCopy[lang].enCa, {
    year: "numeric",

    month: "short",

    day: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string, lang: "en" | "mn") {
  return new Intl.DateTimeFormat(adminOverviewContentCopy[lang].enCa, {
    hour: "numeric",

    minute: "2-digit",
  }).format(new Date(value));
}
