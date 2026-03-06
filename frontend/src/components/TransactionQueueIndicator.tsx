import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';
import { useTransactionQueueStatus } from '../hooks/useQueries';

export default function TransactionQueueIndicator() {
  const { data: queueStatus } = useTransactionQueueStatus();

  if (!queueStatus || (queueStatus.queueLength === 0 && queueStatus.activeCount === 0)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge 
        variant="outline" 
        className="flex items-center gap-2 px-4 py-2 bg-background/95 backdrop-blur-sm shadow-lg border-primary/50"
      >
        {queueStatus.activeCount > 0 ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm font-medium">
              Processing {queueStatus.activeCount} transaction{queueStatus.activeCount > 1 ? 's' : ''}
            </span>
          </>
        ) : (
          <>
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">
              {queueStatus.queueLength} queued
            </span>
          </>
        )}
      </Badge>
    </div>
  );
}
