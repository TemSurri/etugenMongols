type EventTicketInfoProps = {
  lang: "mn" | "en";
  descriptionTicket?: string;
  descriptionTicketEn?: string;
};

export default function EventTicketInfo({
  lang,
  descriptionTicket,
  descriptionTicketEn,
}: EventTicketInfoProps) {
  const activeTicketInfo =
    lang === "mn" ? descriptionTicket || "" : descriptionTicketEn || "";

  const hasTicketInfo = activeTicketInfo.trim().length > 0;

  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-black/45">
        Ticket Info
      </h2>

      <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-black/74">
        {hasTicketInfo ? activeTicketInfo : "No ticket information listed yet."}
      </div>
    </section>
  );
}