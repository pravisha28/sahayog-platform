import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { issueCategories, issueCategoryEmoji } from '@/data/mockData';
import { Search, Filter, MapPin, Users, Clock, Plus, AlertCircle } from 'lucide-react';
import type { IssueStatus } from '@/types';

export function CivicIssuesPage() {
  const { navigate, civicIssues } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | IssueStatus>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = civicIssues.filter(i => {
    if (category !== 'All' && i.category !== category) return false;
    if (statusFilter !== 'All' && i.status !== statusFilter) return false;
    if (search && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const priorityBadge: Record<string, string> = {
    Low: 'badge-gray', Medium: 'badge-yellow', High: 'badge-orange', Urgent: 'badge-red',
  };

  const statusBadge: Record<string, string> = {
    Reported: 'badge-red', Verified: 'badge-blue', Assigned: 'badge-yellow',
    'In Progress': 'badge-orange', Resolved: 'badge-green',
  };

  const statuses: IssueStatus[] = ['Reported', 'Verified', 'Assigned', 'In Progress', 'Resolved'];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800">Civic Issues</h1>
          <p className="text-sm text-surface-500 mt-1">Report and track local community issues</p>
        </div>
        <button onClick={() => navigate('report-issue')} className="btn-accent hidden sm:flex">
          <Plus className="w-4 h-4" /> Report Issue
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {statuses.map(s => {
          const count = civicIssues.filter(i => i.status === s).length;
          return (
            <div key={s} className="card p-3 text-center">
              <p className="text-xl font-extrabold text-surface-800">{count}</p>
              <p className="text-[10px] lg:text-xs text-surface-500">{s}</p>
            </div>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search issues..."
            className="input-field pl-10"
          />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="card p-4 mb-4 space-y-3 animate-slide-down">
          <div>
            <p className="text-sm font-medium text-surface-700 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCategory('All')} className={`badge ${category === 'All' ? 'badge-green' : 'badge-gray'}`}>All</button>
              {issueCategories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`badge ${category === c ? 'badge-green' : 'badge-gray'}`}>
                  {issueCategoryEmoji[c]} {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-surface-700 mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setStatusFilter('All')} className={`badge ${statusFilter === 'All' ? 'badge-green' : 'badge-gray'}`}>All</button>
              {statuses.map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`badge ${statusFilter === s ? 'badge-green' : 'badge-gray'}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Issue cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((issue, i) => (
          <div
            key={issue.id}
            className="card card-hover p-5 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => navigate('civic-detail', issue.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{issueCategoryEmoji[issue.category]}</span>
              <div className="flex gap-1">
                <span className={priorityBadge[issue.priority]}>{issue.priority}</span>
              </div>
            </div>
            <h3 className="font-bold text-surface-800 mb-1">{issue.title}</h3>
            <p className="text-sm text-surface-500 line-clamp-2 mb-3">{issue.description}</p>
            <div className="space-y-1 text-xs text-surface-500 mb-3">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {issue.location} • {issue.distance} km</p>
              <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {issue.reportedAt}</p>
              <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {issue.affectedCount} people affected</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-surface-100">
              <span className={statusBadge[issue.status]}>{issue.status}</span>
              <span className="text-accent-600 text-sm font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> View Details
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-surface-400 text-lg">No issues found</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setStatusFilter('All'); }} className="btn-ghost mt-3">Clear filters</button>
        </div>
      )}
    </div>
  );
}
