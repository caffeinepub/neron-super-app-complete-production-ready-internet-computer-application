import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useCanisterStatus } from '@/hooks/useQueries';

interface CanisterStatusIndicatorProps {
  canisterName: string;
  className?: string;
}

export default function CanisterStatusIndicator({ canisterName, className = '' }: CanisterStatusIndicatorProps) {
  const { data: canisterStatus, isLoading } = useCanisterStatus();

  if (isLoading) {
    return (
      <Badge variant="outline" className={`text-xs ${className}`}>
        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
        Checking...
      </Badge>
    );
  }

  const isOnline = canisterStatus?.[canisterName] ?? false;

  return (
    <Badge 
      variant={isOnline ? "default" : "destructive"} 
      className={`text-xs ${className}`}
    >
      {isOnline ? (
        <>
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Online
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3 mr-1" />
          Offline
        </>
      )}
    </Badge>
  );
}
