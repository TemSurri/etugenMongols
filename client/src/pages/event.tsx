import { useParams } from "react-router-dom";
import EventView from "../components/event/EventView";
import { events } from "../static_events";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return <p className="mt-10 text-center text-xl">Event not found</p>;
  }

  return <EventView event={event} />;
}