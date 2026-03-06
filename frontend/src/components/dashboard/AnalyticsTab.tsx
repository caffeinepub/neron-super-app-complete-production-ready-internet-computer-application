import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Droplet, ArrowRight } from 'lucide-react';
import { useGetTokenAnalytics } from '@/hooks/useQueries';

export default function AnalyticsTab() {
  const { data: analytics, isLoading } = useGetTokenAnalytics('AAA');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">On-Chain Analytics</h2>
          <p className="text-muted-foreground">
            Real-time token activity analysis for the ICP ecosystem
          </p>
        </div>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Full Analytics
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-muted rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analytics ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Daily Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatNumber(analytics.transactionVolume.dailyCount)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg: ${formatNumber(analytics.transactionVolume.avgSize)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  Active Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatNumber(analytics.activeWallets.uniqueAddresses)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatNumber(analytics.activeWallets.senders)} senders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-cyan-500" />
                  Liquidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${formatNumber(analytics.liquidity.totalPoolDepth)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  24h: ${formatNumber(analytics.liquidity.volume24h)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Ongoing utility
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
              <CardDescription>Summary of on-chain activity analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Transaction Trend</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={analytics.transactionVolume.trend === 'up' ? 'default' : 'destructive'}>
                      {analytics.transactionVolume.trend === 'up' ? '↑' : '↓'} {analytics.transactionVolume.changePercent}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Distribution</p>
                  <p className="text-sm text-muted-foreground">
                    Top 10: {analytics.networkDistribution.top10Percentage}% | General: {analytics.networkDistribution.generalHoldersPercentage}%
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {analytics.conclusion}
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No analytics data available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
