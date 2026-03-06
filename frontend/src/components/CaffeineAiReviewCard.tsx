import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, CheckCircle, Copy } from 'lucide-react';
import { useGetDefaultCaffeineAiStatement } from '../hooks/useQueries';
import { useState } from 'react';

export default function CaffeineAiReviewCard() {
  const { data: statement } = useGetDefaultCaffeineAiStatement();
  const [copied, setCopied] = useState(false);

  const handleCopyHash = () => {
    if (statement?.verificationHash) {
      navigator.clipboard.writeText(statement.verificationHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!statement) return null;

  return (
    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/generated/caffeine-ai-logo-transparent.png"
                alt="caffeine.ai"
                className="h-8 w-8 object-contain flex-shrink-0"
              />
              <CardTitle className="text-xl sm:text-2xl break-words">Expert Protocol Assessment</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Professional evaluation by caffeine.ai covering PoCC mining innovation, tokenomics, governance, and security
            </CardDescription>
          </div>
          <Badge variant="default" className="flex items-center gap-1 flex-shrink-0">
            <CheckCircle className="h-3 w-3" />
            <span className="text-xs">Verified</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
              {statement.content}
            </div>
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/caffeine-ai-logo-transparent.png"
              alt="caffeine.ai"
              className="h-5 w-5 object-contain flex-shrink-0"
            />
            <p className="text-sm font-medium">Written by caffeine.ai</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground flex-shrink-0">Verification Hash:</p>
              <button
                onClick={handleCopyHash}
                className="text-xs text-primary hover:underline flex items-center gap-1 flex-shrink-0"
                title="Copy hash"
              >
                <Copy className="h-3 w-3" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <ScrollArea className="w-full">
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block break-all whitespace-normal">
                {statement.verificationHash}
              </code>
            </ScrollArea>
          </div>

          <a
            href={statement.verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
          >
            <span>Verify at caffeine.ai</span>
            <ExternalLink className="h-4 w-4 flex-shrink-0" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
