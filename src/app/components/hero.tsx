import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, ChevronDown, MapPin, Users } from "lucide-react";
import { DateRangeField, GuestsField, type Guests } from "./booking-fields";
import type { DateRange } from "react-day-picker";

export function Hero() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });

  return (
    <section className="relative h-screen md:h-[90dvh] w-full overflow-hidden">
      <ImageWithFallback
        src="/images/hero-1.jpg"
        alt="Azure Bay Resort"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 from-0% via-transparent to-black/50 to-70%" />
      <div className="px-2 pb-2 md:pb-5 absolute bottom-0 left-0 w-full flex flex-col items-center">
        <div className="container mx-auto md:w-fit">
          <h1 className="font-normal text-white text-center">
            The Silence of the Alps, Redefined.
          </h1>
          <div className="text-nowrap bg-[#25262626]/15 ring ring-white/15 w-full mt-4 rounded-xl overflow-hidden backdrop-blur-3xl text-white md:flex">
            <div className="shrink-0 flex relative justify-between items-center p-4 md:w-fit">
              <Users className="shrink-0 size-6" />
              <div className="grow mx-4">
                <span className="opacity-70">Guest</span>
                <p>Number of guests</p>
              </div>
              <ChevronDown className="shrink-0 size-6" />
            </div>
            <div className="shrink-0 flex relative justify-between items-center p-4 md:w-fit">
              <Calendar className="shrink-0 size-6" />
              <div className="grow mx-4">
                <span className="opacity-70">Arrival & Departure</span>
                <p>Select date</p>
              </div>
              <ChevronDown className="shrink-0 size-6" />
            </div>
            <button className="shrink-0 bg-[#A49781] w-full py-3 px-8 text-white md:w-fit">
              REQUEST
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
