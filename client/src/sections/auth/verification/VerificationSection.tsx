"use client";

import {
    memo,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    cubicBezier,
    motion,
    type Variants,
} from "framer-motion";

import { api } from "../../../api/client";


const VERIFICATION_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp",
    "/impact/culture/4.webp",
    "/impact/archery/3.webp",
] as const;


export type Language =
    | "en"
    | "mn";


type VerificationStatus =
    | "verifying"
    | "success"
    | "error";


export interface VerificationCopy {

    verifyingTitle: string;
    verifyingDescription: string;

    successTitle: string;
    successDescription: string;

    errorTitle: string;
    errorDescription: string;

    redirectingText: string;

    errorButtonText: string;

}


interface VerificationSectionProps {

    endpoint: string;

    successRedirect: string;

    errorRedirect?: string;

    english: VerificationCopy;

    mongolian: VerificationCopy;

    redirectDelay?: number;

}


const easeOut =
    cubicBezier(
        0.22,
        1,
        0.36,
        1
    );


const entranceMotion: Variants = {

    hidden: {
        opacity: 0,
        y: 14,
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.5,
            ease: easeOut,
        },
    },

};


function VerificationSection({

    endpoint,

    successRedirect,

    errorRedirect = "/",

    english,

    mongolian,

    redirectDelay = 1800,

}: VerificationSectionProps) {

    const navigate =
        useNavigate();


    const [searchParams] =
        useSearchParams();


    const [language, setLanguage] =
        useState<Language>("en");


    const [status, setStatus] =
        useState<VerificationStatus>(
            "verifying"
        );


    /*
     * Prevent duplicate verification requests
     * during React StrictMode in development.
     */
    const verificationStarted =
        useRef(false);


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    VERIFICATION_BACKGROUNDS.length
                );

            return VERIFICATION_BACKGROUNDS[
                index
            ];

        });


    useEffect(() => {

        if (
            verificationStarted.current
        ) {
            return;
        }


        verificationStarted.current =
            true;


        const token =
            searchParams.get(
                "token"
            );


        /*
         * Missing verification token.
         */
        if (!token) {

            setStatus(
                "error"
            );

            return;
        }


        let redirectTimer:
            ReturnType<typeof setTimeout>
            | undefined;


        async function verifyToken() {

            try {

                await api.post(
                    endpoint,
                    {
                        token,
                    }
                );


                setStatus(
                    "success"
                );


                redirectTimer =
                    setTimeout(() => {

                        navigate(
                            successRedirect,
                            {
                                replace: true,
                            }
                        );

                    }, redirectDelay);


            } catch (error) {

                console.error(
                    "Verification failed:",
                    error
                );


                setStatus(
                    "error"
                );

            }

        }


        void verifyToken();


        return () => {

            if (redirectTimer) {

                clearTimeout(
                    redirectTimer
                );

            }

        };

    }, [
        endpoint,
        navigate,
        redirectDelay,
        searchParams,
        successRedirect,
    ]);


    const copy =
        language === "en"
            ? english
            : mongolian;


    const title = (() => {

        switch (status) {

            case "verifying":
                return copy.verifyingTitle;

            case "success":
                return copy.successTitle;

            case "error":
                return copy.errorTitle;

        }

    })();


    const description = (() => {

        switch (status) {

            case "verifying":
                return copy.verifyingDescription;

            case "success":
                return copy.successDescription;

            case "error":
                return copy.errorDescription;

        }

    })();


    return (

        <main
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#27301d]
                text-[#27301d]
            "
        >

            {/* Background */}
            <img
                src={background}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    select-none
                    object-cover
                    object-center
                    saturate-[1.03]
                    contrast-[1.02]
                "
            />


            {/* Dark overlay */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[#182010]/58
                "
            />


            {/* Gradient */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-b
                    from-black/15
                    via-transparent
                    to-black/35
                "
            />


            {/* Verification area */}
            <section
                className="
                    relative
                    z-10

                    flex
                    min-h-screen
                    items-center
                    justify-center

                    px-5
                    pb-10
                    pt-20

                    md:px-10
                    md:pb-12
                    md:pt-24
                "
            >

                <motion.div
                    variants={
                        entranceMotion
                    }
                    initial="hidden"
                    animate="show"
                    className="
                        relative
                        w-full
                        max-w-[29rem]
                    "
                >

                    {/* Top controls */}
                    <div
                        className="
                            absolute
                            -top-9
                            left-0

                            flex
                            w-full
                            items-center
                            justify-between
                        "
                    >

                        <Link
                            to="/"
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-white/75

                                no-underline
                                transition-colors

                                hover:text-white
                            "
                        >
                            {language === "en"
                                ? "Back to home"
                                : "Нүүр хуудас"}
                        </Link>


                        {/* Language */}
                        <div
                            className="
                                flex
                                items-center

                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                            "
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setLanguage(
                                        "en"
                                    )
                                }
                                className={
                                    language === "en"
                                        ? "text-white"
                                        : "text-white/45 transition-colors hover:text-white"
                                }
                            >
                                EN
                            </button>


                            <span
                                className="
                                    mx-2
                                    text-white/25
                                "
                            >
                                |
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setLanguage(
                                        "mn"
                                    )
                                }
                                className={
                                    language === "mn"
                                        ? "text-white"
                                        : "text-white/45 transition-colors hover:text-white"
                                }
                            >
                                MN
                            </button>

                        </div>

                    </div>


                    {/* Card */}
                    <div
                        className="
                            border
                            border-white/20
                            bg-[#f7f7f4]

                            shadow-2xl
                            shadow-black/25
                        "
                    >

                        <div
                            className="
                                bg-white

                                px-7
                                py-10

                                text-center

                                md:px-9
                                md:py-11
                            "
                        >

                            {/* Status icon */}
                            <div
                                className="
                                    mx-auto
                                    mb-6

                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center

                                    rounded-full

                                    border
                                    border-[#27301d]/10

                                    bg-[#f7f7f4]
                                "
                            >

                                {status ===
                                    "verifying" && (

                                    <div
                                        className="
                                            h-6
                                            w-6

                                            animate-spin

                                            rounded-full

                                            border-2
                                            border-[#27301d]/20
                                            border-t-[#27301d]
                                        "
                                    />

                                )}


                                {status ===
                                    "success" && (

                                    <span
                                        className="
                                            text-2xl
                                            font-semibold
                                            text-[#27301d]
                                        "
                                    >
                                        ✓
                                    </span>

                                )}


                                {status ===
                                    "error" && (

                                    <span
                                        className="
                                            text-2xl
                                            font-semibold
                                            text-[#27301d]
                                        "
                                    >
                                        !
                                    </span>

                                )}

                            </div>


                            {/* Title */}
                            <h1
                                className="
                                    text-3xl
                                    font-semibold
                                    leading-tight
                                    text-[#27301d]
                                "
                            >
                                {title}
                            </h1>


                            {/* Description */}
                            <p
                                className="
                                    mx-auto
                                    mt-3
                                    max-w-sm

                                    text-sm
                                    leading-6
                                    text-[#667056]
                                "
                            >
                                {description}
                            </p>


                            {/* Success */}
                            {status ===
                                "success" && (

                                <p
                                    className="
                                        mt-6

                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.16em]
                                        text-[#667056]
                                    "
                                >
                                    {
                                        copy.redirectingText
                                    }
                                </p>

                            )}


                            {/* Error */}
                            {status ===
                                "error" && (

                                <div
                                    className="
                                        mt-7
                                        flex
                                        justify-center
                                    "
                                >

                                    <Link
                                        to={
                                            errorRedirect
                                        }
                                        className="
                                            border
                                            border-[#27301d]

                                            px-5
                                            py-3

                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-[0.15em]
                                            text-[#27301d]

                                            no-underline

                                            transition-colors

                                            hover:bg-[#27301d]
                                            hover:text-white
                                        "
                                    >
                                        {
                                            copy.errorButtonText
                                        }
                                    </Link>

                                </div>

                            )}

                        </div>

                    </div>

                </motion.div>

            </section>

        </main>

    );

}


export default memo(
    VerificationSection
);