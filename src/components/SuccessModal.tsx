import { useApp } from '@/context/AppContext';
import { X, PartyPopper, Award } from 'lucide-react';

export function SuccessModal() {
  const { successData, clearSuccess } = useApp();

  if (!successData) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center animate-bounce-in relative overflow-hidden">
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#fbbf24', '#ef4444'][i % 5],
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>

        <button
          onClick={clearSuccess}
          className="absolute top-4 right-4 text-surface-400 hover:text-surface-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center animate-wiggle">
          <PartyPopper className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-extrabold text-surface-800 mb-2">Great job!</h2>
        <p className="text-surface-600 text-sm mb-6">{successData.body}</p>

        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-xl font-bold">
            +{successData.points} Points
          </div>
          {successData.badge && (
            <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 px-4 py-2 rounded-xl font-bold ml-2">
              <Award className="w-4 h-4" />
              {successData.badge}
            </div>
          )}
        </div>

        <button onClick={clearSuccess} className="btn-primary w-full">
          Continue Helping
        </button>
      </div>
    </div>
  );
}
