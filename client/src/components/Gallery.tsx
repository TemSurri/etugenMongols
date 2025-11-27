import NadaamCover from "../assets/naadam.jpg";

const eventItems = [
  {
    img: NadaamCover,
    title: "Naadam Festival",
    desc: "Traditional games, wrestling, archery, and horse racing — our biggest cultural celebration.",
    link: "/naadam"
  },
  {
    img: "/gallery/christmas.jpg",
    title: "Christmas Celebration",
    desc: "A festive gathering that blends Mongolian warmth with holiday cheer, music, family, and joy.",
    link: "/christmas"
  },
  {
    img: "/gallery/newyear.jpg",
    title: "New Year Gathering",
    desc: "Celebrate the start of a new year with Mongolian food, dancing, performances, and unity.",
    link: "/newyear"
  },
];

export default function Gallery() {
  return (
   <section id="gallery"  className="py-20 bg-white">
      <h3 className="text-center text-4xl font-bold mb-12 text-[#0033A0] uppercase tracking-wide">
        Our Yearly Events
      </h3>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
        {eventItems.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white border border-gray-200"
          >
            <img
              src={item.img}
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-5">
              <h4 className="text-2xl font-semibold text-[#0033A0] group-hover:text-[#D4AF37] transition">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
