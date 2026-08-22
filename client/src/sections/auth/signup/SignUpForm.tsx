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
};


export default function SignupForm({
    language,
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

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
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


            setSuccess(true);


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


    /*
     * SUCCESS
     */
    if (success) {

        return (
            <div className="py-2 text-center">

                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-[#9a7b26]
                    "
                >
                    {mn
                        ? "Бараг боллоо"
                        : "Almost there"}
                </p>


                <h2
                    className="
                        mt-3
                        text-2xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    {mn
                        ? "Имэйлээ шалгана уу"
                        : "Check your email"}
                </h2>


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
                    {mn
                        ? (
                            <>
                                Баталгаажуулах холбоосыг{" "}

                                <span
                                    className="
                                        font-semibold
                                        text-[#27301d]
                                    "
                                >
                                    {email}
                                </span>

                                {" "}хаяг руу илгээлээ.
                            </>
                        )
                        : (
                            <>
                                We sent a verification link to{" "}

                                <span
                                    className="
                                        font-semibold
                                        text-[#27301d]
                                    "
                                >
                                    {email}
                                </span>

                                . Open the link to verify your account.
                            </>
                        )}
                </p>


                <div
                    className="
                        mt-5
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
                >

                    <Link
                        to="/auth/login"
                        className="
                            inline-flex
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
                            ? "Нэвтрэх хэсэг рүү буцах"
                            : "Return to login"}
                    </Link>

                </div>

            </div>
        );
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
                    type="password"
                    value={password}
                    placeholder={
                        mn
                            ? "Нууц үг"
                            : "Password"
                    }
                    autoComplete="new-password"
                    disabled={loading}
                    onChange={setPassword}
                />


                <Field
                    id="confirmPassword"
                    label={
                        mn
                            ? "Нууц үг давтах"
                            : "Confirm password"
                    }
                    type="password"
                    value={confirmPassword}
                    placeholder={
                        mn
                            ? "Нууц үг давтах"
                            : "Confirm password"
                    }
                    autoComplete="new-password"
                    disabled={loading}
                    onChange={setConfirmPassword}
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
    );
}