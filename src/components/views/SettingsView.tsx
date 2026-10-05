import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Save, 
  RotateCcw
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { AutonomyLevel } from '../../types';

export const SettingsView: React.FC = () => {
  const { agents, resetDemoState, monochromeMode } = useAura();
  const [autonomyMap, setAutonomyMap] = useState<Record<string, AutonomyLevel>>({
    'agent-marketing': 'Approval Required',
    'agent-sales': 'Approval Required',
    'agent-finance': 'Recommend Only',
    'agent-operations': 'Approval Required',
    'agent-hr': 'Recommend Only',
    'agent-support': 'Semi-Autonomous',
  });

  const [savedToast, setSavedToast] = useState(false);
  const isLight = monochromeMode === 'light';

  const handleAutonomyChange = (agentId: string, level: AutonomyLevel) => {
    setAutonomyMap((prev) => ({ ...prev, [agentId]: level }));
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
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
              Responsible AI Governance
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Autonomy &amp; Safety Controls
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Governance &amp; Admin Settings
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Configure agent autonomy boundaries, approval thresholds, and data access permissions across departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoState}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-colors shadow-sm ${
              isLight
                ? 'bg-black hover:bg-neutral-800 text-white'
                : 'bg-white hover:bg-neutral-200 text-black'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Policies</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
          isLight
            ? 'bg-neutral-100 border-black text-black'
            : 'bg-neutral-900 border-white text-white'
        }`}>
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Governance policies synchronized across all 6 departmental agent nodes.</span>
        </div>
      )}

      {/* Autonomy Level Explanation Matrix */}
      <div className={`p-5 rounded-xl border space-y-4 ${
        isLight ? 'bg-white border-neutral-300' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className={`border-b pb-2 flex items-center justify-between ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <h2 className={`text-sm font-bold flex items-center gap-2 ${
            isLight ? 'text-black' : 'text-white'
          }`}>
            <ShieldCheck className="w-4 h-4" />
            Agent Autonomy Governance Matrix
          </h2>
          <span className={`text-xs font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Enterprise Guardrail: Active
          </span>
        </div>

        <div className="space-y-3">
          {agents.map((agent) => {
            const currentLevel = autonomyMap[agent.id] || agent.autonomyLevel;

            return (
              <div
                key={agent.id}
                className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isLight 
                    ? 'bg-neutral-50 border-neutral-200' 
                    : 'bg-neutral-900/60 border-neutral-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                      {agent.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-white text-neutral-700 border-neutral-300' 
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}>
                      {agent.department}
                    </span>
                  </div>
                  <div className={`flex flex-wrap items-center gap-3 text-[11px] font-mono pt-1 ${
                    isLight ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> Can analyze data
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" /> Can recommend actions
                    </span>
                    <span>·</span>
                    <span>
                      Execution: <strong className={isLight ? 'text-black' : 'text-white'}>{currentLevel}</strong>
                    </span>
                  </div>
                </div>

                {/* Autonomy Selector */}
                <div className={`flex items-center gap-1.5 p-1 rounded-lg border ${
                  isLight ? 'bg-white border-neutral-300' : 'bg-black border-neutral-800'
                }`}>
                  {(['Recommend Only', 'Approval Required', 'Semi-Autonomous'] as AutonomyLevel[]).map((level) => {
                    const isSelected = currentLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleAutonomyChange(agent.id, level)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                          isSelected
                            ? isLight
                              ? 'bg-black text-white font-semibold shadow-xs'
                              : 'bg-white text-black font-semibold shadow-xs'
                            : isLight
                              ? 'text-neutral-600 hover:text-black'
                              : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-300' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <h3 className={`text-xs font-mono uppercase tracking-wider ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            Human-in-the-Loop Thresholds
          </h3>
          <ul className={`space-y-2 text-xs ${isLight ? 'text-neutral-800' : 'text-neutral-300'}`}>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>Ad Spend Reallocation &gt; ₹25,000/day</span>
              <span className="font-mono font-semibold">Mandatory Sign-off</span>
            </li>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>CRM Lead Routing Reconfiguration</span>
              <span className="font-mono font-semibold">Mandatory Sign-off</span>
            </li>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>Cloud Server Reserved Commit &gt; ₹1,00,000</span>
              <span className="font-mono font-semibold">Mandatory Sign-off</span>
            </li>
          </ul>
        </div>

        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-300' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <h3 className={`text-xs font-mono uppercase tracking-wider ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            Data Privacy &amp; Masking
          </h3>
          <ul className={`space-y-2 text-xs ${isLight ? 'text-neutral-800' : 'text-neutral-300'}`}>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>PII Customer Data Redaction</span>
              <span className="font-mono font-semibold">Enforced (Automated)</span>
            </li>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>Internal Token Rotation</span>
              <span className="font-mono">Every 24 Hours</span>
            </li>
            <li className={`flex items-center justify-between p-2 rounded border ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span>LLM Training Telemetry Exclusion</span>
              <span className="font-mono font-semibold">Zero Data Retention</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
