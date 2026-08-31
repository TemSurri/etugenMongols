interface HistoryCopy {
    title: string;
    emptyTitle: string;
    emptyBody: string;
}

interface HistorySectionProps {
    copy: HistoryCopy;
}

export function HistorySection({
    copy
}: HistorySectionProps) {
    return (
        <section className="rounded-2xl border border-[#27301d]/10 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#27301d]">
                {copy.title}
            </h2>

            <div className="mt-6 rounded-xl bg-[#f7f6f1] p-5">

                <p className="text-sm font-semibold text-[#27301d]">
                    {copy.emptyTitle}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#667056]">
                    {copy.emptyBody}
                </p>

            </div>

        </section>
    );
}