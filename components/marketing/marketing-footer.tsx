import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/compare/smoke-signals", label: "Compare" },
  ],
  Company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
  ],
  Legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <span className="text-xs font-bold text-white">K</span>
              </div>
              <span className="text-lg font-semibold">Kawaf</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered GTM operating system. Detect buying signals, draft outreach, and close deals — all on autopilot.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-semibold">{title}</p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kawaf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
