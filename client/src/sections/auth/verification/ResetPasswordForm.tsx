"use client";

import {
    useState
} from "react";

import axios from "axios";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { api } from "../../../api/client";


type ResetPasswordFormProps = {

    language:
        | "en"
        | "mn";

    token: string;
};


export default function ResetPasswordForm({
    language,
    token,
}: ResetPasswordFormProps) {

    const navigate =
        useNavigate();


    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [invalidToken, setInvalidToken] =
        useState(false);


    const mn =
        language === "mn";


    function validatePassword(
        value: string
    ) {

        if (value.length < 8) {

            return mn
                ? "Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой."
                : "Password must be at least 8 characters.";
        }


        if (!/[A-Z]/.test(value)) {

            return mn
                ? "Нууц үг дор хаяж нэг том үсэг агуулсан байх ёстой."
                : "Password must contain at least one uppercase letter.";
        }


        if (!/[a-z]/.test(value)) {

            return mn
                ? "Нууц үг дор хаяж нэг жижиг үсэг агуулсан байх ёстой."
                : "Password must contain at least one lowercase letter.";
        }


        if (!/[0-9]/.test(value)) {

            return mn
                ? "Нууц үг дор хаяж нэг тоо агуулсан байх ёстой."
                : "Password must contain at least one number.";
        }


        return null;
    }


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (loading) {
            return;
        }


        const passwordError =
            validatePassword(password);


        if (passwordError) {

            setError(
                passwordError
            );

            return;
        }


        setLoading(true);

        setError("");


        /*
         * =====================================================
         * PASSWORD RESET
         * =====================================================
         *
         * Uses the SAME endpoint as requesting the reset email.
         *
         * POST /auth/forgot-password
         *
         * {
         *     token,
         *     password
         * }
         */
        try {

            await api.post(
                    "/verify-token",
                    {
                        token,
                        password
                    }
            );


            setSuccess(true);


            /*
             * Give the user enough time to see
             * the success state, then return to login.
             */
            window.setTimeout(() => {

                navigate(
                    "/auth/login",
                    {
                        replace: true,
                    }
                );

            }, 1800);


        } catch (error) {


            if (!axios.isAxiosError(error)) {

                setError(
                    mn
                        ? "Алдаа гарлаа. Дахин оролдоно уу."
                        : "Something went wrong. Please try again."
                );

                return;
            }


            /*
             * Backend could not be reached.
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
                 * Password rejected by backend validation.
                 */
                case 400:

                    setError(
                        mn
                            ? "Нууц үг шаардлагыг хангахгүй байна. Өөр нууц үг сонгоно уу."
                            : "That password does not meet the password requirements."
                    );

                    break;


                /*
                 * Reset token invalid / expired / already used.
                 *
                 * Adjust this status if your backend uses
                 * a different one for invalid tokens.
                 */
                case 404:

                    setInvalidToken(true);

                    setError(
                        mn
                            ? "Энэ нууц үг шинэчлэх холбоос хүчингүй эсвэл хугацаа нь дууссан байна."
                            : "This password reset link is invalid or has expired."
                    );

                    break;


                /*
                 * Too many requests.
                 */
                case 429:

                    setError(
                        mn
                            ? "Хэт олон хүсэлт илгээгдсэн байна. Түр хүлээгээд дахин оролдоно уу."
                            : "Too many password reset attempts. Please wait before trying again."
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
                                ? "Нууц үгийг шинэчилж чадсангүй. Дахин оролдоно уу."
                                : "Unable to reset your password. Please try again."
                        );
                    }
            }


        } finally {

            setLoading(false);
        }
    }


    /*
     * =====================================================
     * SUCCESS STATE
     * =====================================================
     */
    if (success) {

        return (

            <div
                className="
                    py-3
                    text-center
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-[#27301d]/10

                        bg-white

                        text-2xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    ✓
                </div>


                <h2
                    className="
                        mt-5
                        text-xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    {mn
                        ? "Нууц үг шинэчлэгдлээ"
                        : "Password reset successful"}
                </h2>


                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {mn
                        ? "Таны нууц үг амжилттай шинэчлэгдлээ."
                        : "Your password has been updated successfully."}
                </p>


                <p
                    className="
                        mt-5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[#667056]
                    "
                >
                    {mn
                        ? "Нэвтрэх хэсэг рүү шилжүүлж байна..."
                        : "Redirecting to login..."}
                </p>

            </div>
        );
    }


    /*
     * =====================================================
     * INVALID TOKEN STATE
     * =====================================================
     */
    if (invalidToken) {

        return (

            <div>

                <div
                    role="alert"
                    className="
                        border-l-2
                        border-[#9a7b26]

                        bg-white

                        px-4
                        py-3

                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {error}
                </div>


                <Link
                    to="/auth/forgot-password"
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

                        no-underline
                        transition-colors

                        hover:bg-[#9a7b26]
                    "
                >
                    {mn
                        ? "Шинэ холбоос авах"
                        : "Request new reset link"}
                </Link>

            </div>
        );
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col"
        >

            {/* Password */}
            <div>

                <label
                    htmlFor="new-password"
                    className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
                >
                    {mn
                        ? "Шинэ нууц үг"
                        : "New password"}
                </label>


                <div className="relative mt-2">

                    <input
                        id="new-password"
                        name="password"

                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }

                        value={password}

                        onChange={(event) => {

                            setPassword(
                                event.target.value
                            );

                            if (error) {
                                setError("");
                            }
                        }}

                        placeholder={
                            mn
                                ? "Шинэ нууц үгээ оруулна уу"
                                : "Enter your new password"
                        }

                        autoComplete="new-password"

                        required
                        disabled={loading}

                        className="
                            h-11
                            w-full

                            border
                            border-[#27301d]/25

                            bg-white

                            px-3.5
                            pr-16

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


                    <button
                        type="button"

                        onClick={() =>
                            setShowPassword(
                                (visible) => !visible
                            )
                        }

                        disabled={loading}

                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2

                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#667056]

                            transition-colors

                            hover:text-[#9a7b26]

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {showPassword
                            ? (
                                mn
                                    ? "Нуух"
                                    : "Hide"
                            )
                            : (
                                mn
                                    ? "Харах"
                                    : "Show"
                            )}
                    </button>

                </div>

            </div>


            {/* Requirements */}
            <div
                className="
                    mt-3
                    text-xs
                    leading-5
                    text-[#667056]/80
                "
            >
                {mn
                    ? "Хамгийн багадаа 8 тэмдэгт, нэг том үсэг, нэг жижиг үсэг болон нэг тоо."
                    : "Use at least 8 characters with an uppercase letter, lowercase letter, and number."}
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
                            ? "Шинэчилж байна..."
                            : "Resetting password..."
                    )
                    : (
                        mn
                            ? "Нууц үг шинэчлэх"
                            : "Reset password"
                    )}
            </button>

        </form>
    );
}