import { useApp } from '@/context/AppContext';
import { ProgressBar } from '@/components/Charts';
import { Trophy, Users, Clock, Gift, Check, Sparkles } from 'lucide-react';

export function ChallengesPage() {
  const { challenges, joinChallenge, showSuccess } = useApp();

  const handleJoin = (id: string, title: string, points: number, reward: string) => {
    joinChallenge(id);
    showSuccess({ title: 'Challenge Joined!', body: `You joined "${title}". Complete the challenge to earn ${points} points!`, points: 30, badge: reward.split('Badge')[0]?.trim() + ' Badge' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="flex items-center gap-2 mb-1">
        <Trophy className="w-6 h-6 text-accent-500" />
        <h1 className="text-2xl font-extrabold text-surface-800">Community Challenges</h1>
      </div>
      <p className="text-sm text-surface-500 mb-6">Join challenges, earn badges, and make an impact together</p>

      {/* Active challenge highlight */}
      {challenges.filter(c => c.joined).length > 0 && (
        <div className="card p-5 mb-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Your Active Challenges</span>
          </div>
          <div className="space-y-3">
            {challenges.filter(c => c.joined).map(c => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-surface-800 text-sm">{c.emoji} {c.title}</span>
                  <span className="text-xs text-surface-500">{c.participants}/{c.goal} joined</span>
                </div>
                <ProgressBar value={c.participants} max={c.goal} color="bg-primary-500" height="h-2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <div key={c.id} className="card card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{c.emoji}</span>
              {c.joined && <span className="badge-green"><Check className="w-3 h-3" /> Joined</span>}
            </div>
            <h3 className="font-bold text-surface-800 text-lg mb-1">{c.title}</h3>
            <p className="text-sm text-surface-500 mb-4">{c.description}</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-surface-500 mb-1">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.participants} / {c.goal}</span>
                <span>{Math.round((c.participants / c.goal) * 100)}%</span>
              </div>
              <ProgressBar value={c.participants} max={c.goal} color="bg-gradient-to-r from-primary-400 to-primary-600" height="h-2.5" />
            </div>

            {/* Reward */}
            <div className="flex items-center gap-2 text-sm bg-accent-50 rounded-lg px-3 py-2 mb-3">
              <Gift className="w-4 h-4 text-accent-600" />
              <span className="text-accent-700 font-medium">{c.reward}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-surface-400 mb-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.endsIn}</span>
              <span className="badge-yellow">+{c.rewardPoints} pts</span>
            </div>

            <button
              onClick={() => handleJoin(c.id, c.title, c.rewardPoints, c.reward)}
              disabled={c.joined}
              className={c.joined ? 'btn-outline w-full cursor-default' : 'btn-primary w-full'}
            >
              {c.joined ? <><Check className="w-4 h-4" /> Joined</> : 'Join Challenge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
