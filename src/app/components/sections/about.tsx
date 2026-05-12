import { useCallback, useEffect, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonNavigationSlider } from "@/app/components/ui/button-navigation-slider";

const slides = [
  { src: "/images/image-1.jpg", alt: "Azure Bay Resort" },
  { src: "/images/image-2.jpg", alt: "Azure Bay Resort" },
  { src: "/images/image-3.jpg", alt: "Azure Bay Resort" },
  { src: "/images/image-4.jpg", alt: "Azure Bay Resort" },
  { src: "/images/image-5.jpg", alt: "Azure Bay Resort" },
  { src: "/images/image-6.jpg", alt: "Azure Bay Resort" },
];

export function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    startIndex: 1,
    breakpoints: {
      "(min-width: 768px)": { align: "start" },
    },
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
      <div className="px-4 container mx-auto text-center flex flex-col items-center text-brand-text-primary md:text-left md:items-start">
        <h3>- Our Heritage -</h3>
        <h2 className="mt-3">Nature, Design, and Soul</h2>
        <div className="md:flex md:gap-32 w-full mt-6 md:mt-3 items-start">
          <p className="">
            Born from a passion for architecture and deep respect for the Alpine
            landscape, L'Aura is more than a hotel—it's a private retreat where
            every window frames a masterpiece of nature.
          </p>
          <div className="hidden md:flex md:items-end md:shrink-0">
            <ButtonNavigationSlider
              scrollPrev={scrollPrev}
              scrollNext={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="overflow-hidden">
          <div ref={emblaRef} className="overflow-visible">
            <div className="flex">
              {slides.map((slide, i) => (
                <div key={i} className="flex-none basis-[85%] md:basis-[45%] px-3">
                  <div className="w-full aspect-square md:aspect-[3/2] bg-slate-300 relative overflow-hidden">
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
        <div className="md:hidden mt-6">
          <ButtonNavigationSlider
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
          />
        </div>
      </div>
    </section>
  );
}
