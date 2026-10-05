import React from 'react';
import { 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Briefcase,
  DollarSign,
  Cpu,
  Users,
  Headphones
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { AgentInfo } from '../../types';

export const AgentsView: React.FC = () => {
  const { agents, setSelectedAgentId, setActiveNav, monochromeMode } = useAura();

  const isLight = monochromeMode === 'light';

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'agent-marketing':
        return Flame;
      case 'agent-sales':
        return Briefcase;
      case 'agent-finance':
        return DollarSign;
      case 'agent-operations':
        return Cpu;
      case 'agent-hr':
        return Users;
      case 'agent-support':
        return Headphones;
      default:
        return Bot;
    }
  };

  const handleOpenAgent = (agent: AgentInfo) => {
    setSelectedAgentId(agent.id);
    if (agent.id === 'agent-marketing') {
      setActiveNav('marketing-agent');
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-neutral-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Department Neural Agents
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              6 Specialized Operating Cores
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Organizational AI Agents
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Each department operates an autonomous AI agent grounded in its own domain tools, APIs, and governance policies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border font-semibold ${
            isLight ? 'bg-neutral-100 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            6 of 6 Agents Online
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const Icon = getAgentIcon(agent.id);
          const isMarketing = agent.id === 'agent-marketing';
          const hasAlerts = agent.alerts > 0;

          return (
            <div
              key={agent.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                isLight
                  ? isMarketing ? 'bg-neutral-50 border-neutral-400 shadow-md' : 'bg-white border-neutral-200 hover:border-neutral-300'
                  : isMarketing ? 'bg-neutral-950 border-neutral-600 shadow-md' : 'bg-black border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                        isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
                        <span className={`font-semibold ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>● {agent.status}</span>
                      </div>
                    </div>
                  </div>

                  {isMarketing && (
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                      isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                    }`}>
                      Hero Agent
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  {agent.description}
                </p>

                {/* Connected Systems */}
                <div className="space-y-1.5 mb-4">
                  <div className={`text-[10px] uppercase font-mono tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Connected Systems:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.connectedSystems.map((sys, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isLight ? 'bg-neutral-100 text-neutral-800 border-neutral-200' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Agent Metrics & Telemetry */}
                <div className={`grid grid-cols-3 gap-2 py-2.5 border-t mb-4 text-[11px] font-mono ${
                  isLight ? 'border-neutral-200' : 'border-neutral-800'
                }`}>
                  <div>
                    <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Last Activity</div>
                    <div className={`font-medium truncate ${isLight ? 'text-black' : 'text-white'}`}>{agent.lastActivity}</div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Workflows</div>
                    <div className={`font-medium ${isLight ? 'text-black' : 'text-white'}`}>{agent.activeWorkflows} Active</div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Alerts</div>
                    <div className={`font-medium ${hasAlerts ? 'font-bold underline' : ''} ${isLight ? 'text-black' : 'text-white'}`}>
                      {agent.alerts} {hasAlerts ? 'Attention' : 'None'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenAgent(agent)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                  isLight
                    ? isMarketing
                      ? 'bg-black text-white hover:bg-neutral-800 shadow-sm'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300'
                    : isMarketing
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700'
                }`}
              >
                <span>OPEN AGENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
