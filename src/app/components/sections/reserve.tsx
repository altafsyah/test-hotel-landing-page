import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
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
import { User, Mail, Phone, BedDouble } from "lucide-react";
import { DateRangeField, GuestsField, type Guests } from "@/app/components/ui/booking-fields";
import type { DateRange } from "react-day-picker";

const extras = [
  "Airport transfer",
  "Spa package",
  "Private dining",
  "Yacht excursion",
];

const fieldClass =
  "h-14 rounded border-brand-text-primary/10 pl-11 pr-4 py-3 bg-white";

function IconInput({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </span>
      <Input {...props} className={fieldClass} />
    </div>
  );
}

export function Reserve() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });

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
      <div className="relative z-10 container mx-auto md:max-w-2xl">
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
          className="space-y-8 rounded-lg border bg-white p-3 mt-10 text-brand-text-primary"
        >
          <div>
            <div className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
              Your details
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <IconInput
                icon={<User className="size-5" />}
                placeholder="First name"
                required
              />
              <IconInput
                icon={<User className="size-5" />}
                placeholder="Last name"
                required
              />
              <IconInput
                icon={<Mail className="size-5" />}
                type="email"
                placeholder="Email address"
                required
              />
              <IconInput
                icon={<Phone className="size-5" />}
                type="tel"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
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
              <Select defaultValue="sea">
                <SelectTrigger
                  id="rRoom"
                  className="h-14 w-full rounded px-4"
                >
                  <span className="flex items-center gap-3">
                    <BedDouble className="size-5 text-muted-foreground" />
                    <SelectValue />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="garden">Garden Suite</SelectItem>
                  <SelectItem value="sea">Sea View Suite</SelectItem>
                  <SelectItem value="villa">Cliffside Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
              Optional add-ons
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {extras.map((extra) => {
                const active = selectedExtras.includes(extra);
                return (
                  <label
                    key={extra}
                    className={`flex cursor-pointer items-center gap-3 rounded border px-4 py-3 transition-colors ${
                      active
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <Checkbox
                      checked={active}
                      onCheckedChange={() => toggleExtra(extra)}
                    />
                    <span>{extra}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
              Special requests
            </div>
            <Textarea
              rows={4}
              placeholder="Anniversary, dietary preferences, arrival time…"
              className="rounded-2xl bg-muted/30"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded bg-brand-accent hover:bg-brand-accent-dark text-white uppercase tracking-widest"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </section>
  );
}
