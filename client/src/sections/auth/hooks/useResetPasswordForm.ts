import axios from "axios";
import {
useState
} from "react";
import {
useNavigate
} from "react-router-dom";
import { resetPassword } from "../api/authApi";
export function useResetPasswordForm(language: "en" | "mn", token: string) {
const navigate =
        useNavigate();

const [password, setPassword] =
        useState("");

const [confirmPassword, setConfirmPassword] =
        useState("");

const [showPassword, setShowPassword] =
        useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
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


        if (password !== confirmPassword) {

            setError(
                mn
                    ? "Нууц үгүүд таарахгүй байна."
                    : "Passwords do not match."
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

            await resetPassword({
                        token,
                        password
                    });


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
return { success, mn, invalidToken, error, handleSubmit, showPassword, password, setPassword, setError, loading, setShowPassword, showConfirmPassword, confirmPassword, setConfirmPassword, setShowConfirmPassword };
}
