"use client";

import { useMemo, useState, memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { EventItem } from "../static_events";
import landingImage from "../assets/landingpage.webp";

const SectionLabel = memo(function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="text-[10px] uppercase tracking-[0.2em] text-white/42">
      {children}
    </div>
  );
});

const DarkCard = memo(function DarkCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "border border-white/10 bg-white/[0.065] shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
        className,
      ].join(" ")}
    >
      <div className="h-full px-3 py-3 sm:px-4 sm:py-4">
        {title && (
          <div className="mb-2.5 flex items-center gap-2">
            <div className="h-px w-5 bg-white/16" />
            <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/74">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

const LightCard = memo(function LightCard({
  title,
  rightSlot,
  children,
  className = "",
}: {
  title?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "border border-black/8 bg-white/88 shadow-[0_10px_24px_rgba(0,0,0,0.08)]",
        className,
      ].join(" ")}
    >
      <div className="h-full px-3 py-3 sm:px-4 sm:py-4">
        {title && (
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-black/14" />
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-black/62">
                {title}
              </h2>
            </div>
            {rightSlot}
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

const InfoRow = memo(function InfoRow({
  label,
  value,
  light = false,
}: {
  label: string;
  value: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={[
        "grid grid-cols-[62px_1fr] gap-2 border-b pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[72px_1fr]",
        light ? "border-black/8" : "border-white/8",
      ].join(" ")}
    >
      <div
        className={[
          "text-[10px] uppercase tracking-[0.16em]",
          light ? "text-black/44" : "text-white/40",
        ].join(" ")}
      >
        {label}
      </div>
      <div
        className={[
          "text-[13px] leading-relaxed sm:text-sm",
          light ? "text-black/72" : "text-white/84",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
});

export default function Event({
  title,
  date,
  time,
  location,
  description,
  description_en,
  description_ticket,
  description_ticket_en,
  whoWeWant,
  contactEmail,
  contactPhone,
  onlinePay,
  donate,
}: EventItem) {
  const [lang, setLang] = useState<"mn" | "en">("mn");

  const activeOverview = lang === "mn" ? description : description_en;
  const activeTicketInfo =
    lang === "mn" ? description_ticket || "" : description_ticket_en || "";

  const googleMapsUrl = useMemo(() => {
    if (!location) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  }, [location]);

  const phoneList = useMemo(
    () => contactPhone?.filter(Boolean) ?? [],
    [contactPhone]
  );

  const hasGeneralContact = Boolean(contactEmail || phoneList.length > 0);
  const hasVolunteerInfo = whoWeWant.length > 0;
  const hasTicketInfo = activeTicketInfo.trim().length > 0;

  return (
    <article className="relative min-h-screen">
      {/* Background image layer */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingImage})` }}
      />

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-black/78" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),rgba(0,0,0,0.38))]" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-4">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-block text-[10px] uppercase tracking-[0.22em] text-white/68 transition hover:text-white"
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-12 lg:gap-4">
          {/* HEADER */}
          <DarkCard className="md:col-span-12">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <SectionLabel>Event</SectionLabel>

                <h1 className="mt-1.5 text-xl font-semibold uppercase leading-tight tracking-[0.06em] text-white sm:text-2xl lg:text-3xl">
                  {title}
                </h1>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <div className="border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/82">
                    {date}
                  </div>
                  <div className="border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/82">
                    {time}
                  </div>
                  {location && (
                    <div className="border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/82">
                      {location}
                    </div>
                  )}
                </div>
              </div>

              {(onlinePay || donate) && (
                <div className="w-full lg:w-auto lg:max-w-[360px]">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
                    {onlinePay && (
                      <div className="border border-white/10 bg-white/[0.04] px-3 py-2.5">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                          Payment
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                          Online payment will appear here.
                        </div>
                      </div>
                    )}

                    {donate && (
                      <div className="border border-white/10 bg-white/[0.04] px-3 py-2.5">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                          Donate
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                          Donation support will appear here.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DarkCard>

          {/* OVERVIEW */}
          <LightCard
            title="Description"
            className="md:col-span-7 lg:col-span-6"
            rightSlot={
              <button
                onClick={() => setLang((prev) => (prev === "mn" ? "en" : "mn"))}
                className="border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-black/68 transition hover:bg-black/[0.06] hover:text-black"
              >
                {lang === "mn" ? "English" : "Монгол"}
              </button>
            }
          >
            <div className="border-b border-black/8 pb-2 text-[11px] uppercase tracking-[0.14em] text-black/40">
              Overview
            </div>

            <div className="mt-3 h-[280px] overflow-y-auto pr-1 text-[13px] leading-relaxed whitespace-pre-line text-black/76 sm:h-[340px] sm:text-sm lg:h-[420px]">
              {activeOverview}
            </div>
          </LightCard>

          {/* QUICK INFO */}
          <DarkCard title="Quick Info" className="md:col-span-5 lg:col-span-3">
            <div className="space-y-2">
              <InfoRow label="Date" value={date} />
              <InfoRow label="Time" value={time} />
              {location && <InfoRow label="Location" value={location} />}

              {googleMapsUrl && (
                <div className="pt-0.5">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/76 underline underline-offset-4 transition hover:text-white sm:text-sm"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              )}
            </div>

            <div className="mt-5 border-t border-white/12 pt-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-5 bg-white/18" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/52">
                  General Contact
                </div>
              </div>

              <div className="space-y-2">
                {contactEmail && (
                  <InfoRow
                    label="Email"
                    value={
                      <a
                        href={`mailto:${contactEmail}`}
                        className="break-all transition hover:text-white"
                      >
                        {contactEmail}
                      </a>
                    }
                  />
                )}

                {phoneList.map((phone, index) => (
                  <InfoRow
                    key={`${phone}-${index}`}
                    label={index === 0 ? "Phone" : ""}
                    value={phone}
                  />
                ))}

                {!hasGeneralContact && (
                  <div className="text-[13px] text-white/60 sm:text-sm">
                    No general contact information yet.
                  </div>
                )}
              </div>
            </div>
          </DarkCard>

          {/* TICKET & PAYMENT PROCESS */}
          <LightCard
            title="Ticket & Payment Process"
            className="md:col-span-6 lg:col-span-3 self-start h-fit"
          >
            <div className="h-[280px] overflow-y-auto pr-1 text-[13px] leading-relaxed whitespace-pre-line text-black/72 sm:h-[340px] sm:text-sm lg:h-[465px]">
              {hasTicketInfo
                ? activeTicketInfo
                : "No ticket or payment details yet."}
            </div>
          </LightCard>

          {/* VOLUNTEER ROLES */}
          <LightCard
            title="Volunteer Roles"
            className="md:col-span-6 lg:col-span-12"
          >
            {hasVolunteerInfo ? (
              <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
                {whoWeWant.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-sm border border-black/8 bg-black/[0.02] px-3 py-3 sm:px-4 sm:py-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-px w-4 bg-black/16" />
                      <div className="text-[10px] uppercase tracking-[0.16em] text-black/46">
                        Volunteer Role
                      </div>
                    </div>

                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/68">
                      {item.title}
                    </div>

                    <div className="mt-2 text-[13px] leading-relaxed text-black/72 sm:text-sm">
                      {item.description}
                    </div>

                    {item.contact && (
                      <div className="mt-3 border-t border-black/8 pt-2 text-[12px] text-black/56 sm:text-[13px]">
                        <span className="uppercase tracking-[0.12em] text-black/42">
                          Contact
                        </span>{" "}
                        {item.contact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-black/56 sm:text-sm">
                No volunteer roles yet.
              </p>
            )}
          </LightCard>
        </div>
      </div>
    </article>
  );
}