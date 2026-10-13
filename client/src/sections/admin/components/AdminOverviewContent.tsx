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
