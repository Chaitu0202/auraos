import React from 'react';
import { useAura, NavItem } from '../../context/AuraContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Layers, 
  CheckSquare, 
  Network,
  RotateCcw,
  HelpCircle
} from 'lucide-react';

export const DemoGuideBar: React.FC = () => {
  const { 
    demoGuideStep, 
    setDemoGuideStep, 
    setActiveNav, 
    setIsWorkflowBuilderOpen, 
    setIsCommandBarOpen, 
    submitCommand,
    isDemoGuideVisible,
    monochromeMode
  } = useAura();

  if (!isDemoGuideVisible) return null;

  const isLight = monochromeMode === 'light';

  const steps = [
    {
      step: 1,
      title: '1. Overview',
      subtitle: 'Org Health & Signal Feed',
      nav: 'overview' as NavItem,
      action: () => setActiveNav('overview'),
    },
    {
      step: 2,
      title: '2. Marketing Agent',
      subtitle: 'Multi-Channel Telemetry',
      nav: 'marketing-agent' as NavItem,
      action: () => setActiveNav('marketing-agent'),
    },
    {
      step: 3,
      title: '3. Anomaly Analysis',
      subtitle: 'Campaign Orion Fatigue',
      nav: 'marketing-agent' as NavItem,
      action: () => setActiveNav('marketing-agent'),
    },
    {
      step: 4,
      title: '4. Workflow Builder',
      subtitle: 'Autonomous Pipeline',
      nav: 'workflows' as NavItem,
      action: () => {
        setActiveNav('marketing-agent');
        setIsWorkflowBuilderOpen(true);
      },
    },
    {
      step: 5,
      title: '5. Executive Approval',
      subtitle: 'Human-in-the-Loop Sign-off',
      nav: 'approvals' as NavItem,
      action: () => setActiveNav('approvals'),
    },
    {
      step: 6,
      title: '6. Live Execution',
      subtitle: 'Deployment Timeline',
      nav: 'execution' as NavItem,
      action: () => setActiveNav('execution'),
    },
    {
      step: 7,
      title: '7. Outcome Verification',
      subtitle: 'Simulated 48h Outcome',
      nav: 'execution' as NavItem,
      action: () => setActiveNav('execution'),
    },
    {
      step: 8,
      title: '8. Cross-Department AI',
      subtitle: '"Ask AuraOS Anything"',
      nav: 'cross-department' as NavItem,
      action: () => {
        setActiveNav('cross-department');
        setIsCommandBarOpen(true);
        submitCommand('Why did revenue drop this week?');
      },
    },
  ];

  return (
    <div className={`border-b px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs transition-colors ${
      isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-[#050505] border-neutral-800 text-neutral-200'
    }`}>
      <div className="flex items-center gap-2">
        <div className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold border ${
          isLight ? 'bg-neutral-200 text-neutral-800 border-neutral-300' : 'bg-neutral-900 text-neutral-200 border-neutral-700'
        }`}>
          Hero Demo Workflow
        </div>
        <span className={`text-[11px] hidden xl:inline ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
          Flow: <strong className={isLight ? 'text-black' : 'text-white'}>Anomaly &rarr; Diagnosis &rarr; Workflow &rarr; Sign-off &rarr; Execution &rarr; Verification</strong>
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {steps.map((s) => {
          const isCurrent = demoGuideStep === s.step;
          const isPassed = demoGuideStep > s.step;

          return (
            <button
              key={s.step}
              onClick={() => {
                setDemoGuideStep(s.step);
                s.action();
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-all border ${
                isCurrent
                  ? isLight
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-black border-white font-semibold shadow-sm'
                  : isPassed
                  ? isLight
                    ? 'bg-neutral-100 text-neutral-700 border-neutral-200'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  : isLight
                    ? 'bg-transparent text-neutral-400 border-transparent hover:text-black'
                    : 'bg-transparent text-neutral-600 border-transparent hover:text-neutral-300'
              }`}
            >
              {isPassed ? (
                <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-black' : 'text-white'}`} />
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isCurrent 
                    ? isLight ? 'bg-white' : 'bg-black' 
                    : isLight ? 'bg-neutral-300' : 'bg-neutral-700'
                }`} />
              )}
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
