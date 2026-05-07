import { useMemo } from "react";

type EventQuickInfoProps = {
  date: string;
  time: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string[];
};

export default function EventQuickInfo({
  date,
  time,
  location,
  contactEmail,
  contactPhone,
}: EventQuickInfoProps) {
  const googleMapsUrl = useMemo(() => {
    if (!location) return null;

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  }, [location]);

  const phoneList = contactPhone?.filter(Boolean) ?? [];
  const hasContact = Boolean(contactEmail || phoneList.length > 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/45">
        Quick Info
      </h2>

      <div className="mt-4 space-y-3">
        <InfoLine label="Date" value={date} />
        <InfoLine label="Time" value={time} />

        {location && (
          <InfoLine
            label="Location"
            value={
              <span>
                {location}
                {googleMapsUrl && (
                  <>
                    <br />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-white underline underline-offset-4"
                    >
                      Open in Google Maps →
                    </a>
                  </>
                )}
              </span>
            }
          />
        )}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/45">
          Contact
        </h3>

        <div className="mt-3 space-y-3">
          {contactEmail && (
            <InfoLine
              label="Email"
              value={
                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all underline underline-offset-4"
                >
                  {contactEmail}
                </a>
              }
            />
          )}

          {phoneList.map((phone, index) => (
            <InfoLine
              key={`${phone}-${index}`}
              label={index === 0 ? "Phone" : ""}
              value={phone}
            />
          ))}

          {!hasContact && (
            <p className="text-sm text-white/58">
              No contact information listed yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[78px_1fr] gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/38">
        {label}
      </div>

      <div className="text-sm leading-relaxed text-white/82">{value}</div>
    </div>
  );
}