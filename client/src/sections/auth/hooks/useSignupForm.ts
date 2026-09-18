import axios from "axios";
import { useState } from "react";
import { signup } from "../api/authApi";
export function useSignupForm(language: "en" | "mn", onAccountCreated: () => void) {
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

            await signup({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                });


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
return { handleSubmit, mn, firstName, loading, setFirstName, lastName, setLastName, email, setEmail, showPassword, password, setPassword, setShowPassword, showConfirmPassword, confirmPassword, setConfirmPassword, setShowConfirmPassword, error };
}
