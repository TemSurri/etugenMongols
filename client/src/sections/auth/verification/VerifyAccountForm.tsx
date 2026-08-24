"use client";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { api } from "../../../api/client";

import type {
    Language
} from "./VerifyAccountSection";


type VerifyAccountFormProps = {
    language: Language;
};


export default function VerifyAccountForm({
    language,
}: VerifyAccountFormProps) {

    const [email, setEmail] =
        useState("");

    const [sentEmail, setSentEmail] =
        useState("");

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const [alreadyVerified, setAlreadyVerified] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [cooldown, setCooldown] =
        useState(0);


    const mn =
        language === "mn";


    /*
     * =====================================================
     * RESEND COOLDOWN
     * =====================================================
     *
     * After a successful request, the user must wait
     * 60 seconds before sending another verification email.
     */
    useEffect(() => {

        if (cooldown <= 0) {
            return;
        }


        const timer =
            window.setInterval(() => {

                setCooldown(
                    (current) => {

                        if (current <= 1) {

                            window.clearInterval(timer);

                            return 0;
                        }

                        return current - 1;
                    }
                );

            }, 1000);


        return () =>
            window.clearInterval(timer);

    }, [cooldown]);


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (
            loading ||
            cooldown > 0
        ) {
            return;
        }


        const normalizedEmail =
            email.trim();


        if (!normalizedEmail) {

            setError(
                mn
                    ? "Имэйл хаягаа оруулна уу."
                    : "Please enter your email address."
            );

            return;
        }


        setLoading(true);

        setError("");

        setSuccess(false);

        setAlreadyVerified(false);


        /*
         * =====================================================
         * BACKEND ACCOUNT VERIFICATION REQUEST
         * =====================================================
         *
         * POST /auth/verify-account
         *
         * {
         *     email
         * }
         */
        try {

            await api.post(
                "/auth/verify-account",
                {
                    email: normalizedEmail,
                }
            );


            /*
             * Request succeeded.
             *
             * Keep a separate copy so that the success
             * message clearly shows where the email was sent.
             */
            setSentEmail(
                normalizedEmail
            );

            setSuccess(true);

            setCooldown(60);


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

                /*
                 * Email does not belong to an account.
                 */
                case 400:

                    setError(
                        mn
                            ? "Энэ имэйл хаягтай бүртгэл олдсонгүй."
                            : "We couldn't find an account with that email address."
                    );

                    break;


                /*
                 * Account has already been verified.
                 */
                case 409:

                    setError(
                        mn
                            ? "Энэ бүртгэл аль хэдийн баталгаажсан байна."
                            : "This account has already been verified."
                    );

                    setAlreadyVerified(true);

                    break;


                /*
                 * Rate limit / too many requests.
                 */
                case 429:

                    setError(
                        mn
                            ? "Хэт олон хүсэлт илгээгдсэн байна. Түр хүлээгээд дахин оролдоно уу."
                            : "Too many verification requests. Please wait before trying again."
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
                                ? "Баталгаажуулах имэйл илгээж чадсангүй. Дахин оролдоно уу."
                                : "Unable to send the verification email. Please try again."
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
                    htmlFor="verification-email"
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
                    id="verification-email"
                    name="email"
                    type="email"

                    value={email}

                    onChange={(event) => {

                        setEmail(
                            event.target.value
                        );

                        if (error) {
                            setError("");
                        }

                        if (alreadyVerified) {
                            setAlreadyVerified(false);
                        }
                    }}

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


            {/* Success */}
            {success && (

                <div
                    role="status"
                    aria-live="polite"

                    className="
                        mt-4

                        border-l-2
                        border-[#667056]

                        bg-white

                        px-4
                        py-3
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
                    >
                        {mn
                            ? "Баталгаажуулах имэйл илгээгдлээ"
                            : "Verification email sent"}
                    </p>


                    <p
                        className="
                            mt-1
                            text-sm
                            leading-6
                            text-[#667056]
                        "
                    >
                        {mn
                            ? "Бид баталгаажуулах холбоосыг "
                            : "We sent a verification link to "}
                        
                        <span
                            className="
                                font-semibold
                                text-[#27301d]
                                break-all
                            "
                        >
                            {sentEmail}
                        </span>

                        {mn
                            ? " хаяг руу илгээлээ."
                            : "."}
                    </p>


                    <p
                        className="
                            mt-2
                            text-xs
                            leading-5
                            text-[#667056]/80
                        "
                    >
                        {mn
                            ? "Ирсэн имэйл болон spam хавтсаа шалгана уу."
                            : "Check your inbox and spam folder if you don't see it shortly."}
                    </p>

                </div>

            )}


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


                    {alreadyVerified && (

                        <>
                            {" "}

                            <Link
                                to="/auth/login"
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
                                    ? "Нэвтрэх"
                                    : "Sign in"}
                            </Link>
                        </>

                    )}

                </div>

            )}


            {/* Submit / resend */}
            <button
                type="submit"

                disabled={
                    loading ||
                    cooldown > 0
                }

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
                            ? "Илгээж байна..."
                            : "Sending..."
                    )
                    : cooldown > 0
                        ? (
                            mn
                                ? `${cooldown} секундийн дараа дахин илгээх`
                                : `Resend in ${cooldown}s`
                        )
                        : success
                            ? (
                                mn
                                    ? "Баталгаажуулах имэйлийг дахин илгээх"
                                    : "Resend verification email"
                            )
                            : (
                                mn
                                    ? "Баталгаажуулах имэйл илгээх"
                                    : "Send verification email"
                            )
                }

            </button>


            

        </form>
    );
}