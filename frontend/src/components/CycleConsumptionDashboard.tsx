import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, Zap, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import { useGetCycleConsumptionDashboard, useGetCycleConsumptionTargets, useGetCycleConsumptionBreakdown } from '@/hooks/useQueries';

export default function CycleConsumptionDashboard() {
  const { data: dashboard, isLoading: dashboardLoading } = useGetCycleConsumptionDashboard();
  const { data: targets } = useGetCycleConsumptionTargets();
  const { data: breakdown = [] } = useGetCycleConsumptionBreakdown();

  const formatCycles = (cycles: bigint): string => {
    const num = Number(cycles);
    if (num >= 1e18) return `${(num / 1e18).toFixed(2)}Q`;
    if (num >= 1e15) return `${(num / 1e15).toFixed(2)}P`;
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  const calculateProgress = (current: bigint, target: bigint): number => {
    if (!target || target === BigInt(0)) return 0;
    const progress = (Number(current) / Number(target)) * 100;
    return Math.min(progress, 100);
  };

  const baselineProgress = dashboard && targets 
    ? calculateProgress(dashboard.totalCyclesUsed, targets.baseline)
    : 0;

  const peakProgress = dashboard && targets
    ? calculateProgress(dashboard.totalCyclesUsed, targets.peak)
    : 0;

  if (dashboardLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Cycle Consumption Data...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cycles Used</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard ? formatCycles(dashboard.totalCyclesUsed) : '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all canisters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cycles Remaining</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard ? formatCycles(dashboard.totalCyclesRemaining) : '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard ? formatCycles(dashboard.totalBurnRate) : '0'}/s
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current velocity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Forecast</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard ? formatCycles(dashboard.forecast) : '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Projected usage</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consumption Targets</CardTitle>
          <CardDescription>Progress toward minimum and peak cycle consumption goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Baseline Target (300T cycles/month)</span>
                {baselineProgress >= 100 && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/50">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Achieved
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{baselineProgress.toFixed(1)}%</span>
            </div>
            <Progress value={baselineProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {dashboard && targets ? `${formatCycles(dashboard.totalCyclesUsed)} / ${formatCycles(targets.baseline)}` : 'Loading...'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Peak Target (10,000T cycles/month)</span>
                {peakProgress >= 100 && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/50">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Achieved
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{peakProgress.toFixed(1)}%</span>
            </div>
            <Progress value={peakProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {dashboard && targets ? `${formatCycles(dashboard.totalCyclesUsed)} / ${formatCycles(targets.peak)}` : 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>

      {dashboard && dashboard.alerts && dashboard.alerts.length > 0 && (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Cycle Consumption Alerts</CardTitle>
            </div>
            <CardDescription>Important notifications about cycle usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dashboard.alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-background/50 border border-amber-500/20">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {breakdown && breakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Canister Breakdown</CardTitle>
            <CardDescription>Cycle consumption by canister</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {breakdown.map(([canisterId, cyclesUsed, cyclesRemaining, burnRate]) => (
                <div key={canisterId} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{canisterId}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Used: {formatCycles(cyclesUsed)}</span>
                      <span>Remaining: {formatCycles(cyclesRemaining)}</span>
                      <span>Rate: {formatCycles(burnRate)}/s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About Cycle Consumption</CardTitle>
          <CardDescription>Understanding the protocol's computational requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            The Neron Protocol is designed for intensive computational workloads to support its comprehensive features including PoCC mining verification, governance operations, insurance processing, and real-time monitoring.
          </p>
          <div className="space-y-2">
            <p className="font-medium">Consumption Targets:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li><strong>Baseline:</strong> 300,000 trillion cycles per month under typical usage</li>
              <li><strong>Peak:</strong> Up to 10,000,000 trillion cycles per month during high activity</li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            High cycle consumption enables advanced features like complex PoCC verification algorithms, real-time analytics, extensive monitoring, and secure multi-canister operations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
