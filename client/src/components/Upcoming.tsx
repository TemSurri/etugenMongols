import NadaamCover from "../assets/naadam.jpg";

const eventItems = [
  { img: NadaamCover, title: "Naadam Festival", desc: "Traditional games and celebration.", link: "/naadam" },
  { img: "/gallery/christmas.jpg", title: "Christmas Celebration", desc: "Warm festive holiday event.", link: "/christmas" },
  { img: "/gallery/newyear.jpg", title: "New Year Gathering", desc: "A joyful start to the year.", link: "/newyear" },
  { img: "/gallery/lunarnewyear.jpg", title: "Tsagaan Sar", desc: "Mongolian Lunar New Year.", link: "/tsagaansar" },
  { img: "/gallery/nomadsday.jpg", title: "Nomads Day", desc: "Celebrating nomadic culture.", link: "/nomadsday" }
];

export default function Upcoming() {
  return (
    <section id="upcoming" className="py-16 bg-white">
      <h3 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-[#0033A0] uppercase">
        Upcoming Events
      </h3>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none">
          {eventItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="
                min-w-[60%] sm:min-w-[260px] md:min-w-[300px]
                shrink-0 snap-start group
                rounded-xl overflow-hidden border border-gray-200 shadow
                bg-white hover:shadow-lg transition
              "
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="p-3">
                <h4 className="text-lg font-semibold text-[#0033A0] group-hover:text-[#D4AF37] transition">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs mt-2 leading-snug">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
