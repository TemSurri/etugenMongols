"use client";

import { inputClasses } from "../../model/eventEditorUtils";
import { Field,FormSection,Input,TextArea } from "./EventEditorFields";


import {
useEffect,
useState
} from "react";

import {
AnimatePresence,
motion
} from "framer-motion";

import type {
ApiEvent,
EventUpdateType
} from "../../types";

import {
addEventChange,
emptyToNull,
getEventUpdateErrorMessage,
normalizeInstant,
toDateTimeLocal
} from "../../model/eventEditorUtils";


type Props = {

    event:
        ApiEvent;

    updateEvent:
        (
            eventId:
                string,
            type:
                EventUpdateType,
            value:
                string | null
        ) => Promise<ApiEvent>;

    updateRegistration:
        (
            eventId:
                string,
            registerable:
                boolean,
            registrationCost:
                number | null
        ) => Promise<ApiEvent>;

    onClose:
        () => void;

    lang:
        "en" | "mn";
};


export default function EditEventModal({
    event,
    updateEvent,
    updateRegistration,
    onClose,
    lang
}: Props) {

    const [
        titleEn,
        setTitleEn
    ] =
        useState(
            event.titleEn
        );


    const [
        titleMn,
        setTitleMn
    ] =
        useState(
            event.titleMn
        );


    const [
        descriptionEn,
        setDescriptionEn
    ] =
        useState(
            event.descriptionEn
        );


    const [
        descriptionMn,
        setDescriptionMn
    ] =
        useState(
            event.descriptionMn
        );


    const [
        startsAt,
        setStartsAt
    ] =
        useState(
            toDateTimeLocal(
                event.startsAt
            )
        );


    const [
        endsAt,
        setEndsAt
    ] =
        useState(
            event.endsAt
                ? toDateTimeLocal(
                    event.endsAt
                )
                : ""
        );


    const [
        location,
        setLocation
    ] =
        useState(
            event.location
        );


    const [
        registerable,
        setRegisterable
    ] =
        useState(
            event.registerable
        );


    const [
        registrationDollars,
        setRegistrationDollars
    ] =
        useState(
            event.registrationCost !== null
                ? (
                    event.registrationCost /
                    100
                ).toFixed(2)
                : ""
        );


    const [
        coverImage,
        setCoverImage
    ] =
        useState(
            event.coverImage ??
            ""
        );


    const [
        coverImageAltEn,
        setCoverImageAltEn
    ] =
        useState(
            event.coverImageAltEn ??
            ""
        );


    const [
        coverImageAltMn,
        setCoverImageAltMn
    ] =
        useState(
            event.coverImageAltMn ??
            ""
        );


    const [
        contactEmail,
        setContactEmail
    ] =
        useState(
            event.contactEmail ??
            ""
        );


    const [
        contactPhone,
        setContactPhone
    ] =
        useState(
            event.contactPhone ??
            ""
        );


    const [
        saving,
        setSaving
    ] =
        useState(false);


    const [
        error,
        setError
    ] =
        useState<string | null>(
            null
        );


    useEffect(
        () => {

            const previous =
                document.body.style.overflow;


            document.body.style.overflow =
                "hidden";


            function handleKeyDown(
                keyboardEvent:
                    KeyboardEvent
            ) {

                if (
                    keyboardEvent.key === "Escape" &&
                    !saving
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
            onClose,
            saving
        ]
    );


    async function saveChanges() {

        if (
            saving
        ) {
            return;
        }


        if (
            !titleEn.trim() ||
            !titleMn.trim() ||
            !descriptionEn.trim() ||
            !descriptionMn.trim() ||
            !location.trim() ||
            !startsAt
        ) {

            setError(
                lang === "mn"
                    ? "Шаардлагатай талбаруудыг бөглөнө үү."
                    : "Please complete all required fields."
            );

            return;
        }


        let newRegistrationCost:
            number | null =
            null;


        if (
            registerable
        ) {

            const dollars =
                Number(
                    registrationDollars
                );


            if (
                !Number.isFinite(
                    dollars
                ) ||
                dollars < 0
            ) {

                setError(
                    lang === "mn"
                        ? "Бүртгэлийн үнэ буруу байна."
                        : "Registration cost must be a valid amount."
                );

                return;
            }


            newRegistrationCost =
                Math.round(
                    dollars *
                    100
                );

        }


        try {

            setSaving(
                true
            );

            setError(
                null
            );


            const changes:
                {
                    type:
                        EventUpdateType;

                    value:
                        string | null;
                }[] = [];


            addEventChange(
                changes,
                "TITLE_EN",
                event.titleEn,
                titleEn.trim()
            );


            addEventChange(
                changes,
                "TITLE_MN",
                event.titleMn,
                titleMn.trim()
            );


            addEventChange(
                changes,
                "DESCRIPTION_EN",
                event.descriptionEn,
                descriptionEn.trim()
            );


            addEventChange(
                changes,
                "DESCRIPTION_MN",
                event.descriptionMn,
                descriptionMn.trim()
            );


            addEventChange(
                changes,
                "LOCATION",
                event.location,
                location.trim()
            );


            addEventChange(
                changes,
                "STARTS_AT",
                normalizeInstant(
                    event.startsAt
                ),
                new Date(
                    startsAt
                ).toISOString()
            );


            addEventChange(
                changes,
                "ENDS_AT",
                event.endsAt
                    ? normalizeInstant(
                        event.endsAt
                    )
                    : null,
                endsAt
                    ? new Date(
                        endsAt
                    ).toISOString()
                    : null
            );


            


            addEventChange(
                changes,
                "COVER_IMAGE",
                event.coverImage,
                emptyToNull(
                    coverImage
                )
            );


            addEventChange(
                changes,
                "COVER_IMAGE_ALT_EN",
                event.coverImageAltEn,
                emptyToNull(
                    coverImageAltEn
                )
            );


            addEventChange(
                changes,
                "COVER_IMAGE_ALT_MN",
                event.coverImageAltMn,
                emptyToNull(
                    coverImageAltMn
                )
            );


            addEventChange(
                changes,
                "CONTACT_EMAIL",
                event.contactEmail,
                emptyToNull(
                    contactEmail
                )
            );


            addEventChange(
                changes,
                "CONTACT_PHONE",
                event.contactPhone,
                emptyToNull(
                    contactPhone
                )
            );


            for (
    const change
    of changes
) {

    await updateEvent(
        event.id,
        change.type,
        change.value
    );

}


const registrationChanged =
    event.registerable !==
        registerable ||
    event.registrationCost !==
        newRegistrationCost;


if (
    registrationChanged
) {

    await updateRegistration(
        event.id,
        registerable,
        newRegistrationCost
    );

}


onClose();

        } catch (error) {

            console.error(
                "Failed to edit event:",
                error
            );


            setError(
                getEventUpdateErrorMessage(
                    error,
                    lang
                )
            );

        } finally {

            setSaving(
                false
            );

        }
    }


    return (
        <AnimatePresence>

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
                    inset-x-0
                    bottom-0
                    top-24
                    z-[110]
                    flex
                    items-center
                    justify-center
                    overflow-y-auto
                    bg-[#172011]/65
                    p-4

                    sm:p-6
                "
                onMouseDown={
                    mouseEvent => {

                        if (
                            mouseEvent.target ===
                            mouseEvent.currentTarget &&
                            !saving
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
                        max-h-[calc(100vh-7rem)]
                        w-full
                        max-w-4xl
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
                            flex
                            shrink-0
                            items-start
                            justify-between
                            gap-5
                            border-b
                            border-[#27301d]/10
                            px-6
                            py-5

                            sm:px-7
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
                                    ? "Арга хэмжээ"
                                    : "Event Management"}
                            </p>


                            <h2
                                className="
                                    mt-1
                                    text-xl
                                    font-semibold
                                    tracking-tight
                                    text-[#27301d]
                                "
                            >
                                {lang === "mn"
                                    ? "Арга хэмжээ засах"
                                    : "Edit Event"}
                            </h2>


                            <p
                                className="
                                    mt-1
                                    truncate
                                    text-sm
                                    text-[#667056]
                                "
                            >
                                {lang === "mn"
                                    ? event.titleMn
                                    : event.titleEn}
                            </p>

                        </div>


                        <button
                            type="button"
                            disabled={
                                saving
                            }
                            onClick={
                                onClose
                            }
                            aria-label="Close"
                            className="
                                shrink-0
                                rounded-lg
                                px-3
                                py-2
                                text-lg
                                leading-none
                                text-[#667056]
                                transition-colors
                                duration-150
                                hover:bg-[#f1ecdf]
                                hover:text-[#27301d]
                                disabled:opacity-40
                            "
                        >
                            ×
                        </button>

                    </header>


                    <div
                        className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            px-6
                            py-5

                            sm:px-7
                        "
                    >

                        <div className="space-y-7">

                            <FormSection
                                title={
                                    lang === "mn"
                                        ? "Үндсэн мэдээлэл"
                                        : "Event information"
                                }
                            >

                                <div
                                    className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
                                >

                                    <Field
                                        label="English title"
                                        required
                                    >
                                        <Input
                                            value={
                                                titleEn
                                            }
                                            onChange={
                                                setTitleEn
                                            }
                                        />
                                    </Field>


                                    <Field
                                        label="Монгол гарчиг"
                                        required
                                    >
                                        <Input
                                            value={
                                                titleMn
                                            }
                                            onChange={
                                                setTitleMn
                                            }
                                        />
                                    </Field>


                                    <Field
                                        label="English description"
                                        required
                                    >
                                        <TextArea
                                            value={
                                                descriptionEn
                                            }
                                            onChange={
                                                setDescriptionEn
                                            }
                                        />
                                    </Field>


                                    <Field
                                        label="Монгол тайлбар"
                                        required
                                    >
                                        <TextArea
                                            value={
                                                descriptionMn
                                            }
                                            onChange={
                                                setDescriptionMn
                                            }
                                        />
                                    </Field>

                                </div>

                            </FormSection>


                            <FormSection
                                title={
                                    lang === "mn"
                                        ? "Огноо ба байршил"
                                        : "Schedule & location"
                                }
                            >

                                <div
                                    className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
                                >

                                    <Field
                                        label={
                                            lang === "mn"
                                                ? "Эхлэх"
                                                : "Starts"
                                        }
                                        required
                                    >

                                        <input
                                            type="datetime-local"
                                            value={
                                                startsAt
                                            }
                                            onChange={
                                                inputEvent =>
                                                    setStartsAt(
                                                        inputEvent.target.value
                                                    )
                                            }
                                            className={
                                                inputClasses
                                            }
                                        />

                                    </Field>


                                    <Field
                                        label={
                                            lang === "mn"
                                                ? "Дуусах"
                                                : "Ends"
                                        }
                                    >

                                        <input
                                            type="datetime-local"
                                            value={
                                                endsAt
                                            }
                                            onChange={
                                                inputEvent =>
                                                    setEndsAt(
                                                        inputEvent.target.value
                                                    )
                                            }
                                            className={
                                                inputClasses
                                            }
                                        />

                                    </Field>


                                    <div className="md:col-span-2">

                                        <Field
                                            label={
                                                lang === "mn"
                                                    ? "Байршил"
                                                    : "Location"
                                            }
                                            required
                                        >
                                            <Input
                                                value={
                                                    location
                                                }
                                                onChange={
                                                    setLocation
                                                }
                                            />
                                        </Field>

                                    </div>

                                </div>

                            </FormSection>


                            <FormSection
                                title={
                                    lang === "mn"
                                        ? "Бүртгэл"
                                        : "Registration"
                                }
                            >

                                <label
                                    className="
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-3
                                        rounded-lg
                                        border
                                        border-transparent
                                        p-2
                                        transition-colors
                                        duration-150
                                        hover:border-[#27301d]/10
                                        hover:bg-[#f6efdf]/50
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        checked={
                                            registerable
                                        }
                                        onChange={
                                            inputEvent =>
                                                setRegisterable(
                                                    inputEvent.target.checked
                                                )
                                        }
                                        className="
                                            h-4
                                            w-4
                                            accent-[#27301d]
                                        "
                                    />


                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-[#27301d]
                                        "
                                    >
                                        {lang === "mn"
                                            ? "Энэ арга хэмжээнд бүртгэл зөвшөөрөх"
                                            : "Allow registration for this event"}
                                    </span>

                                </label>


                                {registerable && (

                                    <div
                                        className="
                                            mt-4
                                            max-w-sm
                                        "
                                    >

                                        <Field
                                            label={
                                                lang === "mn"
                                                    ? "Бүртгэлийн үнэ (CAD)"
                                                    : "Registration cost (CAD)"
                                            }
                                        >

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={
                                                    registrationDollars
                                                }
                                                onChange={
                                                    inputEvent =>
                                                        setRegistrationDollars(
                                                            inputEvent.target.value
                                                        )
                                                }
                                                className={
                                                    inputClasses
                                                }
                                            />

                                        </Field>

                                    </div>

                                )}

                            </FormSection>


                            <FormSection
                                title={
                                    lang === "mn"
                                        ? "Нүүр зураг"
                                        : "Cover image"
                                }
                            >

                                {coverImage && (

                                    <div
                                        className="
                                            mb-4
                                            h-40
                                            overflow-hidden
                                            rounded-xl
                                            bg-[#27301d]
                                        "
                                    >

                                        <img
                                            src={
                                                coverImage
                                            }
                                            alt=""
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />

                                    </div>

                                )}


                                <div
                                    className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
                                >

                                    <div className="md:col-span-2">

                                        <Field
                                            label="Cover image URL"
                                        >
                                            <Input
                                                value={
                                                    coverImage
                                                }
                                                onChange={
                                                    setCoverImage
                                                }
                                            />
                                        </Field>

                                    </div>


                                    <Field
                                        label="English alt text"
                                    >
                                        <Input
                                            value={
                                                coverImageAltEn
                                            }
                                            onChange={
                                                setCoverImageAltEn
                                            }
                                        />
                                    </Field>


                                    <Field
                                        label="Монгол alt text"
                                    >
                                        <Input
                                            value={
                                                coverImageAltMn
                                            }
                                            onChange={
                                                setCoverImageAltMn
                                            }
                                        />
                                    </Field>

                                </div>

                            </FormSection>


                            <FormSection
                                title={
                                    lang === "mn"
                                        ? "Холбоо барих"
                                        : "Contact"
                                }
                            >

                                <div
                                    className="
                                        grid
                                        gap-4

                                        md:grid-cols-2
                                    "
                                >

                                    <Field
                                        label={
                                            lang === "mn"
                                                ? "Холбоо барих имэйл"
                                                : "Contact email"
                                        }
                                    >
                                        <Input
                                            type="email"
                                            value={
                                                contactEmail
                                            }
                                            onChange={
                                                setContactEmail
                                            }
                                        />
                                    </Field>


                                    <Field
                                        label={
                                            lang === "mn"
                                                ? "Холбоо барих утас"
                                                : "Contact phone"
                                        }
                                    >
                                        <Input
                                            value={
                                                contactPhone
                                            }
                                            onChange={
                                                setContactPhone
                                            }
                                        />
                                    </Field>

                                </div>

                            </FormSection>

                        </div>

                    </div>


                    <footer
                        className="
                            shrink-0
                            border-t
                            border-[#27301d]/10
                            bg-[#fffdf8]
                            px-6
                            py-4

                            sm:px-7
                        "
                    >

                        {error && (

                            <p
                                className="
                                    mb-3
                                    text-sm
                                    text-[#8b4a42]
                                "
                            >
                                {error}
                            </p>

                        )}


                        <div
                            className="
                                flex
                                items-center
                                justify-end
                                gap-2
                            "
                        >

                            <button
                                type="button"
                                disabled={
                                    saving
                                }
                                onClick={
                                    onClose
                                }
                                className="
                                    rounded-lg
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-[#667056]
                                    transition-colors
                                    duration-150
                                    hover:bg-[#f1ecdf]
                                    hover:text-[#27301d]
                                    disabled:opacity-50
                                "
                            >
                                {lang === "mn"
                                    ? "Болих"
                                    : "Cancel"}
                            </button>


                            <button
                                type="button"
                                disabled={
                                    saving
                                }
                                onClick={
                                    saveChanges
                                }
                                className="
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
                                {saving
                                    ? lang === "mn"
                                        ? "Хадгалж байна..."
                                        : "Saving..."
                                    : lang === "mn"
                                        ? "Өөрчлөлт хадгалах"
                                        : "Save Changes"}
                            </button>

                        </div>

                    </footer>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    );
}

















