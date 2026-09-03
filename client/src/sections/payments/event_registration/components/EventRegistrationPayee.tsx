import {
    memo
} from "react";

import {
    Link
} from "react-router-dom";

import type {
    EventRegistrationCopy
} from "../eventRegistrationCopy";


type EventRegistrationPayeeProps = {

    firstName: string;

    lastName: string;

    email: string;

    confirmEmail: string;

    setFirstName:
        (value: string) => void;

    setLastName:
        (value: string) => void;

    setEmail:
        (value: string) => void;

    setConfirmEmail:
        (value: string) => void;

    loggedIn: boolean;

    copy: EventRegistrationCopy;
};


function EventRegistrationPayee({
    firstName,
    lastName,
    email,
    confirmEmail,
    setFirstName,
    setLastName,
    setEmail,
    setConfirmEmail,
    loggedIn,
    copy
}: EventRegistrationPayeeProps) {

    const emailsMatch =
        email
            .trim()
            .toLowerCase() ===
        confirmEmail
            .trim()
            .toLowerCase();


    const showEmailMismatch =
        !loggedIn &&
        confirmEmail.trim().length > 0 &&
        !emailsMatch;


    return (
        <section>

            <h2
                className="
                    text-lg
                    font-semibold
                    text-[#27301d]
                "
            >
                {
                    copy.yourInformation
                }
            </h2>


            <p
                className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#59624a]
                "
            >
                {
                    copy.yourInformationDescription
                }
            </p>


            <div
                className="
                    mt-6
                    grid
                    gap-5
                    sm:grid-cols-2
                "
            >

                <label>

                    <span
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-[#4e593c]
                        "
                    >
                        {
                            copy.firstName
                        }
                    </span>


                    <input
                        type="text"

                        value={
                            firstName
                        }

                        onChange={
                            event =>
                                setFirstName(
                                    event.target.value
                                )
                        }

                        disabled={
                            loggedIn
                        }

                        autoComplete="given-name"

                        className="
                            w-full
                            border
                            border-[#cfcfca]
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-[#27301d]
                            outline-none
                            transition
                            duration-150
                            focus:border-[#7e895d]
                            focus:ring-2
                            focus:ring-[#7e895d]/15
                            disabled:cursor-default
                            disabled:bg-[#f1f1ed]
                            disabled:text-[#59624a]
                        "
                    />

                </label>


                <label>

                    <span
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-[#4e593c]
                        "
                    >
                        {
                            copy.lastName
                        }
                    </span>


                    <input
                        type="text"

                        value={
                            lastName
                        }

                        onChange={
                            event =>
                                setLastName(
                                    event.target.value
                                )
                        }

                        disabled={
                            loggedIn
                        }

                        autoComplete="family-name"

                        className="
                            w-full
                            border
                            border-[#cfcfca]
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-[#27301d]
                            outline-none
                            transition
                            duration-150
                            focus:border-[#7e895d]
                            focus:ring-2
                            focus:ring-[#7e895d]/15
                            disabled:cursor-default
                            disabled:bg-[#f1f1ed]
                            disabled:text-[#59624a]
                        "
                    />

                </label>

            </div>


            <div
                className="
                    mt-5
                    grid
                    gap-5
                    sm:grid-cols-2
                "
            >

                <label
                    className={
                        loggedIn
                            ? "sm:col-span-2"
                            : ""
                    }
                >

                    <span
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-[#4e593c]
                        "
                    >
                        {
                            copy.email
                        }
                    </span>


                    <input
                        type="email"

                        value={
                            email
                        }

                        onChange={
                            event =>
                                setEmail(
                                    event.target.value
                                )
                        }

                        disabled={
                            loggedIn
                        }

                        autoComplete="email"

                        className="
                            w-full
                            border
                            border-[#cfcfca]
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-[#27301d]
                            outline-none
                            transition
                            duration-150
                            focus:border-[#7e895d]
                            focus:ring-2
                            focus:ring-[#7e895d]/15
                            disabled:cursor-default
                            disabled:bg-[#f1f1ed]
                            disabled:text-[#59624a]
                        "
                    />

                </label>


                {
                    !loggedIn &&
                    (

                        <label>

                            <span
                                className="
                                    mb-1.5
                                    block
                                    text-xs
                                    font-medium
                                    text-[#4e593c]
                                "
                            >
                                {
                                    copy.confirmEmail
                                }
                            </span>


                            <input
                                type="email"

                                value={
                                    confirmEmail
                                }

                                onChange={
                                    event =>
                                        setConfirmEmail(
                                            event.target.value
                                        )
                                }

                                autoComplete="off"

                                className={`
                                    w-full
                                    border
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#27301d]
                                    outline-none
                                    transition
                                    duration-150
                                    focus:ring-2

                                    ${
                                        showEmailMismatch
                                            ? `
                                                border-red-700/50
                                                focus:border-red-700/60
                                                focus:ring-red-700/10
                                            `
                                            : `
                                                border-[#cfcfca]
                                                focus:border-[#7e895d]
                                                focus:ring-[#7e895d]/15
                                            `
                                    }
                                `}
                            />


                            {
                                showEmailMismatch &&
                                (

                                    <span
                                        className="
                                            mt-1.5
                                            block
                                            text-xs
                                            text-red-700
                                        "
                                    >
                                        {
                                            copy.emailsDoNotMatch
                                        }
                                    </span>

                                )
                            }

                        </label>

                    )
                }

            </div>


            {
                !loggedIn &&
                (

                    <div
                        className="
                            mt-5
                            border-l-2
                            border-[#b59843]/50
                            bg-[#f3efe2]/65
                            px-4
                            py-3
                        "
                    >

                        <p
                            className="
                                text-xs
                                leading-5
                                text-[#59624a]
                            "
                        >
                            {
                                copy.accountSuggestion
                            }{" "}

                            <Link
                                to="/auth/signup"

                                className="
                                    font-semibold
                                    text-[#82691f]
                                    underline
                                    underline-offset-2
                                    transition-colors
                                    hover:text-[#5d4915]
                                "
                            >
                                {
                                    copy.createAccount
                                }
                            </Link>
                        </p>

                    </div>

                )
            }

        </section>
    );
}


export default memo(
    EventRegistrationPayee
);