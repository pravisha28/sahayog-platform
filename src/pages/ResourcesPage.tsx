import { useState } from 'react';
import { resources, resourceCategories } from '@/data/mockData';
import { Search, MapPin, Phone, Clock, Star, Filter, Shield, ArrowRight } from 'lucide-react';

export function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categoryEmoji: Record<string, string> = {
    'Healthcare': '🏥', 'Education': '📚', 'Food': '🍲', 'Employment': '💼',
    'Government Services': '🏛', 'Blood Donation': '🩸', 'Shelters': '🏠',
    'Animal Care': '🐕', 'Libraries': '📖',
  };

  const filtered = resources.filter(r => {
    if (category !== 'All' && r.category !== category) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-surface-800 mb-1">Local Resources</h1>
      <p className="text-sm text-surface-500 mb-6">Community resources and services near you</p>

      {/* Search + Filters */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." className="input-field pl-10" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="card p-4 mb-4 animate-slide-down">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCategory('All')} className={`badge ${category === 'All' ? 'badge-green' : 'badge-gray'}`}>All</button>
            {resourceCategories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`badge ${category === c ? 'badge-green' : 'badge-gray'}`}>
                {categoryEmoji[c]} {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r, i) => (
          <div key={r.id} className="card card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{categoryEmoji[r.category]}</span>
              {r.verified && (
                <span className="badge-green text-[10px]"><Shield className="w-3 h-3" /> Verified</span>
              )}
            </div>
            <h3 className="font-bold text-surface-800 mb-1">{r.name}</h3>
            <p className="text-sm text-surface-500 line-clamp-2 mb-3">{r.description}</p>
            <div className="space-y-1.5 text-xs text-surface-500 mb-3">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {r.address} • {r.distance} km</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {r.contact}</p>
              <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {r.hours}</p>
              <p className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-accent-400" /> {r.rating} rating</p>
            </div>
            <button className="btn-primary w-full text-sm">
              View Resource <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
