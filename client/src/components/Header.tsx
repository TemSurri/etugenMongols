export default function Header() {
  return (
    <header className="px-8 py-4 bg-black/70 text-white fixed w-full z-50 backdrop-blur">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          Etügen Mongols
        </h1>

        <nav className="hidden md:flex gap-6 text-lg">
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#gallery" className="hover:text-blue-400">Gallery</a>
          <a href="#contact" className="hover:text-blue-400">Join Us</a>
        </nav>
      </div>
    </header>
  );
}
