import * as React from "react";

import { cn } from "./utils";
import { Icon, IconName } from "./icon";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-brand-text-primary/50 selection:bg-brand-accent selection:text-white dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-transparent transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-brand-accent focus-visible:ring-brand-accent/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

const IconInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon: IconName }
>(({ icon, ...props }, ref) => (
  <div className="relative">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
      <Icon name={icon} className="size-6 text-brand-text-primary" />
    </span>
    <Input
      ref={ref}
      {...props}
      className="hover:bg-muted/40 text-brand-text-primary h-14 rounded-md border-brand-text-primary/10 pl-12 pr-4 py-3 bg-white text-base! placeholder:text-base "
    />
  </div>
));
IconInput.displayName = "IconInput";

export { Input, IconInput };
