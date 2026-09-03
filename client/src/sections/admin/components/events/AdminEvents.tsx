"use client";

import {
    useState
} from "react";

import {
    AnimatePresence,
    motion
} from "framer-motion";

import AdminEventCard
    from "./AdminEventCard";

import CreateEventForm
    from "./CreateEventForm";

import EditEventModal
    from "./EditEventModal";

import type {
    ApiEvent,
    EventCreateRequest,
    EventUpdateType
} from "../../types";


type Props = {

    events:
        ApiEvent[];

    loading:
        boolean;

    error:
        boolean;

    createEvent:
        (
            request:
                EventCreateRequest
        ) => Promise<ApiEvent>;

    updateEvent:
        (
            eventId:
                string,
            type:
                EventUpdateType,
            value:
                string | null
        ) => Promise<ApiEvent>;

    lang:
        "en" | "mn";
};


export default function AdminEvents({
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    lang
}: Props) {

    const [
        creating,
        setCreating
    ] =
        useState(false);


    const [
        editing,
        setEditing
    ] =
        useState<ApiEvent | null>(
            null
        );


    return (
        <div>

            <section
                className="
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
                        gap-4

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
                            {lang === "mn"
                                ? "Удирдлага"
                                : "Management"}
                        </p>


                        <h2
                            className="
                                mt-1
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-[#27301d]
                            "
                        >
                            {lang === "mn"
                                ? "Арга хэмжээ"
                                : "Events"}
                        </h2>


                        <p
                            className="
                                mt-2
                                max-w-xl
                                text-sm
                                leading-6
                                text-[#667056]
                            "
                        >
                            {lang === "mn"
                                ? "Арга хэмжээ үүсгэх, засах болон бүртгүүлсэн хүмүүсийг харах."
                                : "Create and manage events and view registrations for each event."}
                        </p>

                    </div>


                    <button
                        type="button"
                        disabled={
                            creating
                        }
                        onClick={() =>
                            setCreating(
                                true
                            )
                        }
                        className="
                            w-fit
                            rounded-lg
                            bg-[#27301d]
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition-colors
                            duration-150
                            hover:bg-[#3b472d]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {lang === "mn"
                            ? "+ Арга хэмжээ үүсгэх"
                            : "+ Create Event"}
                    </button>

                </div>

            </section>


            <AnimatePresence
                initial={false}
            >

                {creating && (

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
                        className="mt-5"
                    >

                        <CreateEventForm
                            onCreate={
                                createEvent
                            }
                            onCancel={() =>
                                setCreating(
                                    false
                                )
                            }
                        />

                    </motion.div>

                )}

            </AnimatePresence>


            {loading && (

                <div
                    className="
                        mt-5
                        rounded-xl
                        bg-[#fffdf8]/95
                        p-7
                        text-sm
                        text-[#667056]
                        shadow-lg
                    "
                >
                    {lang === "mn"
                        ? "Арга хэмжээг ачаалж байна..."
                        : "Loading events..."}
                </div>

            )}


            {!loading &&
                error && (

                <div
                    className="
                        mt-5
                        rounded-xl
                        bg-[#fffdf8]/95
                        p-7
                        text-sm
                        text-[#8b4a42]
                        shadow-lg
                    "
                >
                    {lang === "mn"
                        ? "Арга хэмжээг ачаалж чадсангүй."
                        : "Could not load events."}
                </div>

            )}


            {!loading &&
                !error &&
                events.length === 0 && (

                <div
                    className="
                        mt-5
                        rounded-xl
                        bg-[#fffdf8]/95
                        p-7
                        text-sm
                        text-[#667056]
                        shadow-lg
                    "
                >
                    {lang === "mn"
                        ? "Одоогоор арга хэмжээ алга."
                        : "No events yet."}
                </div>

            )}


            {!loading &&
                !error &&
                events.length > 0 && (

                <div
                    className="
                        mt-5
                        space-y-4
                    "
                >

                    {events.map(
                        event => (

                            <AdminEventCard
                                key={
                                    event.id
                                }
                                event={
                                    event
                                }
                                onEdit={() =>
                                    setEditing(
                                        event
                                    )
                                }
                                updateEvent={
                                    updateEvent
                                }
                                lang={
                                    lang
                                }
                            />

                        )
                    )}

                </div>

            )}


            {editing && (

                <EditEventModal
                    event={
                        editing
                    }
                    updateEvent={
                        updateEvent
                    }
                    onClose={() =>
                        setEditing(
                            null
                        )
                    }
                    lang={
                        lang
                    }
                />

            )}

        </div>
    );
}