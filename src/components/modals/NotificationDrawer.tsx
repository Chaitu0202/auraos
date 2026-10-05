import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  ArrowRight
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    markNotificationsAsRead, 
    setActiveNav,
    monochromeMode
  } = useAura();

  if (!isNotificationDrawerOpen) return null;

  const isLight = monochromeMode === 'light';

  const notifications = [
    {
      id: 'notif-1',
      title: 'Campaign Orion Ad Fatigue Detected',
      message: 'CTR fell 18% in the last 48 hours. AuraOS recommends shifting 15% budget toward Creative B.',
      agent: 'Marketing Agent',
      time: '8m ago',
      urgent: true,
      action: () => {
        setIsNotificationDrawerOpen(false);
        setActiveNav('marketing-agent');
      },
    },
    {
      id: 'notif-2',
      title: 'New Pending Approval Requires Review',
      message: 'Campaign Orion budget optimization action awaiting Operations Admin sign-off.',
      agent: 'Approval Center',
      time: '12m ago',
      urgent: false,
      action: () => {
        setIsNotificationDrawerOpen(false);
        setActiveNav('approvals');
      },
    },
    {
      id: 'notif-3',
      title: 'Sales Response Latency Alert',
      message: 'Tier-1 MQL queue crossed 4-hour threshold. Recommend auto-routing override.',
      agent: 'Sales Agent',
      time: '24m ago',
      urgent: true,
      action: () => {
        setIsNotificationDrawerOpen(false);
        setActiveNav('cross-department');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-sm h-full overflow-y-auto flex flex-col justify-between p-5 shadow-2xl border-l transition-colors ${
          isLight ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-black border-neutral-800 text-neutral-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <div className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <h2 className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>Notifications &amp; Alerts</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markNotificationsAsRead}
                className={`text-[11px] flex items-center gap-1 font-mono transition-colors ${
                  isLight ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className={`p-1 rounded transition-colors ${
                  isLight ? 'text-neutral-500 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={n.action}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isLight 
                    ? 'bg-neutral-50 border-neutral-300 hover:border-black' 
                    : 'bg-neutral-950 border-neutral-800 hover:border-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{n.agent}</span>
                  <span className={isLight ? 'text-neutral-500' : 'text-neutral-400'}>{n.time}</span>
                </div>
                <h3 className={`text-xs font-bold mb-1 ${isLight ? 'text-black' : 'text-white'}`}>{n.title}</h3>
                <p className={`text-[11px] leading-snug ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>{n.message}</p>
                <div className={`mt-2 flex items-center justify-between text-[10px] font-mono font-medium ${
                  isLight ? 'text-neutral-900' : 'text-neutral-100'
                }`}>
                  <span>Take action</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`pt-4 border-t text-[11px] font-mono text-center ${
          isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800 text-neutral-500'
        }`}>
          AuraOS Organizational Sentinel v4.2
        </div>
      </div>
    </div>
  );
};
