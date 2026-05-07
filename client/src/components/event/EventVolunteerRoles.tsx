import type { Listing } from "../../static_events";

type EventVolunteerRolesProps = {
  lang: "mn" | "en";
  whoWeWant: Listing[];
};

export default function EventVolunteerRoles({
  lang,
  whoWeWant,
}: EventVolunteerRolesProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-black/45">
        Volunteer Roles
      </h2>

      <div className="mt-4 space-y-3">
        {whoWeWant.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="rounded-xl border border-black/8 bg-black/[0.025] p-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-black/72">
              {lang === "mn" ? item.title_mn : item.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-black/66">
              {item.description}
            </p>

            {item.contact && (
              <p className="mt-3 border-t border-black/8 pt-2 text-xs text-black/52">
                <span className="uppercase tracking-[0.14em]">Contact:</span>{" "}
                {item.contact}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}