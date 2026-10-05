import React, { useState } from 'react';
import { 
  Search, 
  Download
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const ActivityLogView: React.FC = () => {
  const { activityLogs, monochromeMode } = useAura();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const isLight = monochromeMode === 'light';

  const filteredLogs = activityLogs.filter((log) => {
    const matchesDept = departmentFilter === 'All' || log.department === departmentFilter;
    const matchesQuery = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.impact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
        isLight ? 'border-neutral-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              SOC2 Compliant Audit Trail
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Immutable Agent Execution Records
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Activity &amp; Audit Log
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Every autonomous detection, recommendation, and execution dispatched by AuraOS agents is cryptographically logged.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(activityLogs, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `AuraOS-Audit-${Date.now()}.json`;
              a.click();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl border ${
        isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {['All', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Support', 'HR'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono uppercase transition-all whitespace-nowrap border ${
                departmentFilter === dept
                  ? isLight
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-black border-white font-semibold'
                  : isLight
                    ? 'text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-transparent'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border-transparent'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
            isLight ? 'text-neutral-400' : 'text-neutral-500'
          }`} />
          <input
            type="text"
            placeholder="Search audit records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none transition-colors ${
              isLight 
                ? 'bg-white border-neutral-300 text-black placeholder-neutral-400 focus:border-black' 
                : 'bg-black border-neutral-800 text-white placeholder-neutral-500 focus:border-white'
            }`}
          />
        </div>
      </div>

      {/* Professional Audit Table */}
      <div className={`rounded-xl border overflow-hidden shadow-sm ${
        isLight ? 'bg-white border-neutral-300' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className={`uppercase text-[10px] tracking-wider border-b ${
              isLight ? 'bg-neutral-100 text-neutral-600 border-neutral-200' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
            }`}>
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Agent</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Operational Impact</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-neutral-200 text-neutral-800' : 'divide-neutral-850 text-neutral-300'
            }`}>
              {filteredLogs.map((log) => {
                return (
                  <tr key={log.id} className={`transition-colors ${
                    isLight ? 'hover:bg-neutral-50' : 'hover:bg-neutral-900/50'
                  }`}>
                    <td className={`py-3.5 px-4 whitespace-nowrap font-medium ${
                      isLight ? 'text-neutral-700' : 'text-neutral-300'
                    }`}>
                      {log.time}
                    </td>
                    <td className={`py-3.5 px-4 font-semibold whitespace-nowrap ${
                      isLight ? 'text-black' : 'text-white'
                    }`}>
                      {log.agent}
                    </td>
                    <td className={`py-3.5 px-4 whitespace-nowrap ${
                      isLight ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {log.department}
                    </td>
                    <td className={`py-3.5 px-4 font-sans max-w-xs font-medium ${
                      isLight ? 'text-black' : 'text-neutral-100'
                    }`}>
                      {log.action}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                        isLight 
                          ? 'bg-neutral-100 text-black border-neutral-300' 
                          : 'bg-neutral-900 text-white border-neutral-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className={`py-3.5 px-4 font-sans text-xs max-w-md ${
                      isLight ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {log.impact}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
