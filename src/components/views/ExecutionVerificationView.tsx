import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Play, 
  Activity
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const ExecutionVerificationView: React.FC = () => {
  const { 
    executionProgress, 
    executionStatus, 
    startExecutionSimulation, 
    setActiveNav,
    setDemoGuideStep,
    monochromeMode
  } = useAura();

  const isLight = monochromeMode === 'light';

  const isExecuting = executionStatus === 'executing';
  const isCompleted = executionStatus === 'completed' || executionStatus === 'monitoring';

  const timelineSteps = [
    { time: '09:42', title: 'Agent identified performance anomaly', desc: 'Campaign Orion CTR dropped below 2.5% threshold. Creative A frequency reached 4.8x.', status: 'completed' },
    { time: '09:43', title: 'Performance analysis completed', desc: 'Cross-analyzed Meta Ads auction bids, audience response curves, and Creative B superiority.', status: 'completed' },
    { time: '09:44', title: 'Recommendation generated', desc: 'AuraOS computed optimal shift: Reallocate 15% budget toward Creative B for +21% efficiency.', status: 'completed' },
    { time: '09:46', title: 'Admin approval received', desc: 'Operations Admin authorized workflow dispatch via AuraOS Executive Approval Center.', status: isExecuting || isCompleted ? 'completed' : 'pending' },
    { time: '09:47', title: 'Workflow execution started', desc: 'Authenticated dispatch to Meta Marketing API & LinkedIn Campaign Manager endpoints.', status: isExecuting || isCompleted ? 'completed' : 'pending' },
    { time: '09:48', title: 'Campaign optimization completed', desc: 'Updated ad set weights: Creative B allocation boosted to 65%, Creative A throttled to 35%.', status: isCompleted ? 'completed' : isExecuting ? 'active' : 'pending' },
    { time: '09:49', title: 'Verification monitoring enabled', desc: 'Telemetry watchdog active. Rolling 48-hour CTR, CPC, and conversion verification initiated.', status: isCompleted ? 'completed' : 'pending' },
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-neutral-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Autonomous Dispatch & Telemetry
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Continuous Verification
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Execution & Verification Engine
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Track real-time workflow deployment, API dispatch state, and post-execution performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {executionStatus === 'idle' && (
            <button
              onClick={startExecutionSimulation}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-all shadow-sm ${
                isLight ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Live Execution</span>
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${
            isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-neutral-200'
          }`}>
            <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>Status:</span>
            <span className="font-semibold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
              {isExecuting ? 'EXECUTING PIPELINE' : isCompleted ? 'MONITORING ACTIVE' : 'READY TO DISPATCH'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar (if executing) */}
      {isExecuting && (
        <div className={`p-4 rounded-xl border space-y-2 ${
          isLight ? 'bg-neutral-100 border-neutral-300' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin" />
              Synchronizing Campaign Parameters with Meta Ads & LinkedIn APIs...
            </span>
            <span className="font-bold">{executionProgress}%</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-neutral-300' : 'bg-neutral-800'}`}>
            <div 
              className={`h-full transition-all duration-300 ${isLight ? 'bg-black' : 'bg-white'}`}
              style={{ width: `${executionProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 2-Column Grid: Execution Timeline & Verification Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Execution Timeline */}
        <div className={`p-5 rounded-xl border space-y-4 ${
          isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <div>
              <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Action Audit Log
              </div>
              <h2 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                Campaign Optimization Timeline
              </h2>
            </div>
            <span className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Audit ID: #WF-EXEC-9942
            </span>
          </div>

          <div className={`relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 ${
            isLight ? 'before:bg-neutral-200' : 'before:bg-neutral-800'
          }`}>
            {timelineSteps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div 
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isDone
                        ? isLight ? 'bg-black border-white text-white' : 'bg-white border-black text-black'
                        : isActive
                        ? isLight ? 'bg-black border-neutral-400 animate-pulse' : 'bg-white border-neutral-600 animate-pulse'
                        : isLight ? 'bg-neutral-200 border-neutral-300' : 'bg-neutral-900 border-neutral-700'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                        {step.time}
                      </span>
                      <span className={`text-xs font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                        {step.title}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono ${
            isLight ? 'border-neutral-200 text-neutral-600' : 'border-neutral-800 text-neutral-400'
          }`}>
            <span>Workflow Status</span>
            <span className="font-semibold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
              Monitoring
            </span>
          </div>
        </div>

        {/* Right: Verification Monitoring Screen */}
        <div className={`p-5 rounded-xl border space-y-4 flex flex-col justify-between ${
          isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900 shadow-sm' : 'bg-neutral-950 border-neutral-800 text-neutral-100'
        }`}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <div>
                <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Telemetry Watchdog
                </div>
                <h2 className={`text-base font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                  Optimization Monitoring
                </h2>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                isLight ? 'bg-white border-neutral-300 text-black' : 'bg-neutral-900 border-neutral-700 text-white'
              }`}>
                Live Window: 48h
              </span>
            </div>

            {/* MANDATORY PROTOTYPE DISCLAIMER BANNER */}
            <div className={`p-3 rounded-lg border text-[11px] font-mono leading-relaxed ${
              isLight ? 'bg-neutral-100 border-neutral-400 text-neutral-900' : 'bg-neutral-900 border-neutral-700 text-neutral-200'
            }`}>
              <strong className="uppercase">SIMULATED PROTOTYPE OUTCOME</strong>
              <div className="text-[10px] mt-0.5 opacity-80">
                Clearly designated simulated operational benchmark within Innogenix Demo Environment.
              </div>
            </div>

            {/* Before vs After Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Before Card */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-white border-neutral-200' : 'bg-black border-neutral-800'
              }`}>
                <div className={`text-xs font-mono uppercase font-semibold border-b pb-1.5 ${
                  isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800 text-neutral-400'
                }`}>
                  Before Optimization
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>CTR (Campaign Orion)</div>
                  <div className={`text-2xl font-bold font-mono ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>
                    2.8%
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Dropping (-18% 48h decay)
                  </div>
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>CPC (Cost Per Click)</div>
                  <div className={`text-2xl font-bold font-mono ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>
                    ₹18.40
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Creative A fatigue drag
                  </div>
                </div>
              </div>

              {/* After / Current Card */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-white border-black ring-1 ring-black' : 'bg-neutral-900 border-white ring-1 ring-white'
              }`}>
                <div className={`text-xs font-mono uppercase font-bold border-b pb-1.5 flex items-center justify-between ${
                  isLight ? 'border-neutral-200 text-black' : 'border-neutral-800 text-white'
                }`}>
                  <span>After / Current</span>
                  <span className="text-[9px]">▲ +21.4%</span>
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>CTR (Campaign Orion)</div>
                  <div className={`text-2xl font-bold font-mono flex items-center gap-1 ${isLight ? 'text-black' : 'text-white'}`}>
                    <span>3.4%</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                    +0.6% recovery via Creative B
                  </div>
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>CPC (Cost Per Click)</div>
                  <div className={`text-2xl font-bold font-mono flex items-center gap-1 ${isLight ? 'text-black' : 'text-white'}`}>
                    <span>₹15.90</span>
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                    -₹2.50 per click saved (-13.6%)
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring Status Note */}
            <div className={`p-3.5 rounded-lg border text-xs space-y-1 ${
              isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <div className={`flex items-center gap-2 font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Early signal detected. AuraOS will continue monitoring performance.</span>
              </div>
              <p className={`text-[11px] leading-relaxed pl-6 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Creative B engagement velocity is sustaining 3.4% CTR across Instagram and LinkedIn. Anomaly watchdog will run for the remaining 47 hours.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className={`pt-4 border-t flex items-center justify-between ${
            isLight ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Next Pitch Step: Cross-Department Ask AuraOS
            </span>
            <button
              onClick={() => {
                setDemoGuideStep(8);
                setActiveNav('cross-department');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isLight ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <span>Explore Cross-Department AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
