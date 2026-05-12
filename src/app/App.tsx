import { Hero } from "@/app/components/sections/hero";
import { About } from "@/app/components/sections/about";
import { Rooms } from "@/app/components/sections/rooms";
import { Amenities } from "@/app/components/sections/amenities";
import { Gallery } from "@/app/components/sections/gallery";
import { Faq } from "@/app/components/sections/faq";
import { Reserve } from "@/app/components/sections/reserve";
import { Footer } from "@/app/components/sections/footer";
import { Toaster } from "@/app/components/ui/sonner";
import { ReactLenis } from "lenis/react";
import { BookingProvider } from "@/app/context/booking-context";

export default function App() {
  return (
    <BookingProvider>
      <ReactLenis root />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Faq />
      <Reserve />
      <Footer />
      <Toaster />
    </BookingProvider>
  );
}
