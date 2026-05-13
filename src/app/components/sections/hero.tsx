import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar as CalendarPicker } from "@/app/components/ui/calendar";
import { format } from "date-fns";
import { useBooking } from "@/app/context/booking-context";
import { useIsMobile } from "@/app/components/ui/use-mobile";
import { Stepper } from "@/app/components/ui/booking-fields";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaNavigation } from "@/app/components/ui/use-embla-navigation";
import { Icon } from "../ui/icon";

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/image-5.jpg",
  "/images/image-7.jpg",
  "/images/image-2.jpg",
];

export function Hero() {
  const { guests, setGuests, dateRange, setDateRange } = useBooking();
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { scrollPrev, scrollNext } = useEmblaNavigation(emblaApi);

  const totalGuests = guests.adults + guests.children;
  const guestLabel =
    totalGuests > 0
      ? `${totalGuests} ${totalGuests === 1 ? "guest" : "guests"}`
      : "Number of guests";

  const dateLabel = (() => {
    if (!dateRange?.from) return "Select date";
    if (!dateRange.to) return format(dateRange.from, "MMM d");
    return `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d")}`;
  })();

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <header className="text-white absolute left-0 top-0 z-10 w-full">
        <nav className="px-4 md:px-10 py-3 flex justify-between items-center">
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
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("reserve")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex justify-center items-center py-3 px-4 rounded-lg  bg-black/15 ring ring-white/20 backdrop-blur-lg"
          >
            Book Now
          </button>
        </nav>
      </header>
      <div ref={emblaRef} className="absolute inset-0 h-full w-full overflow-hidden">
        <div className="flex h-full">
          {HERO_IMAGES.map((src, i) => (
            <div key={src} className="relative shrink-0 grow-0 basis-full h-full">
              <ImageWithFallback
                src={src}
                alt={`Azure Bay Resort ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-11 flex items-center justify-center bg-black/20 backdrop-blur-3xl text-white"
      >
        <Icon name="arrow-left" className="size-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-11 flex items-center justify-center bg-black/20 backdrop-blur-3xl text-white"
      >
        <Icon name="arrow-right" className="size-5" />
      </button>

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 from-0% via-transparent to-black/50 to-70%" />
      <div className="px-2 pb-2 md:pb-5 absolute bottom-0 left-0 w-full flex flex-col items-center">
        <div className="container mx-auto md:w-fit">
          <h1 className="font-normal text-white text-center">
            The Silence of the Alps, Redefined.
          </h1>
          <div className="text-nowrap bg-[#25262626]/15 ring ring-white/15 w-full mt-4 rounded-xl overflow-hidden backdrop-blur-3xl text-white md:grid md:grid-cols-3">
            <div className="relative md:after:content-[''] md:after:absolute md:after:bg-white/20 md:after:right-0 md:after:top-4 md:after:bottom-4 md:after:w-px">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex relative justify-between items-center p-4 w-full h-full"
                  >
                    <Icon name="users" className="shrink-0 size-6" />
                    <div className="grow mx-4 text-left">
                      <span className="opacity-70 text-xs uppercase tracking-widest">
                        GUESTS
                      </span>
                      <p>{guestLabel}</p>
                    </div>
                    <Icon name="chevron-down" className="shrink-0 size-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] md:w-64 p-4"
                  align="start"
                >
                  <Stepper
                    label="Adults"
                    sublabel="Ages 13+"
                    value={guests.adults}
                    min={1}
                    max={8}
                    onChange={(v) => setGuests({ ...guests, adults: v })}
                  />
                  <div className="my-3 h-px bg-border" />
                  <Stepper
                    label="Children"
                    sublabel="Ages 0–12"
                    value={guests.children}
                    min={0}
                    max={6}
                    onChange={(v) => setGuests({ ...guests, children: v })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative md:after:content-[''] md:after:absolute md:after:bg-white/20 md:after:right-0 md:after:top-4 md:after:bottom-4 md:after:w-px">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex relative justify-between items-center p-4 w-full h-full"
                  >
                    <Icon name="calendar" className="shrink-0 size-6" />
                    <div className="grow mx-4 text-left">
                      <span className="opacity-70 text-xs uppercase tracking-widest">
                        ARRIVAL & DEPARTURE
                      </span>
                      <p>{dateLabel}</p>
                    </div>
                    <Icon name="chevron-down" className="shrink-0 size-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] md:w-auto p-0"
                  align="start"
                >
                  <CalendarPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    fromDate={new Date()}
                    numberOfMonths={isMobile ? 1 : 2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("reserve")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#A49781] w-full py-3 px-8 text-white"
            >
              REQUEST
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
