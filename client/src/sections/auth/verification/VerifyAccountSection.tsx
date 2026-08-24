"use client";

import { memo, useState } from "react";
import { Link } from "react-router-dom";

import {
    cubicBezier,
    motion,
    type Variants
} from "framer-motion";

import VerifyAccountForm from "./VerifyAccountForm";


const VERIFY_BACKGROUNDS = [
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


const easeOut =
    cubicBezier(0.22, 1, 0.36, 1);


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


function VerifyAccountSection() {

    const [language, setLanguage] =
        useState<Language>("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    VERIFY_BACKGROUNDS.length
                );

            return VERIFY_BACKGROUNDS[index];
        });


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


            {/* Background treatment */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[#182010]/58
                "
            />

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
                    variants={entranceMotion}
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
                            to="/auth/login"
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
                                ? "Back to login"
                                : "Нэвтрэх хэсэг рүү"}
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
                                    setLanguage("en")
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
                                    setLanguage("mn")
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


                    {/* Verification card */}
                    <div
                        className="
                            border
                            border-white/20
                            bg-[#f7f7f4]

                            shadow-2xl
                            shadow-black/25
                        "
                    >

                        {/* Header */}
                        <div
                            className="
                                border-b
                                border-[#27301d]/10
                                bg-white

                                px-7
                                py-6

                                text-center

                                md:px-9
                            "
                        >

                            <h1
                                className="
                                    text-3xl
                                    font-semibold
                                    leading-tight
                                    text-[#27301d]
                                "
                            >
                                {language === "en"
                                    ? "Verify your account"
                                    : "Бүртгэлээ баталгаажуулах"}
                            </h1>


                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-sm

                                    text-sm
                                    leading-6
                                    text-[#667056]
                                "
                            >
                                {language === "en"
                                    ? "Enter the email address connected to your account and we'll send you a verification link."
                                    : "Бүртгэлтэй холбоотой имэйл хаягаа оруулна уу. Бид танд баталгаажуулах холбоос илгээнэ."}
                            </p>

                        </div>


                        {/* Form */}
                        <div
                            className="
                                px-7
                                py-6
                                md:px-9
                            "
                        >

                            <VerifyAccountForm
                                language={language}
                            />

                        </div>

                    </div>

                </motion.div>

            </section>

        </main>
    );
}


export default memo(VerifyAccountSection);