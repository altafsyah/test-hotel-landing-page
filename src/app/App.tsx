import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Rooms } from "./components/rooms";
import { Amenities } from "./components/amenities";
import { Gallery } from "./components/gallery";
import { Faq } from "./components/faq";
import { Reserve } from "./components/reserve";
import { Footer } from "./components/footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Faq />
      <Reserve />
      <Footer />
      <Toaster />
    </>
  );
}
