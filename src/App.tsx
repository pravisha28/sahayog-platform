import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar, MobileNav } from '@/components/Navigation';
import { AIAssistant } from '@/components/AIAssistant';
import { SuccessModal } from '@/components/SuccessModal';
import { HomePage } from '@/pages/HomePage';
import { HelpListPage } from '@/pages/HelpListPage';
import { HelpDetailPage } from '@/pages/HelpDetailPage';
import { CreateRequestPage } from '@/pages/CreateRequestPage';
import { VolunteerPage } from '@/pages/VolunteerPage';
import { CivicIssuesPage } from '@/pages/CivicIssuesPage';
import { CivicDetailPage } from '@/pages/CivicDetailPage';
import { ReportIssuePage } from '@/pages/ReportIssuePage';
import { MapPage } from '@/pages/MapPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { AdminPage } from '@/pages/AdminPage';
import { OrganizationsPage } from '@/pages/OrganizationsPage';

function PageRouter() {
  const { page } = useApp();

  switch (page) {
    case 'home': return <HomePage />;
    case 'help': return <HelpListPage />;
    case 'help-detail': return <HelpDetailPage />;
    case 'create-request': return <CreateRequestPage />;
    case 'volunteer': return <VolunteerPage />;
    case 'civic': return <CivicIssuesPage />;
    case 'civic-detail': return <CivicDetailPage />;
    case 'report-issue': return <ReportIssuePage />;
    case 'map': return <MapPage />;
    case 'resources': return <ResourcesPage />;
    case 'challenges': return <ChallengesPage />;
    case 'profile': return <ProfilePage />;
    case 'dashboard': return <DashboardPage />;
    case 'notifications': return <NotificationsPage />;
    case 'messages': return <MessagesPage />;
    case 'impact': return <ImpactPage />;
    case 'admin': return <AdminPage />;
    case 'organizations': return <OrganizationsPage />;
    default: return <HomePage />;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <main>
        <PageRouter />
      </main>
      <MobileNav />
      <AIAssistant />
      <SuccessModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
