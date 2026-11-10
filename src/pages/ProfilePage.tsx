import { useApp } from '@/context/AppContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ProgressBar, LineChart, Chart } from '@/components/Charts';
import { contributionActivity, allBadges, levelNames, levelThresholds, helpByCategory } from '@/data/mockData';
import {
  Star, Trophy, Award, Heart, Clock, Flag, Check, Shield, TrendingUp, Sparkles, Settings,
} from 'lucide-react';

export function ProfilePage() {
  const { navigate, user, points } = useApp();
  const earnedBadges = allBadges.filter(b => b.earned);
  const nextLevel = (user.level + 1) as 2 | 3 | 4 | 5 | 6;
  const nextThreshold = levelThresholds[nextLevel] ?? 2000;
  const currentThreshold = levelThresholds[user.level] ?? 0;

  const stats = [
    { label: 'People Helped', value: 27, icon: Heart, color: 'text-primary-600 bg-primary-50' },
    { label: 'Volunteer Hours', value: 43, icon: Clock, color: 'text-secondary-600 bg-secondary-50' },
    { label: 'Issues Reported', value: 8, icon: Flag, color: 'text-accent-600 bg-accent-50' },
    { label: 'Issues Resolved', value: 6, icon: Check, color: 'text-primary-600 bg-primary-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8 space-y-6">
      {/* Profile header */}
      <div className="card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 border-4 border-white flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user.avatar}
            </div>
            <button onClick={() => navigate('dashboard')} className="btn-outline text-sm">
              <Settings className="w-4 h-4" /> Dashboard
            </button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-surface-800">{user.name}</h1>
            {user.verified && (
              <span className="badge-green text-[10px]"><Shield className="w-3 h-3" /> Verified</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-surface-500">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-accent-400" /> {user.rating} Rating</span>
            <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-accent-500" /> {levelNames[user.level]}</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-primary-500" /> {points} Points</span>
          </div>
          <p className="text-sm text-surface-500 mt-2">{user.bio}</p>
          <p className="text-xs text-surface-400 mt-1">📍 {user.location} • Joined {user.joinedDate}</p>
        </div>
      </div>

      {/* Level progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-surface-800">Level Progress</h3>
            <p className="text-sm text-surface-500">
              {nextLevel <= 5 ? `${nextThreshold - points} points to ${levelNames[nextLevel]}` : 'Max level achieved!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold">
              {user.level}
            </div>
          </div>
        </div>
        <ProgressBar value={points - currentThreshold} max={nextThreshold - currentThreshold} color="bg-gradient-to-r from-primary-400 to-primary-600" height="h-4" showLabel />
      </div>

      {/* Contributions */}
      <div>
        <h2 className="section-title mb-3">Contributions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-extrabold text-surface-800">{s.value}</p>
                <p className="text-xs text-surface-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <span key={skill} className="badge-blue">{skill}</span>
          ))}
        </div>
        <div className="mt-3 text-sm text-surface-500">
          <span className="font-medium">Availability:</span> {user.availability}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="section-title mb-3">Badges ({earnedBadges.length}/{allBadges.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allBadges.map((badge, i) => (
            <div
              key={badge.id}
              className={`card p-4 text-center transition-all animate-slide-up ${badge.earned ? 'card-hover' : 'opacity-50'}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`text-3xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>{badge.emoji}</div>
              <p className="font-semibold text-surface-800 text-sm">{badge.name}</p>
              <p className="text-xs text-surface-500 mt-0.5">{badge.description}</p>
              {badge.earned && badge.earnedDate && (
                <p className="text-[10px] text-primary-600 mt-1">Earned {badge.earnedDate}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contribution graph */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-1">Contribution Activity</h3>
        <p className="text-xs text-surface-500 mb-4">Activity over the last 6 months</p>
        <LineChart data={contributionActivity.map(d => ({ month: d.month, hours: d.value }))} />
      </div>

      {/* Help by category */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-4">Help by Category</h3>
        <Chart type="donut" data={helpByCategory} centerValue="27" centerLabel="Total" />
      </div>
    </div>
  );
}
