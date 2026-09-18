"use client";

import SignupBenefitsModal from "./SignupBenefitsModal";
import { Background,TopControls } from "./SignupPageChrome";


import { memo,useState } from "react";
import { Link } from "react-router-dom";

import {
cubicBezier,
motion,
type Variants
} from "framer-motion";

import { useAuth } from "../../../context/useAuth";
import SignupForm from "./SignUpForm";


const SIGNUP_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp",

    "/impact/wrestling/1.webp",
    "/impact/culture/1.webp",
    "/impact/dance/1.webp",
    "/impact/perf.JPG",
    "/impact/youth/1.webp",
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


function SignupSection() {

    const {
        user,
        isLoggedIn,
        loading,
    } = useAuth();


    const [language, setLanguage] =
        useState<Language>("en");


    const [
        showWhyAccount,
        setShowWhyAccount,
    ] = useState(false);


    const [accountCreated, setAccountCreated] =
        useState(false);


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    SIGNUP_BACKGROUNDS.length
                );

            return SIGNUP_BACKGROUNDS[index];
        });


    if (loading) {

        return (
            <main className="min-h-screen bg-[#27301d]" />
        );
    }


    /*
     * Already authenticated.
     */
    if (isLoggedIn) {

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

                <Background
                    src={background}
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
                        pb-14
                        pt-24
                        md:px-10
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

                        <TopControls
                            language={language}
                            setLanguage={setLanguage}
                        />


                        <div
                            className="
                                border
                                border-white/20
                                bg-white

                                px-8
                                py-10

                                text-center

                                shadow-2xl
                                shadow-black/25
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
                                    ? (
                                        user?.firstName
                                            ? `Hi, ${user.firstName}.`
                                            : "You're already signed in."
                                    )
                                    : (
                                        user?.firstName
                                            ? `Сайн байна уу, ${user.firstName}.`
                                            : "Та аль хэдийн нэвтэрсэн байна."
                                    )}
                            </h1>


                            <p
                                className="
                                    mx-auto
                                    mt-4
                                    max-w-sm
                                    text-sm
                                    leading-7
                                    text-[#667056]
                                "
                            >
                                {language === "en"
                                    ? "You can't create another account while you're currently signed in. Log out first if you need to create a different account."
                                    : "Та нэвтэрсэн үедээ өөр бүртгэл үүсгэх боломжгүй. Өөр бүртгэл үүсгэх бол эхлээд системээс гарна уу."}
                            </p>

                        </div>

                    </motion.div>

                </section>

            </main>
        );
    }


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

            <Background
                src={background}
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
                        max-w-[34rem]
                    "
                >

                    <TopControls
                        language={language}
                        setLanguage={setLanguage}
                    />


                    <div
                        className="
                            border
                            border-white/20
                            bg-[#f7f7f4]

                            shadow-2xl
                            shadow-black/25
                        "
                    >

                        {accountCreated ? (

                            <div
                                className="
                                    flex
                                    flex-col
                                    items-center

                                    bg-white

                                    px-7
                                    py-10

                                    text-center

                                    md:px-9
                                "
                            >

                                <Link
                                    to="/"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center

                                        transition-opacity

                                        hover:opacity-80
                                    "
                                >
                                    <img
                                        src="/logo.webp"
                                        alt="Etugen Mongols logo"
                                        loading="eager"
                                        decoding="async"
                                        className="
                                            h-16
                                            w-16
                                            object-contain
                                        "
                                    />
                                </Link>


                                <h1
                                    className="
                                        mt-6
                                        text-2xl
                                        font-semibold
                                        text-[#27301d]
                                    "
                                >
                                    {language === "en"
                                        ? "Check your email"
                                        : "Имэйлээ шалгана уу"}
                                </h1>


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
                                    {language === "en"
                                        ? "We've sent you a verification link. Open it to verify your Etugen Mongols account."
                                        : "Бид танд баталгаажуулах холбоос илгээлээ. Etugen Mongols бүртгэлээ баталгаажуулахын тулд холбоосыг нээнэ үү."}
                                </p>


                                <div className="mt-8">

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-[#27301d]
                                        "
                                    >
                                        Etugen Mongols
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#9a7b26]
                                        "
                                    >
                                        Not For Profit
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <>

                                {/* Compact top area */}
                                <div
                                    className="
                                        border-b
                                        border-[#27301d]/10
                                        bg-white

                                        px-7
                                        py-5

                                        text-center

                                        md:px-9
                                    "
                                >

                                    <h1
                                        className="
                                            text-2xl
                                            font-semibold
                                            text-[#27301d]
                                        "
                                    >
                                        {language === "en"
                                            ? "Create an account"
                                            : "Бүртгэл үүсгэх"}
                                    </h1>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowWhyAccount(true)
                                        }
                                        className="
                                            mt-3
                                            inline-flex
                                            items-center
                                            justify-center

                                            border
                                            border-[#9a7b26]/40

                                            bg-[#fffaf0]

                                            px-4
                                            py-2

                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.15em]
                                            text-[#9a7b26]

                                            transition-colors

                                            hover:border-[#9a7b26]
                                            hover:bg-[#9a7b26]
                                            hover:text-white
                                        "
                                    >
                                        {language === "en"
                                            ? "Why create an account?"
                                            : "Яагаад бүртгэл үүсгэх вэ?"}
                                    </button>

                                </div>


                                {/* Signup form */}
                                <div
                                    className="
                                        px-7
                                        py-6
                                        md:px-9
                                    "
                                >

                                    <SignupForm
                                        language={language}
                                        onAccountCreated={() =>
                                            setAccountCreated(true)
                                        }
                                    />

                                </div>

                            </>

                        )}

                    </div>

                </motion.div>

            </section>


            {/* Why create an account modal */}
            <SignupBenefitsModal showWhyAccount={showWhyAccount} setShowWhyAccount={setShowWhyAccount} language={language} />

        </main>
    );
}











export default memo(SignupSection);