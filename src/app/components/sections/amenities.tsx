import useEmblaCarousel from "embla-carousel-react";
import { type IconName, Icon } from "@/app/components/ui/icon";
import { ButtonNavigationSlider } from "@/app/components/ui/button-navigation-slider";
import { useEmblaNavigation } from "@/app/components/ui/use-embla-navigation";

const items: Array<{ icon: IconName; title: string; desc: string }> = [
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
      <div className="mt-6 text-brand-text-primary">
        <h4>{title}</h4>
        <p className="opacity-70 mt-3">{description}</p>
      </div>
    </div>
  );
}

export function Amenities() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useEmblaNavigation(emblaApi);

  return (
    <section id="amenities" className="py-20">
      <div className="px-4 md:px-10 flex flex-col items-center text-center">
        <h3>- Amenities -</h3>
        <h2 className="mt-3">Everything you'd hope for, and more.</h2>
      </div>
      <div className="sm:hidden">
        <div className="overflow-hidden mt-10" ref={emblaRef}>
          <div className="flex -ml-4">
            {items.map((it) => (
              <div
                key={it.title}
                className="pl-8 pr-4 flex flex-col min-w-0 flex-[0_0_100%]"
              >
                <AmenitiesCard
                  title={it.title}
                  description={it.desc}
                  icon={it.icon}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <ButtonNavigationSlider
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
          />
        </div>
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6 px-4 md:px-10 mt-10">
        {items.map((it) => (
          <AmenitiesCard
            key={it.title}
            title={it.title}
            description={it.desc}
            icon={it.icon}
          />
        ))}
      </div>
    </section>
  );
}
