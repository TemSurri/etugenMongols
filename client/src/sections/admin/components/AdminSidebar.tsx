import type {
    AdminSection
} from "../types";


type Props = {

    section:
        AdminSection;

    onChange:
        (
            section:
                AdminSection
        ) => void;

    lang:
        "en" | "mn";
};


export default function AdminSidebar({
    section,
    onChange,
    lang
}: Props) {

    return (
        <aside
            className="
                h-fit
                rounded-xl
                border
                border-white/10
                bg-[#fffdf8]/95
                p-2
                shadow-lg
                shadow-black/10

                lg:sticky
                lg:top-28
            "
        >

            <nav className="space-y-1">

                <NavButton
                    active={
                        section === "overview"
                    }
                    onClick={() =>
                        onChange(
                            "overview"
                        )
                    }
                    title={
                        lang === "mn"
                            ? "Тойм"
                            : "Overview"
                    }
                    subtitle={
                        lang === "mn"
                            ? "Сүүлийн өөрчлөлт"
                            : "Recent updates"
                    }
                />


                <NavButton
                    active={
                        section === "events"
                    }
                    onClick={() =>
                        onChange(
                            "events"
                        )
                    }
                    title={
                        lang === "mn"
                            ? "Арга хэмжээ"
                            : "Events"
                    }
                    subtitle={
                        lang === "mn"
                            ? "Үүсгэх ба удирдах"
                            : "Create and manage"
                    }
                />

            </nav>

        </aside>
    );
}


function NavButton({
    active,
    onClick,
    title,
    subtitle
}: {
    active:
        boolean;

    onClick:
        () => void;

    title:
        string;

    subtitle:
        string;
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                w-full
                rounded-lg
                px-4
                py-3
                text-left
                transition-colors
                duration-150

                ${
                    active
                        ? "bg-[#27301d] text-white"
                        : "text-[#27301d] hover:bg-[#f2ecdf]"
                }
            `}
        >

            <span
                className="
                    block
                    text-sm
                    font-semibold
                "
            >
                {title}
            </span>


            <span
                className={`
                    mt-0.5
                    block
                    text-xs

                    ${
                        active
                            ? "text-white/55"
                            : "text-[#7b8372]"
                    }
                `}
            >
                {subtitle}
            </span>

        </button>
    );
}