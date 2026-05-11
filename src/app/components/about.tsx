import { useCallback, useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonNavigationSlider } from "./button-navigation-slider";

const slides = [
  { src: "/images/hero-1.jpg", alt: "Azure Bay Resort" },
  { src: "/images/hero-1.jpg", alt: "Azure Bay Resort" },
  { src: "/images/hero-1.jpg", alt: "Azure Bay Resort" },
];

export function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    startIndex: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20" id="about">
      <div className="px-4 container mx-auto text-center flex flex-col items-center text-[#323232]">
        <h3>- Our Heritage -</h3>
        <h2 className="mt-3">Nature, Design, and Soul</h2>
        <p className="mt-6">
          Born from a passion for architecture and deep respect for the Alpine
          landscape, L'Aura is more than a hotel—it's a private retreat where
          every window frames a masterpiece of nature.
        </p>
      </div>
      <div className="mt-10">
        <div className="overflow-hidden">
          <div ref={emblaRef} className="overflow-visible">
            <div className="flex">
              {slides.map((slide, i) => (
                <div key={i} className="flex-none basis-[85%] px-3">
                  <div className="w-full aspect-square bg-slate-300 relative">
                    <ImageWithFallback
                      src={slide.src}
                      alt={slide.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ButtonNavigationSlider
          scrollPrev={scrollPrev}
          scrollNext={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </div>
    </section>
  );
}
