import React, { useState } from 'react';
import { AuraProvider, useAura } from './context/AuraContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DemoGuideBar } from './components/demo/DemoGuideBar';
import { CommandPaletteModal } from './components/command/CommandPaletteModal';
import { WorkflowBuilderModal } from './components/views/WorkflowBuilderModal';
import { IntegrationDrawer } from './components/modals/IntegrationDrawer';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { InsightDetailModal } from './components/modals/InsightDetailModal';

// Views
import { OverviewView } from './components/views/OverviewView';
import { AgentsView } from './components/views/AgentsView';
import { MarketingAgentView } from './components/views/MarketingAgentView';
import { DepartmentsView } from './components/views/DepartmentsView';
import { InsightsView } from './components/views/InsightsView';
import { ApprovalsView } from './components/views/ApprovalsView';
import { ExecutionVerificationView } from './components/views/ExecutionVerificationView';
import { CrossDepartmentView } from './components/views/CrossDepartmentView';
import { IntegrationsView } from './components/views/IntegrationsView';
import { ActivityLogView } from './components/views/ActivityLogView';
import { SettingsView } from './components/views/SettingsView';

const AppContent: React.FC = () => {
  const { activeNav, monochromeMode } = useAura();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isLight = monochromeMode === 'light';

  const renderActiveView = () => {
    switch (activeNav) {
      case 'overview':
        return <OverviewView />;
      case 'agents':
        return <AgentsView />;
      case 'marketing-agent':
        return <MarketingAgentView />;
      case 'departments':
        return <DepartmentsView />;
      case 'insights':
        return <InsightsView />;
      case 'workflows':
        return <MarketingAgentView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'execution':
        return <ExecutionVerificationView />;
      case 'cross-department':
        return <CrossDepartmentView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'activity':
        return <ActivityLogView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors ${
      isLight 
        ? 'bg-white text-neutral-900 selection:bg-black selection:text-white' 
        : 'bg-black text-neutral-100 selection:bg-white selection:text-black'
    }`}>
      <div className="flex flex-1 min-h-screen">
        {/* Persistent Left Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Mobile backdrop */}
        {isMobileSidebarOpen && (
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Search & Notifications */}
          <TopBar onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

          {/* 3-Minute Live Demo Pitch Guide Bar */}
          <DemoGuideBar />

          {/* Main Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPaletteModal />
      <WorkflowBuilderModal />
      <IntegrationDrawer />
      <NotificationDrawer />
      <InsightDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <AuraProvider>
      <AppContent />
    </AuraProvider>
  );
}
