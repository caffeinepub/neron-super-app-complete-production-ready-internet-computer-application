import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import NeronLogo from './NeronLogo';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent } from './ui/sheet';
import {
  Home,
  Cpu,
  Vote,
  Shield,
  Activity,
  Wallet,
  FileText,
  BookOpen,
  Settings,
  User,
  Menu,
  X,
  HelpCircle,
  TrendingUp,
  BarChart3,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { Page } from '../App';

interface UnifiedSidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { id: 'welcome', label: 'Welcome', icon: Sparkles, badge: 'Start' },
  { id: 'home', label: 'Main Page', icon: Home },
  { id: 'getStarted', label: 'Get Started', icon: HelpCircle, badge: 'New' },
  { id: 'mining', label: 'Mining', icon: Cpu },
  { id: 'governance', label: 'Governance', icon: Vote },
  { id: 'insurance', label: 'Insurance', icon: Shield },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'New' },
];

const resourceNavItems: NavItem[] = [
  { id: 'documentation', label: 'Documentation', icon: FileText, badge: 'Help' },
  { id: 'whitepaper', label: 'Whitepaper', icon: BookOpen },
  { id: 'tutorials', label: 'Tutorials', icon: HelpCircle },
];

const accountNavItems: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const tradeNavItems: NavItem[] = [
  { id: 'markets', label: 'Markets', icon: TrendingUp },
  { id: 'trade', label: 'Trade', icon: BarChart3 },
];

export default function UnifiedSidebar({ currentPage, onNavigate, isOpen, onToggle }: UnifiedSidebarProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const handleNavigation = (page: Page) => {
    onNavigate(page);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="p-4 border-b shrink-0">
        <button
          onClick={() => handleNavigation('welcome')}
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity group"
        >
          <NeronLogo size="md" variant="header" />
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg neron-gradient-text">Neron</span>
            <span className="text-xs text-muted-foreground">Protocol</span>
          </div>
        </button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {/* Revolutionary Upgrades - Featured */}
        <div className="space-y-1 mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Featured
          </h3>
          <Button
            variant="secondary"
            className="w-full justify-start gap-3 transition-all duration-200 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-l-4 border-purple-500"
            onClick={() => handleNavigation('revolutionaryUpgrades')}
          >
            <Zap className="h-5 w-5 shrink-0 text-purple-500" />
            <span className="font-medium truncate">Revolutionary Upgrades</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500 font-medium shrink-0">
              New
            </span>
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main
          </h3>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-ic-blue/10 text-ic-blue hover:bg-ic-blue/20 border-l-4 border-ic-blue'
                    : 'hover:bg-accent hover:translate-x-1'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-ic-blue' : ''}`} />
                <span className="font-medium truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-ic-blue/20 text-ic-blue font-medium shrink-0">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Trading */}
        <div className="space-y-1 mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Trading
          </h3>
          {tradeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-ic-blue/10 text-ic-blue hover:bg-ic-blue/20 border-l-4 border-ic-blue'
                    : 'hover:bg-accent hover:translate-x-1'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-ic-blue' : ''}`} />
                <span className="font-medium truncate">{item.label}</span>
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Resources & Help */}
        <div className="space-y-1 mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Resources & Help
          </h3>
          {resourceNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-ic-blue/10 text-ic-blue hover:bg-ic-blue/20 border-l-4 border-ic-blue'
                    : 'hover:bg-accent hover:translate-x-1'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-ic-blue' : ''}`} />
                <span className="font-medium truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-ic-blue/20 text-ic-blue font-medium shrink-0">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Account */}
        <div className="space-y-1">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </h3>
          {accountNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-ic-blue/10 text-ic-blue hover:bg-ic-blue/20 border-l-4 border-ic-blue'
                    : 'hover:bg-accent hover:translate-x-1'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-ic-blue' : ''}`} />
                <span className="font-medium truncate">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer - User Profile Only */}
      <div className="p-4 border-t shrink-0">
        {isAuthenticated && userProfile && (
          <div className="flex items-center gap-3 px-3 py-2 bg-muted rounded-lg">
            <div className="h-8 w-8 rounded-full bg-ic-blue/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-ic-blue">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userProfile.name}</p>
              <p className="text-xs text-muted-foreground">Authenticated</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-background border shadow-md"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-background z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Optimized for mobile screens with proper height and scrolling */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent 
          side="left" 
          className="w-[280px] max-w-[85vw] p-0 overflow-hidden flex flex-col h-full max-h-screen"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content offset for desktop */}
      <div className="hidden lg:block lg:w-64 shrink-0" />
    </>
  );
}
