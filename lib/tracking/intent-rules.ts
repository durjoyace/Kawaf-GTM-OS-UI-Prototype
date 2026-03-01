interface TrackingEventRow {
  visitorId: string;
  pageUrl: string;
  pageTitle: string | null;
  duration: number | null;
  createdAt: Date | string;
}

interface IntentSignal {
  visitorId: string;
  reason: string;
  confidence: number;
  signalType: string;
}

/** Pricing page visit = high intent */
function checkPricingVisit(events: TrackingEventRow[]): IntentSignal | null {
  const pricingVisit = events.find(
    (e) => e.pageUrl.includes("/pricing") || e.pageUrl.includes("/plans")
  );
  if (pricingVisit) {
    return {
      visitorId: pricingVisit.visitorId,
      reason: "Visited pricing page",
      confidence: 75,
      signalType: "Pricing Page Visit",
    };
  }
  return null;
}

/** 3+ visits in 7 days = returning visitor intent */
function checkFrequentVisits(events: TrackingEventRow[]): IntentSignal | null {
  if (events.length >= 3) {
    return {
      visitorId: events[0].visitorId,
      reason: `${events.length} page visits in the tracking window`,
      confidence: 65,
      signalType: "Repeat Visitor",
    };
  }
  return null;
}

/** Session duration > 5 minutes = deep engagement */
function checkLongSession(events: TrackingEventRow[]): IntentSignal | null {
  const totalDuration = events.reduce((sum, e) => sum + (e.duration ?? 0), 0);
  if (totalDuration > 300) {
    return {
      visitorId: events[0].visitorId,
      reason: `${Math.round(totalDuration / 60)}+ minutes on site`,
      confidence: 60,
      signalType: "Deep Engagement",
    };
  }
  return null;
}

/**
 * Evaluate all intent rules for a visitor's events.
 * Returns the highest-confidence signal found, or null.
 */
export function evaluateIntentRules(
  events: TrackingEventRow[]
): IntentSignal | null {
  if (events.length === 0) return null;

  const checks = [
    checkPricingVisit(events),
    checkFrequentVisits(events),
    checkLongSession(events),
  ].filter(Boolean) as IntentSignal[];

  if (checks.length === 0) return null;

  // Return the highest confidence signal
  return checks.sort((a, b) => b.confidence - a.confidence)[0];
}
