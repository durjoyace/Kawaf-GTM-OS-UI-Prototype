import React, { useState, Component } from 'react';
import { TopBar } from '../components/TopBar';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  PlusIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  CodeIcon,
  WebhookIcon,
  KeyIcon,
  ChevronRightIcon,
  DatabaseIcon,
  ZapIcon,
  LockIcon } from
'lucide-react';
type IntegrationStatus = 'connected' | 'error' | 'pending' | 'available';
type Integration = {
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
  logo: string;
  lastSync?: string;
  records?: string;
  tier: 'native' | 'partner' | 'api';
};
const integrations: Integration[] = [
{
  name: 'Salesforce',
  description:
  'Bi-directional CRM sync with opportunity, contact, and account data',
  category: 'CRM',
  status: 'connected',
  logo: 'SF',
  lastSync: '2 min ago',
  records: '12,400',
  tier: 'native'
},
{
  name: 'HubSpot',
  description:
  'Full contact, deal, and engagement sync with marketing attribution',
  category: 'CRM',
  status: 'connected',
  logo: 'HS',
  lastSync: '5 min ago',
  records: '8,920',
  tier: 'native'
},
{
  name: 'Outreach',
  description: 'Sequence enrollment, task creation, and reply tracking',
  category: 'Sales Engagement',
  status: 'connected',
  logo: 'OR',
  lastSync: '12 min ago',
  records: '3,210',
  tier: 'native'
},
{
  name: 'LinkedIn Sales Nav',
  description:
  'Account intelligence, connection requests, and InMail automation',
  category: 'Social',
  status: 'connected',
  logo: 'LI',
  lastSync: '1h ago',
  records: '5,640',
  tier: 'native'
},
{
  name: 'Slack',
  description: 'Signal alerts, deal updates, and team notifications',
  category: 'Messaging',
  status: 'connected',
  logo: 'SL',
  lastSync: '30 sec ago',
  records: '—',
  tier: 'native'
},
{
  name: 'Microsoft Teams',
  description: 'Meeting scheduling, notifications, and channel alerts',
  category: 'Messaging',
  status: 'pending',
  logo: 'MT',
  tier: 'native'
},
{
  name: 'Clearbit',
  description:
  'Firmographic enrichment, technographic data, and intent signals',
  category: 'Enrichment',
  status: 'connected',
  logo: 'CB',
  lastSync: '1h ago',
  records: '18,200',
  tier: 'partner'
},
{
  name: 'G2 Intent',
  description: 'Buyer intent data from G2 category research',
  category: 'Intent',
  status: 'error',
  logo: 'G2',
  tier: 'partner'
},
{
  name: 'Gong',
  description: 'Call intelligence, objection tracking, and deal risk signals',
  category: 'Conversation Intel',
  status: 'available',
  logo: 'GO',
  tier: 'partner'
},
{
  name: 'Segment',
  description: 'Product analytics events and user behavior data',
  category: 'Analytics',
  status: 'available',
  logo: 'SG',
  tier: 'partner'
},
{
  name: 'Marketo',
  description: 'Marketing automation, lead scoring, and campaign data',
  category: 'Marketing',
  status: 'available',
  logo: 'MK',
  tier: 'partner'
},
{
  name: 'Apollo.io',
  description: 'Contact database, email verification, and prospecting',
  category: 'Prospecting',
  status: 'available',
  logo: 'AP',
  tier: 'partner'
}];

const statusConfig: Record<
  IntegrationStatus,
  {
    label: string;
    icon: ComponentType<{
      className?: string;
    }>;
    color: string;
    dot: string;
  }> =
{
  connected: {
    label: 'Connected',
    icon: CheckCircleIcon,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500'
  },
  error: {
    label: 'Error',
    icon: XCircleIcon,
    color: 'text-red-700 bg-red-50 border-red-200',
    dot: 'bg-red-500'
  },
  pending: {
    label: 'Pending',
    icon: AlertCircleIcon,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    dot: 'bg-amber-500'
  },
  available: {
    label: 'Available',
    icon: PlusIcon,
    color: 'text-gray-600 bg-gray-50 border-gray-200',
    dot: 'bg-gray-300'
  }
};
const logoColors: Record<string, string> = {
  SF: 'bg-blue-500',
  HS: 'bg-orange-500',
  OR: 'bg-violet-500',
  LI: 'bg-blue-600',
  SL: 'bg-purple-500',
  MT: 'bg-indigo-500',
  CB: 'bg-teal-500',
  G2: 'bg-red-500',
  GO: 'bg-emerald-500',
  SG: 'bg-green-500',
  MK: 'bg-blue-700',
  AP: 'bg-amber-500'
};
export function Integrations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<
    'integrations' | 'api' | 'security'>(
    'integrations');
  const categories = [
  'All',
  'CRM',
  'Sales Engagement',
  'Social',
  'Messaging',
  'Enrichment',
  'Intent',
  'Analytics'];

  const filtered = integrations.filter(
    (i) => activeCategory === 'All' || i.category === activeCategory
  );
  const connected = integrations.filter((i) => i.status === 'connected').length;
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <TopBar
        title="Core Integrations"
        subtitle="Native deep integrations, open API, and US-centric security" />


      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Connected</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {connected}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              of {integrations.length} available
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Records Synced</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">48.4K</p>
            <p className="text-xs text-emerald-600 mt-1">Last sync: 30s ago</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">API Calls Today</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">12,840</p>
            <p className="text-xs text-gray-400 mt-1">of 50K limit</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Data Region</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">US-East</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheckIcon className="w-3 h-3" />
              SOC2 Compliant
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-lg p-1 shadow-sm w-fit">
          {(['integrations', 'api', 'security'] as const).map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${activeTab === tab ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>

              {tab === 'api' ?
            'Open API' :
            tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )}
        </div>

        {activeTab === 'integrations' &&
        <>
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${activeCategory === cat ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>

                  {cat}
                </button>
            )}
            </div>

            {/* Integration grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map((integration, i) => {
              const status = statusConfig[integration.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all">

                    <div className="flex items-start gap-3 mb-3">
                      <div
                      className={`w-10 h-10 rounded-xl ${logoColors[integration.logo] || 'bg-gray-400'} flex items-center justify-center flex-shrink-0`}>

                        <span className="text-xs font-bold text-white">
                          {integration.logo}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {integration.name}
                          </span>
                          <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${status.color}`}>

                            <StatusIcon className="w-2.5 h-2.5" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            {integration.category}
                          </span>
                          <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${integration.tier === 'native' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>

                            {integration.tier === 'native' ?
                          '⚡ Native' :
                          'Partner'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      {integration.description}
                    </p>

                    {integration.status === 'connected' &&
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3 bg-gray-50 rounded-lg px-2.5 py-1.5">
                        <span>Last sync: {integration.lastSync}</span>
                        <span>{integration.records} records</span>
                      </div>
                  }

                    {integration.status === 'error' &&
                  <div className="flex items-center gap-1.5 text-[10px] text-red-600 bg-red-50 rounded-lg px-2.5 py-1.5 mb-3">
                        <XCircleIcon className="w-3 h-3" />
                        Auth token expired — reconnect required
                      </div>
                  }

                    <div className="flex items-center gap-2">
                      {integration.status === 'connected' &&
                    <>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <RefreshCwIcon className="w-3 h-3" /> Sync
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            Configure
                          </button>
                        </>
                    }
                      {integration.status === 'error' &&
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                          Reconnect
                        </button>
                    }
                      {integration.status === 'available' &&
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                          <PlusIcon className="w-3 h-3" /> Connect
                        </button>
                    }
                      {integration.status === 'pending' &&
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg">
                          <AlertCircleIcon className="w-3 h-3" /> Authorize
                        </button>
                    }
                    </div>
                  </div>);

            })}
            </div>
          </>
        }

        {activeTab === 'api' &&
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <CodeIcon className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  REST API
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Full programmatic access to signals, sequences, accounts, and
                analytics. RESTful endpoints with JSON responses.
              </p>
              <div className="bg-[#0F1117] rounded-lg p-4 mb-4 font-mono text-xs">
                <div className="text-emerald-400 mb-1">GET /v1/signals</div>
                <div className="text-gray-400">
                  Authorization: Bearer {'<token>'}
                </div>
                <div className="text-gray-400">X-Workspace: kawaf-corp</div>
                <div className="mt-2 text-blue-300">
                  → 200 OK · 247 signals returned
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                  <ExternalLinkIcon className="w-3.5 h-3.5" /> View Docs
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <KeyIcon className="w-3.5 h-3.5" /> Generate Key
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <WebhookIcon className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Webhooks
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Real-time event notifications pushed to your endpoints. Supports
                signal detection, deal updates, and sequence completions.
              </p>
              <div className="space-y-2 mb-4">
                {[
              'signal.detected',
              'deal.stage_changed',
              'sequence.completed',
              'account.enriched'].
              map((event) =>
              <div
                key={event}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">

                    <span className="text-xs font-mono text-gray-700">
                      {event}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
              )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-600 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors">
                <PlusIcon className="w-3.5 h-3.5" /> Add Webhook
              </button>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold">
                  US-Centric Privacy & Security
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
              {
                label: 'Data Hosting',
                value: 'US-East (AWS)',
                icon: DatabaseIcon
              },
              {
                label: 'Compliance',
                value: 'SOC2 Type II',
                icon: ShieldCheckIcon
              },
              {
                label: 'Encryption',
                value: 'AES-256 at rest',
                icon: LockIcon
              },
              {
                label: 'Privacy',
                value: 'CCPA + GDPR',
                icon: KeyIcon
              }].
              map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/5 rounded-lg p-3">
                      <Icon className="w-4 h-4 text-emerald-400 mb-2" />
                      <p className="text-[10px] text-white/50 uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-xs font-semibold text-white mt-0.5">
                        {item.value}
                      </p>
                    </div>);

              })}
              </div>
            </div>
          </div>
        }

        {activeTab === 'security' &&
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Security Overview
              </h3>
              <div className="space-y-3">
                {[
              {
                label: 'SOC 2 Type II',
                status: 'Certified',
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'CCPA Compliance',
                status: 'Active',
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'GDPR Compliance',
                status: 'Active',
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'Penetration Testing',
                status: 'Q4 2024',
                color: 'text-blue-600 bg-blue-50'
              },
              {
                label: 'SSO / SAML',
                status: 'Enabled',
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'MFA Enforcement',
                status: 'Required',
                color: 'text-emerald-600 bg-emerald-50'
              }].
              map((item) =>
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">

                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.color}`}>

                      {item.status}
                    </span>
                  </div>
              )}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Data Residency
              </h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-blue-800 mb-1">
                  Primary: US-East-1 (AWS)
                </p>
                <p className="text-xs text-blue-700">
                  All customer data is stored and processed within US borders.
                  No cross-border data transfers without explicit consent.
                </p>
              </div>
              <div className="space-y-2">
                {[
              'Customer data encrypted at rest (AES-256)',
              'TLS 1.3 for all data in transit',
              'Daily encrypted backups',
              'Zero-knowledge architecture for secrets',
              'Audit logs retained 2 years'].
              map((item) =>
              <div key={item} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700">{item}</span>
                  </div>
              )}
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}