import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { helpCategories, urgencyLevels, categoryEmoji } from '@/data/mockData';
import { Search, MapPin, Clock, Star, Filter, Sparkles, Target } from 'lucide-react';
import type { Urgency } from '@/types';

export function VolunteerPage() {
  const { navigate, helpRequests, user } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [urgency, setUrgency] = useState<'All' | Urgency>('All');
  const [maxDistance, setMaxDistance] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const open = helpRequests.filter(r => r.status === 'Posted');

  const filtered = open.filter(r => {
    if (category !== 'All' && r.category !== category) return false;
    if (urgency !== 'All' && r.urgency !== urgency) return false;
    if (r.distance > maxDistance) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const urgencyBadge: Record<string, string> = {
    Low: 'badge-gray', Medium: 'badge-yellow', High: 'badge-orange', Urgent: 'badge-red',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-surface-800">Find Ways to Help</h1>
        <p className="text-sm text-surface-500 mt-1">Discover volunteer opportunities near you</p>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search opportunities..."
            className="input-field pl-10"
          />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="card p-4 mb-4 space-y-4 animate-slide-down">
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
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-surface-700">Max Distance</span>
              <span className="text-surface-500">{maxDistance} km</span>
            </div>
            <input type="range" min="1" max="10" value={maxDistance} onChange={e => setMaxDistance(Number(e.target.value))} className="w-full accent-primary-600" />
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((req, i) => {
          const skillMatch = user.skills.some(s =>
            s.toLowerCase().includes(req.category.toLowerCase()) ||
            req.category.toLowerCase().includes(s.toLowerCase())
          );
          const score = Math.min(99, Math.max(50,
            (skillMatch ? 40 : 15) + Math.max(0, 30 - req.distance * 3) + (user.availability === 'Flexible' ? 20 : 10)
          ));

          return (
            <div key={req.id} className="card card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{categoryEmoji[req.category]}</span>
                <div className="flex flex-col items-end gap-1">
                  <span className={urgencyBadge[req.urgency]}>{req.urgency}</span>
                  {skillMatch && (
                    <span className="badge-green text-[10px]">
                      <Target className="w-3 h-3" /> {score}% Match
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-surface-800 text-sm mb-1">{req.title}</h3>
              <p className="text-sm text-surface-500 line-clamp-2 mb-3">{req.description}</p>
              <div className="space-y-1 text-xs text-surface-500 mb-3">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {req.location} • {req.distance} km</p>
                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {req.requiredDate} • {req.estimatedTime}</p>
                <p className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-accent-400" /> {req.postedBy.name}</p>
              </div>
              {skillMatch && (
                <div className="flex items-center gap-1.5 text-xs text-primary-600 bg-primary-50 rounded-lg px-2 py-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Matches your skills!
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <span className="badge-green">+{req.points} points</span>
                <button onClick={() => navigate('help-detail', req.id)} className="btn-primary text-sm">
                  I Can Help
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-surface-400 text-lg">No opportunities found</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setUrgency('All'); setMaxDistance(10); }} className="btn-ghost mt-3">Clear filters</button>
        </div>
      )}
    </div>
  );
}
