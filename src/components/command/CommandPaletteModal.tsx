import React, { useState } from 'react';
import { 
  Search, 
  Command, 
  X, 
  ArrowRight, 
  CornerDownLeft, 
  Bot, 
  CheckCircle2, 
  Loader2
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const CommandPaletteModal: React.FC = () => {
  const { 
    isCommandBarOpen, 
    setIsCommandBarOpen, 
    commandInput, 
    setCommandInput, 
    commandLoading, 
    lastCommandResponse, 
    submitCommand,
    setActiveNav,
    setIsWorkflowBuilderOpen,
    monochromeMode
  } = useAura();

  const [inputVal, setInputVal] = useState(commandInput || '');

  if (!isCommandBarOpen) return null;

  const isLight = monochromeMode === 'light';

  const quickPrompts = [
    'Why did revenue drop this week?',
    'Show me what needs attention today.',
    'Which department is underperforming?',
    'What workflows are currently blocked?',
    'Where are we losing revenue?',
    'Summarize today\'s organizational health.',
  ];

  const handleSelectPrompt = (prompt: string) => {
    setInputVal(prompt);
    submitCommand(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      submitCommand(inputVal);
    }
  };

  const handleActionClick = (actionId: string) => {
    setIsCommandBarOpen(false);
    if (actionId === 'wf-orion-opt') {
      setActiveNav('marketing-agent');
      setIsWorkflowBuilderOpen(true);
    } else if (actionId === 'nav-marketing') {
      setActiveNav('marketing-agent');
    } else if (actionId === 'nav-approvals') {
      setActiveNav('approvals');
    } else if (actionId === 'sync-sales-mkt') {
      setActiveNav('cross-department');
    } else if (actionId === 'open-builder') {
      setActiveNav('marketing-agent');
      setIsWorkflowBuilderOpen(true);
    } else {
      setActiveNav('overview');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-2xl border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-colors ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900 shadow-neutral-300' : 'bg-black border-neutral-800 text-neutral-100 shadow-black'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <form onSubmit={handleSubmit} className={`flex items-center px-4 py-3.5 border-b gap-3 ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <Command className={`w-5 h-5 shrink-0 ${isLight ? 'text-black' : 'text-white'}`} />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask AuraOS anything across all departments... (e.g., Why did revenue drop this week?)"
            className={`flex-1 bg-transparent text-sm focus:outline-none ${
              isLight ? 'text-black placeholder-neutral-400' : 'text-white placeholder-neutral-500'
            }`}
            autoFocus
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="p-1 text-neutral-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={commandLoading || !inputVal.trim()}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isLight
                ? 'bg-black hover:bg-neutral-800 disabled:bg-neutral-200 text-white disabled:text-neutral-400'
                : 'bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black disabled:text-neutral-500'
            }`}
          >
            {commandLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <CornerDownLeft className="w-3 h-3" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsCommandBarOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Preset Prompts */}
          <div>
            <div className={`text-[11px] font-mono uppercase tracking-wider mb-2 flex items-center justify-between ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              <span>Suggested Enterprise Queries</span>
              <span className={isLight ? 'text-neutral-800 font-semibold' : 'text-neutral-200 font-semibold'}>Click to query</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between group ${
                    isLight
                      ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-800'
                      : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="truncate mr-2">&ldquo;{prompt}&rdquo;</span>
                  <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display */}
          {commandLoading ? (
            <div className="p-8 text-center space-y-3">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border ${
                isLight ? 'bg-neutral-100 border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
              }`}>
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className={`text-xs font-medium ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                AuraOS synthesized query across 6 departments and 14 data sources...
              </div>
              <p className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Querying Marketing Ad Sets · CRM Pipeline · NetSuite Ledger · Fulfillment SLA
              </p>
            </div>
          ) : lastCommandResponse ? (
            <div className={`p-4 rounded-xl border space-y-3 animate-in fade-in duration-200 shadow-md ${
              isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-neutral-950 border-neutral-800'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                    isLight ? 'bg-black text-white' : 'bg-white text-black'
                  }`}>
                    OS
                  </div>
                  <span className={`text-xs font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                    AuraOS Organizational Intelligence
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  <span>Engine: {lastCommandResponse.source}</span>
                  <span>·</span>
                  <span>{lastCommandResponse.timestamp}</span>
                </div>
              </div>

              {/* Formatted Text */}
              <div className={`text-xs leading-relaxed whitespace-pre-line font-normal ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                {lastCommandResponse.text}
              </div>

              {/* Signals Breakdown */}
              {lastCommandResponse.signals && lastCommandResponse.signals.length > 0 && (
                <div className={`pt-2 border-t ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
                  <div className={`text-[10px] uppercase font-mono mb-1.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Synthesized Cross-Department Signals:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {lastCommandResponse.signals.map((sig, idx) => (
                      <div 
                        key={idx} 
                        className={`px-2.5 py-1.5 rounded border text-[11px] flex items-center justify-between ${
                          isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'
                        }`}
                      >
                        <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{sig.department}:</span>
                        <span className={`truncate ml-2 flex-1 text-right ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>{sig.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {lastCommandResponse.actions && lastCommandResponse.actions.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Suggested Actions:</span>
                  {lastCommandResponse.actions.map((act) => (
                    <button
                      key={act.actionId}
                      onClick={() => handleActionClick(act.actionId)}
                      className={`px-3 py-1.5 rounded-md border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isLight
                          ? 'bg-black text-white hover:bg-neutral-800 border-black'
                          : 'bg-white text-black hover:bg-neutral-200 border-white'
                      }`}
                    >
                      <span>{act.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] ${
          isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-500' : 'bg-black border-neutral-800 text-neutral-400'
        }`}>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <kbd className={`px-1 py-0.5 rounded font-mono text-[9px] border ${
                isLight ? 'bg-white border-neutral-300' : 'bg-neutral-900 border-neutral-800'
              }`}>ESC</kbd> to close
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <kbd className={`px-1 py-0.5 rounded font-mono text-[9px] border ${
                isLight ? 'bg-white border-neutral-300' : 'bg-neutral-900 border-neutral-800'
              }`}>ENTER</kbd> to analyze
            </span>
          </div>
          <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-800 font-semibold' : 'text-neutral-300 font-semibold'}`}>
            AuraOS Autonomous Reasoning Core
          </span>
        </div>
      </div>
    </div>
  );
};
