export function Header() {
  return (
    <header className="text-white fixed left-0 top-0 z-50 w-full">
      <nav className="container mx-auto py-3 flex justify-between px-3 items-center">
        <a href="">
          <img src="/logo-ipsum.svg" />
        </a>
        <ul className="md:flex hidden gap-6 items-center">
          <li>
            <a href="#rooms">ROOMS</a>
          </li>
          <li>
            <a href="#amenities">AMENITIES</a>
          </li>
          <li>
            <a href="#reserve">RESERVE</a>
          </li>
        </ul>
        <a className="flex justify-center items-center py-3 px-4 rounded-lg bg-black/15 ring ring-white/20 backdrop-blur-lg">
          Book Now
        </a>
      </nav>
    </header>
  );
}
