"use client";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { api } from "../../../api/client";


export default function SignupForm() {

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (loading) {
            return;
        }


        setError("");


        /*
         * FRONTEND VALIDATION
         *
         * This prevents an obviously invalid request from
         * reaching Spring, but the backend should still
         * independently validate everything.
         */
        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        if (password.length < 8) {

            setError(
                "Password must be at least 8 characters."
            );

            return;
        }


        setLoading(true);


        /*
         * =====================================================
         * BACKEND SIGNUP REQUEST
         * =====================================================
         *
         * POST /auth/signup
         *
         * Axios sends this object as JSON.
         *
         * IMPORTANT:
         * Make these property names match your Spring
         * signup request DTO exactly.
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


            /*
             * =================================================
             * SIGNUP SUCCESS
             * =================================================
             *
             * Expected backend behavior:
             *
             * 1. create user
             * 2. create verification token
             * 3. queue verification email
             * 4. return successful HTTP response
             *
             * We do NOT log them in here.
             *
             * Instead, tell them to verify their email.
             */
            setSuccess(true);


        } catch (error) {

            /*
             * =================================================
             * SIGNUP FAILURE
             * =================================================
             */

            if (!axios.isAxiosError(error)) {

                setError(
                    "Something went wrong. Please try again."
                );

                return;
            }


            /*
             * No HTTP response.
             *
             * Backend down, CORS/network problem,
             * connection refused, etc.
             */
            if (!error.response) {

                setError(
                    "Unable to reach the service. Please try again later."
                );

                return;
            }


            const status =
                error.response.status;


            switch (status) {

                /*
                 * Invalid signup payload.
                 */
                case 400:

                    setError(
                        "Please check the information you entered."
                    );

                    break;


                /*
                 * Common choice for duplicate email/account.
                 *
                 * Change this if your backend uses a
                 * different status for duplicate users.
                 */
                case 409:

                    setError(
                        "An account with this email already exists."
                    );

                    break;


                /*
                 * Rate limiting.
                 */
                case 429:

                    setError(
                        "Too many requests. Please try again later."
                    );

                    break;


                default:

                    if (status >= 500) {

                        setError(
                            "The server is temporarily unavailable. Please try again later."
                        );

                    } else {

                        setError(
                            "Unable to create your account. Please try again."
                        );
                    }
            }


        } finally {

            setLoading(false);
        }
    }


    /*
     * =========================================================
     * SUCCESS STATE
     * =========================================================
     *
     * Once signup succeeds, replace the form instead of
     * immediately redirecting away.
     */
    if (success) {

        return (
            <div className="text-center">

                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-[#9a7b26]
                    "
                >
                    Almost there
                </p>


                <h2
                    className="
                        mt-4
                        text-2xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    Check your email
                </h2>


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
                    We sent a verification link to{" "}
                    <span className="font-semibold text-[#27301d]">
                        {email}
                    </span>
                    . Open the link to verify your account.
                </p>


                <div
                    className="
                        mt-7
                        border-t
                        border-[#27301d]/10
                        pt-6
                    "
                >

                    <Link
                        to="/auth/login"
                        className="
                            inline-flex
                            min-h-12
                            w-full
                            items-center
                            justify-center
                            bg-[#27301d]
                            px-6
                            py-3.5
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-white
                            no-underline
                            transition-colors
                            hover:bg-[#9a7b26]
                        "
                    >
                        Return to login
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

            {/* Name row */}
            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                "
            >

                <Field
                    id="firstName"
                    label="First name"
                    type="text"
                    value={firstName}
                    placeholder="First name"
                    autoComplete="given-name"
                    disabled={loading}
                    onChange={setFirstName}
                />


                <Field
                    id="lastName"
                    label="Last name"
                    type="text"
                    value={lastName}
                    placeholder="Last name"
                    autoComplete="family-name"
                    disabled={loading}
                    onChange={setLastName}
                />

            </div>


            {/* Email */}
            <div className="mt-5">

                <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    onChange={setEmail}
                />

            </div>


            {/* Password */}
            <div className="mt-5">

                <Field
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={loading}
                    onChange={setPassword}
                />

            </div>


            {/* Confirm password */}
            <div className="mt-5">

                <Field
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    placeholder="Enter your password again"
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
                        mt-5
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

            )}


            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="
                    mt-7
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    bg-[#27301d]
                    px-6
                    py-3.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-white
                    transition-colors
                    hover:bg-[#9a7b26]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:bg-[#27301d]
                "
            >
                {
                    loading
                        ? "Creating account..."
                        : "Create account"
                }
            </button>


            {/* Login */}
            <div
                className="
                    mt-7
                    border-t
                    border-[#27301d]/10
                    pt-6
                    text-center
                "
            >

                <p className="text-sm text-[#667056]">

                    Already have an account?{" "}

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
                        Sign in
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
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
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
                    mt-2.5
                    min-h-12
                    w-full
                    border
                    border-[#27301d]/25
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#27301d]
                    outline-none
                    transition-colors
                    placeholder:text-[#667056]/50
                    focus:border-[#9a7b26]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            />

        </div>
    );
}