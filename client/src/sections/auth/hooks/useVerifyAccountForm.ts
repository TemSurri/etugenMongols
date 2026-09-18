import axios from "axios";
import {
useState
} from "react";
import { requestAccountVerification } from "../api/authApi";
import { useVerificationCountdown } from "./useVerificationCountdown";
export function useVerifyAccountForm(language: "en" | "mn") {
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

            await requestAccountVerification({
                    email: normalizedEmail,
                });


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
return { handleSubmit, mn, email, setEmail, error, setError, alreadyVerified, setAlreadyVerified, loading, success, sentEmail, cooldown };
}
