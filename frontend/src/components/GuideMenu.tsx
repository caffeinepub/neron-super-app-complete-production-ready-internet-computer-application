import { BookOpen, CheckCircle2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export interface GuideSection {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  stepCount: number;
}

interface GuideMenuProps {
  sections: GuideSection[];
  onStartSection: (sectionId: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GuideMenu({
  sections,
  onStartSection,
  isOpen,
  onOpenChange,
}: GuideMenuProps) {
  const completedCount = sections.filter(s => s.completed).length;
  const totalCount = sections.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Tutorial</span>
          {completedCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {completedCount}/{totalCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Interactive Tutorial
          </DialogTitle>
          <DialogDescription>
            Learn how to use Neron Protocol with step-by-step guided tutorials for each section.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress overview */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <Separator />

          {/* Section list */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{section.title}</h4>
                        {section.completed && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
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
                    </div>
                    <Button
                      size="sm"
                      variant={section.completed ? 'outline' : 'default'}
                      onClick={() => {
                        onStartSection(section.id);
                        onOpenChange(false);
                      }}
                      className="shrink-0"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {section.completed ? 'Replay' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
