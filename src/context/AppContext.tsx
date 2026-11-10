import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { PageId, HelpRequest, CivicIssue, Notification, Challenge, AppUser } from '@/types';
import {
  currentUser as initialUser,
  helpRequests as initialRequests,
  civicIssues as initialIssues,
  notifications as initialNotifications,
  challenges as initialChallenges,
} from '@/data/mockData';

interface AppState {
  page: PageId;
  pageData: string | null;
  navigate: (page: PageId, data?: string) => void;
  user: AppUser;
  setUser: (user: AppUser) => void;
  helpRequests: HelpRequest[];
  addHelpRequest: (req: HelpRequest) => void;
  acceptHelpRequest: (id: string) => void;
  completeHelpRequest: (id: string) => void;
  civicIssues: CivicIssue[];
  addCivicIssue: (issue: CivicIssue) => void;
  confirmCivicIssue: (id: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  challenges: Challenge[];
  joinChallenge: (id: string) => void;
  points: number;
  addPoints: (amount: number) => void;
  showSuccess: (data: SuccessData) => void;
  successData: SuccessData | null;
  clearSuccess: () => void;
}

export interface SuccessData {
  title: string;
  body: string;
  points: number;
  badge?: string;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home');
  const [pageData, setPageData] = useState<string | null>(null);
  const [user, setUser] = useState<AppUser>(initialUser);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(initialRequests);
  const [civicIssues, setCivicIssues] = useState<CivicIssue[]>(initialIssues);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [points, setPoints] = useState(initialUser.points);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  const navigate = useCallback((p: PageId, data?: string) => {
    setPage(p);
    setPageData(data ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addHelpRequest = useCallback((req: HelpRequest) => {
    setHelpRequests(prev => [req, ...prev]);
  }, []);

  const acceptHelpRequest = useCallback((id: string) => {
    setHelpRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Accepted', acceptedBy: 'u1' } : r))
    );
  }, []);

  const completeHelpRequest = useCallback((id: string) => {
    setHelpRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Completed' } : r))
    );
  }, []);

  const addCivicIssue = useCallback((issue: CivicIssue) => {
    setCivicIssues(prev => [issue, ...prev]);
  }, []);

  const confirmCivicIssue = useCallback((id: string) => {
    setCivicIssues(prev =>
      prev.map(i =>
        i.id === id && !i.confirmedBy.includes('u1')
          ? { ...i, confirmedBy: [...i.confirmedBy, 'u1'], affectedCount: i.affectedCount + 1 }
          : i
      )
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const joinChallenge = useCallback((id: string) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id && !c.joined
          ? { ...c, joined: true, participants: c.participants + 1 }
          : c
      )
    );
  }, []);

  const addPoints = useCallback((amount: number) => {
    setPoints(prev => prev + amount);
    setUser(prev => ({ ...prev, points: prev.points + amount }));
  }, []);

  const showSuccess = useCallback((data: SuccessData) => {
    setSuccessData(data);
    addPoints(data.points);
  }, [addPoints]);

  const clearSuccess = useCallback(() => setSuccessData(null), []);

  const value: AppState = {
    page, pageData, navigate,
    user, setUser,
    helpRequests, addHelpRequest, acceptHelpRequest, completeHelpRequest,
    civicIssues, addCivicIssue, confirmCivicIssue,
    notifications, markNotificationRead, markAllNotificationsRead,
    challenges, joinChallenge,
    points, addPoints,
    showSuccess, successData, clearSuccess,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
