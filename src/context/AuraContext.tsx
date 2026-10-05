import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AgentInfo, 
  ApprovalAction, 
  CampaignData, 
  DepartmentHealth, 
  DepartmentName, 
  IntegrationApp, 
  IntelligenceInsight, 
  ActivityEntry, 
  WorkflowStep 
} from '../types';
import { 
  INITIAL_AGENTS, 
  INITIAL_APPROVALS, 
  CAMPAIGNS_DATA, 
  INITIAL_DEPARTMENT_HEALTH, 
  INITIAL_INTEGRATIONS, 
  INTELLIGENCE_FEED, 
  INITIAL_ACTIVITY_LOG, 
  INITIAL_WORKFLOW_STEPS 
} from '../data/mockEnterpriseData';

export type NavItem = 
  | 'overview' 
  | 'agents' 
  | 'marketing-agent'
  | 'departments' 
  | 'insights' 
  | 'workflows' 
  | 'approvals' 
  | 'execution'
  | 'cross-department'
  | 'integrations' 
  | 'activity' 
  | 'settings';

interface CommandResponse {
  query: string;
  text: string;
  source: string;
  signals?: Array<{ department: string; note: string }>;
  actions?: Array<{ label: string; actionId: string }>;
  timestamp: string;
}

interface AuraContextType {
  activeNav: NavItem;
  setActiveNav: (nav: NavItem) => void;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  selectedIntegration: IntegrationApp | null;
  setSelectedIntegration: (app: IntegrationApp | null) => void;
  
  // Data entities
  departmentHealth: DepartmentHealth[];
  agents: AgentInfo[];
  campaigns: CampaignData[];
  intelligenceFeed: IntelligenceInsight[];
  approvals: ApprovalAction[];
  workflowSteps: WorkflowStep[];
  integrations: IntegrationApp[];
  activityLogs: ActivityEntry[];
  
  // Workflow & Hero Execution States
  isWorkflowBuilderOpen: boolean;
  setIsWorkflowBuilderOpen: (open: boolean) => void;
  workflowActivated: boolean;
  activateWorkflow: () => void;
  updateWorkflowStep: (stepId: string, updates: Partial<WorkflowStep>) => void;
  addWorkflowStep: (step: WorkflowStep) => void;
  removeWorkflowStep: (stepId: string) => void;
  
  // Approval operations
  approveAction: (actionId: string) => void;
  rejectAction: (actionId: string) => void;
  
  // Execution Simulation
  executionProgress: number; // 0 to 100
  executionStatus: 'idle' | 'executing' | 'completed' | 'monitoring';
  startExecutionSimulation: () => void;
  
  // Global Command Bar
  isCommandBarOpen: boolean;
  setIsCommandBarOpen: (open: boolean) => void;
  commandInput: string;
  setCommandInput: (val: string) => void;
  commandLoading: boolean;
  lastCommandResponse: CommandResponse | null;
  submitCommand: (query: string) => Promise<void>;
  
  // Notification Drawer
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
  
  // Demo Pitch Assistant
  demoGuideStep: number;
  setDemoGuideStep: (step: number) => void;
  isDemoGuideVisible: boolean;
  setIsDemoGuideVisible: (visible: boolean) => void;
  resetDemoState: () => void;

  // Pure Black & White Theme Mode
  monochromeMode: 'dark' | 'light';
  setMonochromeMode: (mode: 'dark' | 'light') => void;
  toggleMonochromeMode: () => void;

  // Selected Insight Deep-dive Modal
  selectedInsight: IntelligenceInsight | null;
  setSelectedInsight: (insight: IntelligenceInsight | null) => void;
}

const AuraContext = createContext<AuraContextType | undefined>(undefined);

export const AuraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNav, setActiveNav] = useState<NavItem>('overview');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('agent-marketing');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationApp | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<IntelligenceInsight | null>(null);

  // Core entities
  const [departmentHealth, setDepartmentHealth] = useState<DepartmentHealth[]>(INITIAL_DEPARTMENT_HEALTH);
  const [agents, setAgents] = useState<AgentInfo[]>(INITIAL_AGENTS);
  const [campaigns, setCampaigns] = useState<CampaignData[]>(CAMPAIGNS_DATA);
  const [intelligenceFeed, setIntelligenceFeed] = useState<IntelligenceInsight[]>(INTELLIGENCE_FEED);
  const [approvals, setApprovals] = useState<ApprovalAction[]>(INITIAL_APPROVALS);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(INITIAL_WORKFLOW_STEPS);
  const [integrations, setIntegrations] = useState<IntegrationApp[]>(INITIAL_INTEGRATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityEntry[]>(INITIAL_ACTIVITY_LOG);

  // Workflow builder & Hero execution
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
  const [workflowActivated, setWorkflowActivated] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'executing' | 'completed' | 'monitoring'>('idle');

  // Command bar
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandLoading, setCommandLoading] = useState(false);
  const [lastCommandResponse, setLastCommandResponse] = useState<CommandResponse | null>(null);

  // Notifications
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  // Demo Presentation Bar
  const [demoGuideStep, setDemoGuideStep] = useState(1);
  const [isDemoGuideVisible, setIsDemoGuideVisible] = useState(true);

  // Pure Monochrome Theme Mode ('light' = pure white #FFFFFF, 'dark' = pure black #000000)
  const [monochromeMode, setMonochromeMode] = useState<'dark' | 'light'>('light');

  const toggleMonochromeMode = () => {
    setMonochromeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync HTML/body styles dynamically
  useEffect(() => {
    const isLight = monochromeMode === 'light';
    if (isLight) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-pure-light');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#111111';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('theme-pure-light');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#EDEDED';
    }
  }, [monochromeMode]);

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandBarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateWorkflowStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflowSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, ...updates } : step))
    );
  };

  const addWorkflowStep = (step: WorkflowStep) => {
    setWorkflowSteps((prev) => [...prev, step]);
  };

  const removeWorkflowStep = (stepId: string) => {
    setWorkflowSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const activateWorkflow = () => {
    setWorkflowActivated(true);
    setIsWorkflowBuilderOpen(false);

    // Add activity log entry
    const newLog: ActivityEntry = {
      id: `act-${Date.now()}`,
      time: 'Just now',
      timestamp: 'Today',
      agent: 'Marketing Agent',
      department: 'Marketing',
      action: 'Campaign Optimization Workflow Activated',
      status: 'Pending',
      impact: 'Generated Pending Approval action #appr-orion-1 for Operations Admin review.',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // Ensure approval action exists and is pending
    setApprovals((prev) => {
      return prev.map((item) => {
        if (item.id === 'appr-orion-1') {
          return { ...item, status: 'PENDING' };
        }
        return item;
      });
    });

    // Advance demo step
    setDemoGuideStep(5);
    setActiveNav('approvals');
  };

  const startExecutionSimulation = () => {
    setExecutionStatus('executing');
    setExecutionProgress(15);
    setActiveNav('execution');

    setTimeout(() => setExecutionProgress(35), 700);
    setTimeout(() => setExecutionProgress(65), 1400);
    setTimeout(() => setExecutionProgress(85), 2100);
    setTimeout(() => {
      setExecutionProgress(100);
      setExecutionStatus('completed');

      // Update approval action to completed
      setApprovals((prev) =>
        prev.map((item) =>
          item.id === 'appr-orion-1' ? { ...item, status: 'COMPLETED' } : item
        )
      );

      // Add completed activity log
      const completedLog: ActivityEntry = {
        id: `act-exec-${Date.now()}`,
        time: 'Just now',
        timestamp: 'Today',
        agent: 'Marketing Agent',
        department: 'Marketing',
        action: 'Campaign Orion Ad Allocation Deployed & Verification Started',
        status: 'Completed',
        impact: 'Rebalanced 15% budget to Creative B on Meta Ads & LinkedIn. Monitoring telemetry active.',
      };
      setActivityLogs((prev) => [completedLog, ...prev]);

      // Transition to monitoring
      setTimeout(() => {
        setExecutionStatus('monitoring');
        setDemoGuideStep(7);
      }, 1000);
    }, 2800);
  };

  const approveAction = (actionId: string) => {
    setApprovals((prev) =>
      prev.map((item) => {
        if (item.id === actionId) {
          return { ...item, status: 'EXECUTING' };
        }
        return item;
      })
    );

    if (actionId === 'appr-orion-1') {
      setDemoGuideStep(6);
      startExecutionSimulation();
    }
  };

  const rejectAction = (actionId: string) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === actionId ? { ...item, status: 'REJECTED' } : item))
    );
  };

  const submitCommand = async (query: string) => {
    if (!query.trim()) return;
    setCommandLoading(true);
    setCommandInput(query);

    try {
      const res = await fetch('/api/aura-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, activeDepartment: activeNav }),
      });

      if (res.ok) {
        const data = await res.json();
        setLastCommandResponse({
          query,
          text: data.text,
          source: data.source || 'AuraOS Intelligence',
          signals: data.signals,
          actions: data.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      } else {
        throw new Error('Server query failed');
      }
    } catch {
      // Local graceful fallback
      setLastCommandResponse({
        query,
        text: `AuraOS synthesized 3 signals for "${query}":\n1. Marketing: Campaign Orion creative fatigue detected (-18% CTR).\n2. Sales: Lead response queue length increased by 4.2 hours.\n3. Operations: South Region fulfillment backlog resolved.\n\nRecommended Action: Authorize Campaign Orion rebalance to recover ₹124,000 weekly wasted spend.`,
        source: 'AuraOS Fallback Engine',
        signals: [
          { department: 'Marketing', note: 'Campaign Orion creative fatigue (-18% CTR)' },
          { department: 'Sales', note: 'SDR follow-up latency +4.2h' },
        ],
        actions: [
          { label: 'View Marketing Anomaly', actionId: 'nav-marketing' },
          { label: 'Review Approvals', actionId: 'nav-approvals' },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      setCommandLoading(false);
    }
  };

  const markNotificationsAsRead = () => {
    setUnreadNotificationsCount(0);
  };

  const resetDemoState = () => {
    setDepartmentHealth(INITIAL_DEPARTMENT_HEALTH);
    setAgents(INITIAL_AGENTS);
    setCampaigns(CAMPAIGNS_DATA);
    setIntelligenceFeed(INTELLIGENCE_FEED);
    setApprovals(INITIAL_APPROVALS);
    setWorkflowSteps(INITIAL_WORKFLOW_STEPS);
    setIntegrations(INITIAL_INTEGRATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOG);
    setWorkflowActivated(false);
    setExecutionProgress(0);
    setExecutionStatus('idle');
    setLastCommandResponse(null);
    setCommandInput('');
    setDemoGuideStep(1);
    setActiveNav('overview');
    setSelectedAgentId('agent-marketing');
  };

  return (
    <AuraContext.Provider
      value={{
        activeNav,
        setActiveNav,
        selectedAgentId,
        setSelectedAgentId,
        selectedIntegration,
        setSelectedIntegration,
        departmentHealth,
        agents,
        campaigns,
        intelligenceFeed,
        approvals,
        workflowSteps,
        integrations,
        activityLogs,
        isWorkflowBuilderOpen,
        setIsWorkflowBuilderOpen,
        workflowActivated,
        activateWorkflow,
        updateWorkflowStep,
        addWorkflowStep,
        removeWorkflowStep,
        approveAction,
        rejectAction,
        executionProgress,
        executionStatus,
        startExecutionSimulation,
        isCommandBarOpen,
        setIsCommandBarOpen,
        commandInput,
        setCommandInput,
        commandLoading,
        lastCommandResponse,
        submitCommand,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        unreadNotificationsCount,
        markNotificationsAsRead,
        demoGuideStep,
        setDemoGuideStep,
        isDemoGuideVisible,
        setIsDemoGuideVisible,
        resetDemoState,
        monochromeMode,
        setMonochromeMode,
        toggleMonochromeMode,
        selectedInsight,
        setSelectedInsight,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
};

export const useAura = () => {
  const context = useContext(AuraContext);
  if (!context) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
};
