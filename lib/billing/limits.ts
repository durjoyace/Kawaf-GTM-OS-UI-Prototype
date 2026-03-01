export interface TierLimits {
  signals: number;
  emails: number;
  integrations: number;
}

const tierLimits: Record<string, TierLimits> = {
  free: { signals: 50, emails: 10, integrations: 1 },
  pro: { signals: Infinity, emails: Infinity, integrations: 5 },
  team: { signals: Infinity, emails: Infinity, integrations: Infinity },
};

export function getLimits(plan: string): TierLimits {
  return tierLimits[plan] ?? tierLimits.free;
}

export function isWithinLimit(
  plan: string,
  resource: keyof TierLimits,
  currentCount: number
): boolean {
  const limits = getLimits(plan);
  return currentCount < limits[resource];
}
