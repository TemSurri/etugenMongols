type GalleryInfoCardProps = {
  title: string;
  sectionTitle?: string;
  description?: string;
  eventDescription?: string;
};

export default function GalleryInfoCard({
  title,
  sectionTitle,
  description,
  eventDescription,
}: GalleryInfoCardProps) {
  return (
    <div className="space-y-8 rounded-2xl border border-[#d8caa5]/70 bg-white/70 p-6 shadow-lg backdrop-blur">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[#9a7b26]">
          {sectionTitle || "Gallery Section"}
        </div>

        <h2 className="mt-2 text-xl font-semibold text-[#27301d]">
          {title}
        </h2>
      </div>

      {description && (
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-[#9a7b26]">
            Section Summary
          </div>

          <p className="text-sm leading-7 text-[#4e593c]/85">{description}</p>
        </div>
      )}

      {eventDescription && (
        <div className="space-y-2 border-t border-[#d8caa5]/70 pt-5">
          <div className="text-[11px] uppercase tracking-widest text-[#9a7b26]">
            Event Summary
          </div>

          <p className="text-sm leading-7 text-[#4e593c]/85">
            {eventDescription}
          </p>
        </div>
      )}
    </div>
  );
}