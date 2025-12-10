import {events, getCardInfos} from "../static_gallery";

const eventItems = getCardInfos(events);

export default function Gallery() {
  return (
    <section id="gallery" className="py-8 bg-white relative overflow-hidden">

      <div
        className="w-full h-3 bg-linear-to-r from-[#0033A0] via-[#D4AF37] to-[#0033A0]
        animate-slideDown shadow-md absolute top-0 left-0 z-40"
      />

      <h3 className="text-center text-3xl sm:text-4xl font-bold mb-6 text-[#0033A0] uppercase">
        Event Gallery
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
                src={`/event_assets/${item.img}`}
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

      <div
        className="w-full h-3 bg-linear-to-r from-[#0033A0] via-[#D4AF37] to-[#0033A0]
        animate-slideUp shadow-md absolute bottom-0 left-0 z-40"
      />

    </section>
  );
} 
