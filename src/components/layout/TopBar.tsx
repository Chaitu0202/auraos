import React from 'react';
import { 
  Search, 
  Bell, 
  RotateCcw, 
  Menu, 
  Command, 
  ChevronRight, 
  Sun,
  Moon,
  Play
} from 'lucide-react';
import { useAura } from '../../context/AuraContext';
import { ORG_NAME } from '../../data/mockEnterpriseData';

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMobileMenuToggle }) => {
  const { 
    activeNav, 
    setIsCommandBarOpen, 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    unreadNotificationsCount,
    resetDemoState,
    isDemoGuideVisible,
    setIsDemoGuideVisible,
    monochromeMode,
    toggleMonochromeMode
  } = useAura();

  const isLight = monochromeMode === 'light';

  const getBreadcrumbTitle = () => {
    switch (activeNav) {
      case 'overview':
        return 'Executive Command Center';
      case 'agents':
        return 'Department AI Agents';
      case 'marketing-agent':
        return 'Marketing Agent / Autonomous Intelligence';
      case 'departments':
        return 'Organization Department Grid';
      case 'insights':
        return 'Cross-System Intelligence Feed';
      case 'workflows':
        return 'Autonomous Workflow Engine';
      case 'approvals':
        return 'Executive Approval Center';
      case 'execution':
        return 'Workflow Execution & Telemetry';
      case 'cross-department':
        return 'Cross-Department Synthesizer';
      case 'integrations':
        return 'Enterprise System Connectors';
      case 'activity':
        return 'Security & Audit Log';
      case 'settings':
        return 'Responsible AI & Autonomy Policies';
      default:
        return 'AuraOS';
    }
  };

  return (
    <header className={`sticky top-0 z-30 h-14 border-b px-4 flex items-center justify-between gap-4 transition-colors ${
      isLight 
        ? 'bg-white/95 border-neutral-200 text-neutral-900' 
        : 'bg-black/95 border-neutral-800 text-neutral-100'
    }`}>
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileMenuToggle}
          className={`lg:hidden p-1.5 rounded-md ${
            isLight ? 'text-neutral-600 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className={`flex items-center gap-1.5 text-xs min-w-0 ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
          <span className="font-mono hover:underline">
            AuraOS
          </span>
          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <span className={`font-medium truncate ${isLight ? 'text-black' : 'text-white'}`}>
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Center: Global Command Bar Search Trigger */}
      <div className="flex-1 max-w-xl mx-2 hidden md:block">
        <button
          onClick={() => setIsCommandBarOpen(true)}
          className={`w-full flex items-center justify-between px-3 py-1.5 border rounded-md text-xs transition-all ${
            isLight
              ? 'bg-neutral-100/80 hover:bg-neutral-100 text-neutral-600 hover:text-black border-neutral-300'
              : 'bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Command className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-black' : 'text-white'}`} />
            <span className="truncate">Ask AuraOS anything... (e.g. &ldquo;Why did revenue drop this week?&rdquo;)</span>
          </div>
          <kbd className={`hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded border ${
            isLight ? 'bg-white text-neutral-700 border-neutral-300' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
          }`}>
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsCommandBarOpen(true)}
          className={`md:hidden p-2 rounded-md ${
            isLight ? 'text-neutral-600 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Pure Black / Pure White Switcher */}
        <button
          onClick={toggleMonochromeMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border transition-colors ${
            isLight
              ? 'bg-neutral-100 text-black border-neutral-300 hover:bg-neutral-200'
              : 'bg-neutral-900 text-white border-neutral-700 hover:bg-neutral-800'
          }`}
          title={isLight ? 'Switch to Pure Black (Dark)' : 'Switch to Pure White (Light)'}
        >
          {isLight ? <Moon className="w-3.5 h-3.5 text-neutral-800" /> : <Sun className="w-3.5 h-3.5 text-neutral-200" />}
          <span className="hidden sm:inline">{isLight ? 'Pure Black' : 'Pure White'}</span>
        </button>

        {/* Demo Pitch Guide Toggle */}
        <button
          onClick={() => setIsDemoGuideVisible(!isDemoGuideVisible)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
            isDemoGuideVisible
              ? isLight
                ? 'bg-black text-white border-black font-semibold'
                : 'bg-white text-black border-white font-semibold'
              : isLight
                ? 'text-neutral-600 hover:text-black border-neutral-300 bg-white'
                : 'text-neutral-400 hover:text-white border-neutral-800 bg-neutral-950'
          }`}
          title="Toggle 3-Minute Live Demo Pitch Guide"
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">Guide</span>
        </button>

        {/* Environment Badge */}
        <div className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono ${
          isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-700' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
          <span className="truncate max-w-[150px]">{ORG_NAME}</span>
        </div>

        {/* Reset Demo State Button */}
        <button
          onClick={resetDemoState}
          className={`p-1.5 rounded-md transition-colors ${
            isLight ? 'text-neutral-600 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
          title="Reset Demo State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
          className={`relative p-1.5 rounded-md transition-colors ${
            isLight ? 'text-neutral-600 hover:text-black hover:bg-neutral-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
          title="View Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
          )}
        </button>
      </div>
    </header>
  );
};
