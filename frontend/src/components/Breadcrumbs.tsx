import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';
import type { Page } from '../App';

interface BreadcrumbsProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  customPath?: { label: string; page?: Page }[];
}

const pageLabels: Record<Page, string> = {
  home: 'Home',
  welcome: 'Welcome',
  mining: 'Mining',
  governance: 'Governance',
  insurance: 'Insurance',
  security: 'Security',
  monitoring: 'Monitoring',
  wallet: 'Wallet',
  profile: 'Profile',
  settings: 'Settings',
  documentation: 'Documentation',
  whitepaper: 'Whitepaper',
  tutorials: 'Tutorials',
  markets: 'Markets',
  trade: 'Trade',
  getStarted: 'Get Started',
  landing: 'Landing',
  caffeineStatement: 'Caffeine Statement',
  revolutionaryUpgrades: 'Revolutionary Upgrades',
  analytics: 'Analytics',
};

export default function Breadcrumbs({ currentPage, onNavigate, customPath }: BreadcrumbsProps) {
  const path = customPath || [
    { label: 'Home', page: 'home' as Page },
    { label: pageLabels[currentPage], page: currentPage },
  ];

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto pb-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('home')}
        className="h-8 px-2 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Button>
      {path.map((item, index) => (
        <div key={index} className="flex items-center gap-2 shrink-0">
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
          {item.page && index < path.length - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => item.page && onNavigate(item.page)}
              className="h-8 px-2 hover:text-foreground transition-colors"
            >
              {item.label}
            </Button>
          ) : (
            <span className={index === path.length - 1 ? 'font-medium text-foreground' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
