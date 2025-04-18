
export interface Agent {
  id: string;
  name: string;
  stripeAccountId: string;
  monthlyBudget: number;
  balanceRemaining: number;
  permissions: AgentPermission[];
}

export type AgentPermission = 'create_charge' | 'approve_payouts' | 'create_mission' | 'manage_workers' | 'view_analytics';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: MissionStatus;
  createdAt: string;
  completedAt?: string;
  metadata: Record<string, any>;
  agentId: string;
}

export type MissionStatus = 'pending' | 'assigned' | 'completed' | 'validated' | 'paid' | 'rejected';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface AIWorkPayResponse {
  success: boolean;
  missionId?: string;
  error?: string;
  data?: any;
}

export interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  url: string;
  description?: string;
  isPrivate: boolean;
  lastSynced?: string;
  isSyncing?: boolean;
}

export interface GitHubSyncStatus {
  connected: boolean;
  lastSynced?: string;
  repos?: GitHubRepo[];
}
