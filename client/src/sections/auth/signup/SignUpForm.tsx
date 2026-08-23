"use client";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { api } from "../../../api/client";

import type {
    Language
} from "./SignUpSection";


type SignupFormProps = {
    language: Language;
    onAccountCreated: () => void;
};


export default function SignupForm({
    language,
    onAccountCreated,
}: SignupFormProps) {

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] =
        useState("");

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


        setError("");


        if (password !== confirmPassword) {

            setError(
                mn
                    ? "Нууц үгнүүд таарахгүй байна."
                    : "Passwords do not match."
            );

            return;
        }


        if (password.length < 8) {

            setError(
                mn
                    ? "Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой."
                    : "Password must be at least 8 characters."
            );

            return;
        }


        setLoading(true);


        /*
         * BACKEND SIGNUP REQUEST
         */
        try {

            await api.post(
                "/auth/signup",
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                }
            );


            onAccountCreated();


        } catch (error) {

            if (!axios.isAxiosError(error)) {

                setError(
                    mn
                        ? "Алдаа гарлаа. Дахин оролдоно уу."
                        : "Something went wrong. Please try again."
                );

                return;
            }


            if (!error.response) {

                setError(
                    mn
                        ? "Сервертэй холбогдож чадсангүй. Дараа дахин оролдоно уу."
                        : "Unable to reach the service. Please try again later."
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


                case 403:

                    setError(
                        mn
                            ? "Та аль хэдийн нэвтэрсэн байна."
                            : "You are already signed in."
                    );

                    break;


                case 409:

                    setError(
                        mn
                            ? "Энэ имэйл хаягаар бүртгэл аль хэдийн үүссэн байна."
                            : "An account with this email already exists."
                    );

                    break;


                case 429:

                    setError(
                        mn
                            ? "Хэт олон хүсэлт илгээгдлээ. Дараа дахин оролдоно уу."
                            : "Too many requests. Please try again later."
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
                                ? "Бүртгэл үүсгэж чадсангүй. Дахин оролдоно уу."
                                : "Unable to create your account. Please try again."
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

            {/* Names */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                "
            >

                <Field
                    id="firstName"
                    label={
                        mn
                            ? "Нэр"
                            : "First name"
                    }
                    type="text"
                    value={firstName}
                    placeholder={
                        mn
                            ? "Нэр"
                            : "First name"
                    }
                    autoComplete="given-name"
                    disabled={loading}
                    onChange={setFirstName}
                />


                <Field
                    id="lastName"
                    label={
                        mn
                            ? "Овог"
                            : "Last name"
                    }
                    type="text"
                    value={lastName}
                    placeholder={
                        mn
                            ? "Овог"
                            : "Last name"
                    }
                    autoComplete="family-name"
                    disabled={loading}
                    onChange={setLastName}
                />

            </div>


            {/* Email */}
            <div className="mt-4">

                <Field
                    id="email"
                    label={
                        mn
                            ? "Имэйл"
                            : "Email"
                    }
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    onChange={setEmail}
                />

            </div>


            {/* Passwords */}
            <div
                className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                "
            >

                <Field
                    id="password"
                    label={
                        mn
                            ? "Нууц үг"
                            : "Password"
                    }
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={
                        mn
                            ? "Нууц үг"
                            : "Password"
                    }
                    autoComplete="new-password"
                    disabled={loading}
                    onChange={setPassword}
                    passwordToggle
                    passwordVisible={showPassword}
                    onTogglePassword={() =>
                        setShowPassword((visible) => !visible)
                    }
                    language={language}
                />


                <Field
                    id="confirmPassword"
                    label={
                        mn
                            ? "Нууц үг давтах"
                            : "Confirm password"
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder={
                        mn
                            ? "Нууц үг давтах"
                            : "Confirm password"
                    }
                    autoComplete="new-password"
                    disabled={loading}
                    onChange={setConfirmPassword}
                    passwordToggle
                    passwordVisible={showConfirmPassword}
                    onTogglePassword={() =>
                        setShowConfirmPassword((visible) => !visible)
                    }
                    language={language}
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
                            ? "Бүртгэл үүсгэж байна..."
                            : "Creating account..."
                    )
                    : (
                        mn
                            ? "Бүртгэл үүсгэх"
                            : "Create account"
                    )}
            </button>


            {/* Login */}
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
                        ? "Бүртгэлтэй юу? "
                        : "Already have an account? "}

                    <Link
                        to="/auth/login"
                        className="
                            font-semibold
                            text-[#27301d]
                            no-underline
                            transition-colors
                            hover:text-[#9a7b26]
                        "
                    >
                        {mn
                            ? "Нэвтрэх"
                            : "Sign in"}
                    </Link>

                </p>

            </div>

        </form>
    );
}


type FieldProps = {

    id: string;
    label: string;

    type:
        | "text"
        | "email"
        | "password";

    value: string;
    placeholder: string;
    autoComplete: string;

    disabled: boolean;

    onChange: (
        value: string
    ) => void;

    passwordToggle?: boolean;
    passwordVisible?: boolean;
    onTogglePassword?: () => void;
    language?: Language;
};


function Field({
    id,
    label,
    type,
    value,
    placeholder,
    autoComplete,
    disabled,
    onChange,
    passwordToggle = false,
    passwordVisible = false,
    onTogglePassword,
    language = "en",
}: FieldProps) {

    return (
        <div>

            <label
                htmlFor={id}
                className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#27301d]
                "
            >
                {label}
            </label>


            <div className="relative mt-2">

                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}

                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }

                    placeholder={placeholder}
                    autoComplete={autoComplete}

                    required
                    disabled={disabled}

                    className={`
                        h-11
                        w-full

                        border
                        border-[#27301d]/25

                        bg-white

                        px-3.5
                        ${passwordToggle ? "pr-16" : ""}

                        text-sm
                        text-[#27301d]

                        outline-none
                        transition-colors

                        placeholder:text-[#667056]/45

                        focus:border-[#9a7b26]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    `}
                />

                {passwordToggle && onTogglePassword && (

                    <button
                        type="button"
                        onClick={onTogglePassword}
                        disabled={disabled}
                        aria-label={
                            passwordVisible
                                ? (
                                    language === "mn"
                                        ? "Нууц үгийг нуух"
                                        : "Hide password"
                                )
                                : (
                                    language === "mn"
                                        ? "Нууц үгийг харуулах"
                                        : "Show password"
                                )
                        }
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
                        {passwordVisible
                            ? (
                                language === "mn"
                                    ? "Нуух"
                                    : "Hide"
                            )
                            : (
                                language === "mn"
                                    ? "Харах"
                                    : "Show"
                            )}
                    </button>

                )}

            </div>

        </div>
    );
}