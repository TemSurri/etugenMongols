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


    setFirstName: (
        value: string
    ) => void;

    setLastName: (
        value: string
    ) => void;

    setEmail: (
        value: string
    ) => void;


    loggedIn: boolean;


    copy: EventRegistrationCopy;
};


function EventRegistrationPayee({
    firstName,
    lastName,
    email,
    setFirstName,
    setLastName,
    setEmail,
    loggedIn,
    copy
}: EventRegistrationPayeeProps) {

    return (
        <section>

            <div
                className="
                    mb-5
                "
            >

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

            </div>


            <div
                className="
                    grid
                    gap-4
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
                        "
                    />

                </label>

            </div>


            <label
                className="
                    mt-4
                    block
                "
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
                    "
                />

            </label>


            {
                !loggedIn && (

                    <div
                        className="
                            mt-5
                            border-l-2
                            border-[#b89a42]
                            bg-[#f1eee4]
                            px-4
                            py-3
                        "
                    >

                        <p
                            className="
                                text-sm
                                leading-6
                                text-[#59624a]
                            "
                        >

                            {
                                copy.accountSuggestion
                            }


                            {" "}


                            <Link
                                to="/auth/signup"

                                className="
                                    font-semibold
                                    text-[#7c682d]
                                    underline
                                    underline-offset-4
                                    transition-colors
                                    hover:text-[#4e593c]
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