import { useApp } from '@/context/AppContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Chart, LineChart, ProgressBar } from '@/components/Charts';
import {
  helpByCategory, issuesByCategory, monthlyVolunteerActivity,
} from '@/data/mockData';
import {
  Heart, Check, Clock, Users, TrendingUp, Sparkles, IndianRupee,
} from 'lucide-react';

export function ImpactPage() {
  const { navigate } = useApp();

  const stats = [
    { label: 'People Helped', value: 1248, icon: Heart, color: 'text-primary-600 bg-primary-50' },
    { label: 'Issues Resolved', value: 527, icon: Check, color: 'text-secondary-600 bg-secondary-50' },
    { label: 'Volunteer Hours', value: 2840, icon: Clock, color: 'text-accent-600 bg-accent-50' },
    { label: 'Active Volunteers', value: 386, icon: Users, color: 'text-primary-600 bg-primary-50' },
  ];

  const resolutionRate = Math.round((527 / (527 + 286)) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8 space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4" /> Community Impact
        </div>
        <h1 className="text-3xl font-extrabold text-surface-800">Our Community Impact</h1>
        <p className="text-surface-500 mt-2">See the real difference we're making together</p>
      </div>

      {/* Big animated stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card p-6 text-center animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl lg:text-4xl font-extrabold text-surface-800 tabular-nums">
                <AnimatedCounter value={s.value} />
              </p>
              <p className="text-sm text-surface-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Community value */}
      <div className="card p-6 text-center bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IndianRupee className="w-6 h-6" />
          <span className="text-4xl font-extrabold">1.8L</span>
        </div>
        <p className="text-white/90 text-sm">Estimated Community Value Created</p>
        <p className="text-white/70 text-xs mt-1">Based on volunteer hours and services provided</p>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-bold text-surface-800 mb-4">Help Requests by Category</h3>
          <Chart type="donut" data={helpByCategory} centerValue="100%" centerLabel="Coverage" />
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-surface-800 mb-4">Civic Issues by Category</h3>
          <Chart type="donut" data={issuesByCategory} centerValue="100%" centerLabel="Tracked" />
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-primary-600" />
          <h3 className="font-bold text-surface-800">Monthly Volunteer Activity</h3>
        </div>
        <p className="text-xs text-surface-500 mb-4">Total volunteer hours per month</p>
        <LineChart data={monthlyVolunteerActivity} />
      </div>

      {/* Resolution rate */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-3">Issue Resolution Rate</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-surface-500">527 resolved out of 813 reported</span>
          <span className="text-2xl font-extrabold text-primary-600">{resolutionRate}%</span>
        </div>
        <ProgressBar value={527} max={813} color="bg-gradient-to-r from-primary-400 to-primary-600" height="h-4" />
      </div>

      {/* Community participation */}
      <div className="card p-5">
        <h3 className="font-bold text-surface-800 mb-4">Community Participation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl font-extrabold text-surface-800">1,248</p>
            <p className="text-xs text-surface-500">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-surface-800">386</p>
            <p className="text-xs text-surface-500">Active Volunteers</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-surface-800">31%</p>
            <p className="text-xs text-surface-500">Volunteer Rate</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-surface-800">5</p>
            <p className="text-xs text-surface-500">Organizations</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button onClick={() => navigate('home')} className="btn-primary">Back to Home</button>
      </div>
    </div>
  );
}
