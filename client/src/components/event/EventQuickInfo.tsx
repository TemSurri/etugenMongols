import { useMemo } from "react";
import DarkCard from "./DarkCard";
import InfoRow from "./InfoRow";

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

  const phoneList = useMemo(() => contactPhone?.filter(Boolean) ?? [], [contactPhone]);

  const hasGeneralContact = Boolean(contactEmail || phoneList.length > 0);

  return (
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
  );
}