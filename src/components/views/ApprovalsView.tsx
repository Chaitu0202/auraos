import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { ApprovalAction } from '../../types';

export const ApprovalsView: React.FC = () => {
  const { 
    approvals, 
    approveAction, 
    rejectAction, 
    setActiveNav,
    setDemoGuideStep,
    monochromeMode 
  } = useAura();

  const isLight = monochromeMode === 'light';

  const [inspectingAction, setInspectingAction] = useState<ApprovalAction | null>(null);

  const pendingList = approvals.filter((a) => a.status === 'PENDING');
  const executingList = approvals.filter((a) => a.status === 'EXECUTING');
  const completedList = approvals.filter((a) => a.status === 'COMPLETED');
  const rejectedList = approvals.filter((a) => a.status === 'REJECTED');

  const handleApprove = (action: ApprovalAction) => {
    approveAction(action.id);
  };

  const handleViewAnalysis = (action: ApprovalAction) => {
    if (action.department === 'Marketing') {
      setActiveNav('marketing-agent');
    } else {
      setInspectingAction(action);
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
              Executive Governance Layer
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Human-in-the-Loop Sign-off
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Approval Center
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Authorize or reject high-impact autonomous actions proposed by department AI agents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2.5 py-1 rounded border font-semibold ${
            isLight ? 'bg-neutral-100 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            Pending: <strong>{pendingList.length}</strong>
          </span>
          <span className={`px-2.5 py-1 rounded border ${
            isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
          }`}>
            Completed: <strong>{completedList.length}</strong>
          </span>
        </div>
      </div>

      {/* PENDING APPROVALS LIST (Main section) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            Actions Awaiting Executive Approval ({pendingList.length})
          </h2>
        </div>

        {pendingList.length === 0 ? (
          <div className={`p-8 rounded-xl border text-center space-y-2 ${
            isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <div className={`text-sm font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
              Zero Pending Actions
            </div>
            <p className={`text-xs ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              All proposed agent workflows have been reviewed and dispatched.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingList.map((action) => {
              const isOrion = action.id === 'appr-orion-1';
              return (
                <div
                  key={action.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isLight
                      ? isOrion ? 'bg-white border-neutral-400 shadow-md' : 'bg-neutral-50 border-neutral-200'
                      : isOrion ? 'bg-neutral-950 border-neutral-600 shadow-md' : 'bg-black border-neutral-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] font-mono ${
                        isLight ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        AI
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider font-mono ${
                        isLight ? 'text-black' : 'text-white'
                      }`}>
                        {action.agentName}
                      </span>
                      <span className="text-neutral-500">·</span>
                      <span className={`text-xs font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                        {action.title}
                      </span>
                      {isOrion && (
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                          isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
                        }`}>
                          Hero Flow Action
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>{action.timestamp}</span>
                      <span className="text-neutral-500">·</span>
                      <span className={`px-2 py-0.5 rounded uppercase text-[10px] border font-mono font-semibold ${
                        isLight ? 'bg-neutral-100 text-neutral-800 border-neutral-300' : 'bg-neutral-900 text-neutral-200 border-neutral-700'
                      }`}>
                        Risk: {action.risk}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 pl-8 ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                    {action.description}
                  </p>

                  {/* Impact metrics banner */}
                  <div className={`ml-8 p-3 rounded-lg border mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono ${
                    isLight ? 'bg-neutral-100/70 border-neutral-200 text-neutral-800' : 'bg-neutral-900/60 border-neutral-800 text-neutral-200'
                  }`}>
                    <div>
                      <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {action.metricsSnapshot.beforeLabel}
                      </div>
                      <div className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                        {action.metricsSnapshot.beforeValue}
                      </div>
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {action.metricsSnapshot.targetLabel}
                      </div>
                      <div className={`text-sm font-bold flex items-center gap-1 ${isLight ? 'text-black' : 'text-white'}`}>
                        <TrendingUp className="w-3.5 h-3.5" />
                        {action.metricsSnapshot.targetValue}
                      </div>
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        Expected Impact
                      </div>
                      <div className={`text-xs truncate ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        {action.expectedImpact}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className={`ml-8 flex flex-wrap items-center justify-between gap-3 pt-2 border-t ${
                    isLight ? 'border-neutral-200' : 'border-neutral-800'
                  }`}>
                    <button
                      onClick={() => handleViewAnalysis(action)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                        isLight ? 'bg-white hover:bg-neutral-100 text-black border-neutral-300' : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                      }`}
                    >
                      <span>VIEW ANALYSIS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rejectAction(action.id)}
                        className={`px-3.5 py-1.5 rounded border text-xs font-semibold uppercase tracking-wider font-mono transition-colors ${
                          isLight ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300' : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}
                      >
                        REJECT
                      </button>

                      <button
                        onClick={() => handleApprove(action)}
                        className={`px-5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                          isLight
                            ? 'bg-black text-white hover:bg-neutral-800'
                            : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>APPROVE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EXECUTING & COMPLETED APPROVALS AUDIT TRAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        {/* Executing Actions */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Active Dispatch (Executing)
            </h3>
            <span className={`text-[10px] font-mono font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
              {executingList.length} Active
            </span>
          </div>

          {executingList.length === 0 ? (
            <div className={`py-6 text-center text-xs font-mono ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`}>
              No actions currently in deployment queue.
            </div>
          ) : (
            <div className="space-y-2">
              {executingList.map((a) => (
                <div key={a.id} className={`p-3 rounded-lg border space-y-1.5 ${
                  isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-neutral-900 border-neutral-700'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{a.title}</span>
                    <span className="text-[10px] font-mono font-semibold">DEPLOYING...</span>
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>{a.description}</p>
                  <button
                    onClick={() => setActiveNav('execution')}
                    className="text-[11px] font-mono font-semibold underline flex items-center gap-1 pt-1"
                  >
                    <span>View execution timeline & telemetry</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Actions */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Approved & Completed ({completedList.length})
            </h3>
            <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Audit Verified</span>
          </div>

          {completedList.length === 0 ? (
            <div className={`py-6 text-center text-xs font-mono ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Approved actions will appear here once executed.
            </div>
          ) : (
            <div className="space-y-2">
              {completedList.map((a) => (
                <div key={a.id} className={`p-3 rounded-lg border space-y-1 ${
                  isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{a.title}</span>
                    <span className="text-[10px] font-mono font-bold">Approved by Admin</span>
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>{a.description}</p>
                  <div className={`flex items-center justify-between text-[10px] font-mono pt-1 ${
                    isLight ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    <span>Status: Completed & In Verification</span>
                    <button
                      onClick={() => setActiveNav('execution')}
                      className="underline font-semibold"
                    >
                      Inspect Verification &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
