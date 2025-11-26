const images = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg"];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <h3 className="text-center text-4xl font-bold mb-10">Our Culture</h3>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-64 w-full object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
    </section>
  );
}
