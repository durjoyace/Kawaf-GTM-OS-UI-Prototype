import type {
  IntegrationAdapter,
  ConnectConfig,
  ConnectionResult,
  SyncResult,
  PaginationParams,
  SyncedAccount,
  SyncedContact,
} from "../types";

export class MockHubSpotAdapter implements IntegrationAdapter {
  async connect(_config: ConnectConfig): Promise<ConnectionResult> {
    await delay(500);
    return { success: true, provider: "hubspot", accountId: "hs-portal-001" };
  }

  async sync(): Promise<SyncResult> {
    await delay(1500);
    return { success: true, recordsSynced: 834 };
  }

  async disconnect(): Promise<void> {
    await delay(300);
  }

  async getAccounts(_params: PaginationParams): Promise<SyncedAccount[]> {
    await delay(800);
    return [
      { externalId: "hs-co-001", name: "MarketPro Agency", industry: "Marketing" },
      { externalId: "hs-co-002", name: "DataDriven Ltd", industry: "Analytics" },
    ];
  }

  async getContacts(_params: PaginationParams): Promise<SyncedContact[]> {
    await delay(800);
    return [
      { externalId: "hs-con-001", name: "Sarah Lee", email: "sarah@marketpro.com", accountExternalId: "hs-co-001" },
      { externalId: "hs-con-002", name: "Mike Chen", email: "mike@datadriven.com", accountExternalId: "hs-co-002" },
    ];
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
