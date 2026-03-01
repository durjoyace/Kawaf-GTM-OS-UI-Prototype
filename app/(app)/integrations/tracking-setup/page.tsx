import { TrackingSnippetCard } from "@/components/tracking-snippet-card";

export default function TrackingSetupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Website Tracking Setup</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Install the Kawaf tracking snippet on your website to detect visitor intent signals automatically.
        </p>
      </div>

      <TrackingSnippetCard />

      <div className="rounded-lg border p-6">
        <h2 className="text-base font-semibold">How It Works</h2>
        <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-600">1</span>
            <span>Add the snippet to your website&apos;s <code className="text-xs">&lt;head&gt;</code> tag</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-600">2</span>
            <span>Anonymous visitor activity is tracked (page views, time on site)</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-600">3</span>
            <span>Intent rules analyze behavior (pricing visits, repeat sessions, long engagement)</span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-600">4</span>
            <span>Buying signals are automatically created in your Signal Discovery feed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
