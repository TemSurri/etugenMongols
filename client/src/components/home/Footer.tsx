"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.webp";
import { events, getEventLink } from "../../static_events";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61584273744310";
const CONTACT_EMAIL = "calgarymongolians@gmail.com";

/*
  Footer navigation.
  Kept outside the component so this array is not recreated on every render.
*/
const FOOTER_NAV_ITEMS = [
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

/*
  Shared link styles.
  This keeps the JSX cleaner and makes future style edits easier.
*/
const footerTextLinkClassName =
  "w-fit text-sm text-[#f3efd9]/68 transition-colors hover:text-[#d6c77a]";

const footerCtaClassName =
  "inline-flex border border-[#d6c77a]/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3efd9]/88 transition-colors hover:border-[#f3efd9] hover:bg-[#f3efd9] hover:text-[#252817]";

function Footer() {
  const currentYear = new Date().getFullYear();
  const featuredEvent = events[0] ?? null;

  return (
    <footer className="border-t border-[#d6c77a]/12 bg-[#252817] text-[#f3efd9]">
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
        {/* 
          Brand section.
          This gives the footer a clear identity instead of only showing links.
        */}
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
                className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6c77a]/80"
              >
                Etugen Mongols
              </p>

              <p className="mt-1 text-sm text-[#f3efd9]/52">
                Calgary Mongolian Community
              </p>
            </div>
          </Link>

          <h2 className="mt-7 max-w-sm text-2xl font-semibold leading-snug tracking-tight text-[#f3efd9]">
            Preserving heritage through culture, language, and tradition.
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#f3efd9]/62">
            Etugen Mongols is a Calgary-based non-profit organization focused
            on building community, supporting cultural programs, and empowering
            women to thrive.
          </p>
        </section>

        {/* 
          Navigation and contact section.
          These are route links now, not scroll buttons.
        */}
        <section aria-labelledby="footer-navigation-heading">
          <h3
            id="footer-navigation-heading"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3efd9]/45"
          >
            Navigation
          </h3>

          <nav
            className="mt-5 flex flex-col gap-3"
            aria-label="Footer navigation"
          >
            {FOOTER_NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className={footerTextLinkClassName}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 
            Connect links.
            Email opens the user's mail app.
            Facebook opens in a new tab because it leaves the website.
          */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3efd9]/45">
              Connect
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
              Contact Us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>

        {/* 
          Featured event section.
          Pulls the first event from static_events so the footer stays automatic.
        */}
        <section aria-labelledby="footer-featured-event-heading">
          <h3
            id="footer-featured-event-heading"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3efd9]/45"
          >
            Featured Event
          </h3>

          {featuredEvent ? (
            <>
              <Link
                to={getEventLink(featuredEvent)}
                className="
                  group mt-5 block
                  border border-[#d6c77a]/12
                  bg-[#171a12]/55
                  p-4
                  shadow-[0_16px_42px_rgba(0,0,0,0.24)]
                  transition-colors
                  hover:border-[#d6c77a]/35
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#d6c77a]/70
                "
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
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
                  <h4 className="text-base font-semibold leading-snug text-[#f3efd9]">
                    {featuredEvent.title}
                  </h4>

                  <div className="mt-2 space-y-1 text-sm leading-6 text-[#f3efd9]/60">
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
                      text-[#d6c77a]/85
                      transition-colors
                      group-hover:text-[#f3efd9]
                    "
                  >
                    View Event →
                  </p>
                </div>
              </Link>

              <Link
                to="/events"
                className="
                  mt-5 inline-flex
                  text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-[#d6c77a]/85
                  transition-colors
                  hover:text-[#f3efd9]
                "
              >
                More Events
                <span className="ml-2">→</span>
              </Link>
            </>
          ) : (
            <p className="mt-5 text-sm leading-7 text-[#f3efd9]/60">
              New community events will be announced soon.
            </p>
          )}
        </section>
      </div>

      {/* 
        Bottom legal strip.
        Kept separate so the main footer content has clear spacing.
      */}
      <div className="border-t border-[#d6c77a]/10">
        <div
          className="
            mx-auto flex max-w-7xl flex-col gap-3
            px-6 py-6
            text-xs text-[#f3efd9]/42
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
            lg:px-12
          "
        >
          <p>© {currentYear} Etugen Mongols. All rights reserved.</p>

          <p className="uppercase tracking-[0.2em]">
            Calgary Mongolian Community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);