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
    <header className="mb-8 max-w-3xl">
      <h1 className="text-3xl font-semibold uppercase tracking-wider text-[#27301d] sm:text-4xl">
        {title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-3 text-[11px] uppercase tracking-widest text-[#4e593c]/70">
        {date && <span>{date}</span>}
        {location && <span>• {location}</span>}
      </div>
    </header>
  );
}