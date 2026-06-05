import type { ReactNode, ComponentProps } from "react";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center font-medium tracking-tight transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const sizes = {
  sm: "h-9 rounded px-3.5 text-sm",
  md: "h-11 rounded px-5 text-sm",
  lg: "h-12 rounded px-6 text-[15px]",
} as const;

const primaryLime =
  "bg-lime text-ink font-semibold hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_oklch(0.82_0.14_225/0.5)] active:scale-[0.99] focus-visible:outline-lime";

const primaryInk =
  "bg-ink text-paper font-semibold hover:bg-ink-deep active:scale-[0.99] focus-visible:outline-ink";

const secondaryLight =
  "border border-border bg-transparent text-foreground hover:border-foreground active:scale-[0.99]";

const secondaryDark =
  "border border-line-dark bg-transparent text-paper hover:border-paper active:scale-[0.99]";

const variants = {
  primary: `${base} ${sizes.md} ${primaryLime}`,
  primarySm: `${base} ${sizes.sm} ${primaryLime}`,
  primaryLg: `${base} ${sizes.lg} ${primaryLime}`,
  primaryInk: `${base} ${sizes.md} ${primaryInk}`,
  primaryInkLg: `${base} ${sizes.lg} ${primaryInk}`,
  secondary: `${base} ${sizes.md} ${secondaryLight}`,
  secondaryLg: `${base} ${sizes.lg} ${secondaryLight}`,
  secondaryOnDark: `${base} ${sizes.md} ${secondaryDark}`,
  secondaryOnDarkLg: `${base} ${sizes.lg} ${secondaryDark}`,
} as const;

type ButtonLinkProps = Omit<ComponentProps<"a">, "href" | "className"> & {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: keyof typeof variants;
};

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
  ...rest
}: ButtonLinkProps) {
  const c = [variants[variant] ?? variants.primary, className].filter(Boolean).join(" ");
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return (
      <a href={href} className={c} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={c} {...rest}>
      {children}
    </Link>
  );
}
