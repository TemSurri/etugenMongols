"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.webp";
import { events, getEventLink } from "../../static_events";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61584273744310";
const CONTACT_EMAIL = "calgarymongolians@gmail.com";

type Lang = "en" | "mn";

type FooterProps = {
  lang: Lang;
};

const FOOTER_COPY = {
  en: {
    community: "Calgary Mongolian Community",
    slogan: "Preserving heritage through culture, language, and tradition.",
    description:
      "Etugen Mongols is a Calgary-based non-profit organization focused on building community, supporting cultural programs, and empowering women to thrive.",
    navigation: "Navigation",
    connect: "Connect",
    contactUs: "Contact Us",
    featuredEvent: "Featured Event",
    viewEvent: "View Event",
    moreEvents: "More Events",
    noEvents: "New community events will be announced soon.",
    rights: "All rights reserved.",
    nav: {
      about: "About",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
    },
  },
  mn: {
    community: "Калгари дахь Монгол нийгэмлэг",
    slogan: "Соёл, хэл, уламжлалаараа дамжуулан өв соёлоо хадгална.",
    description:
      "Этүгэн Монголчууд нь Калгари хотод төвтэй ашгийн бус байгууллага бөгөөд хамтын нийгэмлэгийг бэхжүүлэх, соёлын хөтөлбөрүүдийг дэмжих, эмэгтэйчүүдийг хөгжихөд дэмжлэг үзүүлэх зорилготой.",
    navigation: "Цэс",
    connect: "Холбогдох",
    contactUs: "Холбогдох",
    featuredEvent: "Онцлох арга хэмжээ",
    viewEvent: "Арга хэмжээг үзэх",
    moreEvents: "Бусад арга хэмжээ",
    noEvents: "Шинэ арга хэмжээнүүд удахгүй зарлагдана.",
    rights: "Бүх эрх хуулиар хамгаалагдсан.",
    nav: {
      about: "Бидний тухай",
      events: "Арга хэмжээ",
      gallery: "Зургийн цомог",
      contact: "Холбоо барих",
    },
  },
} as const;

/*
  Shared link styles.
  This keeps the JSX cleaner and makes future style edits easier.
*/
const footerTextLinkClassName =
  "w-fit text-sm text-[#4e593c]/78 transition-colors hover:text-[#9a7b26]";

const footerCtaClassName =
  "inline-flex border border-[#b39135]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#27301d]/88 transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]";

function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const featuredEvent = events[0] ?? null;
  const copy = FOOTER_COPY[lang];

  const footerNavItems = [
    { label: copy.nav.about, to: "/about" },
    { label: copy.nav.events, to: "/events" },
    { label: copy.nav.gallery, to: "/gallery" },
    { label: copy.nav.contact, to: "/contact" },
  ] as const;

  return (
    <footer className="border-t border-[#d8caa5]/55 bg-[#fffaf0] text-[#27301d]">
      <div
        className="
          mx-auto
          grid max-w-7xl gap-12
          px-6 py-14
          md:grid-cols-[1.2fr_0.75fr_1fr]
          md:px-10
          lg:px-12
          lg:py-16
        "
      >
        {/* Brand section */}
        <section aria-labelledby="footer-brand-heading">
          <Link
            to="/"
            className="inline-flex items-center gap-4 transition-opacity hover:opacity-85"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="Etugen Mongols logo"
              loading="lazy"
              decoding="async"
              className="h-14 w-14 object-contain"
            />

            <div>
              <p
                id="footer-brand-heading"
                className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7b26]/90"
              >
                Etugen Mongols
              </p>

              <p className="mt-1 text-sm text-[#4e593c]/58">
                {copy.community}
              </p>
            </div>
          </Link>

          <h2 className="mt-7 max-w-sm text-2xl font-semibold leading-snug tracking-tight text-[#27301d]">
            {copy.slogan}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#4e593c]/72">
            {copy.description}
          </p>
        </section>

        {/* Navigation and contact section */}
        <section aria-labelledby="footer-navigation-heading">
          <h3
            id="footer-navigation-heading"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e593c]/55"
          >
            {copy.navigation}
          </h3>

          <nav
            className="mt-5 flex flex-col gap-3"
            aria-label="Footer navigation"
          >
            {footerNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={footerTextLinkClassName}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e593c]/55">
              {copy.connect}
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={footerTextLinkClassName}
              >
                {CONTACT_EMAIL}
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={footerTextLinkClassName}
              >
                Facebook
              </a>
            </div>

            <Link to="/contact" className={`mt-5 ${footerCtaClassName}`}>
              {copy.contactUs}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>

        {/* Featured event section */}
        <section aria-labelledby="footer-featured-event-heading">
          <h3
            id="footer-featured-event-heading"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e593c]/55"
          >
            {copy.featuredEvent}
          </h3>

          {featuredEvent ? (
            <>
              <Link
                to={getEventLink(featuredEvent)}
                className="
                  group mt-5 block
                  border border-[#d8caa5]/65
                  bg-white/62
                  p-4
                  shadow-[0_16px_42px_rgba(88,72,38,0.12)]
                  transition-colors
                  hover:border-[#b39135]/45
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#b39135]/70
                "
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#efe2bf]/65">
                  <img
                    src={`/upcoming_event_assets/${featuredEvent.image}`}
                    alt={featuredEvent.title}
                    loading="lazy"
                    decoding="async"
                    className="
                      absolute inset-0
                      h-full w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />
                </div>

                <div className="pt-4">
                  <h4 className="text-base font-semibold leading-snug text-[#27301d]">
                    {featuredEvent.title}
                  </h4>

                  <div className="mt-2 space-y-1 text-sm leading-6 text-[#4e593c]/70">
                    <p>{featuredEvent.details.date}</p>
                    <p>{featuredEvent.details.time}</p>

                    {featuredEvent.details.location && (
                      <p className="line-clamp-1">
                        {featuredEvent.details.location}
                      </p>
                    )}
                  </div>

                  <p
                    className="
                      mt-4
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#9a7b26]/90
                      transition-colors
                      group-hover:text-[#27301d]
                    "
                  >
                    {copy.viewEvent} →
                  </p>
                </div>
              </Link>

              <Link
                to="/events"
                className="
                  mt-5 inline-flex
                  text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-[#9a7b26]/90
                  transition-colors
                  hover:text-[#27301d]
                "
              >
                {copy.moreEvents}
                <span className="ml-2">→</span>
              </Link>
            </>
          ) : (
            <p className="mt-5 text-sm leading-7 text-[#4e593c]/70">
              {copy.noEvents}
            </p>
          )}
        </section>
      </div>

      {/* Bottom legal strip */}
      <div className="border-t border-[#d8caa5]/55">
        <div
          className="
            mx-auto flex max-w-7xl flex-col gap-3
            px-6 py-6
            text-xs text-[#4e593c]/52
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
            lg:px-12
          "
        >
          <p>
            © {currentYear} Etugen Mongols. {copy.rights}
          </p>

          <p className="uppercase tracking-[0.2em]">{copy.community}</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);