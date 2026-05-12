import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";

const faqs = [
  {
    q: "What is the check-in and check-out time?",
    a: "Check-in is from 3:00 PM, and check-out is until 11:00 AM.",
  },
  {
    q: "Is the hotel pet-friendly?",
    a: "Alle Zimmer sind mit frischer Bettwäsche, täglicher Zimmerreinigung, kostenlosem WLAN und Zugang zum Balkon mit atemberaubendem Blick auf die Alpen ausgestattet. Einige Suiten verfügen auch über Küchenzeilen – bitte überprüfen Sie die Zimmerbeschreibung für Details.",
  },
  {
    q: "Do you offer shuttle services?",
    a: "Alle Zimmer sind mit frischer Bettwäsche, täglicher Zimmerreinigung, kostenlosem WLAN und Zugang zum Balkon mit atemberaubendem Blick auf die Alpen ausgestattet. Einige Suiten verfügen auch über Küchenzeilen – bitte überprüfen Sie die Zimmerbeschreibung für Details.",
  },
  {
    q: "Are lift passes included in the price?",
    a: "Alle Zimmer sind mit frischer Bettwäsche, täglicher Zimmerreinigung, kostenlosem WLAN und Zugang zum Balkon mit atemberaubendem Blick auf die Alpen ausgestattet. Einige Suiten verfügen auch über Küchenzeilen – bitte überprüfen Sie die Zimmerbeschreibung für Details.",
  },
  {
    q: "Is there a vegan option in the restaurant?",
    a: "Alle Zimmer sind mit frischer Bettwäsche, täglicher Zimmerreinigung, kostenlosem WLAN und Zugang zum Balkon mit atemberaubendem Blick auf die Alpen ausgestattet. Einige Suiten verfügen auch über Küchenzeilen – bitte überprüfen Sie die Zimmerbeschreibung für Details.",
  },
];

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <details open name="faq" className="bg-white rounded-xl">
      <summary
        onClick={(e) => { e.preventDefault(); onToggle(); }}
        className={cn(
          "px-5 py-5 text-base font-medium cursor-pointer list-none flex items-center justify-between hover:bg-muted/40 rounded-xl transition-colors",
          open && "rounded-b-none"
        )}
      >
        {item.q}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </summary>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-5 pb-5 text-muted-foreground">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-brand-surface">
      <div className="container mx-auto px-4 py-20 grid grid-cols-1">
        <div className="flex flex-col items-center text-center">
          <h2 className="mt-3">Frequently Asked Questions</h2>
          <p className="mt-6">
            Answers to the most common questions, so you can focus on enjoying
            your time with us.
          </p>
        </div>
        <div className="w-full aspect-video relative mt-10">
          <ImageWithFallback
            src="/images/hero-1.jpg"
            alt="Azure Bay Resort"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
