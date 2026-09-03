"use client";

import {
    useEffect,
    useMemo,
    useState,
    type ReactNode
} from "react";

import {
    AnimatePresence,
    motion
} from "framer-motion";

import {
    useEventRegistrations
} from "../../hooks/useEventRegistrations";

import type {
    ApiEvent
} from "../../types";


const PAGE_SIZE =
    20;


type Props = {

    event:
        ApiEvent;

    open:
        boolean;

    onClose:
        () => void;

    lang:
        "en" | "mn";
};


export default function EventRegistrantsModal({
    event,
    open,
    onClose,
    lang
}: Props) {

    const {
        registrations,
        loading,
        error,
        load,
        clear
    } =
        useEventRegistrations();


    const [
        page,
        setPage
    ] =
        useState(0);


    const [
        query,
        setQuery
    ] =
        useState("");


    useEffect(
        () => {

            if (
                !open
            ) {
                return;
            }


            setPage(
                0
            );

            setQuery(
                ""
            );


            void load(
                event.id
            );


            return () => {
                clear();
            };

        },
        [
            open,
            event.id,
            load,
            clear
        ]
    );


    useEffect(
        () => {

            if (
                !open
            ) {
                return;
            }


            const previous =
                document.body.style.overflow;


            document.body.style.overflow =
                "hidden";


            function handleKeyDown(
                keyboardEvent:
                    KeyboardEvent
            ) {

                if (
                    keyboardEvent.key ===
                    "Escape"
                ) {
                    onClose();
                }
            }


            window.addEventListener(
                "keydown",
                handleKeyDown
            );


            return () => {

                document.body.style.overflow =
                    previous;


                window.removeEventListener(
                    "keydown",
                    handleKeyDown
                );

            };

        },
        [
            open,
            onClose
        ]
    );


    const filtered =
        useMemo(
            () => {

                const search =
                    query
                        .trim()
                        .toLowerCase();


                if (
                    !search
                ) {
                    return registrations;
                }


                return registrations.filter(
                    registration => {

                        const fullName =
                            `${registration.firstName} ${registration.lastName}`
                                .toLowerCase();


                        return (
                            fullName.includes(
                                search
                            ) ||
                            registration.email
                                .toLowerCase()
                                .includes(
                                    search
                                )
                        );

                    }
                );

            },
            [
                registrations,
                query
            ]
        );


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filtered.length /
                PAGE_SIZE
            )
        );


    const safePage =
        Math.min(
            page,
            totalPages - 1
        );


    const visible =
        filtered.slice(
            safePage *
            PAGE_SIZE,
            safePage *
            PAGE_SIZE +
            PAGE_SIZE
        );


    return (
        <AnimatePresence>

            {open && (

                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.16
                    }}
                    className="
    fixed
    inset-0
    z-[100]
    flex
    items-start
    justify-center
    overflow-y-auto
    bg-[#172011]/65

    px-4
    pt-38
    pb-8

    sm:px-6
    sm:pt-38
    sm:pb-10
"
                    onMouseDown={
                        mouseEvent => {

                            if (
                                mouseEvent.target ===
                                mouseEvent.currentTarget
                            ) {
                                onClose();
                            }

                        }
                    }
                >

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 6
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.18
                        }}
                        className="
                            flex
                            max-h-[78vh]
                            w-full
                            max-w-5xl
                            flex-col
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#27301d]/10
                            bg-[#fffdf8]
                            shadow-2xl
                        "
                    >

                        <header
                            className="
                                shrink-0
                                border-b
                                border-[#27301d]/10
                                px-6
                                py-5

                                sm:px-7
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-5
                                "
                            >

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#9a7b26]
                                        "
                                    >
                                        {lang === "mn"
                                            ? "Бүртгэл"
                                            : "Registrants"}
                                    </p>


                                    <h2
                                        className="
                                            mt-1
                                            truncate
                                            text-xl
                                            font-semibold
                                            tracking-tight
                                            text-[#27301d]
                                        "
                                    >
                                        {lang === "mn"
                                            ? event.titleMn
                                            : event.titleEn}
                                    </h2>


                                    {!loading &&
                                        !error && (

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                text-[#667056]
                                            "
                                        >
                                            {filtered.length}{" "}

                                            {lang === "mn"
                                                ? "бүртгэл"
                                                : filtered.length === 1
                                                    ? "registrant"
                                                    : "registrants"}
                                        </p>

                                    )}

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        onClose
                                    }
                                    className="
                                        shrink-0
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-lg
                                        leading-none
                                        text-[#667056]
                                        transition-colors
                                        hover:bg-[#f1ecdf]
                                        hover:text-[#27301d]
                                    "
                                >
                                    ×
                                </button>

                            </div>


                            <input
                                type="search"
                                value={
                                    query
                                }
                                onChange={
                                    event => {

                                        setQuery(
                                            event.target.value
                                        );

                                        setPage(
                                            0
                                        );

                                    }
                                }
                                placeholder={
                                    lang === "mn"
                                        ? "Нэр эсвэл имэйл хайх..."
                                        : "Search by name or email..."
                                }
                                className="
                                    mt-4
                                    w-full
                                    rounded-lg
                                    border
                                    border-[#27301d]/15
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#27301d]
                                    outline-none
                                    transition-colors
                                    hover:border-[#9a7b26]/40
                                    focus:border-[#9a7b26]/65
                                    focus:ring-2
                                    focus:ring-[#9a7b26]/10
                                "
                            />

                        </header>


                        <div
                            className="
                                min-h-0
                                flex-1
                                overflow-y-auto
                                px-6
                                py-4

                                sm:px-7
                            "
                        >

                            {loading && (

                                <p
                                    className="
                                        py-10
                                        text-center
                                        text-sm
                                        text-[#667056]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Бүртгэлийг ачаалж байна..."
                                        : "Loading registrations..."}
                                </p>

                            )}


                            {!loading &&
                                error && (

                                <p
                                    className="
                                        py-10
                                        text-center
                                        text-sm
                                        text-[#8b4a42]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Бүртгэлийг ачаалж чадсангүй."
                                        : "Could not load registrations."}
                                </p>

                            )}


                            {!loading &&
                                !error &&
                                visible.length === 0 && (

                                <p
                                    className="
                                        py-10
                                        text-center
                                        text-sm
                                        text-[#667056]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Бүртгэл олдсонгүй."
                                        : "No registrants found."}
                                </p>

                            )}


                            {!loading &&
                                !error &&
                                visible.length > 0 && (

                                <div
                                    className="
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-[#27301d]/10
                                    "
                                >

                                    <div className="overflow-x-auto">

                                        <table
                                            className="
                                                w-full
                                                min-w-[680px]
                                                text-left
                                            "
                                        >

                                            <thead className="bg-[#f3ede1]">

                                                <tr>

                                                    <Heading>
                                                        #
                                                    </Heading>

                                                    <Heading>
                                                        {lang === "mn"
                                                            ? "Нэр"
                                                            : "Name"}
                                                    </Heading>

                                                    <Heading>
                                                        {lang === "mn"
                                                            ? "Имэйл"
                                                            : "Email"}
                                                    </Heading>

                                                    <Heading>
                                                        {lang === "mn"
                                                            ? "Төлөв"
                                                            : "Status"}
                                                    </Heading>

                                                    <Heading>
                                                        {lang === "mn"
                                                            ? "Огноо"
                                                            : "Registered"}
                                                    </Heading>

                                                </tr>

                                            </thead>


                                            <tbody
                                                className="
                                                    divide-y
                                                    divide-[#27301d]/10
                                                "
                                            >

                                                {visible.map(
                                                    (
                                                        registration,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                registration.id
                                                            }
                                                            className="
                                                                transition-colors
                                                                hover:bg-[#f6efdf]/45
                                                            "
                                                        >

                                                            <Cell>
                                                                {
                                                                    safePage *
                                                                    PAGE_SIZE +
                                                                    index +
                                                                    1
                                                                }
                                                            </Cell>


                                                            <td
                                                                className="
                                                                    px-4
                                                                    py-3
                                                                    text-sm
                                                                    font-medium
                                                                    text-[#27301d]
                                                                "
                                                            >
                                                                {
                                                                    registration.firstName
                                                                }{" "}
                                                                {
                                                                    registration.lastName
                                                                }
                                                            </td>


                                                            <td
                                                                className="
                                                                    px-4
                                                                    py-3
                                                                "
                                                            >

                                                                <a
                                                                    href={`mailto:${registration.email}`}
                                                                    className="
                                                                        text-sm
                                                                        text-[#667056]
                                                                        transition-colors
                                                                        hover:text-[#9a7b26]
                                                                    "
                                                                >
                                                                    {
                                                                        registration.email
                                                                    }
                                                                </a>

                                                            </td>


                                                            <Cell>

                                                                {
                                                                    registration.status ===
                                                                    "REGISTERED"
                                                                        ? lang === "mn"
                                                                            ? "Бүртгэгдсэн"
                                                                            : "Registered"
                                                                        : lang === "mn"
                                                                            ? "Цуцлагдсан"
                                                                            : "Cancelled"
                                                                }

                                                            </Cell>


                                                            <Cell>
                                                                {
                                                                    formatDate(
                                                                        registration.createdAt,
                                                                        lang
                                                                    )
                                                                }
                                                            </Cell>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            )}

                        </div>


                        {!loading &&
                            !error &&
                            filtered.length > 0 && (

                            <footer
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    justify-between
                                    gap-4
                                    border-t
                                    border-[#27301d]/10
                                    px-6
                                    py-4

                                    sm:px-7
                                "
                            >

                                <button
                                    type="button"
                                    disabled={
                                        safePage === 0
                                    }
                                    onClick={() =>
                                        setPage(
                                            current =>
                                                Math.max(
                                                    0,
                                                    current - 1
                                                )
                                        )
                                    }
                                    className="
                                        rounded-md
                                        px-2
                                        py-1
                                        text-sm
                                        font-medium
                                        text-[#27301d]
                                        transition-colors
                                        hover:bg-[#f1ecdf]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >
                                    ←{" "}
                                    {lang === "mn"
                                        ? "Өмнөх"
                                        : "Previous"}
                                </button>


                                <p
                                    className="
                                        text-sm
                                        text-[#667056]
                                    "
                                >
                                    {safePage + 1}
                                    {" / "}
                                    {totalPages}
                                </p>


                                <button
                                    type="button"
                                    disabled={
                                        safePage >=
                                        totalPages - 1
                                    }
                                    onClick={() =>
                                        setPage(
                                            current =>
                                                Math.min(
                                                    totalPages - 1,
                                                    current + 1
                                                )
                                        )
                                    }
                                    className="
                                        rounded-md
                                        px-2
                                        py-1
                                        text-sm
                                        font-medium
                                        text-[#27301d]
                                        transition-colors
                                        hover:bg-[#f1ecdf]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >
                                    {lang === "mn"
                                        ? "Дараах"
                                        : "Next"}{" "}
                                    →
                                </button>

                            </footer>

                        )}

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>
    );
}


function Heading({
    children
}: {
    children:
        ReactNode;
}) {

    return (
        <th
            className="
                px-4
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#667056]
            "
        >
            {children}
        </th>
    );
}


function Cell({
    children
}: {
    children:
        ReactNode;
}) {

    return (
        <td
            className="
                px-4
                py-3
                text-sm
                text-[#667056]
            "
        >
            {children}
        </td>
    );
}


function formatDate(
    value:
        string,
    lang:
        "en" | "mn"
) {

    return new Intl.DateTimeFormat(
        lang === "mn"
            ? "mn-MN"
            : "en-CA",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    ).format(
        new Date(
            value
        )
    );
}