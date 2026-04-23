import type { ReactNode, ComponentProps } from "react";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center font-medium tracking-tight transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

const sizes = {
  sm: "h-9 rounded-lg px-3.5 text-sm",
  md: "h-11 rounded-xl px-5 text-sm",
  lg: "h-12 rounded-2xl px-6 text-[15px]",
} as const;

const primaryGradient =
  "bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] shadow-sm shadow-blue-900/15 hover:opacity-90 active:scale-[0.99] focus-visible:outline-[#2563eb]";

const variants = {
  primary: `${base} ${sizes.md} ${primaryGradient} text-white`,
  primarySm: `${base} ${sizes.sm} ${primaryGradient} text-white`,
  primaryLg: `${base} ${sizes.lg} ${primaryGradient} text-white`,
  secondary: `${base} ${sizes.md} border border-slate-200/80 bg-white text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 active:scale-[0.99]`,
  secondaryLg: `${base} ${sizes.lg} border border-slate-200/80 bg-white text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 active:scale-[0.99]`,
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
