import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useGetLitepaperContent } from '../hooks/useQueries';
import CaffeineAiReviewCard from '../components/CaffeineAiReviewCard';
import { 
  BookOpen, 
  Search, 
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface LitepaperProps {
  onReturn?: () => void;
}

export default function Litepaper({ onReturn }: LitepaperProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: litepaperContent, isLoading: litepaperLoading } = useGetLitepaperContent();

  const filteredLitepaperContent = useMemo(() => {
    if (!litepaperContent || !searchQuery) return litepaperContent || '';
    const query = searchQuery.toLowerCase();
    if (litepaperContent.toLowerCase().includes(query)) {
      return litepaperContent;
    }
    return '';
  }, [litepaperContent, searchQuery]);

  return (
    <div className="container py-6 sm:py-8 max-w-7xl mx-auto px-4">
      {onReturn && (
        <div className="mb-6 sm:mb-8">
          <Button
            variant="default"
            size="lg"
            onClick={onReturn}
            className="flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-6 rounded-xl border-2 border-primary/20 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Return to Dashboard</span>
          </Button>
        </div>
      )}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">Neron Protocol Litepaper</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Concise overview of the Neron Protocol architecture and key features
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <CaffeineAiReviewCard />
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search litepaper content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {litepaperLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !filteredLitepaperContent ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              {searchQuery ? 'No content found matching your search.' : 'Litepaper content not available.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Neron Protocol Litepaper</CardTitle>
              <CardDescription className="text-sm">
                Concise technical overview detailing the protocol architecture and implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                    {filteredLitepaperContent}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
