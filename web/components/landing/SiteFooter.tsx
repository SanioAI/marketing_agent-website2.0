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
    <footer className="surface-dark border-t border-surface">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-5">
          <div>
            <p className="text-sm font-semibold tracking-tight text-surface">Paladio.ai</p>
            <p className="mt-2 max-w-xs text-sm text-surface-muted">
              Productized, verifiable AI agents for real business workflows.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a className="block text-surface-muted transition hover:text-surface" href="mailto:demo@paladio.ai">
                demo@paladio.ai
              </a>
              <a className="block text-surface-muted transition hover:text-surface" href="tel:+10000000000">
                +1 (000) 000-0000
              </a>
            </div>
          </div>
          {col.map((c) => (
            <div key={c.h}>
              <p className="section-kicker">{c.h}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-surface-muted transition hover:text-surface"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="section-kicker">Legal</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="text-sm text-surface-muted transition hover:text-surface" href="/privacy">
                  Privacy policy
                </a>
              </li>
              <li>
                <a className="text-sm text-surface-muted transition hover:text-surface" href="/terms">
                  Terms of service
                </a>
              </li>
              <li>
                <a className="text-sm text-surface-muted transition hover:text-surface" href="/sitemap.xml">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface py-6">
          <p className="text-center font-mono text-xs tracking-wider text-surface-muted sm:text-left">
            © {new Date().getFullYear()} Paladio.ai. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
