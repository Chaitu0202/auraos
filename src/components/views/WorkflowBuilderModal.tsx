import React, { useState } from 'react';
import { 
  X, 
  Workflow, 
  ArrowDown, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  Sliders
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { WorkflowStep } from '../../types';

export const WorkflowBuilderModal: React.FC = () => {
  const { 
    isWorkflowBuilderOpen, 
    setIsWorkflowBuilderOpen, 
    workflowSteps, 
    updateWorkflowStep, 
    addWorkflowStep, 
    removeWorkflowStep, 
    activateWorkflow,
    monochromeMode
  } = useAura();

  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [showActivatedToast, setShowActivatedToast] = useState(false);

  if (!isWorkflowBuilderOpen) return null;

  const isLight = monochromeMode === 'light';

  const handleActivate = () => {
    setShowActivatedToast(true);
    setTimeout(() => {
      activateWorkflow();
    }, 900);
  };

  const handleAddNewStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: 'ANALYZE',
      title: 'AUDIT',
      description: 'Cross-reference lead velocity in Salesforce CRM prior to execution',
      enabled: true,
      configSummary: 'Real-time CRM query rule',
    };
    addWorkflowStep(newStep);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900 shadow-neutral-400' : 'bg-black border-neutral-800 text-neutral-100 shadow-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-md border flex items-center justify-center font-mono font-bold ${
              isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
            }`}>
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Autonomous Pipeline Architect
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-neutral-100 text-black border-neutral-300' : 'bg-neutral-900 text-white border-neutral-700'
                }`}>
                  Configurable
                </span>
              </div>
              <h2 className={`text-base font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                Campaign Optimization Workflow
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWorkflowBuilderOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workflow Info Bar */}
        <div className={`px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
          isLight ? 'bg-neutral-100/50 border-neutral-200 text-neutral-700' : 'bg-neutral-900/50 border-neutral-800 text-neutral-300'
        }`}>
          <div className="flex items-center gap-4">
            <span>Target: <strong className={`font-mono ${isLight ? 'text-black' : 'text-white'}`}>Campaign Orion (Meta & LinkedIn)</strong></span>
            <span>Frequency: <strong className={`font-mono ${isLight ? 'text-black' : 'text-white'}`}>Rolling 48h</strong></span>
            <span>Guardrail: <strong className={`font-mono ${isLight ? 'text-black' : 'text-white'}`}>Human Sign-off Mandatory</strong></span>
          </div>
          <button
            onClick={handleAddNewStep}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
              isLight ? 'bg-white hover:bg-neutral-100 text-black border-neutral-300' : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </div>

        {/* Workflow Pipeline Canvas */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {workflowSteps.map((step, index) => {
            const isEditing = editingStepId === step.id;
            const isLast = index === workflowSteps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isLight
                      ? step.enabled ? 'bg-white border-neutral-300 shadow-sm' : 'bg-neutral-100 border-neutral-200 opacity-60'
                      : step.enabled ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-950/40 border-neutral-900 opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold ${
                        isLight ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                        isLight ? 'text-black' : 'text-white'
                      }`}>
                        {step.title}
                      </span>
                      {step.type === 'APPROVAL' && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                          isLight ? 'bg-neutral-200 text-black border-neutral-400' : 'bg-neutral-900 text-white border-neutral-700'
                        }`}>
                          Human Sign-off Required
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateWorkflowStep(step.id, { enabled: !step.enabled })}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          step.enabled
                            ? isLight ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'bg-neutral-900 text-white border-neutral-700 font-bold'
                            : 'bg-transparent text-neutral-500 border-neutral-800'
                        }`}
                      >
                        {step.enabled ? 'Enabled' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => setEditingStepId(isEditing ? null : step.id)}
                        className="p-1 text-neutral-400 hover:text-white rounded"
                        title="Configure step conditions"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>

                      {workflowSteps.length > 3 && (
                        <button
                          onClick={() => removeWorkflowStep(step.id)}
                          className="p-1 text-neutral-500 hover:text-neutral-300 rounded"
                          title="Delete step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className={`text-xs font-medium leading-relaxed pl-8 ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                    {step.description}
                  </p>

                  {/* Summary / Metadata */}
                  {step.configSummary && (
                    <div className={`mt-2 pl-8 text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Rule: {step.configSummary}
                    </div>
                  )}

                  {/* Inline Step Editor if clicked */}
                  {isEditing && (
                    <div className={`mt-3 pl-8 pt-3 border-t space-y-2 text-xs ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                      <div>
                        <label className={`block text-[10px] uppercase font-mono mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                          Condition / Logic Override
                        </label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateWorkflowStep(step.id, { description: e.target.value })}
                          className={`w-full px-3 py-1.5 rounded border text-xs focus:outline-none ${
                            isLight ? 'bg-neutral-50 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
                          }`}
                        />
                      </div>
                      {step.type === 'APPROVAL' && (
                        <div>
                          <label className={`block text-[10px] uppercase font-mono mb-1 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            Approval Role Requirement
                          </label>
                          <input
                            type="text"
                            value={step.requiredRole || 'Operations Admin'}
                            onChange={(e) => updateWorkflowStep(step.id, { requiredRole: e.target.value })}
                            className={`w-full px-3 py-1.5 rounded border text-xs focus:outline-none ${
                              isLight ? 'bg-neutral-50 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Arrow Connector between steps */}
                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                      isLight ? 'bg-neutral-100 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-800 text-white'
                    }`}>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Confirmation State Toast */}
        {showActivatedToast && (
          <div className={`mx-6 mb-4 p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            isLight ? 'bg-neutral-100 border-black text-black' : 'bg-neutral-900 border-white text-white'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Workflow activated. Routing to Executive Approval Center for sign-off...</span>
            </div>
            <span className="font-mono text-[10px]">AuraOS Rule #ORION-OPT-2026</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between gap-4 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`text-xs font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            <span>7 Connected Stages · Automated Rollback Capable</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWorkflowBuilderOpen(false)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isLight ? 'bg-neutral-200 text-black hover:bg-neutral-300' : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleActivate}
              disabled={showActivatedToast}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2 transition-all shadow-md ${
                isLight
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ACTIVATE WORKFLOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
