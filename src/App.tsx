import React, { useState, Component } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SignalDiscovery } from './pages/SignalDiscovery';
import { Orchestration } from './pages/Orchestration';
import { Personalization } from './pages/Personalization';
import { Attribution } from './pages/Attribution';
import { WorkflowBuilder } from './pages/WorkflowBuilder';
import { Integrations } from './pages/Integrations';
type Page =
'dashboard' |
'signals' |
'orchestration' |
'personalization' |
'attribution' |
'workflow' |
'integrations';
const pageComponents: Record<Page, ComponentType> = {
  dashboard: Dashboard,
  signals: SignalDiscovery,
  orchestration: Orchestration,
  personalization: Personalization,
  attribution: Attribution,
  workflow: WorkflowBuilder,
  integrations: Integrations
};
export function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const PageComponent = pageComponents[activePage];
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => setActivePage(page as Page)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <PageComponent />
      </main>
    </div>);

}