type GalleryInfoCardProps = {
  title: string;
  description?: string;
  activities?: string[];
};

export default function GalleryInfoCard({
  title,
  description,
  activities = [],
}: GalleryInfoCardProps) {
  return (
    <div
      className="
        backdrop-blur-lg bg-white/65
        border border-white/40
        rounded-md
        shadow-lg
        ring-1 ring-white/30
        p-6 space-y-8
      "
    >
      <div className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-md">
        <iframe
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title={`${title} event video`}
          allowFullScreen
        />
      </div>

      {description && (
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-black/55">
            Event Summary
          </div>
          <div className="text-sm text-black/75 leading-relaxed">
            {description}
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-black/55">
            Activities & Amenities
          </div>
          <div className="max-h-36 overflow-y-auto pr-2 text-sm text-black/70 space-y-2">
            {activities.map((activity, index) => (
              <p key={`${activity}-${index}`}>{activity}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}