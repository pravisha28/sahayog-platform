import { useApp } from '@/context/AppContext';
import { helpCategories, urgencyLevels, categoryEmoji } from '@/data/mockData';
import { useState } from 'react';
import { Search, Filter, MapPin, Clock, Star, Plus, Heart } from 'lucide-react';
import type { Urgency } from '@/types';

export function HelpListPage() {
  const { navigate, helpRequests } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [urgency, setUrgency] = useState<'All' | Urgency>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = helpRequests.filter(r => {
    if (r.status === 'Completed' || r.status === 'Rated') return false;
    if (category !== 'All' && r.category !== category) return false;
    if (urgency !== 'All' && r.urgency !== urgency) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) &&
        !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const urgencyBadge: Record<string, string> = {
    Low: 'badge-gray', Medium: 'badge-yellow', High: 'badge-orange', Urgent: 'badge-red',
  };

  const statusBadge: Record<string, string> = {
    Posted: 'badge-blue', Matched: 'badge-yellow', Accepted: 'badge-green', 'In Progress': 'badge-orange',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800">Help Requests</h1>
          <p className="text-sm text-surface-500 mt-1">Find people who need your help nearby</p>
        </div>
        <button onClick={() => navigate('create-request')} className="btn-primary hidden sm:flex">
          <Plus className="w-4 h-4" /> Post Request
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help requests..."
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
              {helpCategories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`badge ${category === c ? 'badge-green' : 'badge-gray'}`}>
                  {categoryEmoji[c]} {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-surface-700 mb-2">Urgency</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setUrgency('All')} className={`badge ${urgency === 'All' ? 'badge-green' : 'badge-gray'}`}>All</button>
              {urgencyLevels.map(u => (
                <button key={u} onClick={() => setUrgency(u as Urgency)} className={`badge ${urgency === u ? 'badge-green' : 'badge-gray'}`}>{u}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Request cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((req, i) => (
          <div
            key={req.id}
            className="card card-hover p-5 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => navigate('help-detail', req.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{categoryEmoji[req.category]}</span>
              <div className="flex gap-1">
                <span className={urgencyBadge[req.urgency]}>{req.urgency}</span>
                <span className={statusBadge[req.status]}>{req.status}</span>
              </div>
            </div>
            <h3 className="font-bold text-surface-800 mb-1">{req.title}</h3>
            <p className="text-sm text-surface-500 line-clamp-2 mb-3">{req.description}</p>
            <div className="space-y-1.5 text-xs text-surface-500">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {req.location} • {req.distance} km away</p>
              <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {req.estimatedTime} • {req.requiredDate}</p>
              <p className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-accent-400" /> {req.postedBy.name}</p>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
              <span className="badge-green">+{req.points} points</span>
              <span className="text-primary-600 text-sm font-medium flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Help
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-surface-400 text-lg">No help requests found</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setUrgency('All'); }} className="btn-ghost mt-3">Clear filters</button>
        </div>
      )}
    </div>
  );
}
