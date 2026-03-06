import { useState } from 'react';
import OverviewTab from '../components/dashboard/OverviewTab';
import MiningTab from '../components/dashboard/MiningTab';
import GovernanceTab from '../components/dashboard/GovernanceTab';
import InsuranceTab from '../components/dashboard/InsuranceTab';
import MonitoringTab from '../components/dashboard/MonitoringTab';
import SecurityTab from '../components/dashboard/SecurityTab';
import WalletTab from '../components/dashboard/WalletTab';
import RevolutionaryUpgradesTab from '../components/dashboard/RevolutionaryUpgradesTab';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Cpu, 
  Vote, 
  Shield, 
  Activity, 
  Wallet, 
  TrendingUp,
  Zap,
  BarChart3
} from 'lucide-react';

type DashboardTab = 'overview' | 'upgrades' | 'mining' | 'governance' | 'security' | 'insurance' | 'monitoring' | 'wallet' | 'analytics';

interface DashboardProps {
  activeTab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
  onNavigateToDocumentation?: () => void;
}

export default function Dashboard({ 
  activeTab = 'overview', 
  onTabChange,
  onNavigateToDocumentation 
}: DashboardProps) {
  const [currentTab, setCurrentTab] = useState<DashboardTab>(activeTab);

  const handleTabChange = (value: string) => {
    const tab = value as DashboardTab;
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleNavigateToDocumentation = () => {
    if (onNavigateToDocumentation) {
      onNavigateToDocumentation();
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold neron-gradient-text">Protocol Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage your Neron Protocol activities
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <TabsList className="inline-flex w-full min-w-max sm:grid sm:grid-cols-9 gap-1 h-auto bg-muted/50 p-1.5">
            <TabsTrigger value="overview" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Home className="h-4 w-4 mr-1.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="upgrades" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Zap className="h-4 w-4 mr-1.5" />
              Upgrades
            </TabsTrigger>
            <TabsTrigger value="mining" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Cpu className="h-4 w-4 mr-1.5" />
              Mining
            </TabsTrigger>
            <TabsTrigger value="governance" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Vote className="h-4 w-4 mr-1.5" />
              Governance
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Shield className="h-4 w-4 mr-1.5" />
              Security
            </TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Insurance
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Activity className="h-4 w-4 mr-1.5" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="wallet" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <Wallet className="h-4 w-4 mr-1.5" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              <BarChart3 className="h-4 w-4 mr-1.5" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab onNavigateToDocumentation={handleNavigateToDocumentation} />
        </TabsContent>

        <TabsContent value="upgrades" className="mt-6">
          <RevolutionaryUpgradesTab />
        </TabsContent>

        <TabsContent value="mining" className="mt-6">
          <MiningTab />
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <GovernanceTab />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="insurance" className="mt-6">
          <InsuranceTab />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <MonitoringTab />
        </TabsContent>

        <TabsContent value="wallet" className="mt-6">
          <WalletTab />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
