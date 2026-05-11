import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev?: boolean;
  canScrollNext?: boolean;
}

export function ButtonNavigationSlider({
  scrollPrev,
  scrollNext,
  canScrollPrev = true,
  canScrollNext = true,
}: Props) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="size-11 rounded-lg flex items-center justify-center bg-[#A49781] transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:text-[#323232]"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="size-11 rounded-lg flex items-center justify-center bg-[#A49781] transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:text-[#323232]"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
