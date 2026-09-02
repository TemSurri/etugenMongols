import {
  memo,
} from "react";

import type {
  ApiEvent,
} from "../../../events/types";


type Props = {
  event:
    ApiEvent;
};


function EventRegistrationEventPanel({
  event,
}: Props) {

  const date =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        weekday:
          "long",

        year:
          "numeric",

        month:
          "long",

        day:
          "numeric",
      }
    ).format(
      new Date(
        event.startsAt
      )
    );


  return (
    <aside
      className="
        relative
        min-h-[500px]
        overflow-hidden
        bg-[#303824]
        text-[#fffaf0]
        lg:min-h-screen
      "
    >

      {
        event.coverImage &&
        (

          <img
            src={
              event.coverImage
            }

            alt={
              event.coverImageAltEn ??
              event.titleEn
            }

            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

        )
      }


      <div
        className="
          absolute
          inset-0
          bg-[#1c2117]/70
        "
      />


      <div
        className="
          relative
          z-10
          flex
          min-h-full
          flex-col
          justify-end
          px-8
          pb-14
          pt-32
          sm:px-10
          lg:min-h-screen
          lg:px-12
          lg:pb-16
        "
      >

        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#d8bf72]
          "
        >
          Event Registration
        </p>


        <h2
          className="
            mt-4
            max-w-xl
            text-3xl
            font-medium
            leading-tight
            tracking-tight
            sm:text-4xl
          "
        >
          {event.titleEn}
        </h2>


        <p
          className="
            mt-3
            text-sm
            text-[#fffaf0]/65
          "
        >
          {event.titleMn}
        </p>


        <div
          className="
            mt-8
            border-t
            border-[#fffaf0]/20
            pt-6
          "
        >

          <p
            className="
              text-sm
              font-medium
            "
          >
            {date}
          </p>


          <p
            className="
              mt-2
              text-sm
              text-[#fffaf0]/70
            "
          >
            {event.location}
          </p>

        </div>

      </div>

    </aside>
  );
}


export default memo(
  EventRegistrationEventPanel
);