import GalleryItem from "../components/GalleryItem";
import {events} from "../static_gallery"
import { useParams } from "react-router-dom";;

export default function EventPage() {
  const { id } = useParams();
  const event = events.find(e => e.id === id); 

  if (!event) {
    return <p className="text-center mt-10 text-xl">Event not found</p>;
  }

  return <GalleryItem {...event} />;
}