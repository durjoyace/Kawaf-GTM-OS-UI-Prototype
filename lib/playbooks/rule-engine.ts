interface SignalData {
  signalType: string;
  category: string;
  confidence: number;
  confidenceLevel: string;
  tags: string[];
}

interface SignalRules {
  categories?: string[];
  minConfidence?: number;
  signalTypes?: string[];
}

interface PlaybookData {
  signalRules: SignalRules | null;
  status: string;
}

/**
 * Evaluate if a signal matches a playbook's signal rules.
 */
export function evaluatePlaybookRules(signal: SignalData, playbook: PlaybookData): boolean {
  if (playbook.status !== "active") return false;

  const rules = playbook.signalRules as SignalRules | null;
  if (!rules) return false;

  // Check category match
  if (rules.categories && rules.categories.length > 0) {
    if (!rules.categories.includes(signal.category)) return false;
  }

  // Check minimum confidence
  if (rules.minConfidence !== undefined) {
    if (signal.confidence < rules.minConfidence) return false;
  }

  // Check signal type match
  if (rules.signalTypes && rules.signalTypes.length > 0) {
    const matches = rules.signalTypes.some((type) =>
      signal.signalType.toLowerCase().includes(type.toLowerCase())
    );
    if (!matches) return false;
  }

  return true;
}
