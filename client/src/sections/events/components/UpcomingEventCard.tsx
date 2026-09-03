import {
  memo
} from "react";

import {
  Link
} from "react-router-dom";

import type {
  EventsCopy,
  UpcomingEventItem
} from "../types";


type Props = {
  event: UpcomingEventItem;
  copy: EventsCopy;
  index: number;
};


function UpcomingEventCard({
  event,
  copy,
  index
}: Props) {

  const registrationText =
    event.registerable
      ? event.registrationCost === 0
        ? copy.freeRegistration
        : event.registrationCost !== null
          ? `${copy.registrationFrom} $${(
              event.registrationCost /
              100
            ).toFixed(2)}`
          : null
      : null;


  return (
    <Link
      to={event.href}
      aria-label={`${copy.viewEvent}: ${event.title}`}
      className="group relative block aspect-square w-full overflow-hidden bg-[#303824] transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(48,56,36,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687255]/40"
    >

      <img
        src={event.imageSrc}
        alt={event.imageAlt}
        width={760}
        height={760}
        loading={
          index === 0
            ? "eager"
            : "lazy"
        }
        decoding="async"
        fetchPriority={
          index === 0
            ? "high"
            : "auto"
        }
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-black/12" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/15 to-transparent" />


      <div className="absolute inset-x-0 bottom-0 p-5 text-[#fffaf0] sm:p-6">

        <p className="text-[10px] font-medium leading-5 text-[#eee0b7]">

          {event.date}

          {event.time && (
            <>
              <span className="mx-2 text-[#eee0b7]/45">
                ·
              </span>

              {event.time}
            </>
          )}

        </p>


        <h2 className="mt-2 line-clamp-2 text-xl font-normal leading-tight tracking-tight sm:text-2xl">
          {event.title}
        </h2>


        {event.location && (
          <p className="mt-2 line-clamp-1 text-[11px] leading-5 text-[#fffaf0]/72">
            {event.location}
          </p>
        )}


        {registrationText && (
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#eee0b7]">
            {registrationText}
          </p>
        )}


        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.16em]">

          {copy.viewEvent}

          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1"
          >
            →
          </span>

        </p>

      </div>

    </Link>
  );
}


export default memo(
  UpcomingEventCard
);