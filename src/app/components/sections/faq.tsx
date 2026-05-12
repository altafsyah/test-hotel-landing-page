import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { cn } from "@/app/components/ui/utils";
import { Icon } from "@/app/components/ui/icon";

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
    <div className="bg-white rounded-md text-brand-text-primary">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full p-5 text-base font-medium cursor-pointer flex items-center justify-between rounded-md transition-colors text-left",
          open && "rounded-b-none",
        )}
      >
        {item.q}
        <Icon
          name="chevron-down"
          className={cn(
            "size-7 shrink-0 transition-transform duration-300 text-brand-accent",
            open && "rotate-180",
          )}
        />
      </button>
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
            <p className="px-5 pb-5 opacity-80">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-brand-surface">
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 md:gap-12 md:items-end">
        <div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left text-brand-text-primary">
            <h2>Frequently Asked Questions</h2>
            <p className="mt-6 md:mt-4 opacity-80">
              Answers to the most common questions, so you can focus on enjoying
              your time with us.
            </p>
          </div>
          <div className="w-full aspect-video md:aspect-[2/1] relative mt-10 md:mt-8">
            <ImageWithFallback
              src="/images/image-faq.jpg"
              alt="Azure Bay Resort"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-10 md:mt-0 space-y-3 md:space-y-5">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
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
