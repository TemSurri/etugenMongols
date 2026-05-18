type GalleryHeaderProps = {
  title: string;
  date?: string;
  location?: string;
};

export default function GalleryHeader({
  title,
  date,
  location,
}: GalleryHeaderProps) {
  return (
    <header className="max-w-3xl mb-10">
      <h1 className="text-3xl sm:text-4xl font-semibold uppercase tracking-wider text-black">
        {title}
      </h1>

      <div className="mt-3 flex gap-3 text-[11px] uppercase tracking-widest text-black/60">
        {date && <span>{date}</span>}
        {location && <span>• {location}</span>}
      </div>
    </header>
  );
}