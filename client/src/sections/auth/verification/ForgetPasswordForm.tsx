"use client";

import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import { api } from "../../../api/client";


type ForgotPasswordFormProps = {
    language: "en" | "mn";
};


export default function ForgotPasswordForm({
    language,
}: ForgotPasswordFormProps) {

    const [email, setEmail] =
        useState("");

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [cooldown, setCooldown] =
        useState(0);


    const mn =
        language === "mn";


    /*
     * =====================================================
     * PASSWORD RESET EMAIL COOLDOWN
     * =====================================================
     *
     * After a successful request, wait 60 seconds
     * before allowing another password reset email.
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


        /*
         * =====================================================
         * BACKEND PASSWORD RESET REQUEST
         * =====================================================
         *
         * POST /auth/forgot-password
         *
         * {
         *     email
         * }
         */
        try {

            await api.post(
                "/auth/forgot-password",
                {
                    email: normalizedEmail,
                }
            );


            /*
             * Only a successful HTTP response reaches here.
             *
             * Keep the message generic so we don't reveal
             * whether an account exists for the email.
             */
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
             * No response means the frontend could not
             * connect to the backend.
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


            /*
             * Too many password reset requests.
             */
            if (status === 429) {

                setError(
                    mn
                        ? "Хэт олон хүсэлт илгээгдсэн байна. Түр хүлээгээд дахин оролдоно уу."
                        : "Too many password reset requests. Please wait before trying again."
                );

                return;
            }


            /*
             * Backend/server failure.
             */
            if (status >= 500) {

                setError(
                    mn
                        ? "Сервер түр хугацаанд ажиллахгүй байна. Дараа дахин оролдоно уу."
                        : "The server is temporarily unavailable. Please try again later."
                );

                return;
            }


            /*
             * Any other HTTP error.
             *
             * 400, 401, 403, 404, 409, etc.
             */
            setError(
                mn
                    ? "Нууц үг шинэчлэх хүсэлтийг боловсруулах боломжгүй байна. Дахин оролдоно уу."
                    : "Unable to process the password reset request. Please try again."
            );


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
                    htmlFor="password-reset-email"
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
                    id="password-reset-email"
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


            {/* Password reset request sent */}
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
                            ? "Нууц үг шинэчлэх хүсэлт илгээгдлээ"
                            : "Password reset request sent"}
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
                            ? "Хэрэв энэ имэйл хаягтай бүртгэл байгаа бол нууц үг шинэчлэх холбоос илгээгдсэн."
                            : "If an account exists for that email, a password reset link has been sent."}
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
                            : "Check your inbox and spam folder if you don't see the email shortly."}
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
                </div>

            )}


            {/* Send password reset link */}
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
                                    ? "Нууц үг шинэчлэх холбоосыг дахин илгээх"
                                    : "Send another reset link"
                            )
                            : (
                                mn
                                    ? "Нууц үг шинэчлэх холбоос илгээх"
                                    : "Send password reset link"
                            )
                }

            </button>

        </form>
    );
}