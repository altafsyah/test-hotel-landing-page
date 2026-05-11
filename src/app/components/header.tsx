export function Header() {
  return (
    <header className="text-white container mx-auto fixed left-0 top-0 z-50">
      <nav className="py-3 flex justify-between px-3 items-center">
        <a href="">
          <img src="/logo-ipsum.svg" />
        </a>
        <ul className="md:flex hidden">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
        <a className="flex justify-center items-center py-3 px-4 rounded-lg bg-black/15 ring ring-white/20 backdrop-blur-lg">
          Book Now
        </a>
      </nav>
    </header>
  );
}
