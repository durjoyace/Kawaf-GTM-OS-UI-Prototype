import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/compare/smoke-signals", label: "Compare" },
  ],
  Resources: [
    { href: "/developers", label: "API Docs" },
    { href: "/login", label: "Sign In" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--mkt-border)] bg-[var(--mkt-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)]">
                <span className="text-sm font-bold text-black">K</span>
              </div>
              <span className="text-lg font-semibold text-[var(--mkt-text)]">
                Kawaf
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--mkt-text-secondary)]">
              AI-powered GTM operating system. Detect buying signals, draft
              outreach, and close deals — all on autopilot.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {[
                { label: "Twitter", href: "#", icon: "𝕏" },
                { label: "LinkedIn", href: "#", icon: "in" },
                { label: "GitHub", href: "#", icon: "GH" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--mkt-border)] text-xs text-[var(--mkt-text-muted)] transition-colors hover:border-[var(--mkt-border-hover)] hover:text-[var(--mkt-text-secondary)]"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--mkt-text-muted)]">
                {title}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--mkt-text-secondary)] transition-colors hover:text-[var(--mkt-text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-[var(--mkt-border)] pt-6">
          <p className="text-center text-xs text-[var(--mkt-text-muted)]">
            &copy; {new Date().getFullYear()} Kawaf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
