import { Icon } from "@/app/components/ui/icon";
import { links, socials } from "@/data/footer";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-brand-text-primary text-white px-4 py-20"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* brand */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start md:col-span-2">
          <a href="/">
            <img src="/logo-ipsum.svg" className="h-20 w-full" />
          </a>
          <p className="mt-6 md:mt-10">
            San Valentino, <br />
            South Tyrol, Italy.
          </p>
        </div>
        {/* links */}
        <div className="grid grid-cols-2">
          {links.map((group, i) => (
            <div
              key={group.title}
              className={
                i === links.length - 1
                  ? "place-self-end md:place-self-start"
                  : ""
              }
            >
              <h5>{group.title}</h5>
              <ul className="space-y-5 mt-5 opacity-80">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.url}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* contact */}
        <div>
          <h5>Contact</h5>
          <div className="flex gap-3 items-center mt-5 py-3 px-4 rounded-md ring ring-white/20">
            <Icon name="phone" className="size-6" />
            <span className="grow"> +43 123456789</span>
            <button
              onClick={() => copyToClipboard("+43 123456789")}
              className="size-5 text-white/40 hover:text-white transition-colors"
            >
              <Icon name="copy" />
            </button>
          </div>
          <div className="flex gap-3 items-center mt-5 py-3 px-4 rounded-md ring ring-white/20">
            <Icon name="mail" className="size-6" />
            <span className="grow"> info@hotel.com</span>
            <button
              onClick={() => copyToClipboard("info@hotel.com")}
              className="size-5 text-white/40 hover:text-white transition-colors"
            >
              <Icon name="copy" />
            </button>
          </div>
          <ul className="mt-5 flex gap-5 items-center">
            {socials.map((item) => (
              <li key={item.alt}>
                <a
                  aria-label={item.alt}
                  href={item.url}
                  className="size-8 rounded-md flex justify-center items-center bg-white/20 text-white"
                >
                  <Icon name={item.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto border-t border-t-white/10 mt-16 pt-5 md:flex items-center justify-between gap-6">
        <h6>© 2026 Hotel Ipsum</h6>
        <div className="mt-5 md:mt-0">
          <p>Design and Code by</p>
          <a href="" className="block mt-3">
            <img src="/alpinads.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
}
