"use client";

import {
  Navigate,
  Link,
  useParams
} from "react-router-dom";

import {
  useEventsContext
} from "../context/EventsContext";

import {
  useLanguage
} from "../context/LanguageContext";

import EventRegistrationCheckout
  from "../sections/payments/event_registration/EventRegistrationCheckout";


export default function EventRegistrationPage() {

  const {
    slug
  } =
    useParams<{
      slug: string;
    }>();


  const {
    events,
    loading,
    error
  } =
    useEventsContext();


  const {
    lang
  } =
    useLanguage();


  /*
   * We cannot decide whether the event exists
   * until the shared public event list has loaded.
   */
  if (loading) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#fffaf0]
          px-6
          text-[#303824]
        "
      >

        <div className="text-center">

          <img
            src="/logo.webp"
            alt="Etugen Mongols"
            className="
              mx-auto
              h-16
              w-16
              animate-pulse
              object-contain
            "
          />


          <p
            className="
              mt-5
              text-sm
              font-medium
              text-[#59604d]
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээг ачаалж байна..."
                : "Loading event..."
            }
          </p>

        </div>

      </main>
    );
  }


  /*
   * Public events could not be retrieved.
   *
   * Do not treat this as an invalid slug because
   * we genuinely do not know whether the event
   * exists yet.
   */
  if (error) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#fffaf0]
          px-6
          text-[#303824]
        "
      >

        <section
          className="
            w-full
            max-w-md
            text-center
          "
        >

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#9a7b26]
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээний бүртгэл"
                : "Event Registration"
            }
          </p>


          <h1
            className="
              mt-4
              text-3xl
              font-medium
              tracking-tight
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээг ачаалж чадсангүй"
                : "Unable to load event"
            }
          </h1>


          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {
              lang === "mn"
                ? "Одоогоор арга хэмжээний мэдээллийг авах боломжгүй байна. Дараа дахин оролдоно уу."
                : "We could not load this event right now. Please try again later."
            }
          </p>


          <Link
            to="/events"
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              bg-[#303824]
              px-6
              py-3.5
              text-sm
              font-medium
              text-[#fffaf0]
              transition-colors
              hover:bg-[#242a1b]
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээнүүд"
                : "Back to Events"
            }
          </Link>

        </section>

      </main>
    );
  }


  /*
   * A malformed registration URL should not
   * render a checkout.
   */
  if (!slug) {

    return (
      <Navigate
        to="/events"
        replace
      />
    );
  }


  /*
   * EventsContext is based on the public /events
   * response.
   *
   * That means only publicly available events
   * should be resolvable here.
   */
  const event =
    events.find(
      currentEvent =>
        currentEvent.slug ===
        slug
    );


  /*
   * Unknown/unpublished event.
   */
  if (!event) {

    return (
      <Navigate
        to="/events"
        replace
      />
    );
  }


  /*
   * Real public event, but registration has
   * been disabled by an administrator.
   */
  if (!event.registerable) {

    const title =
      lang === "mn"
        ? event.titleMn
        : event.titleEn;


    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#fffaf0]
          px-6
          text-[#303824]
        "
      >

        <section
          className="
            w-full
            max-w-lg
            border
            border-[#303824]/15
            bg-white/40
            p-8
            text-center
            sm:p-10
          "
        >

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#9a7b26]
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээний бүртгэл"
                : "Event Registration"
            }
          </p>


          <h1
            className="
              mt-4
              text-3xl
              font-medium
              tracking-tight
            "
          >
            {
              lang === "mn"
                ? "Бүртгэл боломжгүй"
                : "Registration unavailable"
            }
          </h1>


          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {
              lang === "mn"
                ? `${title} арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.`
                : `Registration is not currently available for ${title}.`
            }
          </p>


          <Link
            to={`/events/${event.slug}`}
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              bg-[#303824]
              px-6
              py-3.5
              text-sm
              font-medium
              text-[#fffaf0]
              transition-colors
              hover:bg-[#242a1b]
            "
          >
            {
              lang === "mn"
                ? "Арга хэмжээ рүү буцах"
                : "Back to Event"
            }
          </Link>

        </section>

      </main>
    );
  }


  /*
   * Valid:
   *
   * - slug exists
   * - event exists in public event state
   * - event is published through /events
   * - registration is enabled
   */
  return (
    <EventRegistrationCheckout
      event={event}
      lang={
        lang === "mn"
          ? "mn"
          : "en"
      }
    />
  );
}