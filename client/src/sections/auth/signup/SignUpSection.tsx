"use client";

import { memo, useState } from "react";
import { Link } from "react-router-dom";

import {
    AnimatePresence,
    cubicBezier,
    motion,
    type Variants,
} from "framer-motion";

import SignupForm from "./SignUpForm";
import { useAuth } from "../../../context/useAuth";


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
            <AnimatePresence>

                {showWhyAccount && (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="
                            fixed
                            inset-0
                            z-50

                            flex
                            items-center
                            justify-center

                            bg-black/55

                            px-4
                            py-5

                            backdrop-blur-[2px]
                        "
                        onClick={() =>
                            setShowWhyAccount(false)
                        }
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.985,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 8,
                                scale: 0.985,
                            }}
                            transition={{
                                duration: 0.18,
                                ease: easeOut,
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            className="
                                max-h-[calc(100vh-2.5rem)]
                                w-full
                                max-w-3xl
                                overflow-y-auto

                                border
                                border-[#efe7d4]

                                bg-white

                                shadow-2xl
                                shadow-black/30
                            "
                        >

                            {/* Modal header */}
<div
    className="
        sticky
        top-0
        z-10

        flex
        items-center
        justify-between
        gap-5

        border-b
        border-[#27301d]/10

        bg-white

        px-6
        py-4

        md:px-7
    "
>

    <h2
        className="
            text-xl
            font-semibold
            text-[#27301d]

            md:text-2xl
        "
    >
        {language === "en"
            ? "Why create an account with Etugen Mongols?"
            : "Яагаад Etugen Mongols-д бүртгэл үүсгэх вэ?"}
    </h2>


    <button
        type="button"
        onClick={() =>
            setShowWhyAccount(false)
        }
        aria-label="Close"
        className="
            text-base
            text-[#667056]

            transition-colors

            hover:text-[#27301d]
        "
    >
        ✕
    </button>

</div>


{/* Modal content */}
<div
    className="
        px-6
        py-5

        md:px-7
    "
>

    {language === "en" ? (

        <>

            <p
                className="
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#667056]
                "
            >
                You can still donate and buy tickets without an account.
                Creating one simply makes it easier to get involved,
                stay connected, and keep track of your activity with us.
            </p>


            <div
                className="
                    mt-5
                    grid
                    gap-3

                    sm:grid-cols-3
                "
            >

                {/* Left */}
                <Benefit
                    title="Get involved"
                    body="Take part in programs, events, and community opportunities more easily."
                />


                {/* Middle */}
                <Benefit
                    title="Stay connected"
                    body="Receive useful updates and reminders about upcoming activities."
                />


                {/* Right */}
                <Benefit
                    title="Track your history"
                    body="View your registrations, donations, and payments in one place."
                />

            </div>

        </>

    ) : (

        <>

            <p
                className="
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#667056]
                "
            >
                Та бүртгэлгүйгээр хандив өгөх болон тасалбар авах
                боломжтой. Бүртгэл үүсгэснээр бидний үйл ажиллагаанд
                оролцох, холбоотой байх, өөрийн түүхээ хянах илүү
                хялбар болно.
            </p>


            <div
                className="
                    mt-5
                    grid
                    gap-3

                    sm:grid-cols-3
                "
            >

                {/* Left */}
                <Benefit
                    title="Оролцоорой"
                    body="Хөтөлбөр, арга хэмжээ болон олон нийтийн боломжуудад илүү хялбар оролцоорой."
                />


                {/* Middle */}
                <Benefit
                    title="Холбоотой байгаарай"
                    body="Удахгүй болох үйл ажиллагааны мэдээлэл болон сануулгыг аваарай."
                />


                {/* Right */}
                <Benefit
                    title="Түүхээ хянах"
                    body="Бүртгэл, хандив болон төлбөрийн мэдээллээ нэг дор хараарай."
                />

            </div>

        </>

    )}


    {/* Etugen Mongols branding */}
    <div
        className="
            mt-6
            flex
            justify-center

            border-t
            border-[#27301d]/10
            pt-5
        "
    >

        <Link
            to="/"
            onClick={() =>
                setShowWhyAccount(false)
            }
            className="
                inline-flex
                items-center
                gap-3

                no-underline

                transition-opacity

                hover:opacity-80
            "
        >

            <img
                src="/logo.webp"
                alt="Etugen Mongols logo"
                loading="lazy"
                decoding="async"
                className="
                    h-10
                    w-10
                    object-contain
                "
            />


            <div className="text-left">

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

        </Link>

    </div>

</div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </main>
    );
}


function TopControls({
    language,
    setLanguage,
}: {
    language: Language;
    setLanguage: (
        language: Language
    ) => void;
}) {

    return (
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
    );
}


function Benefit({
    title,
    body,
}: {
    title: string;
    body: string;
}) {

    return (
        <div
            className="
                border
                border-[#27301d]/10
                bg-[#fffaf0]
                px-4
                py-4
            "
        >

            <h3
                className="
                    text-sm
                    font-semibold
                    text-[#27301d]
                "
            >
                {title}
            </h3>


            <p
                className="
                    mt-2
                    text-xs
                    leading-5
                    text-[#667056]
                "
            >
                {body}
            </p>

        </div>
    );
}


function Background({
    src,
}: {
    src: string;
}) {

    return (
        <>

            <img
                src={src}
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

        </>
    );
}


export default memo(SignupSection);