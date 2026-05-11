import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Gallery() {
  return (
    <section id="gallery" className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center text-center">
        <h3>- Visual Memories -</h3>
        <h2 className="mt-3">A Glimpse of Paradise</h2>
        <p className="mt-6">
          From golden sunrises on the terrace to cozy evenings by the fireplace.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-10">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
            alt="Suite interior"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="row-span-2 rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
            alt="Pool view"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551776235-dde6d482980b?w=800"
            alt="Dining experience"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative aspect-video col-span-2 rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
            alt="Alpine panorama"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
