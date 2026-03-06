import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Cpu, Vote, Shield, Activity, FileText } from 'lucide-react';
import NeronLogo from '@/components/NeronLogo';
import Breadcrumbs from '@/components/Breadcrumbs';
import MiningTab from '../components/dashboard/MiningTab';
import GovernanceTab from '../components/dashboard/GovernanceTab';
import InsuranceTab from '../components/dashboard/InsuranceTab';
import MonitoringTab from '../components/dashboard/MonitoringTab';
import SecurityTab from '../components/dashboard/SecurityTab';
import OverviewTab from '../components/dashboard/OverviewTab';
import type { HomeTab, Page } from '@/App';

interface HomePageProps {
  activeTab: HomeTab;
  onTabChange: (tab: HomeTab) => void;
  onNavigate: (page: Page) => void;
}

export default function HomePage({ activeTab, onTabChange, onNavigate }: HomePageProps) {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'overview') {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [activeTab]);

  const handleSectionClick = (tab: HomeTab) => {
    onTabChange(tab);
    setShowDetail(true);
  };

  const handleBackToOverview = () => {
    onTabChange('overview');
    setShowDetail(false);
  };

  const sections = [
    { id: 'mining' as HomeTab, title: 'Mining', icon: Cpu, desc: 'PoCC mining and worker management' },
    { id: 'governance' as HomeTab, title: 'Governance', icon: Vote, desc: 'DS protocol and voting' },
    { id: 'insurance' as HomeTab, title: 'Insurance', icon: Shield, desc: 'Coverage and leverage market' },
    { id: 'security' as HomeTab, title: 'Security', icon: Shield, desc: 'Security monitoring' },
    { id: 'monitoring' as HomeTab, title: 'Monitoring', icon: Activity, desc: 'System health tracking' },
    { id: 'documentation' as HomeTab, title: 'Documentation', icon: FileText, desc: 'Protocol documentation' },
  ];

  const getBreadcrumbPath = () => {
    if (activeTab === 'overview') {
      return [{ label: 'Home' }];
    }
    const section = sections.find(s => s.id === activeTab);
    return [
      { label: 'Home', page: 'home' as Page },
      { label: section?.title || 'Section' },
    ];
  };

  if (activeTab === 'overview' || !showDetail) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <Breadcrumbs currentPage="home" onNavigate={onNavigate} customPath={getBreadcrumbPath()} />
          
          <div className="flex flex-col items-center mb-6">
            <NeronLogo size="lg" variant="header" className="mb-3" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center mb-2 uppercase">
              Home Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-2xl">
              Navigate between protocol sections
            </p>
          </div>

          {/* Section Cards */}
          <div className="mb-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card 
                    key={section.id}
                    className="hover:shadow-lg hover:border-ic-blue/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-ic-blue/10 group-hover:bg-ic-blue/20 transition-colors">
                          <Icon className="h-5 w-5 text-ic-blue" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-ic-blue transition-colors">
                          {section.title}
                        </CardTitle>
                      </div>
                      <CardDescription>{section.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group-hover:bg-ic-blue group-hover:text-white transition-colors">
                        Open {section.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <OverviewTab onNavigateToDocumentation={() => onNavigate('documentation')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <Breadcrumbs currentPage="home" onNavigate={onNavigate} customPath={getBreadcrumbPath()} />
        
        <div className="flex flex-col items-center mb-4">
          <NeronLogo size="lg" variant="header" className="mb-3" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center mb-2 uppercase">
            {sections.find(s => s.id === activeTab)?.title || 'Home'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-2xl">
            {sections.find(s => s.id === activeTab)?.desc || ''}
          </p>
        </div>

        <Button 
          variant="ghost" 
          onClick={handleBackToOverview}
          className="mb-4 hover:bg-accent transition-colors"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="page-content-transition">
          {activeTab === 'mining' && <MiningTab />}
          {activeTab === 'governance' && <GovernanceTab />}
          {activeTab === 'insurance' && <InsuranceTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'monitoring' && <MonitoringTab />}
          {activeTab === 'documentation' && (
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Access comprehensive protocol documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => onNavigate('documentation')} className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Documentation Portal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
