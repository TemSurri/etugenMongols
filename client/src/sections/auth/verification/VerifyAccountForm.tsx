"use client";

import { useVerifyAccountForm } from "../hooks/useVerifyAccountForm";





import { Link } from "react-router-dom";



import type {
Language
} from "./VerifyAccountSection";


type VerifyAccountFormProps = {
    language: Language;
};


export default function VerifyAccountForm({
    language,
}: VerifyAccountFormProps) {

    const { handleSubmit, mn, email, setEmail, error, setError, alreadyVerified, setAlreadyVerified, loading, success, sentEmail, cooldown } = useVerifyAccountForm(language);

    

    

    

    

    

    


    


    /*
     * =====================================================
     * RESEND COOLDOWN
     * =====================================================
     *
     * After a successful request, the user must wait
     * 60 seconds before sending another verification email.
     */
    


    


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