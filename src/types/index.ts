export type DepartmentName = 
  | 'Marketing' 
  | 'Sales' 
  | 'Finance' 
  | 'Operations' 
  | 'HR' 
  | 'Customer Support';

export type AgentStatus = 'Active' | 'Paused' | 'Attention' | 'Syncing';

export type HealthStatus = 'Healthy' | 'Needs Attention' | 'Nominal' | 'Critical';

export type AutonomyLevel = 'Recommend Only' | 'Approval Required' | 'Semi-Autonomous';

export interface DepartmentHealth {
  department: DepartmentName;
  status: HealthStatus;
  agentName: string;
  activeWorkflows: number;
  openAlerts: number;
  efficiencyIndex: number;
  summary: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  department: DepartmentName;
  status: AgentStatus;
  description: string;
  connectedSystems: string[];
  lastActivity: string;
  activeWorkflows: number;
  alerts: number;
  autonomyLevel: AutonomyLevel;
  dataReadPermissions: string[];
  canExecuteAutonomously: boolean;
  modelEngine: string;
}

export interface CampaignData {
  id: string;
  name: string;
  spend: string;
  spendNum: number;
  impressions: string;
  clicks: string;
  ctr: string;
  ctrNum: number;
  cpc: string;
  cpcNum: number;
  conversions: number;
  status: 'Healthy' | 'Needs Attention';
  alert?: string;
  creativePerformance: {
    creativeA: { name: string; type: string; ctr: string; cpc: string; fatigue: string };
    creativeB: { name: string; type: string; ctr: string; cpc: string; fatigue: string };
  };
}

export interface WorkflowStep {
  id: string;
  type: 'TRIGGER' | 'ANALYZE' | 'DECIDE' | 'RECOMMEND' | 'APPROVAL' | 'EXECUTE' | 'VERIFY';
  title: string;
  description: string;
  enabled: boolean;
  requiredRole?: string;
  condition?: string;
  configSummary?: string;
}

export interface ApprovalAction {
  id: string;
  agentId: string;
  agentName: string;
  department: DepartmentName;
  title: string;
  description: string;
  risk: 'Low' | 'Medium' | 'High';
  expectedImpact: string;
  status: 'PENDING' | 'APPROVED' | 'EXECUTING' | 'COMPLETED' | 'REJECTED';
  timestamp: string;
  metricsSnapshot: {
    beforeLabel: string;
    beforeValue: string;
    targetLabel: string;
    targetValue: string;
  };
  details: {
    reasoning: string;
    affectedResources: string[];
    rollbackPlan: string;
  };
}

export interface ExecutionLogItem {
  time: string;
  message: string;
  status: 'completed' | 'active' | 'pending';
}

export interface IntelligenceInsight {
  id: string;
  agentName: string;
  department: DepartmentName;
  title: string;
  summary: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  isHero?: boolean;
  whyDetails?: {
    factors: string[];
    crossDepartmentImpact: string;
  };
  suggestedAction?: {
    label: string;
    targetWorkflowId?: string;
  };
}

export interface IntegrationApp {
  id: string;
  name: string;
  category: DepartmentName | 'Cross-Functional';
  status: 'CONNECTED' | 'AVAILABLE' | 'NEEDS AUTHORIZATION';
  icon: string;
  syncFrequency: string;
  lastSync: string;
  recordsSynced: string;
  dataTypes: string[];
}

export interface ActivityEntry {
  id: string;
  time: string;
  timestamp: string;
  agent: string;
  department: DepartmentName;
  action: string;
  status: 'Completed' | 'Attention' | 'Pending' | 'Executing';
  impact: string;
  details?: string;
}
