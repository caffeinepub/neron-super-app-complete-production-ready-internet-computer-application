import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Vote, Shield, Wallet, FileText, ArrowRight, Sparkles, BarChart3 } from 'lucide-react';
import NeronLogo from '@/components/NeronLogo';
import type { Page } from '@/App';

interface WelcomePageProps {
  onNavigate: (page: Page) => void;
}

export default function WelcomePage({ onNavigate }: WelcomePageProps) {
  const sections = [
    {
      id: 'mining' as Page,
      title: 'Mining',
      icon: Cpu,
      description: 'Participate in Proof-of-Compute-Consumption mining and earn NRN tokens through computational work.',
      features: ['PoCC Mining', 'Worker Management', 'Rewards Tracking'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      hoverColor: 'hover:border-blue-500/50',
    },
    {
      id: 'governance' as Page,
      title: 'Governance',
      icon: Vote,
      description: 'Engage with the DS protocol, lock tokens to vote, and participate in decentralized decision-making.',
      features: ['DS Protocol', 'Lock-to-Vote', 'Proposal Voting'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      hoverColor: 'hover:border-purple-500/50',
    },
    {
      id: 'insurance' as Page,
      title: 'Insurance',
      icon: Shield,
      description: 'Access Nash-based insurance coverage with leverage market functionality for enhanced protection.',
      features: ['Coverage Pool', 'Leverage Market', 'Claims Management'],
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      hoverColor: 'hover:border-green-500/50',
    },
    {
      id: 'wallet' as Page,
      title: 'Wallet',
      icon: Wallet,
      description: 'Manage your ICP, NRN, ckBTC, ckETH, and cICP tokens with integrated send/receive functionality.',
      features: ['Multi-Token Support', 'Send & Receive', 'Transaction History'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      hoverColor: 'hover:border-orange-500/50',
    },
    {
      id: 'analytics' as Page,
      title: 'Analytics',
      icon: BarChart3,
      description: 'Comprehensive on-chain activity analysis for any ICP ecosystem token with real-time metrics.',
      features: ['Token Analysis', 'Volume Tracking', 'Distribution Metrics'],
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      hoverColor: 'hover:border-cyan-500/50',
    },
    {
      id: 'documentation' as Page,
      title: 'Documentation',
      icon: FileText,
      description: 'Explore comprehensive protocol documentation, technical details, and implementation guides.',
      features: ['Architecture', 'Technical Specs', 'Integration Guides'],
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      hoverColor: 'hover:border-pink-500/50',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <NeronLogo size="xl" variant="glow" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-ic-blue animate-pulse" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight neron-gradient-text">
              Welcome to Neron Protocol
            </h1>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-ic-blue animate-pulse" />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            A fully decentralized platform combining Proof-of-Compute-Consumption mining, 
            DS governance, Nash-based insurance, and comprehensive on-chain analytics on the Internet Computer.
          </p>
        </div>

        {/* Main Sections Grid */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Explore Main Sections
          </h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${section.hoverColor} border-2`}
                  onClick={() => onNavigate(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`p-2.5 sm:p-3 rounded-lg ${section.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${section.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className={`text-lg sm:text-xl group-hover:${section.color} transition-colors`}>
                          {section.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <div className={`h-1.5 w-1.5 rounded-full ${section.bgColor}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className={`w-full group-hover:${section.bgColor} transition-all mt-2`}
                      size="sm"
                    >
                      Explore {section.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Start Guide */}
        <Card className="border-ic-blue/30 bg-gradient-to-br from-ic-blue/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ic-blue" />
              Quick Start Guide
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Get started with Neron Protocol in a few simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-ic-blue/10 flex items-center justify-center text-xs sm:text-sm font-bold text-ic-blue">
                    1
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">Setup Wallet</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Configure your wallet to manage tokens
                </p>
              </div>
              <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-ic-blue/10 flex items-center justify-center text-xs sm:text-sm font-bold text-ic-blue">
                    2
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">Start Mining</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Begin PoCC mining to earn rewards
                </p>
              </div>
              <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-ic-blue/10 flex items-center justify-center text-xs sm:text-sm font-bold text-ic-blue">
                    3
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">Lock & Vote</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Participate in governance decisions
                </p>
              </div>
              <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-ic-blue/10 flex items-center justify-center text-xs sm:text-sm font-bold text-ic-blue">
                    4
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">Get Coverage</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Secure your assets with insurance
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => onNavigate('getStarted')}
                className="bg-ic-blue hover:bg-ic-blue/90 text-white"
              >
                View Full Tutorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('documentation')}
              >
                Read Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Ready to dive in? Start exploring the protocol now.
          </p>
          <Button
            onClick={() => onNavigate('home')}
            size="lg"
            className="bg-gradient-to-r from-ic-purple via-ic-blue to-ic-cyan hover:opacity-90 text-white font-semibold"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
