import React, { useState } from 'react';
import { 
  Network, 
  ArrowRight, 
  Command, 
  CheckCircle2, 
  Zap
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const CrossDepartmentView: React.FC = () => {
  const { setIsCommandBarOpen, submitCommand, monochromeMode } = useAura();
  const [synchronizedPolicyActive, setSynchronizedPolicyActive] = useState(false);

  const isLight = monochromeMode === 'light';

  const signals = [
    {
      agent: 'Marketing Agent',
      department: 'Marketing',
      badge: 'Signal A',
      metric: '+22% Inbound MQL Volume',
      detail: 'Aggressive top-of-funnel campaign pacing generated 840 extra inbound submissions this week.',
    },
    {
      agent: 'Sales Agent',
      department: 'Sales',
      badge: 'Signal B',
      metric: 'Lead Follow-up Time +4.2 Hours',
      detail: 'SDR qualification capacity saturated; response latency climbed from 42 mins to 4.8 hours.',
    },
    {
      agent: 'Finance Agent',
      department: 'Finance',
      badge: 'Signal C',
      metric: '₹2.15M Deferred ARR Slippage',
      detail: 'Delayed follow-ups cooled mid-market prospects, reducing close-rate conversion from 18% to 14%.',
    },
    {
      agent: 'Operations Agent',
      department: 'Operations',
      badge: 'Signal D',
      metric: 'Fulfillment Capacity at 84%',
      detail: 'Dispatch hub can accommodate 35% higher throughput if enterprise shipments are scheduled on Tuesdays.',
    },
  ];

  const handleRunQuery = () => {
    setIsCommandBarOpen(true);
    submitCommand('Why did revenue drop this week?');
  };

  const handleDeployPolicy = () => {
    setSynchronizedPolicyActive(true);
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
              Multi-Agent Orchestration Matrix
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Unified Operating Layer
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Cross-Department Intelligence
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            AuraOS combines signals across separate departmental silos into coherent organizational decisions.
          </p>
        </div>

        <button
          onClick={handleRunQuery}
          className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-2 transition-all shadow-sm ${
            isLight
              ? 'bg-black text-white hover:bg-neutral-800'
              : 'bg-white text-black hover:bg-neutral-200'
          }`}
        >
          <Command className="w-3.5 h-3.5" />
          <span>Ask AuraOS: &ldquo;Why did revenue drop?&rdquo;</span>
        </button>
      </div>

      {/* Cross-Department Synthesis Banner */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900 shadow-sm' : 'bg-neutral-950 border-neutral-800 text-neutral-100 shadow-lg'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-md border flex items-center justify-center font-bold ${
              isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
            }`}>
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-xs font-mono uppercase tracking-wider font-semibold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                AURAOS CROSS-SYSTEM SYNTHESIS
              </div>
              <h2 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                Multi-Department Bottleneck Correlation
              </h2>
            </div>
          </div>
          <span className={`text-xs font-mono px-2.5 py-1 rounded border font-semibold ${
            isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            Convergence Score: 98%
          </span>
        </div>

        <div className={`p-4 rounded-xl border text-sm font-medium leading-relaxed ${
          isLight ? 'bg-white border-neutral-300 text-black' : 'bg-black border-neutral-800 text-white'
        }`}>
          &ldquo;Marketing campaign volume increased 22%, but qualified lead conversion remained flat. Sales follow-up time increased by 4 hours. AuraOS recommends synchronizing campaign timing with sales capacity.&rdquo;
        </div>

        {/* Dynamic Multi-Agent Signal Graph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {signals.map((sig, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border space-y-2 flex flex-col justify-between ${
                isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded border ${
                    isLight ? 'bg-neutral-100 text-black border-neutral-300' : 'bg-neutral-950 text-white border-neutral-800'
                  }`}>
                    {sig.badge}
                  </span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {sig.agent}
                  </span>
                </div>
                <div className={`text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-white'}`}>
                  {sig.metric}
                </div>
                <p className={`text-[11px] leading-snug ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {sig.detail}
                </p>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                isLight ? 'border-neutral-100 text-neutral-500' : 'border-neutral-800 text-neutral-400'
              }`}>
                <span>Signal verified</span>
                <span className="font-semibold">&darr; AuraOS Substrate</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Policy Trigger */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className={`text-xs ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
            <strong>Prescribed Strategic Policy:</strong> Dynamic Lead Throttling & Priority Tier-1 AE Routing.
          </div>
          <button
            onClick={handleDeployPolicy}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-2 transition-all ${
              synchronizedPolicyActive
                ? isLight
                  ? 'bg-neutral-200 border border-neutral-400 text-black'
                  : 'bg-neutral-800 border border-neutral-600 text-white'
                : isLight
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {synchronizedPolicyActive ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Synchronized Policy Active</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Deploy Cross-Department Policy</span>
              </>
            )}
          </button>
        </div>

        {synchronizedPolicyActive && (
          <div className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
            isLight ? 'bg-neutral-100 border-neutral-400 text-neutral-900' : 'bg-neutral-900 border-neutral-700 text-neutral-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Policy Deployed: Campaign Orion pacing throttled by 15% when SDR queue &gt; 45 leads. Priority ICP leads routed directly to Senior Enterprise AEs.</span>
          </div>
        )}
      </div>

      {/* The Core Thesis: Operating Layer vs Point Bots */}
      <div className={`p-5 rounded-xl border space-y-4 ${
        isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className={`border-b pb-3 ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
          <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Architectural Differentiation
          </div>
          <h3 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
            Why Individual Chatbots Fail &amp; AuraOS Succeeds
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border space-y-2 ${
            isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black border-neutral-800'
          }`}>
            <div className={`text-xs font-bold uppercase font-mono ${isLight ? 'text-black' : 'text-white'}`}>
              ✕ Traditional Point Chatbots
            </div>
            <ul className={`space-y-1.5 text-xs ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <li>• Trapped inside individual departments (e.g. Sales bot cannot inspect marketing ad fatigue).</li>
              <li>• Static Q&amp;A assistants that produce passive text answers without workflow execution.</li>
              <li>• Require humans to manually copy numbers across dashboards and bridge the gap.</li>
              <li>• Zero organizational context or cross-functional telemetry.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border space-y-2 ${
            isLight ? 'bg-neutral-100 border-neutral-300' : 'bg-neutral-900 border-neutral-700'
          }`}>
            <div className={`text-xs font-bold uppercase font-mono ${isLight ? 'text-black' : 'text-white'}`}>
              ✓ AuraOS Organizational Intelligence Layer
            </div>
            <ul className={`space-y-1.5 text-xs ${isLight ? 'text-neutral-800' : 'text-neutral-300'}`}>
              <li>• One connected neural substrate bridging CRM, ERP, Advertising, and HR in real-time.</li>
              <li>• Autonomous cycle: Connect &rarr; Understand &rarr; Analyze &rarr; Recommend &rarr; Execute &rarr; Verify.</li>
              <li>• Responsible AI governance with human-in-the-loop executive sign-off.</li>
              <li>• Verifiable business outcomes measured continuously for 48 hours post-dispatch.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
