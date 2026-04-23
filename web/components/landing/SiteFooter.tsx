import { Container } from "@/components/ui/Container";

const col = [
  {
    h: "Product",
    links: [
      { label: "Products", href: "/products" },
      { label: "Catalog Agents", href: "/products#catalog-agents" },
      { label: "AEC Agents", href: "/products#aec-agents" },
    ],
  },
  {
    h: "Support",
    links: [
      { label: "Try It", href: "/try-it" },
      { label: "Contact", href: "/about#contact" },
      { label: "API health", href: "/api/health" },
    ],
  },
  {
    h: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Case Studies", href: "/resources#case-studies" },
      { label: "Blog", href: "/resources#blog" },
    ],
  },
  { h: "Company", links: [{ label: "About", href: "/about" }, { label: "Contact", href: "/about#contact" }] },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-[#070b2a] text-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-5">
          <div>
            <p className="text-sm font-semibold tracking-tight">Paladio.ai</p>
            <p className="mt-2 max-w-xs text-sm text-indigo-100/75">
              Productized, verifiable AI agents for real business workflows.
            </p>
            <div className="mt-5 space-y-2 text-sm text-indigo-100/75">
              <a className="block hover:text-white" href="mailto:demo@paladio.ai">
                demo@paladio.ai
              </a>
              <a className="block hover:text-white" href="tel:+10000000000">
                +1 (000) 000-0000
              </a>
            </div>
          </div>
          {col.map((c) => (
            <div key={c.h}>
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-100/70">{c.h}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-indigo-100/75 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-100/70">Legal</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="text-sm text-indigo-100/75 transition hover:text-white" href="/privacy">
                  Privacy policy
                </a>
              </li>
              <li>
                <a className="text-sm text-indigo-100/75 transition hover:text-white" href="/terms">
                  Terms of service
                </a>
              </li>
              <li>
                <a className="text-sm text-indigo-100/75 transition hover:text-white" href="/sitemap.xml">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6">
          <p className="text-center text-xs text-indigo-100/60 sm:text-left">
            © {new Date().getFullYear()} Paladio.ai. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
