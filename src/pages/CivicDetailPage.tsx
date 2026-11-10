import { useApp } from '@/context/AppContext';
import { issueCategoryEmoji } from '@/data/mockData';
import type { IssueStatus } from '@/types';
import {
  ArrowLeft, MapPin, Users, Calendar, Check, Share2, Plus,
  Clock, Shield, AlertCircle,
} from 'lucide-react';

export function CivicDetailPage() {
  const { pageData, navigate, civicIssues, confirmCivicIssue, showSuccess } = useApp();
  const issue = civicIssues.find(i => i.id === pageData);

  if (!issue) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-surface-500">Issue not found.</p>
        <button onClick={() => navigate('civic')} className="btn-primary mt-4">Back to Issues</button>
      </div>
    );
  }

  const priorityBadge: Record<string, string> = {
    Low: 'badge-gray', Medium: 'badge-yellow', High: 'badge-orange', Urgent: 'badge-red',
  };
  const statusBadge: Record<string, string> = {
    Reported: 'badge-red', Verified: 'badge-blue', Assigned: 'badge-yellow',
    'In Progress': 'badge-orange', Resolved: 'badge-green',
  };

  const timeline: IssueStatus[] = ['Reported', 'Verified', 'Assigned', 'In Progress', 'Resolved'];
  const currentIndex = timeline.indexOf(issue.status);

  const handleConfirm = () => {
    if (issue.confirmedBy.includes('u1')) return;
    confirmCivicIssue(issue.id);
    showSuccess({ title: 'Issue Confirmed!', body: 'Thank you for confirming this issue. Your verification helps the community.', points: 10 });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <button onClick={() => navigate('civic')} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back to Issues
      </button>

      {/* Header */}
      <div className="card p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center text-3xl shrink-0">
            {issueCategoryEmoji[issue.category]}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={priorityBadge[issue.priority]}>{issue.priority} Priority</span>
              <span className={statusBadge[issue.status]}>{issue.status}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-surface-800 mb-2">{issue.title}</h1>
            <p className="text-surface-600">{issue.description}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="card p-5">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Issue Details</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-surface-600"><MapPin className="w-4 h-4 text-surface-400" /> {issue.location} • {issue.distance} km away</p>
            <p className="flex items-center gap-2 text-surface-600"><Calendar className="w-4 h-4 text-surface-400" /> Reported {issue.reportedAt}</p>
            <p className="flex items-center gap-2 text-surface-600"><Users className="w-4 h-4 text-surface-400" /> {issue.affectedCount} people affected</p>
            <p className="flex items-center gap-2 text-surface-600">
              <Shield className="w-4 h-4 text-surface-400" /> Reported by {issue.reportedBy.name}
              {issue.reportedBy.verified && <Check className="w-3.5 h-3.5 text-primary-600" />}
            </p>
          </div>
        </div>

        {/* Community Confirmation */}
        <div className="card p-5">
          <h3 className="font-bold text-surface-800 text-sm mb-3">Community Confirmation</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {issue.confirmedBy.slice(0, 5).map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  U{i+1}
                </div>
              ))}
            </div>
            <p className="text-sm text-surface-600">
              <span className="font-bold text-surface-800">{issue.confirmedBy.length}</span> people confirmed this issue
            </p>
          </div>
          {issue.confirmedBy.includes('u1') ? (
            <div className="badge-green w-full justify-center py-2">
              <Check className="w-4 h-4" /> You confirmed this issue
            </div>
          ) : (
            <button onClick={handleConfirm} className="btn-primary w-full">
              <Check className="w-4 h-4" /> Confirm Issue
            </button>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="card p-6 mb-4">
        <h3 className="font-bold text-surface-800 text-sm mb-4">Status Timeline</h3>
        <div className="space-y-0">
          {timeline.map((status, i) => {
            const done = i <= currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <div key={status} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    done ? 'bg-primary-600 text-white' : 'bg-surface-200 text-surface-400'
                  } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}>
                    {done ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{i+1}</span>}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`w-0.5 h-8 ${i < currentIndex ? 'bg-primary-600' : 'bg-surface-200'}`} />
                  )}
                </div>
                <div className={`pb-8 ${done ? 'text-surface-800' : 'text-surface-400'}`}>
                  <p className={`font-semibold text-sm ${isCurrent ? 'text-primary-700' : ''}`}>{status}</p>
                  {isCurrent && <p className="text-xs text-surface-500">Current status</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Detection info */}
      {issue.aiConfidence && (
        <div className="card p-4 mb-4 bg-secondary-50/40 border-secondary-200">
          <div className="flex items-center gap-2 text-sm text-secondary-700">
            <AlertCircle className="w-4 h-4" />
            AI initially detected: "{issue.aiCategory}" with {issue.aiConfidence}% confidence
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('report-issue')} className="btn-outline flex-1 min-w-[150px]">
          <Plus className="w-4 h-4" /> Add Information
        </button>
        <button className="btn-outline flex-1 min-w-[150px]">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  );
}
