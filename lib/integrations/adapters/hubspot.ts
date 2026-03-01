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

const HUBSPOT_API = "https://api.hubapi.com";

export class HubSpotAdapter implements IntegrationAdapter {
  private accessToken: string | null = null;

  async connect(config: ConnectConfig): Promise<ConnectionResult> {
    if (!config.accessToken) {
      return { success: false, provider: "hubspot" };
    }

    this.accessToken = config.accessToken;

    // Verify the token by fetching account info
    const res = await fetch(`${HUBSPOT_API}/account-info/v3/details`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!res.ok) {
      return { success: false, provider: "hubspot" };
    }

    const data = await res.json();
    return {
      success: true,
      provider: "hubspot",
      accountId: String(data.portalId),
    };
  }

  async sync(): Promise<SyncResult> {
    if (!this.accessToken) {
      return { success: false, recordsSynced: 0, errors: ["Not connected"] };
    }

    let total = 0;
    const errors: string[] = [];

    // Sync companies
    try {
      const companies = await this.fetchAll("/crm/v3/objects/companies", ["name", "industry", "domain"]);
      total += companies.length;
    } catch (e) {
      errors.push(`Companies sync failed: ${e instanceof Error ? e.message : String(e)}`);
    }

    // Sync contacts
    try {
      const contacts = await this.fetchAll("/crm/v3/objects/contacts", ["firstname", "lastname", "email", "company"]);
      total += contacts.length;
    } catch (e) {
      errors.push(`Contacts sync failed: ${e instanceof Error ? e.message : String(e)}`);
    }

    // Sync deals
    try {
      const deals = await this.fetchAll("/crm/v3/objects/deals", ["dealname", "amount", "dealstage", "closedate"]);
      total += deals.length;
    } catch (e) {
      errors.push(`Deals sync failed: ${e instanceof Error ? e.message : String(e)}`);
    }

    return { success: errors.length === 0, recordsSynced: total, errors: errors.length > 0 ? errors : undefined };
  }

  async disconnect(): Promise<void> {
    this.accessToken = null;
  }

  async getAccounts(params: PaginationParams): Promise<SyncedAccount[]> {
    const results = await this.fetchPage("/crm/v3/objects/companies", ["name", "industry", "domain"], params);
    return results.map((r) => ({
      externalId: r.id,
      name: r.properties?.name ?? "Unknown",
      industry: r.properties?.industry ?? undefined,
      metadata: { domain: r.properties?.domain },
    }));
  }

  async getContacts(params: PaginationParams): Promise<SyncedContact[]> {
    const results = await this.fetchPage("/crm/v3/objects/contacts", ["firstname", "lastname", "email", "company"], params);
    return results.map((r) => ({
      externalId: r.id,
      name: `${r.properties?.firstname ?? ""} ${r.properties?.lastname ?? ""}`.trim() || "Unknown",
      email: r.properties?.email ?? undefined,
    }));
  }

  async getDeals(params: PaginationParams): Promise<SyncedDeal[]> {
    const results = await this.fetchPage("/crm/v3/objects/deals", ["dealname", "amount", "dealstage"], params);
    return results.map((r) => ({
      externalId: r.id,
      name: r.properties?.dealname ?? "Unknown Deal",
      value: parseFloat(r.properties?.amount ?? "0") || 0,
      stage: r.properties?.dealstage ?? "unknown",
    }));
  }

  // Helpers

  private async fetchPage(
    endpoint: string,
    properties: string[],
    params: PaginationParams
  ): Promise<Array<{ id: string; properties: Record<string, string> }>> {
    const url = new URL(`${HUBSPOT_API}${endpoint}`);
    url.searchParams.set("properties", properties.join(","));
    url.searchParams.set("limit", String(params.limit ?? 50));
    if (params.cursor) url.searchParams.set("after", params.cursor);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (!res.ok) throw new Error(`HubSpot API error: ${res.status}`);
    const data = await res.json();
    return data.results ?? [];
  }

  private async fetchAll(
    endpoint: string,
    properties: string[]
  ): Promise<Array<{ id: string; properties: Record<string, string> }>> {
    const all: Array<{ id: string; properties: Record<string, string> }> = [];
    let cursor: string | undefined;

    do {
      const url = new URL(`${HUBSPOT_API}${endpoint}`);
      url.searchParams.set("properties", properties.join(","));
      url.searchParams.set("limit", "100");
      if (cursor) url.searchParams.set("after", cursor);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });

      if (!res.ok) throw new Error(`HubSpot API error: ${res.status}`);
      const data = await res.json();
      all.push(...(data.results ?? []));
      cursor = data.paging?.next?.after;
    } while (cursor);

    return all;
  }
}
