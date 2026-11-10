import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mapMarkers } from '@/data/mockData';
import type { MapMarker } from '@/types';
import { X, MapPin, Navigation, Filter } from 'lucide-react';

const markerColors: Record<MapMarker['type'], string> = {
  issue: 'bg-error-500',
  request: 'bg-primary-500',
  resource: 'bg-secondary-500',
  activity: 'bg-accent-500',
};

const markerLabels: Record<MapMarker['type'], string> = {
  issue: 'Civic Issue',
  request: 'Help Request',
  resource: 'Resource',
  activity: 'Activity',
};

export function CommunityMap() {
  const { navigate } = useApp();
  const [selected, setSelected] = useState<MapMarker | null>(null);
  const [filters, setFilters] = useState<Record<MapMarker['type'], boolean>>({
    issue: true,
    request: true,
    resource: true,
    activity: true,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mapMarkers.filter(m => filters[m.type]);

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-surface-200 bg-gradient-to-br from-primary-50 via-secondary-50 to-surface-100">
      {/* Map background */}
      <div className="absolute inset-0">
        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e5e5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Major roads */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d4d4d4" strokeWidth="6" opacity="0.6" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#d4d4d4" strokeWidth="6" opacity="0.6" />
          <line x1="0" y1="25%" x2="100%" y2="35%" stroke="#e5e5e5" strokeWidth="4" opacity="0.5" />
          <line x1="20%" y1="0" x2="30%" y2="100%" stroke="#e5e5e5" strokeWidth="4" opacity="0.5" />
          <line x1="70%" y1="0" x2="80%" y2="100%" stroke="#e5e5e5" strokeWidth="4" opacity="0.5" />
          {/* River */}
          <path d="M 0 70% Q 30% 60% 50% 75% T 100% 65%" fill="none" stroke="#93c5fd" strokeWidth="12" opacity="0.3" />
          {/* Parks */}
          <rect x="10%" y="15%" width="15%" height="12%" rx="4" fill="#bbf7d0" opacity="0.4" />
          <rect x="65%" y="55%" width="18%" height="15%" rx="4" fill="#bbf7d0" opacity="0.4" />
        </svg>
      </div>

      {/* Filter button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-4 right-4 z-10 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2 text-sm font-medium text-surface-700 hover:shadow-lg transition-shadow"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Filter panel */}
      {showFilters && (
        <div className="absolute top-16 right-4 z-10 bg-white rounded-xl shadow-lg p-3 space-y-2 animate-slide-down">
          {(Object.keys(filters) as MapMarker['type'][]).map(type => (
            <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters[type]}
                onChange={() => setFilters(prev => ({ ...prev, [type]: !prev[type] }))}
                className="w-4 h-4 rounded accent-primary-600"
              />
              <span className={`w-3 h-3 rounded-full ${markerColors[type]}`} />
              <span className="text-surface-700">{markerLabels[type]}</span>
            </label>
          ))}
        </div>
      )}

      {/* Map markers */}
      {filtered.map(marker => (
        <button
          key={marker.id}
          onClick={() => setSelected(marker)}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <div className={`w-6 h-6 rounded-full ${markerColors[marker.type]} border-2 border-white shadow-md group-hover:scale-125 group-hover:z-20 transition-all`} />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rounded-full bg-black/20" />
        </button>
      ))}

      {/* Popup */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:w-80 bg-white rounded-2xl shadow-xl p-4 animate-slide-up border border-surface-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${markerColors[selected.type]}`} />
              <span className="text-xs font-medium text-surface-500">{markerLabels[selected.type]}</span>
            </div>
            <button onClick={() => setSelected(null)} className="text-surface-400 hover:text-surface-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-bold text-surface-800 mb-1">{selected.title}</h3>
          <p className="text-sm text-surface-500 mb-3 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {selected.subtitle} • {selected.distance} km away
          </p>
          {selected.priority && (
            <span className={`badge ${
              selected.priority === 'Urgent' ? 'badge-red' :
              selected.priority === 'High' ? 'badge-orange' :
              selected.priority === 'Medium' ? 'badge-yellow' : 'badge-gray'
            }`}>
              {selected.priority} Priority
            </span>
          )}
          <button
            onClick={() => {
              if (selected.type === 'request') navigate('help');
              else if (selected.type === 'issue') navigate('civic');
              else if (selected.type === 'resource') navigate('resources');
              else navigate('challenges');
            }}
            className="btn-primary w-full mt-3 text-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            View {markerLabels[selected.type]}
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur rounded-xl p-2 space-y-1 text-xs hidden lg:block">
        {(Object.keys(markerColors) as MapMarker['type'][]).map(type => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${markerColors[type]}`} />
            <span className="text-surface-600">{markerLabels[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
