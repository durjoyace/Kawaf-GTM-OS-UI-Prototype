"use client";

import { ErrorState } from "@/components/error-state";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <ErrorState
        title="Something went wrong"
        description={error.message || "An unexpected error occurred."}
        onRetry={reset}
      />
    </div>
  );
}
