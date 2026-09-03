import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
    motion,
    cubicBezier,
    type Variants
} from "framer-motion";

import { ProfileSection } from "./components/ProfileSection";
import { SecuritySection } from "./components/SecuritySection";
import { HistorySection } from "./components/HistorySection";

import { accountCopy } from "./copy/accountCopy";

import { useAuth } from "../../../context/useAuth";

const ACCOUNT_BACKGROUND_IMAGES = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp"
];

const easeOut = cubicBezier(
    0.22,
    1,
    0.36,
    1
);

const containerVariants: Variants = {
    hidden: {
        opacity: 0
    },

    show: {
        opacity: 1,

        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.55,
            ease: easeOut
        }
    }
};

interface AccountMainProps {
    lang: "en" | "mn";
}

export default function AccountMain({
    lang
}: AccountMainProps) {

    const { user, loading } = useAuth();

    const copy = accountCopy[lang];

    const [backgroundImage] =
        useState(() => {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    ACCOUNT_BACKGROUND_IMAGES.length
                );

            return ACCOUNT_BACKGROUND_IMAGES[
                randomIndex
            ];
        });

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#27301d]">
                <p className="text-sm font-medium text-white/70">
                    Loading...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/auth/login"
                replace
            />
        );
    }

    return (
        <div
            className="
                relative
                min-h-screen
                bg-cover
                bg-center
                bg-fixed
                text-[#27301d]
            "
            style={{
                backgroundImage:
                    `url("${backgroundImage}")`
            }}
        >

            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-[#18200f]/75" />

            {/* Slight black overlay */}
            <div className="absolute inset-0 bg-black/15" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-4xl
                    px-4
                    pb-16
                    pt-28
                    sm:px-6
                    md:pt-32
                "
            >

                <motion.div
                    className="mt-8 space-y-1"
                    variants={itemVariants}
                >

                    <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                        {copy.title}
                    </h1>

                    <p className="max-w-2xl text-lg leading-7 text-white/70">
                        {copy.subtitle}
                    </p>

                </motion.div>

                <div className="mt-2 space-y-6">

                    <motion.div variants={itemVariants}>
                        <ProfileSection
                            user={user}
                            copy={copy.profile}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <SecuritySection
                            email={user.email}
                            copy={copy.security}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <HistorySection
                            copy={copy.history}
                        />
                    </motion.div>

                </div>

            </motion.div>

        </div>
    );
}