import axios from "axios";
import { useState } from "react";
import {
useNavigate
} from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { login } from "../api/authApi";
export function useLoginForm(language: "en" | "mn") {
const navigate =
        useNavigate();

const {
        refreshAuth
    } = useAuth();

const [email, setEmail] =
        useState("");

const [password, setPassword] =
        useState("");

const [showPassword, setShowPassword] =
        useState(false);

const [error, setError] =
        useState("");

const [
        needsVerification,
        setNeedsVerification,
    ] =
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


        setLoading(true);

        setError("");

        setNeedsVerification(false);


        /*
         * =====================================================
         * BACKEND LOGIN REQUEST
         * =====================================================
         *
         * POST /auth/login
         *
         * {
         *     email,
         *     password
         * }
         */
        try {

            await login({
                    email: email,
                    password: password,
                });


            /*
             * Login succeeded.
             *
             * Browser now has the SESSION cookie.
             * Refresh global auth state so the header
             * immediately knows the user is logged in.
             */
            await refreshAuth();


            navigate("/");


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

                case 400:

                    setError(
                        mn
                            ? "Оруулсан мэдээллээ шалгана уу."
                            : "Please check the information you entered."
                    );

                    break;


                case 401:

                    setError(
                        mn
                            ? "Имэйл эсвэл нууц үг буруу байна."
                            : "Invalid email or password."
                    );

                    break;


                /*
                 * Account exists but is not verified.
                 */
                case 403:

                    setError(
                        mn
                            ? "Таны бүртгэл хараахан баталгаажаагүй байна."
                            : "Your account has not been verified yet."
                    );

                    setNeedsVerification(true);

                    break;


                case 429:

                    setError(
                        mn
                            ? "Хэт олон удаа нэвтрэх оролдлого хийлээ. Дараа дахин оролдоно уу."
                            : "Too many login attempts. Please try again later."
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
                                ? "Нэвтэрч чадсангүй. Дахин оролдоно уу."
                                : "Unable to sign in. Please try again."
                        );
                    }
            }


        } finally {

            setLoading(false);
        }
    }
return { handleSubmit, mn, email, setEmail, loading, showPassword, password, setPassword, setShowPassword, error, needsVerification };
}
