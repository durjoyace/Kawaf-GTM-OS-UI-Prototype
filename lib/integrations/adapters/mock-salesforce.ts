import type {
  IntegrationAdapter,
  ConnectConfig,
  ConnectionResult,
  SyncResult,
  PaginationParams,
  SyncedAccount,
  SyncedContact,
  SyncedDeal,
} from "../types";

export class MockSalesforceAdapter implements IntegrationAdapter {
  async connect(_config: ConnectConfig): Promise<ConnectionResult> {
    await delay(500);
    return { success: true, provider: "salesforce", accountId: "sf-org-001" };
  }

  async sync(): Promise<SyncResult> {
    await delay(2000);
    return { success: true, recordsSynced: 1247 };
  }

  async disconnect(): Promise<void> {
    await delay(300);
  }

  async getAccounts(_params: PaginationParams): Promise<SyncedAccount[]> {
    await delay(800);
    return [
      { externalId: "sf-acct-001", name: "Acme Corp", industry: "Technology" },
      { externalId: "sf-acct-002", name: "Global Industries", industry: "Manufacturing" },
      { externalId: "sf-acct-003", name: "TechStart Inc.", industry: "SaaS" },
    ];
  }

  async getContacts(_params: PaginationParams): Promise<SyncedContact[]> {
    await delay(800);
    return [
      { externalId: "sf-con-001", name: "John Smith", email: "john@acme.com", accountExternalId: "sf-acct-001" },
      { externalId: "sf-con-002", name: "Jane Doe", email: "jane@global.com", accountExternalId: "sf-acct-002" },
    ];
  }

  async getDeals(_params: PaginationParams): Promise<SyncedDeal[]> {
    await delay(800);
    return [
      { externalId: "sf-deal-001", name: "Acme Enterprise", value: 85000, stage: "negotiation", accountExternalId: "sf-acct-001" },
      { externalId: "sf-deal-002", name: "Global Platform", value: 120000, stage: "proposal", accountExternalId: "sf-acct-002" },
    ];
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
