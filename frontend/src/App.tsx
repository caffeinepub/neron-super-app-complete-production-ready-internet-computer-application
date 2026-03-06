import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternetIdentityProvider, useInternetIdentity } from './hooks/useInternetIdentity';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import LoginButton from './components/LoginButton';
import ProfileSetup from './components/ProfileSetup';
import UnifiedSidebar from './components/UnifiedSidebar';
import Header from './components/Header';
import NeronLogo from './components/NeronLogo';
import Whitepaper from './pages/Whitepaper';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import GetStarted from './pages/GetStarted';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import LandingPage from './pages/LandingPage';
import CaffeineStatement from './pages/CaffeineStatement';
import Documentation from './pages/Documentation';
import TradePage from './pages/TradePage';
import MarketsPage from './pages/MarketsPage';
import TutorialsPage from './pages/TutorialsPage';
import RevolutionaryUpgrades from './pages/RevolutionaryUpgrades';
import AnalyticsPage from './pages/AnalyticsPage';
import TransactionQueueIndicator from './components/TransactionQueueIndicator';
import { useGetCallerUserProfile } from './hooks/useQueries';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

export type Page = 'home' | 'welcome' | 'markets' | 'trade' | 'wallet' | 'profile' | 'whitepaper' | 'settings' | 'getStarted' | 'landing' | 'caffeineStatement' | 'documentation' | 'tutorials' | 'mining' | 'governance' | 'insurance' | 'security' | 'monitoring' | 'revolutionaryUpgrades' | 'analytics';
export type HomeTab = 'overview' | 'mining' | 'governance' | 'insurance' | 'security' | 'monitoring' | 'documentation';

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeHomeTab, setActiveHomeTab] = useState<HomeTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;

  // Navigate to welcome page after successful login
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      setCurrentPage('welcome');
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    } else {
      setShowProfileSetup(false);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
    if (page === 'home') {
      setActiveHomeTab('overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeTabChange = (tab: HomeTab) => {
    setActiveHomeTab(tab);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (currentPage !== 'home' && currentPage !== 'landing' && currentPage !== 'welcome') {
        handleNavigate('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="text-center max-w-md w-full space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <NeronLogo size="xl" variant="glow" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight neron-gradient-text">Neron Protocol</h1>
            <p className="text-muted-foreground">
              Decentralized Proof of Compute Consumption and Governance Platform
            </p>
          </div>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <UnifiedSidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <Header onNavigate={handleNavigate} />
          <main className="flex-1 transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto">
            <div className="page-transition w-full">
              {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
              {currentPage === 'welcome' && <WelcomePage onNavigate={handleNavigate} />}
              {currentPage === 'home' && (
                <HomePage 
                  activeTab={activeHomeTab} 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'mining' && (
                <HomePage 
                  activeTab="mining" 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'governance' && (
                <HomePage 
                  activeTab="governance" 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'insurance' && (
                <HomePage 
                  activeTab="insurance" 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'security' && (
                <HomePage 
                  activeTab="security" 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'monitoring' && (
                <HomePage 
                  activeTab="monitoring" 
                  onTabChange={handleHomeTabChange}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'revolutionaryUpgrades' && <RevolutionaryUpgrades onNavigate={handleNavigate} />}
              {currentPage === 'analytics' && <AnalyticsPage />}
              {currentPage === 'markets' && <MarketsPage />}
              {currentPage === 'trade' && <TradePage />}
              {currentPage === 'whitepaper' && <Whitepaper onReturn={() => handleNavigate('home')} />}
              {currentPage === 'documentation' && <Documentation onReturn={() => handleNavigate('home')} />}
              {currentPage === 'tutorials' && <TutorialsPage />}
              {currentPage === 'settings' && <Settings />}
              {currentPage === 'profile' && <Profile />}
              {currentPage === 'wallet' && <Wallet />}
              {currentPage === 'getStarted' && <GetStarted onNavigate={handleNavigate} />}
              {currentPage === 'caffeineStatement' && <CaffeineStatement onNavigate={handleNavigate} />}
            </div>
          </main>
        </div>
      </div>
      {showProfileSetup && <ProfileSetup onComplete={handleProfileSetupComplete} />}
      <TransactionQueueIndicator />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <ThemeProvider>
          <AppContent />
          <Toaster />
        </ThemeProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
