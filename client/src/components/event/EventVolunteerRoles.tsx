import LightCard from "./LightCard";

type VolunteerItem = {
  title: string;
  description: string;
  contact?: string;
};

type EventVolunteerRolesProps = {
  whoWeWant: VolunteerItem[];
};

export default function EventVolunteerRoles({
  whoWeWant,
}: EventVolunteerRolesProps) {
  const hasVolunteerInfo = whoWeWant.length > 0;

  return (
    <LightCard
      title="Volunteer Roles"
      className="md:col-span-6 lg:col-span-12"
    >
      {hasVolunteerInfo ? (
        <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
          {whoWeWant.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-sm border border-black/8 bg-black/0.02 px-3 py-3 sm:px-4 sm:py-4"
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
  );
}