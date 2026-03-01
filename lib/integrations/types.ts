export interface ConnectConfig {
  accessToken?: string;
  refreshToken?: string;
  instanceUrl?: string;
  [key: string]: unknown;
}

export interface ConnectionResult {
  success: boolean;
  provider: string;
  accountId?: string;
}

export interface SyncResult {
  success: boolean;
  recordsSynced: number;
  errors?: string[];
}

export interface PaginationParams {
  cursor?: string;
  limit?: number;
}

export interface SyncedAccount {
  externalId: string;
  name: string;
  industry?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncedContact {
  externalId: string;
  name: string;
  email?: string;
  accountExternalId?: string;
}

export interface SyncedDeal {
  externalId: string;
  name: string;
  value: number;
  stage: string;
  accountExternalId?: string;
}

export interface IntegrationAdapter {
  connect(config: ConnectConfig): Promise<ConnectionResult>;
  sync(): Promise<SyncResult>;
  disconnect(): Promise<void>;
  getAccounts?(params: PaginationParams): Promise<SyncedAccount[]>;
  getContacts?(params: PaginationParams): Promise<SyncedContact[]>;
  getDeals?(params: PaginationParams): Promise<SyncedDeal[]>;
}
