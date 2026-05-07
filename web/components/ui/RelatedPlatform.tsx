import Link from "next/link";

const platformLinks = [
  {
    label: "Catalog Agents",
    desc: "AI-powered product data enrichment",
    href: "/catalog-agents",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.9" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Catalog Readiness",
    desc: "Score and improve your catalog health",
    href: "/catalog-readiness",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="7" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
        <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Product Intelligence",
    desc: "Deep insights across your product data",
    href: "/product-intelligence",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="10" width="3" height="6" rx="1" fill="#2563eb" opacity="0.4" />
        <rect x="7.5" y="6" width="3" height="10" rx="1" fill="#2563eb" opacity="0.65" />
        <rect x="13" y="2" width="3" height="14" rx="1" fill="#2563eb" />
      </svg>
    ),
  },
];

export function RelatedPlatform() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        Platform
      </p>
      <div className="space-y-1">
        {platformLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white group-hover:border-blue-100 group-hover:bg-blue-50 transition">
              {l.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                {l.label}
              </p>
              <p className="text-xs text-slate-500">{l.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
