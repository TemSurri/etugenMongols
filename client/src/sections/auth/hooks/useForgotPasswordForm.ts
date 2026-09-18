import axios from "axios";
import {
useState
} from "react";
import { requestPasswordReset } from "../api/authApi";
import { useVerificationCountdown } from "./useVerificationCountdown";
export function useForgotPasswordForm(language: "en" | "mn") {
const [email, setEmail] =
        useState("");

const [error, setError] =
        useState("");

const [success, setSuccess] =
        useState(false);

const [loading, setLoading] =
        useState(false);

const [cooldown, setCooldown] = useVerificationCountdown();

const mn =
        language === "mn";

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

            await requestPasswordReset({
                    email: normalizedEmail,
                });


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
return { handleSubmit, mn, email, setEmail, error, setError, loading, success, cooldown };
}
