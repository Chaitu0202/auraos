import React from 'react';
import { 
  Building2, 
  ArrowRight
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const DepartmentsView: React.FC = () => {
  const { departmentHealth, setActiveNav, setSelectedAgentId, monochromeMode } = useAura();

  const isLight = monochromeMode === 'light';

  const handleInspectDepartment = (deptName: string) => {
    if (deptName === 'Marketing') {
      setActiveNav('marketing-agent');
    } else {
      const targetAgent = deptName.toLowerCase().includes('sales') 
        ? 'agent-sales' 
        : deptName.toLowerCase().includes('fin') 
        ? 'agent-finance' 
        : deptName.toLowerCase().includes('oper') 
        ? 'agent-operations'
        : deptName.toLowerCase().includes('hr')
        ? 'agent-hr'
        : 'agent-support';
      setSelectedAgentId(targetAgent);
      setActiveNav('agents');
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-neutral-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Enterprise Division Matrix
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              6 Core Departments
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Departments Overview
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Monitor organizational health, autonomous agent workloads, and SLA compliance across each division.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentHealth.map((dept) => {
          const isAttention = dept.status === 'Needs Attention';
          const isMarketing = dept.department === 'Marketing';

          return (
            <div
              key={dept.department}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                isLight
                  ? isAttention ? 'bg-neutral-100 border-neutral-400 shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'
                  : isAttention ? 'bg-neutral-950 border-neutral-600 shadow-sm' : 'bg-black border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <h3 className={`text-base font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                      {dept.department}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${
                      isLight 
                        ? 'bg-neutral-100 border-neutral-300 text-black' 
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  >
                    ● {dept.status}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  {dept.summary}
                </p>

                <div className={`grid grid-cols-2 gap-2 p-2.5 rounded-lg border mb-4 text-xs font-mono ${
                  isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
                }`}>
                  <div>
                    <span className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Efficiency</span>
                    <div className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>{dept.efficiencyIndex}%</div>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Active Agent</span>
                    <div className={`text-xs font-semibold truncate ${isLight ? 'text-black' : 'text-white'}`}>{dept.agentName}</div>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Workflows</span>
                    <div className={`text-xs ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>{dept.activeWorkflows} Running</div>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Open Alerts</span>
                    <div className={`text-xs font-bold ${isAttention ? 'underline' : ''}`}>
                      {dept.openAlerts}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleInspectDepartment(dept.department)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                  isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                }`}
              >
                <span>{isMarketing ? 'OPEN MARKETING HERO AGENT' : 'INSPECT DEPARTMENT AGENT'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
