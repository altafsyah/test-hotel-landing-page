import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Calendar, ChevronDown, Users, Minus, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar as CalendarPicker } from "@/app/components/ui/calendar";
import { Button } from "@/app/components/ui/button";
import { format } from "date-fns";
import { useBooking } from "@/app/context/booking-context";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function Hero() {
  const { guests, setGuests, dateRange, setDateRange } = useBooking();
  const isMobile = useIsMobile();

  const totalGuests = guests.adults + guests.children;
  const guestLabel = totalGuests > 0 ? `${totalGuests} ${totalGuests === 1 ? "guest" : "guests"}` : "Number of guests";

  const dateLabel = (() => {
    if (!dateRange?.from) return "Select date";
    if (!dateRange.to) return format(dateRange.from, "MMM d");
    return `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d")}`;
  })();

  return (
    <section className="relative h-screen md:h-[90dvh] w-full overflow-hidden">
      <header
        className="text-white absolute left-0 top-0 z-10 w-full"
      >
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
          <button
            type="button"
            onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
            className="flex justify-center items-center py-3 px-4 rounded-lg  bg-black/15 ring ring-white/20 backdrop-blur-lg"
          >
            Book Now
          </button>
        </nav>
      </header>
      <ImageWithFallback
        src="/images/hero-1.jpg"
        alt="Azure Bay Resort"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />

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
                  <button type="button" className="flex relative justify-between items-center p-4 w-full h-full">
                    <Users className="shrink-0 size-6" />
                    <div className="grow mx-4 text-left">
                      <span className="opacity-70 text-xs uppercase tracking-widest">GUESTS</span>
                      <p>{guestLabel}</p>
                    </div>
                    <ChevronDown className="shrink-0 size-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] md:w-64 p-4" align="start">
                  <HeroStepper
                    label="Adults"
                    sublabel="Ages 13+"
                    value={guests.adults}
                    min={1}
                    max={8}
                    onChange={(v) => setGuests({ ...guests, adults: v })}
                  />
                  <div className="my-3 h-px bg-border" />
                  <HeroStepper
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
                  <button type="button" className="flex relative justify-between items-center p-4 w-full h-full">
                    <Calendar className="shrink-0 size-6" />
                    <div className="grow mx-4 text-left">
                      <span className="opacity-70 text-xs uppercase tracking-widest">ARRIVAL & DEPARTURE</span>
                      <p>{dateLabel}</p>
                    </div>
                    <ChevronDown className="shrink-0 size-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] md:w-auto p-0" align="start">
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
              onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
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

function HeroStepper({
  label,
  sublabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div>{label}</div>
        <div className="text-xs text-muted-foreground">{sublabel}</div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-5 text-center tabular-nums">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
