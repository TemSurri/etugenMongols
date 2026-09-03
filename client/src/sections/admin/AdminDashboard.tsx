"use client";

import {
    useMemo,
    useState
} from "react";

import {
    AnimatePresence,
    motion
} from "framer-motion";

import {
    useLanguage
} from "../../context/LanguageContext";

import AdminSidebar
    from "./components/AdminSidebar";

import AdminOverview
    from "./components/AdminOverview";

import AdminEvents
    from "./components/events/AdminEvents";

import {
    useAdminEvents
} from "./hooks/useAdminEvents";

import {
    useAdminActivity
} from "./hooks/useAdminActivity";

import type {
    AdminSection
} from "./types";


const ADMIN_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp"
];


export default function AdminDashboard() {

    const {
        lang
    } =
        useLanguage();


    const [
        section,
        setSection
    ] =
        useState<AdminSection>(
            "overview"
        );


    const background =
        useMemo(
            () =>
                ADMIN_BACKGROUNDS[
                    Math.floor(
                        Math.random() *
                        ADMIN_BACKGROUNDS.length
                    )
                ],
            []
        );


    const adminEvents =
        useAdminEvents();


    const adminActivity =
        useAdminActivity();


    return (
        <main
            className="
                relative
                min-h-screen
                overflow-x-hidden
                bg-[#222a1d]
                pt-20
                text-[#27301d]
            "
        >

            <div
                className="
                    fixed
                    inset-0
                    bg-cover
                    bg-center
                "
                style={{
                    backgroundImage:
                        `url("${background}")`
                }}
            />


            <div
                className="
                    fixed
                    inset-0
                    bg-[#20281b]/72
                "
            />


            <div
                className="
                    fixed
                    inset-0
                    bg-gradient-to-b
                    from-black/10
                    via-transparent
                    to-black/20
                "
            />


            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 0.35
                }}
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1450px]
                    px-5
                    py-8

                    sm:px-8

                    lg:px-10
                    lg:py-10
                "
            >

                <header
                    className="
                        mb-5
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#fffdf8]/95
                        px-6
                        py-6
                        shadow-lg
                        shadow-black/10

                        sm:px-8
                        sm:py-7
                    "
                >

                    <p
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[#9a7b26]
                        "
                    >
                        Etugen Mongols
                    </p>


                    <h1
                        className="
                            mt-2
                            text-3xl
                            font-semibold
                            tracking-tight
                            text-[#27301d]

                            sm:text-4xl
                        "
                    >
                        {lang === "mn"
                            ? "Админ самбар"
                            : "Admin Dashboard"}
                    </h1>


                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-6
                            text-[#667056]
                        "
                    >
                        {lang === "mn"
                            ? "Арга хэмжээ болон системийн сүүлийн өөрчлөлтүүдийг удирдана."
                            : "Manage events and review recent administrative activity."}
                    </p>

                </header>


                <div
                    className="
                        grid
                        gap-5

                        lg:grid-cols-[210px_minmax(0,1fr)]
                    "
                >

                    <AdminSidebar
                        section={
                            section
                        }
                        onChange={
                            setSection
                        }
                        lang={
                            lang
                        }
                    />


                    <div className="min-w-0">

                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >

                            <motion.div
                                key={
                                    section
                                }
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
                            >

                                {section ===
                                    "overview" && (

                                    <AdminOverview
                                        events={
                                            adminEvents.events
                                        }

                                        publishedCount={
                                            adminEvents.publishedCount
                                        }

                                        draftCount={
                                            adminEvents.draftCount
                                        }

                                        eventsLoading={
                                            adminEvents.loading
                                        }

                                        activity={
                                            adminActivity.activity
                                        }

                                        activityLoading={
                                            adminActivity.loading
                                        }

                                        activityError={
                                            adminActivity.error
                                        }

                                        lang={
                                            lang
                                        }
                                    />

                                )}


                                {section ===
                                    "events" && (

                                    <AdminEvents
                                        events={
                                            adminEvents.events
                                        }
                                        loading={
                                            adminEvents.loading
                                        }
                                        error={
                                            adminEvents.error
                                        }
                                        createEvent={
                                            adminEvents.createEvent
                                        }
                                        updateEvent={
                                            adminEvents.updateEvent
                                        }
                                        updateRegistration={
                                            adminEvents.updateRegistration
                                        }
                                        lang={
                                            lang
                                        }
                                    />

                                )}

                            </motion.div>

                        </AnimatePresence>

                    </div>

                </div>

            </motion.div>

        </main>
    );
}