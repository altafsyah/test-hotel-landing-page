import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import {
  Bed,
  Users,
  Maximize,
  Waves,
  Tag,
  Bath,
  Coffee,
  Wind,
  Flame,
  TreePine,
  Droplets,
  User,
  Check,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { ButtonNavigationSlider } from "./button-navigation-slider";

type Room = {
  name: string;
  price: string;
  img: string;
  desc: string;
  size: string;
  beds: string;
  capacity: string;
  view: string;
  long: string;
  features: string[];
  gallery: string[];
};

const rooms: Room[] = [
  {
    name: "Garden Suite",
    price: "€420",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000",
    desc: "A serene retreat overlooking lemon groves with a private patio.",
    size: "42 m²",
    beds: "1 King bed",
    capacity: "2 guests",
    view: "Lemon grove",
    long: "Set on the lower terrace, the Garden Suite opens onto a private patio shaded by centuries-old lemon trees. The interior pairs lime-washed walls with handmade Vietri tile and a deep soaking tub.",
    features: [
      "Private patio",
      "Soaking tub",
      "Espresso bar",
      "Air conditioning",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200",
    ],
  },
  {
    name: "Sea View Suite",
    price: "€680",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000",
    desc: "Floor-to-ceiling windows framing the endless Tyrrhenian blue.",
    size: "55 m²",
    beds: "1 King bed",
    capacity: "2 guests",
    view: "Tyrrhenian Sea",
    long: "Perched on the cliff edge, the Sea View Suite is wrapped in floor-to-ceiling glass. Step out to a generous balcony with a daybed and dine al fresco as the sun melts into the horizon.",
    features: [
      "Cliffside balcony",
      "Outdoor daybed",
      "Rain shower",
      "Nespresso bar",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
  },
  {
    name: "Cliffside Villa",
    price: "€1,250",
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1000",
    desc: "A two-bedroom villa with private plunge pool and butler service.",
    size: "120 m²",
    beds: "2 King beds",
    capacity: "4 guests",
    view: "Panoramic coast",
    long: "Our flagship residence: two suites, a living room with a stone fireplace, and a wraparound terrace with a heated plunge pool. A dedicated butler curates every detail of your stay.",
    features: [
      "Heated plunge pool",
      "Butler service",
      "Stone fireplace",
      "Two bathrooms",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200",
      "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    ],
  },
];

export function Rooms() {
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
    <section id="rooms" className="bg-brand-surface py-20">
      <div className="">
        <div className="px-4 container mx-auto flex flex-col items-center text-center">
          <h3>- Your Private Sanctuary -</h3>
          <h2 className="mt-3">Designed for Deep Rest</h2>
          <p className="mt-6">
            Explore our selection of light-flooded suites, each featuring a
            private panoramic terrace and the soothing scent of natural pine
            wood.
          </p>
        </div>
        <Carousel className="mt-10" setApi={setApi} opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {rooms.map((r) => (
              <CarouselItem key={r.name} className="pl-8 pr-4">
                <RoomDrawer room={r} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <ButtonNavigationSlider
          scrollPrev={() => api?.scrollPrev()}
          scrollNext={() => api?.scrollNext()}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </div>
    </section>
  );
}

function featureIcon(feature: string) {
  const f = feature.toLowerCase();
  if (f.includes("tub") && !f.includes("bathroom"))
    return <Bath className="size-5 shrink-0" />;
  if (f.includes("bathroom")) return <Droplets className="size-5 shrink-0" />;
  if (f.includes("pool")) return <Waves className="size-5 shrink-0" />;
  if (f.includes("patio") || f.includes("balcony") || f.includes("terrace"))
    return <TreePine className="size-5 shrink-0" />;
  if (
    f.includes("espresso") ||
    f.includes("nespresso") ||
    f.includes("coffee") ||
    f.includes("bar")
  )
    return <Coffee className="size-5 shrink-0" />;
  if (f.includes("air") || f.includes("condition"))
    return <Wind className="size-5 shrink-0" />;
  if (f.includes("daybed")) return <Bed className="size-5 shrink-0" />;
  if (f.includes("shower")) return <Droplets className="size-5 shrink-0" />;
  if (f.includes("butler") || f.includes("service"))
    return <User className="size-5 shrink-0" />;
  if (f.includes("fireplace") || f.includes("fire"))
    return <Flame className="size-5 shrink-0" />;
  return <Check className="size-5 shrink-0" />;
}

function RoomDrawer({ room }: { room: Room }) {
  const [galleryApi, setGalleryApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onGallerySelect = useCallback(() => {
    if (!galleryApi) return;
    setCurrentSlide(galleryApi.selectedScrollSnap());
    setCanScrollPrev(galleryApi.canScrollPrev());
    setCanScrollNext(galleryApi.canScrollNext());
  }, [galleryApi]);

  useEffect(() => {
    if (!galleryApi) return;
    onGallerySelect();
    galleryApi.on("select", onGallerySelect);
    galleryApi.on("reInit", onGallerySelect);
    return () => {
      galleryApi.off("select", onGallerySelect);
      galleryApi.off("reInit", onGallerySelect);
    };
  }, [galleryApi, onGallerySelect]);

  return (
    <Drawer snapPoints={[0.85, 1]}>
      <DrawerTrigger asChild>
        <Card className="overflow-hidden p-0 cursor-pointer">
          <ImageWithFallback
            src={room.img}
            alt={room.name}
            className="h-64 w-full object-cover"
          />
          <CardContent className="space-y-3 p-6">
            <div className="flex items-baseline justify-between">
              <h3>{room.name}</h3>
              <div className="text-muted-foreground">
                <span>{room.price}</span> / night
              </div>
            </div>
            <p className="text-muted-foreground">{room.desc}</p>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col data-[vaul-drawer-direction=bottom]:max-h-svh">
        <div className="flex-1 overflow-y-auto min-h-0 container mx-auto px-4 pt-2">
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
            <Carousel
              setApi={setGalleryApi}
              opts={{ loop: true }}
              className="h-full"
            >
              <CarouselContent className="h-full ml-0">
                {room.gallery.map((img, i) => (
                  <CarouselItem key={i} className="pl-0">
                    <ImageWithFallback
                      src={img}
                      alt={`${room.name} ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <button
              onClick={() => galleryApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="absolute top-1/2 -translate-y-1/2 left-3 size-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => galleryApi?.scrollNext()}
              disabled={!canScrollNext}
              className="absolute top-1/2 -translate-y-1/2 right-3 size-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ArrowRight className="size-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => galleryApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all bg-white ${
                    i === currentSlide ? "w-4 opacity-100" : "w-1.5 opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="py-6 space-y-6 container mx-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle>{room.name}</DrawerTitle>
            </DrawerHeader>

            <div className="border-t border-b border-brand-border pt-4">
              <Stat icon={<Maximize className="size-5" />} value={room.size} />
              <Stat icon={<Users className="size-5" />} value={room.capacity} />
              <Stat icon={<Bed className="size-5" />} value={room.beds} />
              <Stat
                icon={<Tag className="size-5" />}
                value={`${room.price} / night`}
              />
            </div>

            <p className="text-muted-foreground">{room.long}</p>

            <div>
              <div className="mb-3 text-sm font-medium">Amenities:</div>
              <div className="space-y-3">
                {room.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    {featureIcon(f)}
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-medium">Included services:</div>
              <div className="space-y-3">
                {room.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="size-4 bg-brand-accent rounded-full text-white p-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="flex-row gap-3">
          <DrawerClose asChild>
            <button className="flex-1 rounded-lg ring ring-brand-text-primary/30 text-brand-text-primary py-3 2.5 h-12">
              CLOSE
            </button>
          </DrawerClose>
          <button
            className="flex-1 rounded-lg bg-brand-accent text-white py-3 2.5 h-12"
            onClick={() => {
              document
                .getElementById("reserve")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            RESERVE THIS SUITE
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3">
      {icon}
      <div>{value}</div>
    </div>
  );
}
