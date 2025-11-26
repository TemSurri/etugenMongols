export default function Hero() {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="bg-black/60 p-10 rounded-xl text-center text-white">
        <h2 className="text-5xl font-bold mb-4">
          Preserving Mongolian Heritage
        </h2>
        <p className="text-xl max-w-xl mx-auto">
          Celebrating the spirit, history, and unity of the Mongol people.
        </p>
      </div>
    </section>
  );
}
