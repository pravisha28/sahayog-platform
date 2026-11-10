import { useApp } from '@/context/AppContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { organizations, resources, challenges } from '@/data/mockData';
import {
  Users, Heart, Flag, Building2, Check, X, Shield, AlertTriangle,
  BarChart3, Settings,
} from 'lucide-react';

export function AdminPage() {
  const { navigate, helpRequests, civicIssues } = useApp();

  const stats = [
    { label: 'Users', value: 1248, icon: Users, color: 'text-secondary-600 bg-secondary-50' },
    { label: 'Active Volunteers', value: 386, icon: Heart, color: 'text-primary-600 bg-primary-50' },
    { label: 'Requests', value: helpRequests.length, icon: Heart, color: 'text-accent-600 bg-accent-50' },
    { label: 'Civic Issues', value: civicIssues.length, icon: Flag, color: 'text-error-600 bg-error-50' },
    { label: 'Resolved', value: civicIssues.filter(i => i.status === 'Resolved').length, icon: Check, color: 'text-primary-600 bg-primary-50' },
    { label: 'Organizations', value: organizations.length, icon: Building2, color: 'text-secondary-600 bg-secondary-50' },
  ];

  const controls = [
    { label: 'Users', icon: Users, count: 1248 },
    { label: 'Requests', icon: Heart, count: helpRequests.length },
    { label: 'Civic Issues', icon: Flag, count: civicIssues.length },
    { label: 'Organizations', icon: Building2, count: organizations.length },
    { label: 'Reports', icon: AlertTriangle, count: 7 },
    { label: 'Resources', icon: Building2, count: resources.length },
    { label: 'Challenges', icon: BarChart3, count: challenges.length },
  ];

  const pendingOrgs = organizations.filter(o => !o.verified);
  const pendingIssues = civicIssues.filter(i => i.status === 'Reported');
  const pendingRequests = helpRequests.filter(r => r.status === 'Posted');

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-surface-400" /> Admin Dashboard
          </h1>
          <p className="text-sm text-surface-500 mt-1">Manage and moderate the Sahayog community</p>
        </div>
        <button onClick={() => navigate('home')} className="btn-outline text-sm">
          Exit Admin
        </button>
      </div>

      {/* Overview stats */}
      <div>
        <h2 className="section-title mb-3">Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card p-4 text-center">
                <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-extrabold text-surface-800"><AnimatedCounter value={s.value} /></p>
                <p className="text-xs text-surface-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin controls grid */}
      <div>
        <h2 className="section-title mb-3">Admin Controls</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {controls.map((c, i) => {
            const Icon = c.icon;
            return (
              <button key={i} className="card card-hover p-4 text-center">
                <Icon className="w-6 h-6 text-surface-400 mx-auto mb-2" />
                <p className="text-lg font-extrabold text-surface-800">{c.count}</p>
                <p className="text-xs text-surface-500">{c.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Moderation queue */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Pending requests */}
        <div className="card p-4">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Pending Requests ({pendingRequests.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingRequests.slice(0, 5).map(r => (
              <div key={r.id} className="flex items-center justify-between p-2 rounded-lg bg-surface-50">
                <span className="text-xs text-surface-600 truncate">{r.title}</span>
                <div className="flex gap-1 shrink-0">
                  <button className="w-6 h-6 rounded bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200"><Check className="w-3 h-3" /></button>
                  <button className="w-6 h-6 rounded bg-error-100 text-error-600 flex items-center justify-center hover:bg-error-200"><X className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending issues */}
        <div className="card p-4">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Pending Issues ({pendingIssues.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pendingIssues.slice(0, 5).map(issue => (
              <div key={issue.id} className="flex items-center justify-between p-2 rounded-lg bg-surface-50">
                <span className="text-xs text-surface-600 truncate">{issue.title}</span>
                <div className="flex gap-1 shrink-0">
                  <button className="w-6 h-6 rounded bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200"><Check className="w-3 h-3" /></button>
                  <button className="w-6 h-6 rounded bg-error-100 text-error-600 flex items-center justify-center hover:bg-error-200"><X className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending organizations */}
        <div className="card p-4">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Pending Orgs ({pendingOrgs.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {organizations.map(org => (
              <div key={org.id} className="flex items-center justify-between p-2 rounded-lg bg-surface-50">
                <span className="text-xs text-surface-600 truncate">{org.name}</span>
                <div className="flex gap-1 shrink-0">
                  {org.verified ? (
                    <span className="badge-green text-[10px]">Verified</span>
                  ) : (
                    <>
                      <button className="w-6 h-6 rounded bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200"><Check className="w-3 h-3" /></button>
                      <button className="w-6 h-6 rounded bg-error-100 text-error-600 flex items-center justify-center hover:bg-error-200"><X className="w-3 h-3" /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation actions */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-surface-400" />
          <h3 className="font-bold text-surface-800">Moderation Tools</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Verify requests', 'Verify civic issues', 'Remove inappropriate posts', 'Suspend users', 'Approve organizations', 'Manage resources'].map(action => (
            <button key={action} className="btn-outline text-sm">{action}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
