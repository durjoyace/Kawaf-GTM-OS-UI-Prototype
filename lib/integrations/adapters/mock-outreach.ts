import type {
  IntegrationAdapter,
  ConnectConfig,
  ConnectionResult,
  SyncResult,
} from "../types";

export class MockOutreachAdapter implements IntegrationAdapter {
  async connect(_config: ConnectConfig): Promise<ConnectionResult> {
    await delay(500);
    return { success: true, provider: "outreach", accountId: "or-org-001" };
  }

  async sync(): Promise<SyncResult> {
    await delay(1800);
    return { success: true, recordsSynced: 562 };
  }

  async disconnect(): Promise<void> {
    await delay(300);
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
