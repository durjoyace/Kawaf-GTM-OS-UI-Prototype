export interface AiScoreResult {
  confidence: number; // 0-100
  confidenceLevel: "high" | "medium" | "low";
  explanation: string;
  suggestedAction: string;
}

export interface SignalContext {
  signalType: string;
  category: string;
  description: string;
  rawConfidence: number;
  tags: string[];
  source: string | null;
  rawData: Record<string, unknown> | null;
}

export interface AccountContext {
  name: string;
  industry: string | null;
  score: number | null;
  metadata: Record<string, unknown> | null;
}
