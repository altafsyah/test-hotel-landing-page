import { useState, useEffect, useCallback } from "react";
import { type IconName, Icon } from "./ui/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { ButtonNavigationSlider } from "./button-navigation-slider";

const items = [
  {
    icon: "swimming-pool",
    title: "Sky Infinity Pool",
    desc: "Experience the sensation of swimming in our 25-meter heated pool that appears to float directly into the rugged Dolomite peaks.",
  },
  {
    icon: "wine",
    title: "Forest-to-Table Dining",
    desc: "Indulge in 5-course gourmet dinners featuring organic ingredients sourced daily from our own gardens and local Alpine farmers",
  },
  {
    icon: "flower-lotus",
    title: "Vitalis Panoramic Spa",
    desc: "Recharge in our panoramic saunas and enjoy authentic herbal treatments inspired by ancient Alpine healing traditions.",
  },
  {
    icon: "ski",
    title: "Ski-In / Ski-Out Access",
    desc: "Enjoy seamless access to the Dolomiti Superski slopes directly from the hotel's ski room—no shuttles, no waiting.",
  },
  {
    icon: "bike",
    title: "E-Bike & Hiking Hub",
    desc: "Explore the mountains with ease using our premium fleet of e-bikes and professional hiking gear available exclusively for guests.",
  },
  {
    icon: "yoga",
    title: "Mindful Yoga Studio",
    desc: "Find your inner peace in our glass-walled studio overlooking the pine forest, offering daily guided meditation and yoga sessions.",
  },
];

function AmenitiesCard({
  icon,
  title,
  description,
}: {
  icon: IconName;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-brand-surface rounded-xl p-4 flex-1">
      <div className="size-14 bg-white rounded-lg flex items-center justify-center">
        <Icon name={icon} className="text-brand-accent size-10" />
      </div>
      <div className="mt-6">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function Amenities() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section id="amenities" className="py-20">
      <div className="mx-auto container px-4 flex flex-col items-center text-center">
        <h3>- Amenities -</h3>
        <h2 className="mt-3">Everything you'd hope for, and more.</h2>
      </div>
      <div className="sm:hidden">
        <Carousel className="mt-10" setApi={setApi}>
          <CarouselContent className="-ml-4">
            {items.map((it) => (
              <CarouselItem key={it.title} className="pl-8 pr-4 flex flex-col">
                <AmenitiesCard
                  title={it.title}
                  description={it.desc}
                  icon={it.icon as IconName}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-6">
          <ButtonNavigationSlider
          scrollPrev={() => api?.scrollPrev()}
          scrollNext={() => api?.scrollNext()}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
        </div>
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6 container mx-auto px-4 mt-10">
        {items.map((it) => (
          <AmenitiesCard
            key={it.title}
            title={it.title}
            description={it.desc}
            icon={it.icon as IconName}
          />
        ))}
      </div>
    </section>
  );
}
