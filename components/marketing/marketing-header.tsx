"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare/smoke-signals", label: "Compare" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--mkt-border)] bg-[var(--mkt-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)] shadow-md transition-shadow group-hover:shadow-[0_0_20px_var(--mkt-accent-glow)]">
            <span className="text-sm font-bold text-black">K</span>
          </div>
          <span className="text-lg font-semibold text-[var(--mkt-text)]">
            Kawaf
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--mkt-text-secondary)] transition-colors hover:text-[var(--mkt-text)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm text-[var(--mkt-text-secondary)] transition-colors hover:text-[var(--mkt-text)]"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-[var(--mkt-accent)] px-4 py-2 text-sm font-medium text-black transition-shadow hover:shadow-[0_0_24px_var(--mkt-accent-glow)]"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-[var(--mkt-text-secondary)] hover:text-[var(--mkt-text)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--mkt-border)] bg-[var(--mkt-bg)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--mkt-text-secondary)] hover:text-[var(--mkt-text)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-[var(--mkt-border)] px-4 py-2 text-center text-sm text-[var(--mkt-text-secondary)] transition-colors hover:border-[var(--mkt-border-hover)] hover:text-[var(--mkt-text)]"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-[var(--mkt-accent)] px-4 py-2 text-center text-sm font-medium text-black"
              >
                Get Started Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
