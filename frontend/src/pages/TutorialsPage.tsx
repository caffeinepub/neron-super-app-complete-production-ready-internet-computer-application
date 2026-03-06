import { BookOpen, Play, CheckCircle2, Award, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useGuide } from '../hooks/useGuide';
import GuideOverlay from '../components/GuideOverlay';
import type { Page } from '../App';

export default function TutorialsPage() {
  const {
    progress,
    isGuideVisible,
    startSection,
    nextStep,
    previousStep,
    skipTutorial,
    exitTutorial,
    getSections,
    getCurrentSteps,
    currentStepIndex,
  } = useGuide();

  const sections = getSections();
  const completedCount = sections.filter((s) => s.completed).length;
  const totalCount = sections.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const handleNavigate = (page: Page) => {
    // Navigation handled by parent
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
        <Breadcrumbs currentPage="tutorials" onNavigate={handleNavigate} />

        {/* Page Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="p-4 rounded-full bg-ic-blue/10 mb-4">
            <HelpCircle className="h-12 w-12 text-ic-blue" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-2">
            Interactive Tutorials
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl">
            Learn how to use Neron Protocol with step-by-step guided tutorials for each section
          </p>
        </div>

        {/* Help Alert */}
        <Alert className="mb-6 border-ic-blue/50 bg-ic-blue/5">
          <HelpCircle className="h-4 w-4 text-ic-blue" />
          <AlertDescription className="text-sm">
            <strong>New to Neron Protocol?</strong> Start with the tutorials below to learn the basics. 
            Each tutorial provides interactive guidance through key features.
          </AlertDescription>
        </Alert>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle>Your Progress</CardTitle>
              </div>
              <Badge variant="secondary" className="text-sm">
                {completedCount} / {totalCount} Completed
              </Badge>
            </div>
            <CardDescription>
              Track your learning progress across all tutorial sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall Completion</span>
                <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {completedCount === totalCount && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Congratulations! You've completed all tutorials!</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tutorial Sections */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Available Tutorials</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Card 
                key={section.id} 
                className="hover:shadow-lg hover:border-ic-blue/50 transition-all duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        {section.completed && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                        )}
                      </div>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {section.stepCount} steps
                    </Badge>
                    {section.completed && (
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <Separator />
                  <Button
                    onClick={() => startSection(section.id)}
                    variant={section.completed ? 'outline' : 'default'}
                    className="w-full hover:bg-ic-blue hover:text-white transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {section.completed ? 'Replay Tutorial' : 'Start Tutorial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tutorial Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tutorial Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Each tutorial provides step-by-step guidance through key features</p>
            <p>• You can pause, skip, or exit tutorials at any time</p>
            <p>• Completed tutorials can be replayed to refresh your knowledge</p>
            <p>• Visual highlights will guide you to relevant interface elements</p>
            <p>• Your progress is automatically saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Guide Overlay */}
      <GuideOverlay
        steps={getCurrentSteps()}
        currentStepIndex={currentStepIndex}
        onNext={nextStep}
        onPrevious={previousStep}
        onSkip={skipTutorial}
        onExit={exitTutorial}
        isVisible={isGuideVisible}
      />
    </div>
  );
}
