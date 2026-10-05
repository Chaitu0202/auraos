import React from 'react';
import { 
  Bot, 
  GitBranch, 
  Sparkles, 
  CheckSquare, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Building2,
  ChevronRight,
  Flame,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { ADMIN_NAME } from '../../data/mockEnterpriseData';

export const OverviewView: React.FC = () => {
  const { 
    departmentHealth, 
    intelligenceFeed, 
    approvals, 
    setActiveNav, 
    setSelectedInsight,
    setSelectedAgentId,
    setIsWorkflowBuilderOpen,
    monochromeMode
  } = useAura();

  const isLight = monochromeMode === 'light';
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;

  const handleInsightClick = (insightId: string) => {
    const item = intelligenceFeed.find((i) => i.id === insightId);
    if (item) {
      if (item.id === 'insight-mkt-1') {
        setActiveNav('marketing-agent');
      } else {
        setSelectedInsight(item);
      }
    }
  };

  const handleDepartmentClick = (depName: string) => {
    if (depName === 'Marketing') {
      setActiveNav('marketing-agent');
    } else {
      const targetAgent = depName.toLowerCase().includes('sales') 
        ? 'agent-sales' 
        : depName.toLowerCase().includes('fin') 
        ? 'agent-finance' 
        : depName.toLowerCase().includes('oper') 
        ? 'agent-operations'
        : depName.toLowerCase().includes('hr')
        ? 'agent-hr'
        : 'agent-support';
      setSelectedAgentId(targetAgent);
      setActiveNav('agents');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Executive Welcome & Key Metrics Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-neutral-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Command Center
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Autonomous Layer Operating
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Good morning, {ADMIN_NAME}.
          </h1>
          <p className={`text-sm mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Here&apos;s what needs your attention today across the organization.
          </p>
        </div>

        {/* Hero Demo Trigger Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNav('marketing-agent')}
            className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
              isLight
                ? 'bg-black hover:bg-neutral-800 text-white shadow-sm'
                : 'bg-white hover:bg-neutral-200 text-black shadow-sm'
            }`}
          >
            <span>Launch Marketing Optimization Hero Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Core Enterprise Command KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className={`p-4 rounded-lg border transition-all ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-1.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Active Agents</span>
            <Bot className="w-4 h-4" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            12
          </div>
          <div className={`text-[11px] mt-1 flex items-center gap-1 font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
            6 Depts · 100% Uptime
          </div>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-1.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Active Workflows</span>
            <GitBranch className="w-4 h-4" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            28
          </div>
          <div className={`text-[11px] mt-1 font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            25 autonomous · 3 gated
          </div>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-1.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>Insights Today</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            47
          </div>
          <div className={`text-[11px] mt-1 font-mono flex items-center gap-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            <TrendingUp className="w-3 h-3" />
            +8 from yesterday
          </div>
        </div>

        <div 
          onClick={() => setActiveNav('approvals')}
          className={`p-4 rounded-lg border transition-all cursor-pointer group ${
            isLight
              ? 'bg-neutral-50 border-neutral-300 hover:border-black'
              : 'bg-neutral-900 border-neutral-700 hover:border-white'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
            <span className={isLight ? 'text-black' : 'text-white'}>Pending Approvals</span>
            <CheckSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            {pendingApprovalsCount}
          </div>
          <div className={`text-[11px] mt-1 flex items-center justify-between font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            <span>Requires sign-off</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-1.5 font-medium ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
            <span>Critical Alerts</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>
            2
          </div>
          <div className={`text-[11px] mt-1 font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Marketing (1) · Sales (1)
          </div>
        </div>
      </div>

      {/* ORGANIZATION HEALTH Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Organization Health Status
          </h2>
          <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Live Health Index: <strong className={isLight ? 'text-black' : 'text-white'}>88.5 / 100</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {departmentHealth.map((dept) => {
            const isAttention = dept.status === 'Needs Attention';
            return (
              <button
                key={dept.department}
                onClick={() => handleDepartmentClick(dept.department)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isLight
                    ? isAttention
                      ? 'bg-neutral-100 border-neutral-400 font-medium'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                    : isAttention
                    ? 'bg-neutral-900 border-neutral-600 font-medium'
                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold truncate ${isLight ? 'text-black' : 'text-white'}`}>
                    {dept.department}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAttention 
                        ? isLight ? 'bg-black ring-2 ring-neutral-300' : 'bg-white ring-2 ring-neutral-600'
                        : isLight ? 'bg-neutral-400' : 'bg-neutral-500'
                    }`}
                  />
                </div>
                <div className="text-[11px] font-mono mb-1">
                  <span className={isLight ? 'text-black font-semibold' : 'text-white font-semibold'}>
                    {dept.status}
                  </span>
                </div>
                <div className={`text-[10px] font-mono flex items-center justify-between ${
                  isLight ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  <span>Eff: {dept.efficiencyIndex}%</span>
                  <span>{dept.activeWorkflows} WFs</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTELLIGENCE FEED Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <h2 className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Cross-Department Intelligence Feed
            </h2>
          </div>
          <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Click any insight for deep diagnosis & action
          </span>
        </div>

        <div className="space-y-2">
          {intelligenceFeed.map((insight) => {
            const isMarketingHero = insight.isHero;
            return (
              <div
                key={insight.id}
                onClick={() => handleInsightClick(insight.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border group ${
                  isLight
                    ? isMarketingHero
                      ? 'bg-neutral-50 border-neutral-400 shadow-sm'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                    : isMarketingHero
                    ? 'bg-neutral-900 border-neutral-600 shadow-sm'
                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                      {insight.agentName}
                    </span>
                    <span className="text-neutral-500 text-xs">·</span>
                    <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      {insight.timestamp}
                    </span>
                    {isMarketingHero && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                        isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                      }`}>
                        Hero Diagnostic
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${
                    isLight ? 'text-neutral-600 group-hover:text-black' : 'text-neutral-400 group-hover:text-white'
                  }`}>
                    <span>Inspect Diagnosis</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className={`text-sm font-semibold mb-1 transition-colors ${
                  isLight ? 'text-neutral-900 group-hover:text-black' : 'text-neutral-100 group-hover:text-white'
                }`}>
                  &ldquo;{insight.title}&rdquo;
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  {insight.summary}
                </p>

                {isMarketingHero && (
                  <div className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isLight ? 'border-neutral-200' : 'border-neutral-800'
                  }`}>
                    <div className={`flex items-center gap-2 text-[11px] font-mono ${
                      isLight ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      <span>● Creative A Fatigue (4.8x)</span>
                      <span>·</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">● Creative B +42% CTR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveNav('marketing-agent');
                          setIsWorkflowBuilderOpen(true);
                        }}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          isLight
                            ? 'bg-black hover:bg-neutral-800 text-white'
                            : 'bg-white hover:bg-neutral-200 text-black'
                        }`}
                      >
                        Create Optimization Workflow
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Architecture Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-900' : 'bg-neutral-950 border-neutral-800 text-neutral-100'
      }`}>
        <div className="space-y-1">
          <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            AuraOS Unified Operating Fabric
          </div>
          <div className="text-sm font-semibold">
            Marketing · Sales · Finance · Operations · HR · Support
          </div>
          <p className={`text-xs ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Synchronizing 12 autonomous agents across CRM, ERP, Advertising, and Dispatch telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNav('cross-department')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              isLight
                ? 'bg-white hover:bg-neutral-200 text-black border-neutral-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            View Cross-Intelligence Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
