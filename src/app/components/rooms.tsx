import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CardContent } from "./ui/card";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { ButtonNavigationSlider } from "./button-navigation-slider";
import { Icon } from "./ui/icon";
import { useIsMobile } from "./ui/use-mobile";
import { type Room, rooms } from "../../data/rooms";

export function Rooms() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
    <section id="rooms" className="bg-brand-surface py-20">
      <div className="">
        <div className="px-4 container mx-auto flex flex-col items-center text-center text-brand-text-primary">
          <h3>- Your Private Sanctuary -</h3>
          <h2 className="mt-3">Designed for Deep Rest</h2>
          <p className="mt-6">
            Explore our selection of light-flooded suites, each featuring a
            private panoramic terrace and the soothing scent of natural pine
            wood.
          </p>
        </div>
        <div ref={emblaRef} className="overflow-hidden mt-10">
          <div className="flex items-stretch -ml-4 md:ml-0 md:mr-4">
            {rooms.map((r) => (
              <div
                key={r.name}
                className="min-w-0 shrink-0 grow-0 basis-full md:basis-[40%] pl-8 pr-4 md:pl-4 md:pr-0 h-full"
              >
                <RoomDetail room={r} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <ButtonNavigationSlider
            scrollPrev={() => emblaApi?.scrollPrev()}
            scrollNext={() => emblaApi?.scrollNext()}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
          />
        </div>
      </div>
    </section>
  );
}

function featureIcon(feature: string) {
  const f = feature.toLowerCase();
  if (f.includes("bathtub"))
    return <Icon name="bathtub" className="size-6 text-brand-accent" />;
  if (f.includes("wifi"))
    return <Icon name="wifi" className="size-6 text-brand-accent" />;
  if (f.includes("bar"))
    return <Icon name="wine" className="size-6 text-brand-accent" />;
}

const RoomTriggerCard = React.forwardRef<
  HTMLDivElement,
  { room: Room } & React.HTMLAttributes<HTMLDivElement>
>(({ room, ...props }, ref) => (
  <div
    ref={ref}
    className="bg-card text-card-foreground rounded-xl border overflow-hidden p-0 cursor-pointer h-full flex flex-col"
    {...props}
  >
    <div className="relative">
      <ImageWithFallback
        src={room.img}
        alt={room.name}
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-text-primary text-sm font-medium px-3 py-1 rounded-full">
        {room.price} / night
      </div>
    </div>
    <CardContent className="flex flex-col flex-1 gap-4 p-6">
      <div className="space-y-1">
        <h3>{room.name}</h3>
        <p className="text-muted-foreground text-sm">{room.desc}</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
        <div className="flex items-center gap-1.5">
          <Icon name="users" className="size-4" />
          <span>{room.capacity}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name="arrow-left-right" className="size-4" />
          <span>{room.size}</span>
        </div>
      </div>
      <button className="mt-auto w-full rounded-lg border border-brand-text-primary/30 text-brand-text-primary py-2.5 text-sm font-medium">
        SEE DETAILS
      </button>
    </CardContent>
  </div>
));
RoomTriggerCard.displayName = "RoomTriggerCard";

function RoomGallery({ room, className }: { room: Room; className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
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
    <div className={`rounded-lg relative overflow-hidden ${className ?? ""}`}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {room.gallery.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 h-full">
              <ImageWithFallback
                src={img}
                alt={`${room.name} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        className="absolute top-1/2 -translate-y-1/2 left-3 size-9 text-white bg-black/20 backdrop-blur-3xl flex items-center justify-center transition-opacity"
      >
        <Icon name="arrow-left" className="size-4" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-3 size-9 text-white bg-black/20 backdrop-blur-3xl flex items-center justify-center transition-opacity"
      >
        <Icon name="arrow-right" className="size-4" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {room.gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 w-4 rounded-full transition-all bg-white ${
              i === currentSlide ? "opacity-100" : "opacity-40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function RoomBody({ room }: { room: Room }) {
  return (
    <div className="space-y-6 relative flex-1 text-brand-text-primary">
      <div className="border-t border-b border-brand-border py-4 grid grid-cols-1 md:grid-cols-2">
        <Stat
          icon={<Icon name="arrow-left-right" className="size-5 text-brand-accent" />}
          value={room.size}
        />
        <Stat
          icon={<Icon name="users" className="size-5 text-brand-accent" />}
          value={room.capacity}
        />
        <Stat
          icon={<Icon name="bed" className="size-5 text-brand-accent" />}
          value={room.beds}
        />
        <Stat
          icon={<Icon name="tag" className="size-5 text-brand-accent" />}
          value={`${room.price} / night`}
        />
      </div>

      <p>{room.long}</p>

      <div>
        <div className="mb-3 text-sm font-medium">Amenities:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          {room.services.map((service) => (
            <div key={service} className="flex items-center gap-2.5">
              <Icon name="check-circle" className="shrink-0 size-4 text-brand-accent rounded-full" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReserveButton() {
  return (
    <button
      className="flex-1 rounded-lg bg-brand-accent text-white py-3 h-12"
      onClick={() => {
        document
          .getElementById("reserve")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      RESERVE THIS SUITE
    </button>
  );
}

function RoomDetail({ room }: { room: Room }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer snapPoints={[0.85, 1]}>
        <DrawerTrigger asChild>
          <RoomTriggerCard room={room} />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col data-[vaul-drawer-direction=bottom]:max-h-svh">
          <div className="flex-1 overflow-y-auto min-h-0 container mx-auto px-4 pt-2">
            <RoomGallery room={room} className="relative aspect-[4/3] w-full rounded-lg" />
            <div className="py-6 space-y-6 container mx-auto">
              <DrawerHeader className="p-0">
                <DrawerTitle>{room.name}</DrawerTitle>
              </DrawerHeader>
              <RoomBody room={room} />
            </div>
          </div>
          <DrawerFooter className="flex-row gap-3">
            <DrawerClose asChild>
              <button className="flex-1 rounded-lg ring ring-brand-text-primary/30 text-brand-text-primary py-3 h-12">
                CLOSE
              </button>
            </DrawerClose>
            <ReserveButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <RoomTriggerCard room={room} />
      </DialogTrigger>
      <DialogContent className="max-w-screen-2xl sm:max-w-screen-2xl w-full h-[85vh] flex flex-col p-0 overflow-hidden gap-0 [&>[data-slot=dialog-close]]:hidden">
        <div className="grid grid-cols-2 flex-1 min-h-0 p-3">
          <RoomGallery room={room} className="w-full flex-shrink-0" />
          <div className="flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <DialogTitle className="text-brand-text-primary font-semibold text-xl">{room.name}</DialogTitle>
              <RoomBody room={room} />
            </div>
            <div className="shrink-0 flex gap-3 px-8">
              <DialogClose asChild>
                <button className="flex-1 rounded-lg ring ring-brand-text-primary/30 text-brand-text-primary py-3 h-12">
                  CLOSE
                </button>
              </DialogClose>
              <ReserveButton />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3">
      {icon}
      <div className="text-brand-text-primary">{value}</div>
    </div>
  );
}
