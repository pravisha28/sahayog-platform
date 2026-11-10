import { useApp } from '@/context/AppContext';
import { categoryEmoji } from '@/data/mockData';
import {
  MapPin, Clock, Calendar, Star, Shield, ArrowLeft, HandHeart,
  MessageCircle, Target, Sparkles, Check, User as UserIcon,
} from 'lucide-react';

export function HelpDetailPage() {
  const { pageData, navigate, helpRequests, acceptHelpRequest, completeHelpRequest, showSuccess } = useApp();
  const req = helpRequests.find(r => r.id === pageData);

  if (!req) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-surface-500">Request not found.</p>
        <button onClick={() => navigate('help')} className="btn-primary mt-4">Back to Help</button>
      </div>
    );
  }

  const urgencyBadge: Record<string, string> = {
    Low: 'badge-gray', Medium: 'badge-yellow', High: 'badge-orange', Urgent: 'badge-red',
  };
  const statusBadge: Record<string, string> = {
    Posted: 'badge-blue', Matched: 'badge-yellow', Accepted: 'badge-green',
    'In Progress': 'badge-orange', Completed: 'badge-green', Rated: 'badge-gray',
  };

  const handleAccept = (volunteerName: string) => {
    acceptHelpRequest(req.id);
    showSuccess({
      title: 'You\'re Helping Now!',
      body: `You are now helping ${volunteerName}. You can coordinate through messages.`,
      points: req.points,
      badge: 'Helping Hand',
    });
  };

  const isAccepted = req.status === 'Accepted' || req.status === 'In Progress';
  const isCompleted = req.status === 'Completed';

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <button onClick={() => navigate('help')} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back to Help
      </button>

      {/* Header */}
      <div className="card p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl shrink-0">
            {categoryEmoji[req.category]}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={urgencyBadge[req.urgency]}>{req.urgency} Priority</span>
              <span className={statusBadge[req.status]}>{req.status}</span>
              <span className="badge-green">+{req.points} points</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-surface-800 mb-2">{req.title}</h1>
            <p className="text-surface-600">{req.description}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="card p-5 space-y-3">
          <h3 className="font-bold text-surface-800 text-sm">Details</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-surface-600"><MapPin className="w-4 h-4 text-surface-400" /> {req.location} • {req.distance} km away</p>
            <p className="flex items-center gap-2 text-surface-600"><Clock className="w-4 h-4 text-surface-400" /> Estimated time: {req.estimatedTime}</p>
            <p className="flex items-center gap-2 text-surface-600"><Calendar className="w-4 h-4 text-surface-400" /> Required: {req.requiredDate}</p>
            <p className="flex items-center gap-2 text-surface-600">
              <UserIcon className="w-4 h-4 text-surface-400" /> Posted by {req.postedBy.name}
              {req.postedBy.verified && <Shield className="w-3.5 h-3.5 text-primary-600" />}
            </p>
            <p className="text-xs text-surface-400 pl-6">Posted {req.postedAt}</p>
          </div>
        </div>

        {/* Posted by user card */}
        <div className="card p-5">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Posted By</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold">
              {req.postedBy.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-surface-800">{req.postedBy.name}</p>
                {req.postedBy.verified && (
                  <span className="badge-green text-[10px]"><Shield className="w-3 h-3" /> Verified</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-surface-500">
                <Star className="w-3.5 h-3.5 text-accent-400" /> {req.postedBy.rating} • {req.postedBy.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Matching */}
      {req.matchedVolunteers && req.matchedVolunteers.length > 0 && (
        <div className="card p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-surface-800">AI Matching — {req.matchedVolunteers.length} suitable volunteers found</h3>
          </div>
          <div className="space-y-3">
            {req.matchedVolunteers.map((match, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 hover:bg-primary-50/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-primary-500 flex items-center justify-center text-white font-bold shrink-0">
                  {match.volunteer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-surface-800 text-sm">{match.volunteer.name}</p>
                    {match.volunteer.verified && <Shield className="w-3.5 h-3.5 text-primary-600" />}
                    <Star className="w-3.5 h-3.5 text-accent-400" />
                    <span className="text-sm text-surface-500">{match.volunteer.rating}</span>
                  </div>
                  <p className="text-xs text-surface-500 mt-0.5">
                    Skills: {match.volunteer.skills.join(' • ')} • {match.distance} km • {match.volunteer.availability}
                  </p>
                  <p className="text-xs text-primary-600 mt-1 italic">{match.reason}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="badge-green">
                    <Target className="w-3 h-3" /> {match.score}%
                  </span>
                  {!isAccepted && !isCompleted ? (
                    <button onClick={() => handleAccept(match.volunteer.name)} className="btn-primary text-xs px-3 py-1.5">
                      Offer Help
                    </button>
                  ) : isAccepted ? (
                    <span className="badge-green text-xs"><Check className="w-3 h-3" /> Accepted</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!isCompleted && (
        <div className="flex flex-wrap gap-3">
          {!isAccepted && (
            <button
              onClick={() => handleAccept(req.postedBy.name)}
              className="btn-primary flex-1 min-w-[200px]"
            >
              <HandHeart className="w-5 h-5" /> I Can Help
            </button>
          )}
          {isAccepted && (
            <>
              <button onClick={() => navigate('messages')} className="btn-secondary flex-1">
                <MessageCircle className="w-5 h-5" /> Message
              </button>
              <button
                onClick={() => {
                  showSuccess({
                    title: 'Task Completed!',
                    body: 'You just helped someone in your community. Thank you for making a difference!',
                    points: req.points,
                    badge: 'Helping Hand',
                  });
                  completeHelpRequest(req.id);
                }}
                className="btn-primary flex-1"
              >
                <Check className="w-5 h-5" /> Mark Complete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
