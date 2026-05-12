import { createContext, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Guests } from "@/app/components/ui/booking-fields";

type BookingContextValue = {
  guests: Guests;
  setGuests: (g: Guests) => void;
  dateRange: DateRange | undefined;
  setDateRange: (r: DateRange | undefined) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [guests, setGuests] = useState<Guests>({ adults: 0, children: 0 });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <BookingContext.Provider value={{ guests, setGuests, dateRange, setDateRange }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
