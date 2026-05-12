import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { IconInput } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { toast } from "sonner";
import {
  DateRangeField,
  GuestsField,
} from "@/app/components/ui/booking-fields";
import { Icon } from "../ui/icon";
import { useBooking } from "@/app/context/booking-context";

const extras = [
  "Airport transfer",
  "Spa package",
  "Private dining",
  "Yacht excursion",
];

export function Reserve() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const { guests, setGuests, dateRange, setDateRange } = useBooking();

  const toggleExtra = (extra: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra],
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Request received — our concierge will be in touch within 24 hours.",
    );
  };

  return (
    <section id="reserve" className="relative py-20 px-4 overflow-hidden">
      <img
        src="/images/hero-1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
      />
      <div className="absolute inset-0 bg-black/50 hidden md:block" />
      <div className="relative z-10 container mx-auto md:max-w-4xl">
        <div className="text-center flex flex-col items-center text-brand-white">
          <h3>- Plan Your Stay -</h3>
          <h2 className="mt-3">Request a Personal Quote</h2>
          <p className="mt-6">
            Fill out the form below, and our team will get back to you within 24
            hours with a non-binding offer tailored to your needs.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-8 rounded-lg border bg-white p-3 mt-10 text-brand-text-primary"
        >
          {/* personal information */}
          <div>
            <div className="mb-4 text-brand-text-primary">
              Your details
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <IconInput icon="user" placeholder="First name" required />
              <IconInput icon="user" placeholder="Last name" required />
              <IconInput
                icon="mail"
                type="email"
                placeholder="Email address"
                required
              />
              <IconInput icon="phone" type="tel" placeholder="Phone number" />
            </div>
          </div>

          {/* reservation information */}
          <div>
            <div className="mb-4 text-brand-text-primary">
              Stay
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <DateRangeField dateRange={dateRange} onChange={setDateRange} />
              <GuestsField value={guests} onChange={setGuests} />
            </div>
            <div className="mt-3">
              <Label htmlFor="rRoom" className="sr-only">
                Room type
              </Label>
              <Select>
                <SelectTrigger id="rRoom" className="h-14! bg-[#FAFAFA] border border-brand-text-primary/10 rounded-md w-full px-4">
                  <span className="flex items-center gap-3">
                    <Icon name="bed" className="size-5 text-brand-text-primary!" />
                    <SelectValue placeholder="Select room" className="text-base! placeholder:text-brand-text-primary! text-brand-text-primary!"/>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="garden" className="py-3">Garden Suite</SelectItem>
                  <SelectItem value="sea" className="py-3">Sea View Suite</SelectItem>
                  <SelectItem value="villa" className="py-3">Cliffside Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* extras */}
          <div>
            <div className="mb-4 text-brand-text-primary">
              Your Details
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {extras.map((extra) => {
                const active = selectedExtras.includes(extra);
                return (
                  <label
                    key={extra}
                    className={`text-base !h-14 flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                      active
                        ? "border-brand-accent bg-brand-accent/5"
                        : "border-brand-text-primary/10 hover:bg-muted/40"
                    }`}
                  >
                    <Checkbox
                      checked={active}
                      className="accent-brand-accent"
                      onCheckedChange={() => toggleExtra(extra)}
                    />
                    <span>{extra}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* special requests */}
          <div>
            <div className="mb-4 text-brand-text-primary">
              Special requests
            </div>
            <Textarea
              rows={8}
              placeholder="Anniversary, dietary preferences, arrival time…"
              className="text-base! rounded-md bg-[#FAFAFA] ring ring-brand-text-primary/10 placeholder:text-brand-text-primary/50 text-brand-text-primary"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full md:w-fit md:self-end rounded-md bg-brand-accent hover:bg-brand-accent-dark text-white uppercase tracking-widest"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </section>
  );
}
