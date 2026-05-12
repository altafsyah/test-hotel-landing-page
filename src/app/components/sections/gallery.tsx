import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/components/ui/dialog";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY_IMAGES, TABS } from "@/data/gallery";
import { Icon } from "../ui/icon";
import { X } from "lucide-react";
import { cn } from "../ui/utils";
import { useIsMobile } from "../ui/use-mobile";

const imgVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

export function Gallery() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Photos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const isMobile = useIsMobile();
  const thumbsPerPage = isMobile ? 4 : 8;

  const filteredImages =
    activeTab === "All Photos"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  function handleTabChange(tab: string) {
    setDirection(1);
    setActiveTab(tab);
    setCurrentIndex(0);
  }

  function handleThumbnail(i: number) {
    setDirection(i >= currentIndex ? 1 : -1);
    setCurrentIndex(i);
  }

  return (
    <section id="gallery" className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center text-center md:text-left md:items-start">
        <h3>- Visual Memories -</h3>
        <h2 className="mt-3">A Glimpse of Paradise</h2>
        <p className="mt-6">
          From golden sunrises on the terrace to cozy evenings by the fireplace.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-10">
        <div className="group relative aspect-square md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-5.jpg"
            alt="Suite interior"
            className="group-hover:scale-110 transition-transform duration-300  h-full w-full object-cover"
          />
        </div>
        <div className="group row-span-2 overflow-hidden h-auto">
          <ImageWithFallback
            src="/images/image-6.jpg"
            alt="Pool view"
            className="group-hover:scale-110 transition-transform duration-300  h-full w-full object-cover"
          />
        </div>
        <div className="group hidden md:block md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-10.jpg"
            alt="Pool view"
            className="group-hover:scale-110 transition-transform duration-300  h-full w-full object-cover"
          />
        </div>
        <div className="group relative aspect-square md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-8.jpg"
            alt="Dining experience"
            className="group-hover:scale-110 transition-transform duration-300  h-full w-full object-cover"
          />
        </div>
        <div className="group relative hidden md:col-span-1 md:row-span-2 md:block md:overflow-hidden">
          <ImageWithFallback
            src="/images/image-9.jpg"
            alt="Alpine panorama"
            className="group-hover:scale-110 transition-transform duration-300  h-full w-full object-cover"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 bg-black/60 flex justify-center items-center text-white underline gap-3 w-full hover:bg-black/30 transition-colors duration-300"
          >
            <Icon name="images" />
            <span>See All Photos</span>
          </button>
        </div>
        <div className="group relative col-span-2 aspect-video overflow-hidden md:col-span-2 md:aspect-[6/2]">
          <ImageWithFallback
            src="/images/image-7.jpg"
            alt="Pool view"
            className="group-hover:scale-110 transition-transform duration-300 h-full w-full object-cover"
          />
          <button
            onClick={() => setOpen(true)}
            className="md:hidden absolute inset-0 bg-black/60 flex justify-center items-center text-white underline gap-3 w-full hover:bg-black/30 transition-colors duration-300"
          >
            <Icon name="images" />
            <span>See All Photos</span>
          </button>
        </div>
      </div>
      <GalleryDialog
        open={open}
        onOpenChange={setOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        filteredImages={filteredImages}
        currentIndex={currentIndex}
        direction={direction}
        thumbsPerPage={thumbsPerPage}
        onThumbnail={handleThumbnail}
      />
    </section>
  );
}

type GalleryImage = { src: string; alt: string; category: string };

type GalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredImages: GalleryImage[];
  currentIndex: number;
  direction: 1 | -1;
  thumbsPerPage: number;
  onThumbnail: (i: number) => void;
};

function GalleryDialog({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  filteredImages,
  currentIndex,
  direction,
  thumbsPerPage,
  onThumbnail,
}: GalleryDialogProps) {
  const totalPages = Math.ceil(filteredImages.length / thumbsPerPage);
  const thumbPage = Math.floor(currentIndex / thumbsPerPage);
  const start = thumbPage * thumbsPerPage;
  const visibleThumbs = filteredImages.slice(start, start + thumbsPerPage);

  function handleThumbPrev() {
    const prevPage = Math.max(0, thumbPage - 1);
    onThumbnail(prevPage * thumbsPerPage);
  }

  function handleThumbNext() {
    const nextPage = Math.min(totalPages - 1, thumbPage + 1);
    onThumbnail(nextPage * thumbsPerPage);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl duration-200 outline-none",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Photo Gallery
          </DialogPrimitive.Title>

          {/* tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-1 px-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={cn(
                  "shrink-0 px-5 py-3 rounded-lg text-sm font-medium transition-colors text-nowrap",
                  activeTab === tab
                    ? "bg-white text-brand-text-primary"
                    : "text-white ring ring-white",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-4">
            {/* active image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex + "-" + activeTab}
                  custom={direction}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={filteredImages[currentIndex]?.src ?? ""}
                    alt={filteredImages[currentIndex]?.alt ?? ""}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* thumbnails */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-3">
              {visibleThumbs.map((img, i) => {
                const actualIndex = start + i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => onThumbnail(actualIndex)}
                    className={cn(
                      "aspect-square overflow-hidden transition-all w-full",
                      actualIndex === currentIndex
                        ? "ring-2 ring-brand-accent opacity-100"
                        : "opacity-50 hover:opacity-80",
                    )}
                  >
                    <ImageWithFallback
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* navigation */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <button
                onClick={handleThumbPrev}
                disabled={thumbPage === 0}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
              >
                <Icon name="arrow-left" size={16} />
              </button>
              <span className="text-white text-sm tabular-nums">
                {thumbPage + 1}/{totalPages}
              </span>
              <button
                onClick={handleThumbNext}
                disabled={thumbPage === totalPages - 1}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
              >
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>

        <DialogPrimitive.Close className="fixed top-4 right-4 z-50 text-white/60 hover:text-white transition-colors">
          <X size={20} />
        </DialogPrimitive.Close>
      </DialogPortal>
    </Dialog>
  );
}
