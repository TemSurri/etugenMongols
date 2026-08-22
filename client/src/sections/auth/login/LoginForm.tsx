"use client";

import { useState } from "react";
import axios from "axios";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { api } from "../../../api/client";
import { useAuth } from "../../../context/useAuth";

import type {
    Language
} from "./LoginSection";


type LoginFormProps = {
    language: Language;
};


export default function LoginForm({
    language,
}: LoginFormProps) {

    const navigate =
        useNavigate();

    const {
        refreshAuth
    } = useAuth();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [
        needsVerification,
        setNeedsVerification,
    ] =
        useState(false);

    const [loading, setLoading] =
        useState(false);


    const mn =
        language === "mn";


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (loading) {
            return;
        }


        setLoading(true);

        setError("");

        setNeedsVerification(false);


        /*
         * =====================================================
         * BACKEND LOGIN REQUEST
         * =====================================================
         *
         * POST /auth/login
         *
         * {
         *     email,
         *     password
         * }
         */
        try {

            await api.post(
                "/auth/login",
                {
                    email: email,
                    password: password,
                }
            );


            /*
             * Login succeeded.
             *
             * Browser now has the SESSION cookie.
             * Refresh global auth state so the header
             * immediately knows the user is logged in.
             */
            await refreshAuth();


            navigate("/");


        } catch (error) {


            /*
             * Unexpected non-Axios failure.
             */
            if (!axios.isAxiosError(error)) {

                setError(
                    mn
                        ? "Алдаа гарлаа. Дахин оролдоно уу."
                        : "Something went wrong. Please try again."
                );

                return;
            }


            /*
             * No HTTP response.
             */
            if (!error.response) {

                setError(
                    mn
                        ? "Сервертэй холбогдож чадсангүй. Дараа дахин оролдоно уу."
                        : "Unable to connect to the server. Please try again later."
                );

                return;
            }


            const status =
                error.response.status;


            switch (status) {

                case 400:

                    setError(
                        mn
                            ? "Оруулсан мэдээллээ шалгана уу."
                            : "Please check the information you entered."
                    );

                    break;


                case 401:

                    setError(
                        mn
                            ? "Имэйл эсвэл нууц үг буруу байна."
                            : "Invalid email or password."
                    );

                    break;


                /*
                 * Account exists but is not verified.
                 */
                case 403:

                    setError(
                        mn
                            ? "Таны бүртгэл хараахан баталгаажаагүй байна."
                            : "Your account has not been verified yet."
                    );

                    setNeedsVerification(true);

                    break;


                case 429:

                    setError(
                        mn
                            ? "Хэт олон удаа нэвтрэх оролдлого хийлээ. Дараа дахин оролдоно уу."
                            : "Too many login attempts. Please try again later."
                    );

                    break;


                default:

                    if (status >= 500) {

                        setError(
                            mn
                                ? "Сервер түр хугацаанд ажиллахгүй байна. Дараа дахин оролдоно уу."
                                : "The server is temporarily unavailable. Please try again later."
                        );

                    } else {

                        setError(
                            mn
                                ? "Нэвтэрч чадсангүй. Дахин оролдоно уу."
                                : "Unable to sign in. Please try again."
                        );
                    }
            }


        } finally {

            setLoading(false);
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col"
        >

            {/* Email */}
            <div>

                <label
                    htmlFor="email"
                    className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
                >
                    {mn
                        ? "Имэйл"
                        : "Email"}
                </label>


                <input
                    id="email"
                    name="email"
                    type="email"

                    value={email}

                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }

                    placeholder="you@example.com"
                    autoComplete="email"

                    required
                    disabled={loading}

                    className="
                        mt-2
                        h-11
                        w-full

                        border
                        border-[#27301d]/25

                        bg-white

                        px-3.5

                        text-sm
                        text-[#27301d]

                        outline-none
                        transition-colors

                        placeholder:text-[#667056]/45

                        focus:border-[#9a7b26]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                />

            </div>


            {/* Password */}
            <div className="mt-4">

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <label
                        htmlFor="password"
                        className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#27301d]
                        "
                    >
                        {mn
                            ? "Нууц үг"
                            : "Password"}
                    </label>


                    <Link
                        to="/auth/forgot-password"
                        className="
                            text-xs
                            font-medium
                            text-[#667056]

                            no-underline
                            transition-colors

                            hover:text-[#9a7b26]
                        "
                    >
                        {mn
                            ? "Нууц үгээ мартсан уу?"
                            : "Forgot password?"}
                    </Link>

                </div>


                <input
                    id="password"
                    name="password"
                    type="password"

                    value={password}

                    onChange={(event) =>
                        setPassword(
                            event.target.value
                        )
                    }

                    placeholder={
                        mn
                            ? "Нууц үгээ оруулна уу"
                            : "Enter your password"
                    }

                    autoComplete="current-password"

                    required
                    disabled={loading}

                    className="
                        mt-2
                        h-11
                        w-full

                        border
                        border-[#27301d]/25

                        bg-white

                        px-3.5

                        text-sm
                        text-[#27301d]

                        outline-none
                        transition-colors

                        placeholder:text-[#667056]/45

                        focus:border-[#9a7b26]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                />

            </div>


            {/* Error */}
            {error && (

                <div
                    role="alert"
                    aria-live="polite"

                    className="
                        mt-4

                        border-l-2
                        border-[#9a7b26]

                        bg-white

                        px-4
                        py-2.5

                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >

                    {error}


                    {needsVerification && (

                        <>
                            {" "}

                            <Link
                                to="/auth/verify"
                                className="
                                    font-semibold
                                    text-[#27301d]

                                    underline
                                    underline-offset-2

                                    transition-colors

                                    hover:text-[#9a7b26]
                                "
                            >
                                {mn
                                    ? "Бүртгэлээ баталгаажуулах"
                                    : "Verify account"}
                            </Link>

                        </>

                    )}

                </div>

            )}


            {/* Submit */}
            <button
                type="submit"
                disabled={loading}

                className="
                    mt-5

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

                    transition-colors

                    hover:bg-[#9a7b26]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:bg-[#27301d]
                "
            >
                {loading
                    ? (
                        mn
                            ? "Нэвтэрч байна..."
                            : "Signing in..."
                    )
                    : (
                        mn
                            ? "Нэвтрэх"
                            : "Sign in"
                    )}
            </button>


            {/* Signup */}
            <div
                className="
                    mt-5

                    border-t
                    border-[#27301d]/10

                    pt-4
                    text-center
                "
            >

                <p
                    className="
                        text-sm
                        text-[#667056]
                    "
                >
                    {mn
                        ? "Бүртгэл байхгүй юу? "
                        : "Don't have an account? "}


                    <Link
                        to="/auth/signup"
                        className="
                            font-semibold
                            text-[#27301d]

                            no-underline
                            transition-colors

                            hover:text-[#9a7b26]
                        "
                    >
                        {mn
                            ? "Бүртгэл үүсгэх"
                            : "Create one"}
                    </Link>

                </p>

            </div>

        </form>
    );
}