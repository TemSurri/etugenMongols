"use client";

import { useState } from "react";
import axios from "axios";
import {
    Link,
    useNavigate
} from "react-router-dom";

import { api } from "../../../api/client";


export default function LoginForm() {

    const navigate =
        useNavigate();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (loading) {
            return;
        }


        setLoading(true);
        setError("");


        /*
         * =====================================================
         * BACKEND LOGIN REQUEST
         * =====================================================
         *
         * Sends:
         *
         * POST /auth/login
         *
         * JSON:
         *
         * {
         *   "email": "...",
         *   "password": "..."
         * }
         *
         * Your shared Axios client should already contain:
         *
         * baseURL: import.meta.env.VITE_API_URL
         * withCredentials: true
         *
         * withCredentials is important because your backend
         * authentication uses a SESSION cookie.
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
             * =================================================
             * LOGIN SUCCESS
             * =================================================
             *
             * If Spring returns 2xx:
             *
             * - Axios resolves normally
             * - browser keeps the SESSION cookie
             * - user is authenticated
             */

            navigate("/");


        } catch (error) {

            /*
             * =================================================
             * LOGIN FAILURE
             * =================================================
             */


            // Something unexpected outside Axios.
            if (!axios.isAxiosError(error)) {

                setError(
                    "Something went wrong. Please try again."
                );

                return;
            }


            /*
             * No HTTP response from backend.
             *
             * Examples:
             * - Spring isn't running
             * - backend host is unreachable
             * - connection refused
             * - DNS/network problem
             */
            if (!error.response) {

                setError(
                    "Unable to connect to the server. Please try again later."
                );

                return;
            }


            /*
             * Spring DID respond.
             */
            const status =
                error.response.status;


            switch (status) {

                /*
                 * Malformed/invalid request.
                 */
                case 400:

                    setError(
                        "Please check the information you entered."
                    );

                    break;


                /*
                 * Authentication failed.
                 *
                 * Keep this generic so the UI doesn't reveal
                 * whether a particular email exists.
                 */
                case 401:

                    setError(
                        "Invalid email or password."
                    );

                    break;


                /*
                 * Your auth flow has used 403 for cases where
                 * authentication is blocked, such as an account
                 * still requiring verification.
                 *
                 * If you later return a specific backend error
                 * code/body, you can make this message more exact.
                 */
                case 403:

                    setError(
                        "Your account cannot sign in yet. Check your email for any required verification."
                    );

                    break;


                /*
                 * Rate limiting.
                 */
                case 429:

                    setError(
                        "Too many login attempts. Please try again later."
                    );

                    break;


                /*
                 * Backend/server failure.
                 */
                default:

                    if (status >= 500) {

                        setError(
                            "The server is temporarily unavailable. Please try again later."
                        );

                    } else {

                        setError(
                            "Unable to sign in. Please try again."
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
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-[#27301d]
                    "
                >
                    Email
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


            {/* Password */}
            <div className="mt-5">

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
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.22em]
                            text-[#27301d]
                        "
                    >
                        Password
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
                        Forgot password?
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

                    placeholder="Enter your password"
                    autoComplete="current-password"

                    required
                    disabled={loading}

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


            {/* Backend/error message */}
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
                        ? "Signing in..."
                        : "Sign in"
                }

            </button>


            {/* Signup */}
            <div
                className="
                    mt-7
                    border-t
                    border-[#27301d]/10
                    pt-6
                    text-center
                "
            >

                <p
                    className="
                        text-sm
                        text-[#667056]
                    "
                >
                    Don't have an account?{" "}

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
                        Create one
                    </Link>

                </p>

            </div>

        </form>
    );
}