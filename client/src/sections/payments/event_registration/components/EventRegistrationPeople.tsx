import {
    memo
} from "react";

import type {
    RegistrationPerson
} from "../eventRegistrationTypes";

import type {
    EventRegistrationCopy
} from "../eventRegistrationCopy";


type EventRegistrationPeopleProps = {

    people: RegistrationPerson[];


    onAdd: () => void;


    onRemove: (
        id: string
    ) => void;


    onUpdate: (
        id: string,

        field:
            | "firstName"
            | "lastName",

        value: string
    ) => void;


    copy: EventRegistrationCopy;
};


function EventRegistrationPeople({
    people,
    onAdd,
    onRemove,
    onUpdate,
    copy
}: EventRegistrationPeopleProps) {

    return (
        <section
            className="
                border-t
                border-[#27301d]/10
                pt-7
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-5
                "
            >

                <div>

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-[#27301d]
                        "
                    >
                        {
                            copy.additionalGuests
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
                            copy.additionalGuestsDescription
                        }
                    </p>

                </div>


                <button
                    type="button"

                    onClick={
                        onAdd
                    }

                    className="
                        shrink-0
                        border
                        border-[#303824]
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-[#303824]
                        transition-colors
                        duration-150
                        hover:bg-[#303824]
                        hover:text-white
                    "
                >
                    + {
                        copy.addPerson
                    }
                </button>

            </div>


            {
                people.length === 0
                    ? (

                        <p
                            className="
                                mt-5
                                text-sm
                                text-[#59624a]/75
                            "
                        >
                            {
                                copy.noAdditionalGuests
                            }
                        </p>

                    )
                    : (

                        <div
                            className="
                                mt-6
                                space-y-6
                            "
                        >

                            {
                                people.map(
                                    (
                                        person,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                person.id
                                            }

                                            className="
                                                border-t
                                                border-[#27301d]/10
                                                pt-5
                                                first:border-t-0
                                                first:pt-0
                                            "
                                        >

                                            <div
                                                className="
                                                    mb-3
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.13em]
                                                        text-[#8e742d]
                                                    "
                                                >
                                                    {
                                                        copy.guest
                                                    }{" "}
                                                    {
                                                        index + 1
                                                    }
                                                </p>


                                                <button
                                                    type="button"

                                                    onClick={
                                                        () =>
                                                            onRemove(
                                                                person.id
                                                            )
                                                    }

                                                    className="
                                                        text-xs
                                                        font-medium
                                                        text-[#7a604d]
                                                        underline
                                                        underline-offset-4
                                                        transition-colors
                                                        hover:text-[#27301d]
                                                    "
                                                >
                                                    {
                                                        copy.remove
                                                    }
                                                </button>

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
                                                            person.firstName
                                                        }

                                                        onChange={
                                                            event =>
                                                                onUpdate(
                                                                    person.id,
                                                                    "firstName",
                                                                    event.target.value
                                                                )
                                                        }

                                                        autoComplete="off"

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
                                                            person.lastName
                                                        }

                                                        onChange={
                                                            event =>
                                                                onUpdate(
                                                                    person.id,
                                                                    "lastName",
                                                                    event.target.value
                                                                )
                                                        }

                                                        autoComplete="off"

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

                                        </div>

                                    )
                                )
                            }

                        </div>

                    )
            }

        </section>
    );
}


export default memo(
    EventRegistrationPeople
);