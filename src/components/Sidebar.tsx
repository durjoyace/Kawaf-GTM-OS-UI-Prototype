import React, { useState, Component } from 'react';
import {
  ZapIcon,
  LayoutDashboardIcon,
  RadioIcon,
  SparklesIcon,
  BarChart3Icon,
  WorkflowIcon,
  PlugIcon,
  ChevronRightIcon,
  BellIcon,
  SettingsIcon,
  HelpCircleIcon,
  TrendingUpIcon } from
'lucide-react';
type NavItem = {
  id: string;
  label: string;
  icon: ComponentType<{
    className?: string;
  }>;
  badge?: string | number;
  badgeColor?: string;
};
const mainNav: NavItem[] = [
{
  id: 'dashboard',
  label: 'Dashboard',
  icon: LayoutDashboardIcon
},
{
  id: 'signals',
  label: 'Signal Discovery',
  icon: ZapIcon,
  badge: '12',
  badgeColor: 'bg-blue-500'
},
{
  id: 'orchestration',
  label: 'Orchestration',
  icon: RadioIcon,
  badge: '3',
  badgeColor: 'bg-violet-500'
},
{
  id: 'personalization',
  label: 'AI Personalization',
  icon: SparklesIcon
},
{
  id: 'attribution',
  label: 'Attribution',
  icon: BarChart3Icon
},
{
  id: 'workflow',
  label: 'Workflow Builder',
  icon: WorkflowIcon
},
{
  id: 'integrations',
  label: 'Integrations',
  icon: PlugIcon,
  badge: '!',
  badgeColor: 'bg-amber-500'
}];

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};
export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`sidebar-scroll flex flex-col h-screen bg-[#0F1117] transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}>

      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
        {!collapsed &&
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight tracking-tight">
                Kawaf
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                GTM OS
              </div>
            </div>
          </div>
        }
        {collapsed &&
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto">
            <TrendingUpIcon className="w-4 h-4 text-white" />
          </div>
        }
        {!collapsed &&
        <button
          onClick={() => setCollapsed(true)}
          className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded">

            <ChevronRightIcon className="w-4 h-4 rotate-180" />
          </button>
        }
      </div>

      {collapsed &&
      <button
        onClick={() => setCollapsed(false)}
        className="flex items-center justify-center py-3 text-slate-500 hover:text-slate-300 transition-colors">

          <ChevronRightIcon className="w-4 h-4" />
        </button>
      }

      {/* Workspace selector */}
      {!collapsed &&
      <div className="px-3 py-3 border-b border-white/5">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-emerald-400">K</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">
                Kawaf Corp
              </div>
              <div className="text-[10px] text-slate-500">Enterprise</div>
            </div>
            <ChevronRightIcon className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors rotate-90" />
          </button>
        </div>
      }

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {!collapsed &&
        <div className="px-2 pb-2">
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
              Main
            </span>
          </div>
        }
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all duration-150 group relative ${isActive ? 'bg-blue-500/15 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>

              {isActive &&
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-400 rounded-r-full" />
              }
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`} />

              {!collapsed &&
              <>
                  <span className="text-sm font-medium flex-1 text-left">
                    {item.label}
                  </span>
                  {item.badge &&
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${item.badgeColor}`}>

                      {item.badge}
                    </span>
                }
                </>
              }
              {collapsed && item.badge &&
              <span
                className={`absolute top-1 right-1 w-2 h-2 rounded-full ${item.badgeColor}`} />

              }
            </button>);

        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-3 border-t border-white/5 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
          <BellIcon className="w-4 h-4 flex-shrink-0" />
          {!collapsed &&
          <span className="text-sm font-medium">Notifications</span>
          }
        </button>
        <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
          <HelpCircleIcon className="w-4 h-4 flex-shrink-0" />
          {!collapsed &&
          <span className="text-sm font-medium">Help & Docs</span>
          }
        </button>
        <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
          <SettingsIcon className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>

        {/* User avatar */}
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2.5 mt-2 ${collapsed ? 'justify-center' : ''}`}>

          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-bold text-white">AK</span>
          </div>
          {!collapsed &&
          <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-300 truncate">
                Ahmed K.
              </div>
              <div className="text-[10px] text-slate-600 truncate">
                admin@kawaf.io
              </div>
            </div>
          }
        </div>
      </div>
    </aside>);

}