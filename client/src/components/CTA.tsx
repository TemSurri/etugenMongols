import heroBg from "../assets/landingpage.webp";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-24 text-center text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
  
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative px-6 max-w-3xl mx-auto">
        <h3 className="text-4xl font-extrabold tracking-tight uppercase">
          Join Our Community
        </h3>

        <div className="w-48 h-0.5 bg-white/60 mx-auto mt-4 mb-6 rounded-full"></div>

        <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-10">
          Become part of a movement dedicated to preserving the traditions,
          values, and identity of the Mongolian people.
        </p>
        
        <a
          href="#contact-form"
          className="
            inline-block px-10 py-4
            text-lg font-semibold uppercase tracking-wide
            text-white
            bg-black/40 backdrop-blur-sm
            border border-white/30
            hover:bg-black/60 hover:border-[#293305]
            transition duration-300
          "
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
