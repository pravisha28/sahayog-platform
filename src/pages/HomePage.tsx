import { useApp } from '@/context/AppContext';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ProgressBar } from '@/components/Charts';
import { feedItems, levelNames, levelThresholds, aiInsights, helpRequests, civicIssues } from '@/data/mockData';
import {
  LifeBuoy, HandHeart, Flag, BookMarked, MapPin, TrendingUp, ArrowRight,
  Sparkles, Target, AlertCircle, Clock, Users, ChevronRight, Trophy,
} from 'lucide-react';

export function HomePage() {
  const { navigate, user, points } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { label: 'People Helped', value: 1248, color: 'text-primary-600' },
    { label: 'Active Volunteers', value: 386, color: 'text-secondary-600' },
    { label: 'Issues Resolved', value: 527, color: 'text-accent-600' },
    { label: 'Volunteer Hours', value: 2840, color: 'text-warning-600' },
  ];

  const quickActions = [
    { title: 'Ask for Help', desc: 'Need assistance from someone nearby?', btn: 'Create Request', icon: LifeBuoy, color: 'from-primary-400 to-primary-600', action: () => navigate('create-request') },
    { title: 'Offer Help', desc: 'Have time or skills to help someone?', btn: 'Find Opportunities', icon: HandHeart, color: 'from-secondary-400 to-secondary-600', action: () => navigate('volunteer') },
    { title: 'Report Civic Issue', desc: 'See something that needs attention?', btn: 'Report Issue', icon: Flag, color: 'from-accent-400 to-accent-600', action: () => navigate('report-issue') },
    { title: 'Share Resource', desc: 'Know something useful for your community?', btn: 'Share Resource', icon: BookMarked, color: 'from-warning-400 to-warning-600', action: () => navigate('resources') },
  ];

  const suggestions = [
    {
      type: 'match', score: 94, emoji: '🎯', icon: Target,
      title: 'Mathematics tutoring needed',
      desc: 'A student 1.8 km away needs help with mathematics.',
      meta: [{ icon: '📚', text: 'Mathematics' }, { icon: '⏱', text: '2 hours' }, { icon: '📍', text: '1.8 km' }],
      btn: 'I Can Help', action: () => navigate('help-detail', 'hr2'),
    },
    {
      type: 'civic', emoji: '🚨', icon: AlertCircle,
      title: 'Large pothole reported',
      desc: 'A dangerous pothole has been reported on the main road.',
      meta: [{ icon: '📍', text: '900 m away' }],
      btn: 'View Issue', action: () => navigate('civic-detail', 'ci1'),
    },
    {
      type: 'match', score: 87, emoji: '🎯', icon: Target,
      title: 'Digital forms help needed',
      desc: 'A senior citizen needs help with online government forms.',
      meta: [{ icon: '💻', text: 'Digital Help' }, { icon: '⏱', text: '1 hour' }, { icon: '📍', text: '2.5 km' }],
      btn: 'I Can Help', action: () => navigate('help-detail', 'hr4'),
    },
  ];

  const nextLevel = (user.level + 1) as 2 | 3 | 4 | 5 | 6;
  const nextThreshold = levelThresholds[nextLevel] ?? 2000;
  const currentThreshold = levelThresholds[user.level] ?? 0;

  const statusBadge: Record<string, string> = {
    green: 'badge-green', blue: 'badge-blue', orange: 'badge-orange', red: 'badge-red', gray: 'badge-gray',
  };

  const insightColors: Record<string, string> = {
    orange: 'bg-accent-50 border-accent-200', red: 'bg-error-50 border-error-200',
    blue: 'bg-secondary-50 border-secondary-200', green: 'bg-primary-50 border-primary-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8 space-y-8">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 p-6 lg:p-8 text-white animate-fade-in">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            Pune, Maharashtra
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-1">
            Hello! What can I help you with? 👋
          </h1>
          <p className="text-white/90 text-sm lg:text-base mb-4">{greeting}. Let's make our community a little better today.</p>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
              <p className="text-xs text-white/80">Your Level</p>
              <p className="font-bold">{levelNames[user.level]}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
              <p className="text-xs text-white/80">Points</p>
              <p className="font-bold"><AnimatedCounter value={points} /></p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <div
              key={i}
              className="card card-hover p-5 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-sm`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-surface-800 mb-1">{action.title}</h3>
              <p className="text-sm text-surface-500 mb-3">{action.desc}</p>
              <button onClick={action.action} className="btn-outline w-full text-sm">
                {action.btn}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Community Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card p-5 text-center animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
            <p className={`stat-number ${stat.color}`}>
              <AnimatedCounter value={stat.value} />
            </p>
            <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Suggested for You + AI Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Suggestions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h2 className="section-title">Suggested for You</h2>
          </div>
          <div className="space-y-3">
            {suggestions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="card card-hover p-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      s.type === 'match' ? 'bg-primary-50' : 'bg-accent-50'
                    }`}>
                      {s.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {s.score && (
                          <span className="badge-green">
                            <Target className="w-3 h-3" />
                            {s.score}% Match
                          </span>
                        )}
                        {s.type === 'civic' && <span className="badge-red">Nearby Issue</span>}
                      </div>
                      <h3 className="font-bold text-surface-800 text-sm lg:text-base">{s.title}</h3>
                      <p className="text-sm text-surface-500 mt-0.5">{s.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {s.meta.map((m, j) => (
                          <span key={j} className="text-xs text-surface-500 bg-surface-100 px-2 py-0.5 rounded-md">
                            {m.icon} {m.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button onClick={s.action} className={`btn-primary shrink-0 text-sm ${s.type === 'civic' ? 'btn-accent' : ''}`}>
                      {s.btn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary-600" />
            <h2 className="section-title">AI Community Insights</h2>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className={`rounded-xl p-4 border ${insightColors[insight.color]} animate-slide-up`} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start gap-2">
                  <span className="text-xl">{insight.icon}</span>
                  <div>
                    <p className="font-semibold text-surface-800 text-sm">{insight.title}</p>
                    <p className="text-xs text-surface-600 mt-0.5">{insight.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">What's happening around you</h2>
          <button className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
            View All Updates <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedItems.slice(0, 6).map((item, i) => (
            <div key={item.id} className="card card-hover p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-2">
                <span className={`badge ${statusBadge[item.statusColor || 'gray']}`}>{item.status}</span>
                <span className="text-xs text-surface-400">{item.timestamp}</span>
              </div>
              <h3 className="font-bold text-surface-800 text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-surface-500 mb-2">{item.description}</p>
              <p className="text-xs text-surface-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {item.distance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Level progress */}
      <div className="card p-5 bg-gradient-to-br from-white to-primary-50/40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-surface-800">Your Progress</h3>
            <p className="text-sm text-surface-500">
              {nextLevel <= 5 ? `${nextThreshold - points} points to ${levelNames[nextLevel]}` : 'Max level reached!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-500" />
            <span className="font-bold text-surface-800">Lv. {user.level}</span>
          </div>
        </div>
        <ProgressBar value={points - currentThreshold} max={nextThreshold - currentThreshold} color="bg-gradient-to-r from-primary-400 to-primary-600" height="h-4" showLabel />
      </div>
    </div>
  );
}
