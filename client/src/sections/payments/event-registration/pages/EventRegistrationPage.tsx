import { eventRegistrationPageCopy } from "../content/EventRegistrationPageCopy";

import { Link, Navigate, useParams } from "react-router-dom";

import { useEventsContext } from "../../../events/hooks/useEventsContext";

import { useLanguage } from "../../../../context/useLanguage";

import { paymentMedia } from "../../media";
import EventRegistrationCheckout from "../components/EventRegistrationCheckout";

export default function EventRegistrationPage() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const { events, loading, error } = useEventsContext();

  const { lang } = useLanguage();

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
            src={paymentMedia.logo}
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
            {eventRegistrationPageCopy[lang].loadingEvent}
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
            {eventRegistrationPageCopy[lang].eventRegistration}
          </p>

          <h1
            className="
              mt-4
              text-3xl
              font-medium
              tracking-tight
            "
          >
            {eventRegistrationPageCopy[lang].unableToLoadEvent}
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {eventRegistrationPageCopy[lang].weCouldNotLoadThisEventRight}
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
            {eventRegistrationPageCopy[lang].backToEvents}
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
    return <Navigate to="/events" replace />;
  }

  /*
   * EventsContext is based on the public /events
   * response.
   *
   * That means only publicly available events
   * should be resolvable here.
   */
  const event = events.find((currentEvent) => currentEvent.slug === slug);

  /*
   * Unknown/unpublished event.
   */
  if (!event) {
    return <Navigate to="/events" replace />;
  }

  /*
   * Real public event, but registration has
   * been disabled by an administrator.
   */
  if (!event.registerable) {
    const title = lang === "mn" ? event.titleMn : event.titleEn;

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
            {eventRegistrationPageCopy[lang].eventRegistration}
          </p>

          <h1
            className="
              mt-4
              text-3xl
              font-medium
              tracking-tight
            "
          >
            {eventRegistrationPageCopy[lang].registrationUnavailable}
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {lang === "mn"
              ? `${title} арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.`
              : `Registration is not currently available for ${title}.`}
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
            {eventRegistrationPageCopy[lang].backToEvent}
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
      lang={eventRegistrationPageCopy[lang].en}
    />
  );
}
