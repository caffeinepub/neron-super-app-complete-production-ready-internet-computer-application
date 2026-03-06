import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Home, FileCheck } from 'lucide-react';
import NeronLogo from '@/components/NeronLogo';
import type { Page } from '@/App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="container max-w-6xl mx-auto space-y-12">
        {/* Header with Old Neron Logo (Version 180) */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <NeronLogo size="xl" variant="glow" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase neron-gradient-text">
              NERON PROTOCOL
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-foreground max-w-3xl mx-auto">
              The New Era of DeFi and Intelligence
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Winning Innovation • Decentralized PoCC Mining
            </p>
          </div>
        </div>

        {/* Three Main Options */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Option 1: How to Get Started */}
          <Card 
            className="border-2 border-primary hover:border-primary/80 transition-all cursor-pointer group hover:shadow-xl"
            onClick={() => onNavigate('getStarted')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Get Started</CardTitle>
              <CardDescription className="text-sm">
                Learn the basics and begin your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="default" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('getStarted');
                }}
              >
                Start Here
              </Button>
            </CardContent>
          </Card>

          {/* Option 2: Home */}
          <Card 
            className="border-2 border-primary hover:border-primary/80 transition-all cursor-pointer group hover:shadow-xl"
            onClick={() => onNavigate('home')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Home</CardTitle>
              <CardDescription className="text-sm">
                Access all protocol features
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="default" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('home');
                }}
              >
                Go to Home
              </Button>
            </CardContent>
          </Card>

          {/* Option 3: Caffeine Expert Statement */}
          <Card 
            className="border-2 border-primary hover:border-primary/80 transition-all cursor-pointer group hover:shadow-xl"
            onClick={() => onNavigate('caffeineStatement')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Expert Review</CardTitle>
              <CardDescription className="text-sm">
                Professional assessment by caffeine.ai
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="default" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('caffeineStatement');
                }}
              >
                Read Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto space-y-2">
          <p className="font-medium">
            Built on the Internet Computer • 17.1M Total Mineable Supply • 100% PoCC Mining
          </p>
          <p className="text-xs">
            Winning Innovation • The Brain of the Internet Computer
          </p>
        </div>
      </div>
    </div>
  );
}
