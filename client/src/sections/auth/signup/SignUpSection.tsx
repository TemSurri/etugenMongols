"use client";

import { memo, useState } from "react";
import {
    cubicBezier,
    motion,
    type Variants,
} from "framer-motion";

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

    // Chosen once per page visit.
    const [background] = useState(() => {

        const index =
            Math.floor(
                Math.random() *
                SIGNUP_BACKGROUNDS.length
            );

        return SIGNUP_BACKGROUNDS[index];
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


            {/* Background overlays */}
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
                    pb-14
                    pt-28
                    md:px-10
                    md:pt-32
                "
            >

                <motion.div
                    variants={entranceMotion}
                    initial="hidden"
                    animate="show"
                    className="
                        w-full
                        max-w-[31rem]
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
                            pb-7
                            pt-8
                            text-center
                            md:px-9
                        "
                    >

                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.34em]
                                text-[#9a7b26]
                            "
                        >
                            Etugen Mongols
                        </p>


                        <h1
                            className="
                                mt-4
                                text-4xl
                                font-semibold
                                leading-tight
                                text-[#27301d]
                                md:text-[2.7rem]
                            "
                        >
                            Create an account
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
                            Join Etugen Mongols and create
                            your community account.
                        </p>

                    </div>


                    <div className="px-7 py-8 md:px-9">

                        <SignupForm />

                    </div>

                </motion.div>

            </section>

        </main>
    );
}


export default memo(SignupSection);