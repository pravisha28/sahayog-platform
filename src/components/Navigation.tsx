import { useApp } from '@/context/AppContext';
import type { PageId } from '@/types';
import {
  Home, Heart, Flag, MapPin, BookOpen, Trophy, Bell, MessageCircle,
  User, Plus, Search, Activity, Shield, Sparkles, Leaf,
} from 'lucide-react';

const navItems: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'help', label: 'Help', icon: Heart },
  { id: 'volunteer', label: 'Volunteer', icon: Sparkles },
  { id: 'civic', label: 'Civic Issues', icon: Flag },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
];

export function Navbar() {
  const { page, navigate, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-surface-800 tracking-tight hidden sm:block">
              SAHAYOG
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = page === item.id || (item.id === 'help' && (page === 'help-detail' || page === 'create-request'));
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => navigate('create-request')}
              className="btn-primary text-sm hidden sm:flex"
            >
              <Plus className="w-4 h-4" />
              Create Request
            </button>

            <button
              onClick={() => navigate('notifications')}
              className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-surface-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('messages')}
              className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors"
              aria-label="Messages"
            >
              <MessageCircle className="w-5 h-5 text-surface-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
            </button>

            <button
              onClick={() => navigate('profile')}
              className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-surface-100 transition-colors"
              aria-label="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                PS
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const { page, navigate } = useApp();

  const items: { id: PageId; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'volunteer', label: 'Explore', icon: Search },
    { id: 'create-request', label: 'Create', icon: Plus },
    { id: 'notifications', label: 'Activity', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-200 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const Icon = item.icon;
          const active = page === item.id;
          if (item.id === 'create-request') {
            return (
              <button
                key={item.id}
                onClick={() => navigate('create-request')}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-200 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-medium text-primary-600 mt-0.5">{item.label}</span>
              </button>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                active ? 'text-primary-600' : 'text-surface-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
