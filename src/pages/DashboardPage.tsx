import { useApp } from '@/context/AppContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ProgressBar, LineChart, Chart } from '@/components/Charts';
import {
  contributionActivity, helpByCategory, levelNames, levelThresholds,
} from '@/data/mockData';
import {
  Heart, Clock, Flag, Check, Star, TrendingUp, Award, Activity,
} from 'lucide-react';

export function DashboardPage() {
  const { navigate, user, points, helpRequests } = useApp();

  const stats = [
    { label: 'People Helped', value: 27, icon: Heart, color: 'text-primary-600 bg-primary-50' },
    { label: 'Volunteer Hours', value: 43, icon: Clock, color: 'text-secondary-600 bg-secondary-50' },
    { label: 'Issues Reported', value: 8, icon: Flag, color: 'text-accent-600 bg-accent-50' },
    { label: 'Issues Resolved', value: 6, icon: Check, color: 'text-primary-600 bg-primary-50' },
  ];

  const active = helpRequests.filter(r => r.status === 'Posted' || r.status === 'Matched' || r.status === 'Accepted').length;
  const completed = helpRequests.filter(r => r.status === 'Completed').length;
  const pending = helpRequests.filter(r => r.status === 'In Progress').length;

  const nextLevel = (user.level + 1) as 2 | 3 | 4 | 5 | 6;
  const nextThreshold = levelThresholds[nextLevel] ?? 2000;
  const currentThreshold = levelThresholds[user.level] ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800">My Dashboard</h1>
          <p className="text-sm text-surface-500 mt-1">Track your community impact and activity</p>
        </div>
        <button onClick={() => navigate('profile')} className="btn-outline text-sm">View Profile</button>
      </div>

      {/* Impact stats */}
      <div className="card p-5 bg-gradient-to-br from-white to-primary-50/40">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h2 className="font-bold text-surface-800">My Impact</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-extrabold text-surface-800"><AnimatedCounter value={s.value} /></p>
                <p className="text-xs text-surface-500">{s.label}</p>
              </div>
            );
          })}
          <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-accent-600" />
            </div>
            <p className="text-2xl font-extrabold text-surface-800"><AnimatedCounter value={points} /></p>
            <p className="text-xs text-surface-500">Points</p>
          </div>
        </div>
      </div>

      {/* Level progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-surface-800">Level Progress</h3>
            <p className="text-sm text-surface-500">
              {nextLevel <= 5 ? `${nextThreshold - points} points to ${levelNames[nextLevel]}` : 'Max level!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-500" />
            <span className="font-bold text-surface-800">Lv. {user.level}</span>
          </div>
        </div>
        <ProgressBar value={points - currentThreshold} max={nextThreshold - currentThreshold} color="bg-gradient-to-r from-primary-400 to-primary-600" height="h-4" showLabel />
      </div>

      {/* Request status */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-4">Request Status</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-secondary-50">
            <p className="text-2xl font-extrabold text-secondary-700">{active}</p>
            <p className="text-xs text-surface-500">Active</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-primary-50">
            <p className="text-2xl font-extrabold text-primary-700">{completed}</p>
            <p className="text-xs text-surface-500">Completed</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-accent-50">
            <p className="text-2xl font-extrabold text-accent-700">{pending}</p>
            <p className="text-xs text-surface-500">Pending</p>
          </div>
        </div>
      </div>

      {/* Contribution graph */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-surface-400" />
          <h3 className="font-bold text-surface-800">Contribution Graph</h3>
        </div>
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
