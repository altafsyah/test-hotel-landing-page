import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogPortal } from "./ui/dialog";
import { AnimatePresence, motion } from "motion/react";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
    alt: "Suite interior",
    category: "Rooms",
  },
  {
    src: "/images/image-6.jpg",
    alt: "Pool view",
    category: "Wellness",
  },
  {
    src: "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=800",
    alt: "Dining experience",
    category: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    alt: "Alpine panorama",
    category: "Rooms",
  },
];

const TABS = ["All Photos", "Rooms", "Wellness", "Dining"];

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

  const filteredImages =
    activeTab === "All Photos"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  function handleTabChange(tab: string) {
    setDirection(1);
    setActiveTab(tab);
    setCurrentIndex(0);
  }

  function handlePrev() {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  function handleNext() {
    setDirection(1);
    setCurrentIndex((i) => Math.min(filteredImages.length - 1, i + 1));
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
        <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-5.jpg"
            alt="Suite interior"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="row-span-2 overflow-hidden h-auto">
          <ImageWithFallback
            src="/images/image-6.jpg"
            alt="Pool view"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hidden md:block md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-10.jpg"
            alt="Pool view"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src="/images/image-8.jpg"
            alt="Dining experience"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative aspect-video col-span-2 md:col-span-1 md:row-span-2 md:aspect-auto overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
            alt="Alpine panorama"
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 bg-black/60 flex justify-center items-center text-white underline gap-3 w-full cursor-pointer"
          >
            <Images />
            <span>See All Photos</span>
          </button>
        </div>
        <div className="md:col-span-2 hidden md:block overflow-hidden aspect-[6/2]">
          <ImageWithFallback
            src="/images/image-6.jpg"
            alt="Pool view"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal forceMount>
          <AnimatePresence>
            {open && (
              <>
                {/* Overlay */}
                <motion.div
                  key="gallery-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-50 bg-brand-text-primary/80 backdrop-blur-3xl"
                />

                {/* Content */}
                <DialogPrimitive.Content forceMount asChild>
                  <motion.div
                    key="gallery-content"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex flex-col bg-transparent focus:outline-none"
                  >
                    {/* header */}
                    <div className="flex flex-col pt-4 pb-2 gap-3">
                      <div className="flex justify-end px-4">
                        <DialogPrimitive.Close className="text-white/70 hover:text-white transition-colors">
                          <X size={20} />
                          <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                      </div>
                      <div className="w-full overflow-x-auto scrollbar-none">
                        <div className="flex flex-nowrap gap-2 px-4 w-max">
                          {TABS.map((tab) => (
                            <button
                              key={tab}
                              onClick={() => handleTabChange(tab)}
                              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeTab === tab
                                  ? "bg-white text-black"
                                  : "bg-transparent text-white/70 border border-white/30 hover:text-white"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* active image */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden px-4 py-2">
                      <AnimatePresence mode="wait" custom={direction}>
                        {filteredImages.length > 0 ? (
                          <motion.div
                            key={
                              filteredImages[currentIndex]?.src + currentIndex
                            }
                            custom={direction}
                            variants={imgVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="max-h-full max-w-full flex items-center justify-center overflow-hidden"
                          >
                            <ImageWithFallback
                              src={filteredImages[currentIndex].src}
                              alt={filteredImages[currentIndex].alt}
                              className="max-h-full max-w-full object-contain rounded-lg"
                            />
                          </motion.div>
                        ) : (
                          <motion.p
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-white/50 text-sm"
                          >
                            No photos in this category.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* thumbnails - navigation */}
                    <div className="px-4 pb-6 flex flex-col items-center gap-3">
                      {filteredImages.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto scrollbar-none">
                          {filteredImages.map((img, i) => (
                            <button
                              key={img.src}
                              onClick={() => handleThumbnail(i)}
                              className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                                i === currentIndex
                                  ? "border-white"
                                  : "border-transparent opacity-50 hover:opacity-80"
                              }`}
                            >
                              <ImageWithFallback
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-6 text-white">
                        <button
                          onClick={handlePrev}
                          disabled={currentIndex === 0}
                          className="disabled:opacity-30 hover:opacity-70 transition-opacity"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm tabular-nums">
                          {filteredImages.length > 0
                            ? `${currentIndex + 1} / ${filteredImages.length}`
                            : "0 / 0"}
                        </span>
                        <button
                          onClick={handleNext}
                          disabled={
                            currentIndex === filteredImages.length - 1 ||
                            filteredImages.length === 0
                          }
                          className="disabled:opacity-30 hover:opacity-70 transition-opacity"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </DialogPrimitive.Content>
              </>
            )}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
