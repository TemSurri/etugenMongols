import LightCard from "./LightCard";

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
  );
}