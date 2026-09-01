interface RegistrationsSectionCopy {
    title: string;
    description: string;
    comingSoonTitle: string;
    comingSoonBody: string;
    futureLabel: string;
}

interface RegistrationsSectionProps {
    copy: RegistrationsSectionCopy;
}

export function RegistrationsSection({
    copy
}: RegistrationsSectionProps) {

    return (
        <section
            className="
                rounded-2xl
                border
                border-[#27301d]/10
                bg-white
                p-6
                shadow-sm
                sm:p-7
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-2
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

                <p
                    className="
                        max-w-2xl
                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {copy.description}
                </p>
            </div>

            <div
                className="
                    mt-6
                    border-t
                    border-[#27301d]/10
                    pt-6
                "
            >
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#27301d]/10
                        bg-[#f7f6f1]
                        px-5
                        py-7
                        sm:px-6
                        sm:py-8
                    "
                >
                    <div
                        className="
                            absolute
                            left-0
                            top-0
                            h-full
                            w-1
                            bg-[#9a7b26]
                        "
                    />

                    <div
                        className="
                            pl-2
                        "
                    >
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-[#9a7b26]
                            "
                        >
                            {copy.futureLabel}
                        </p>

                        <h3
                            className="
                                mt-3
                                text-lg
                                font-semibold
                                text-[#27301d]
                            "
                        >
                            {copy.comingSoonTitle}
                        </h3>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                text-sm
                                leading-6
                                text-[#667056]
                            "
                        >
                            {copy.comingSoonBody}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}