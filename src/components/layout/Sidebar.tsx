import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Sparkles, 
  GitBranch, 
  CheckSquare, 
  Layers, 
  Network, 
  Plug, 
  ScrollText, 
  Settings, 
  Building2, 
  ShieldCheck, 
  Flame
} from 'lucide-react';
import { useAura, NavItem } from '../../context/AuraContext';
import { APP_NAME, ORG_NAME, ADMIN_NAME } from '../../data/mockEnterpriseData';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const { activeNav, setActiveNav, approvals, monochromeMode } = useAura();
  const isLight = monochromeMode === 'light';

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;

  const navItems: Array<{ id: NavItem; label: string; icon: React.ElementType; badge?: number; hero?: boolean }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'marketing-agent', label: 'Marketing Agent', icon: Flame, hero: true },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'workflows', label: 'Workflows', icon: GitBranch },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: pendingApprovalsCount },
    { id: 'execution', label: 'Execution & Verify', icon: Layers },
    { id: 'cross-department', label: 'Cross-Intelligence', icon: Network },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'activity', label: 'Activity Log', icon: ScrollText },
    { id: 'settings', label: 'Governance & Rules', icon: Settings },
  ];

  const handleNavClick = (id: NavItem) => {
    setActiveNav(id);
    if (onMobileClose) onMobileClose();
  };

  return (
    <aside 
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 border-r flex flex-col justify-between transition-transform duration-200 ease-in-out ${
        isLight
          ? 'bg-white border-neutral-200 text-neutral-900'
          : 'bg-black border-neutral-800 text-neutral-100'
      } ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Zone */}
      <div className={`p-4 border-b ${isLight ? 'border-neutral-200' : 'border-neutral-800'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-bold text-sm tracking-tighter ${
            isLight ? 'bg-black text-white' : 'bg-white text-black'
          }`}>
            <span>A</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-sm tracking-wider ${isLight ? 'text-black' : 'text-white'}`}>
                {APP_NAME}
              </span>
              <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 border rounded ${
                isLight ? 'bg-neutral-100 text-neutral-700 border-neutral-300' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
              }`}>
                OS
              </span>
            </div>
            <p className={`text-[10px] tracking-tight font-medium ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              ONE INTELLIGENT LAYER
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <div className={`px-3 pb-1 pt-1 text-[10px] uppercase tracking-wider font-mono ${
          isLight ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                isActive
                  ? isLight
                    ? 'bg-neutral-100 text-black border border-neutral-300 font-semibold'
                    : 'bg-neutral-900 text-white border border-neutral-700 font-semibold shadow-sm'
                  : isLight
                  ? 'text-neutral-600 hover:text-black hover:bg-neutral-100/80 border border-transparent'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? isLight ? 'text-black' : 'text-white'
                      : isLight
                      ? 'text-neutral-500 group-hover:text-black'
                      : 'text-neutral-500 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.hero && !isActive && (
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                    isLight 
                      ? 'bg-neutral-100 text-neutral-700 border-neutral-300' 
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}>
                    Hero
                  </span>
                )}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded-full border ${
                    isActive
                      ? isLight 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-white'
                      : isLight
                        ? 'bg-neutral-200 text-neutral-800 border-neutral-300'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Organization and User Footer */}
      <div className={`p-3 border-t space-y-2 ${
        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black border-neutral-800'
      }`}>
        <div className={`p-2 rounded-md border ${
          isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Connected Layer
            </span>
            <span className={`font-mono text-[10px] flex items-center gap-1 ${isLight ? 'text-neutral-800 font-semibold' : 'text-neutral-200'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
              Active
            </span>
          </div>
          <div className={`text-[11px] font-medium truncate ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            {ORG_NAME}
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-1 pt-1">
          <div className={`w-7 h-7 rounded-md border flex items-center justify-center text-xs font-mono font-bold ${
            isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white'
          }`}>
            OA
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-xs font-semibold truncate ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              {ADMIN_NAME}
            </div>
            <div className={`text-[10px] truncate ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Innogenix Enterprise Admin
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
