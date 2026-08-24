"use client";

import {
    memo,
    useState
} from "react";

import {
    Link,
    useSearchParams
} from "react-router-dom";

import {
    cubicBezier,
    motion,
    type Variants
} from "framer-motion";

import ResetPasswordForm from "./ResetPasswordForm";


const PASSWORD_RESET_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp",
    "/impact/culture/4.webp",
    "/impact/archery/3.webp",
] as const;


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


function isValidUUID(
    value: string | null
) {

    if (!value) {
        return false;
    }

    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        .test(value);
}


function ResetPasswordSection() {

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");


    const [language, setLanguage] =
        useState<"en" | "mn">("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    PASSWORD_RESET_BACKGROUNDS.length
                );

            return PASSWORD_RESET_BACKGROUNDS[index];
        });


    const validTokenFormat =
        isValidUUID(token);


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
                                {validTokenFormat
                                    ? (
                                        language === "en"
                                            ? "Create a new password"
                                            : "Шинэ нууц үг үүсгэх"
                                    )
                                    : (
                                        language === "en"
                                            ? "Invalid reset link"
                                            : "Хүчингүй холбоос"
                                    )}
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
                                {validTokenFormat
                                    ? (
                                        language === "en"
                                            ? "Choose a new password for your account."
                                            : "Бүртгэлдээ шинэ нууц үг сонгоно уу."
                                    )
                                    : (
                                        language === "en"
                                            ? "This password reset link is invalid. Request a new password reset email."
                                            : "Энэ нууц үг шинэчлэх холбоос хүчингүй байна."
                                    )}
                            </p>

                        </div>


                        <div
                            className="
                                px-7
                                py-6
                                md:px-9
                            "
                        >

                            {validTokenFormat && token ? (

                                <ResetPasswordForm
                                    language={language}
                                    token={token}
                                />

                            ) : (

                                <Link
                                    to="/auth/forgot-password"
                                    className="
                                        flex
                                        min-h-11
                                        w-full
                                        items-center
                                        justify-center

                                        bg-[#27301d]

                                        px-6
                                        py-3

                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white

                                        no-underline
                                        transition-colors

                                        hover:bg-[#9a7b26]
                                    "
                                >
                                    {language === "en"
                                        ? "Request new reset link"
                                        : "Шинэ холбоос авах"}
                                </Link>

                            )}

                        </div>

                    </div>

                </motion.div>

            </section>

        </main>
    );
}


export default memo(ResetPasswordSection);