import React, { useState } from 'react';
import { 
  Plug, 
  Search, 
  SlidersHorizontal
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const IntegrationsView: React.FC = () => {
  const { integrations, setSelectedIntegration, monochromeMode } = useAura();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isLight = monochromeMode === 'light';

  const categories = ['All', 'Marketing', 'Sales', 'Finance', 'Operations', 'HR', 'Cross-Functional'];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
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
              Enterprise Neural Connectors
            </span>
            <span className={isLight ? 'text-neutral-300' : 'text-neutral-700'}>·</span>
            <span className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Simulated Data Telemetry
            </span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            System Integrations
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Connect corporate CRM, ERP, Advertising, and HR data sources to empower autonomous departmental agents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2.5 py-1 rounded border font-semibold ${
            isLight 
              ? 'bg-neutral-100 text-black border-neutral-300' 
              : 'bg-neutral-900 text-white border-neutral-700'
          }`}>
            {integrations.filter((i) => i.status === 'CONNECTED').length} Connected
          </span>
          <span className={`px-2.5 py-1 rounded border ${
            isLight 
              ? 'bg-neutral-50 text-neutral-600 border-neutral-200' 
              : 'bg-neutral-950 text-neutral-400 border-neutral-800'
          }`}>
            {integrations.length} Supported
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl border ${
        isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono uppercase transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? isLight
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-black border-white font-semibold'
                  : isLight
                    ? 'text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-transparent'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
            isLight ? 'text-neutral-400' : 'text-neutral-500'
          }`} />
          <input
            type="text"
            placeholder="Filter integrations..."
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

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((app) => {
          const isConnected = app.status === 'CONNECTED';
          const isNeedsAuth = app.status === 'NEEDS AUTHORIZATION';

          return (
            <div
              key={app.id}
              onClick={() => setSelectedIntegration(app)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group shadow-sm ${
                isLight 
                  ? 'bg-white border-neutral-300 hover:border-black' 
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs font-mono border ${
                      isLight 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-white'
                    }`}>
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold transition-colors ${
                        isLight ? 'text-black group-hover:text-neutral-800' : 'text-white group-hover:text-neutral-200'
                      }`}>
                        {app.name}
                      </h3>
                      <div className={`text-[10px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {app.category}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                      isConnected
                        ? isLight
                          ? 'bg-neutral-100 text-black border-neutral-300 font-semibold'
                          : 'bg-neutral-900 text-white border-neutral-700 font-semibold'
                        : isNeedsAuth
                        ? isLight
                          ? 'bg-neutral-200 text-neutral-800 border-neutral-400'
                          : 'bg-neutral-800 text-neutral-200 border-neutral-600'
                        : isLight
                          ? 'bg-neutral-100 text-neutral-500 border-neutral-200'
                          : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className={`space-y-1.5 py-2 border-t mb-3 text-[11px] font-mono ${
                  isLight ? 'border-neutral-200 text-neutral-600' : 'border-neutral-800 text-neutral-400'
                }`}>
                  <div className="flex justify-between">
                    <span>Sync Cadence:</span>
                    <span className={isLight ? 'text-black font-medium' : 'text-white font-medium'}>{app.syncFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Telemetry:</span>
                    <span className={isLight ? 'text-black' : 'text-white'}>{app.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Records Ingested:</span>
                    <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{app.recordsSynced}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {app.dataTypes.slice(0, 3).map((dt, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        isLight 
                          ? 'bg-neutral-100 text-neutral-700 border-neutral-200' 
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                      }`}
                    >
                      {dt}
                    </span>
                  ))}
                  {app.dataTypes.length > 3 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 ${
                      isLight ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      +{app.dataTypes.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono ${
                isLight ? 'border-neutral-200 text-neutral-600 group-hover:text-black' : 'border-neutral-800 text-neutral-400 group-hover:text-white'
              }`}>
                <span>Configure connection</span>
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
