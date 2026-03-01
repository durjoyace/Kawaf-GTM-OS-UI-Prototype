"use client";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--mkt-text)]">Something went wrong</h2>
        <p className="mt-2 text-sm text-[var(--mkt-text-secondary)]">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-[var(--mkt-accent)] px-4 py-2 text-sm text-black"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
