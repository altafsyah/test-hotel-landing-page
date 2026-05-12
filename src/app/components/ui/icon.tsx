import { type SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "arrow-left-right"
  | "arrow-right"
  | "bathtub"
  | "bed"
  | "bike"
  | "calendar"
  | "check-circle"
  | "chevron-down"
  | "copy"
  | "facebook"
  | "flower-lotus"
  | "images"
  | "instagram"
  | "mail"
  | "martini"
  | "phone"
  | "ski"
  | "swimming-pool"
  | "tag"
  | "user"
  | "users"
  | "whatsapp"
  | "wifi"
  | "wine"
  | "yoga"
  | "youtube";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...props}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
