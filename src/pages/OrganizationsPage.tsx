import { useState } from 'react';
import { organizations } from '@/data/mockData';
import { Shield, MapPin, Users, Check, Plus, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function OrganizationsPage() {
  const { showSuccess } = useApp();
  const [joined, setJoined] = useState<Set<string>>(new Set());

  const handleJoin = (id: string, name: string) => {
    if (joined.has(id)) return;
    setJoined(prev => new Set(prev).add(id));
    showSuccess({ title: 'Joined!', body: `You joined ${name}. Check your notifications for updates.`, points: 30 });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-surface-400" /> Organizations
          </h1>
          <p className="text-sm text-surface-500 mt-1">NGOs and community groups in your area</p>
        </div>
        <button className="btn-primary hidden sm:flex">
          <Plus className="w-4 h-4" /> Register Org
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {organizations.map((org, i) => (
          <div key={org.id} className="card card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {org.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-surface-800">{org.name}</h3>
                  {org.verified && (
                    <span className="badge-green text-[10px]"><Shield className="w-3 h-3" /> Verified</span>
                  )}
                </div>
                <p className="text-sm text-surface-500 line-clamp-2 mb-3">{org.description}</p>
                <div className="space-y-1 text-xs text-surface-500 mb-3">
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {org.location}</p>
                  <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {org.volunteerCount} volunteers</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {org.activities.map((a, j) => (
                    <span key={j} className="badge-blue text-[10px]">{a}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleJoin(org.id, org.name)}
                  disabled={joined.has(org.id)}
                  className={joined.has(org.id) ? 'btn-outline w-full cursor-default' : 'btn-primary w-full'}
                >
                  {joined.has(org.id) ? <><Check className="w-4 h-4" /> Joined</> : 'Join Organization'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
