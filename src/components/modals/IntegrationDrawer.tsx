import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  ShieldCheck
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const IntegrationDrawer: React.FC = () => {
  const { selectedIntegration, setSelectedIntegration, monochromeMode } = useAura();
  const [isTestingSync, setIsTestingSync] = useState(false);
  const [syncSuccessToast, setSyncSuccessToast] = useState(false);

  if (!selectedIntegration) return null;

  const isLight = monochromeMode === 'light';

  const handleTestSync = () => {
    setIsTestingSync(true);
    setTimeout(() => {
      setIsTestingSync(false);
      setSyncSuccessToast(true);
      setTimeout(() => setSyncSuccessToast(false), 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-md h-full overflow-y-auto flex flex-col justify-between p-6 shadow-2xl border-l transition-colors ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-black border-neutral-800 text-neutral-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className={`flex items-start justify-between border-b pb-4 ${
            isLight ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono border ${
                isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
              }`}>
                {selectedIntegration.name.charAt(0)}
              </div>
              <div>
                <h2 className={`text-base font-bold ${isLight ? 'text-black' : 'text-white'}`}>
                  {selectedIntegration.name}
                </h2>
                <div className={`flex items-center gap-2 text-[11px] font-mono ${
                  isLight ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  <span>{selectedIntegration.category}</span>
                  <span>·</span>
                  <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{selectedIntegration.status}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedIntegration(null)}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight ? 'text-neutral-500 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Simulated Disclaimer */}
          <div className={`p-3 rounded-lg border text-[11px] font-mono ${
            isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-700' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
          }`}>
            <strong>Prototype Connector:</strong> Active within Innogenix Simulated Enterprise Environment. Simulated token exchange &amp; webhook routing active.
          </div>

          {/* Sync Stats */}
          <div className="space-y-3">
            <div className={`text-xs font-mono uppercase tracking-wider ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              Connection Telemetry
            </div>
            <div className={`p-4 rounded-xl border space-y-2.5 text-xs font-mono ${
              isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-neutral-950 border-neutral-800 text-neutral-200'
            }`}>
              <div className="flex justify-between">
                <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>Sync Frequency:</span>
                <span className="font-semibold">{selectedIntegration.syncFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>Last Telemetry Ingestion:</span>
                <span>{selectedIntegration.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>Records Synced:</span>
                <span className="font-bold">{selectedIntegration.recordsSynced}</span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>Data Encryption:</span>
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AES-256 In-Transit
                </span>
              </div>
            </div>
          </div>

          {/* Data Schemas Ingested */}
          <div className="space-y-3">
            <div className={`text-xs font-mono uppercase tracking-wider ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              Ingested Data Schemas
            </div>
            <div className="space-y-1.5">
              {selectedIntegration.dataTypes.map((dt, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${
                    isLight ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-neutral-900/60 border-neutral-800 text-neutral-200'
                  }`}
                >
                  <span>{dt}</span>
                  <span className={`text-[10px] font-mono font-medium ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>Schema Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token & Endpoint details */}
          <div className="space-y-2">
            <label className={`block text-[10px] font-mono uppercase ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              OAuth Enterprise Endpoint
            </label>
            <div className={`p-2.5 rounded border text-[11px] font-mono truncate ${
              isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}>
              https://api.auraos.internal/v4/connectors/{selectedIntegration.id}
            </div>
          </div>

          {syncSuccessToast && (
            <div className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
              isLight ? 'bg-neutral-100 border-black text-black' : 'bg-neutral-900 border-white text-white'
            }`}>
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Simulated handshake successful. 42 new event objects ingested.</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`pt-6 border-t flex items-center justify-between gap-3 ${
          isLight ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <button
            onClick={() => setSelectedIntegration(null)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              isLight 
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300' 
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
            }`}
          >
            Close
          </button>

          <button
            onClick={handleTestSync}
            disabled={isTestingSync}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-colors shadow-sm ${
              isLight
                ? 'bg-black hover:bg-neutral-800 text-white'
                : 'bg-white hover:bg-neutral-200 text-black'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isTestingSync ? 'animate-spin' : ''}`} />
            <span>{isTestingSync ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
