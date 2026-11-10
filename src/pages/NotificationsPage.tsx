import { useApp } from '@/context/AppContext';
import { Check, Bell, CheckCheck } from 'lucide-react';
import type { PageId } from '@/types';

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationActions: Record<string, PageId | undefined> = {
    'View Request': 'help',
    'View Details': 'help',
    'View Profile': 'profile',
    'View Issue': 'civic',
    'Open Chat': 'messages',
    'View Challenge': 'challenges',
  };

  const typeColors: Record<string, string> = {
    match: 'bg-primary-50', completed: 'bg-primary-50', badge: 'bg-accent-50',
    issue: 'bg-error-50', challenge: 'bg-secondary-50', message: 'bg-secondary-50',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-surface-400" /> Notifications
          </h1>
          <p className="text-sm text-surface-500 mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllNotificationsRead} className="btn-outline text-sm">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationRead(n.id);
              if (n.action && notificationActions[n.action]) {
                navigate(notificationActions[n.action]!);
              }
            }}
            className={`card p-4 cursor-pointer animate-slide-up transition-all ${
              !n.read ? 'border-primary-200 bg-primary-50/30' : ''
            }`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${typeColors[n.type] || 'bg-surface-100'} flex items-center justify-center text-lg shrink-0`}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-surface-800 text-sm">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />}
                </div>
                <p className="text-sm text-surface-500 mt-0.5">{n.body}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-surface-400">{n.timestamp}</span>
                  {n.action && (
                    <span className="text-xs text-primary-600 font-medium flex items-center gap-1">
                      {n.action} <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
