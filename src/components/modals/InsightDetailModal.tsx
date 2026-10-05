import React from 'react';
import { 
  X, 
  ArrowRight
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const InsightDetailModal: React.FC = () => {
  const { selectedInsight, setSelectedInsight, setActiveNav, setIsWorkflowBuilderOpen, monochromeMode } = useAura();

  if (!selectedInsight) return null;

  const isLight = monochromeMode === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4 border transition-colors ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900 shadow-neutral-300' : 'bg-black border-neutral-800 text-neutral-100 shadow-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-start justify-between border-b pb-3 ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono border ${
              isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
            }`}>
              AI
            </div>
            <div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${
                isLight ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                {selectedInsight.agentName} · Causal Diagnosis
              </div>
              <h2 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                Intelligence Insight Audit
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedInsight(null)}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-neutral-500 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className={`p-3.5 rounded-xl border ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`text-sm font-bold mb-1 ${isLight ? 'text-black' : 'text-white'}`}>
            &ldquo;{selectedInsight.title}&rdquo;
          </div>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
            {selectedInsight.summary}
          </p>
        </div>

        {/* Factors */}
        {selectedInsight.whyDetails && (
          <div className="space-y-2">
            <div className={`text-[10px] font-mono uppercase tracking-wider ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              Underlying Signal Breakdown:
            </div>
            <div className="space-y-1.5">
              {selectedInsight.whyDetails.factors.map((f, i) => (
                <div key={i} className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                  isLight ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                }`}>
                  <span className={`font-bold ${isLight ? 'text-black' : 'text-white'}`}>•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {selectedInsight.whyDetails.crossDepartmentImpact && (
              <div className={`p-3 rounded-lg border text-xs space-y-1 mt-2 ${
                isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-800' : 'bg-neutral-900 border-neutral-700 text-neutral-200'
              }`}>
                <span className={`font-semibold uppercase text-[10px] font-mono ${
                  isLight ? 'text-black' : 'text-white'
                }`}>
                  Cross-Department Impact:
                </span>
                <p className={`text-[11px] ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  {selectedInsight.whyDetails.crossDepartmentImpact}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className={`pt-3 border-t flex items-center justify-between ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Detected {selectedInsight.timestamp} · AuraOS Telemetry
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedInsight(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isLight 
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300' 
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
              }`}
            >
              Dismiss
            </button>

            {selectedInsight.id === 'insight-mkt-1' ? (
              <button
                onClick={() => {
                  setSelectedInsight(null);
                  setActiveNav('marketing-agent');
                  setIsWorkflowBuilderOpen(true);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors ${
                  isLight
                    ? 'bg-black hover:bg-neutral-800 text-white'
                    : 'bg-white hover:bg-neutral-200 text-black'
                }`}
              >
                <span>Open Workflow Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedInsight(null);
                  setActiveNav('cross-department');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors ${
                  isLight
                    ? 'bg-black hover:bg-neutral-800 text-white'
                    : 'bg-white hover:bg-neutral-200 text-black'
                }`}
              >
                <span>View Cross-Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
