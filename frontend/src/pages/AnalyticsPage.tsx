import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Droplet, 
  Code, 
  PieChart,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { useGetTokenAnalytics } from '@/hooks/useQueries';

export default function AnalyticsPage() {
  const [searchToken, setSearchToken] = useState('');
  const [selectedToken, setSelectedToken] = useState('AAA');
  const { data: analytics, isLoading, error } = useGetTokenAnalytics(selectedToken);

  const handleSearch = () => {
    if (searchToken.trim()) {
      setSelectedToken(searchToken.trim().toUpperCase());
    }
  };

  const getStatusBadge = (conclusion: string) => {
    if (conclusion.toLowerCase().includes('utility') || conclusion.toLowerCase().includes('active')) {
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    } else if (conclusion.toLowerCase().includes('stagnation') || conclusion.toLowerCase().includes('inactive')) {
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20"><AlertCircle className="h-3 w-3 mr-1" />Stagnant</Badge>;
    } else if (conclusion.toLowerCase().includes('reactivation') || conclusion.toLowerCase().includes('recovering')) {
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Reactivating</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-ic-blue/10">
            <BarChart3 className="h-6 w-6 text-ic-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-bold neron-gradient-text">On-Chain Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive token activity analysis for the Internet Computer ecosystem
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Enter token symbol (e.g., AAA, ICP, NRN)"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={!searchToken.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-ic-blue" />
            <p className="text-muted-foreground">Analyzing ${selectedToken} token activity...</p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-500 font-medium">Failed to fetch analytics data</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
          </CardContent>
        </Card>
      )}

      {/* Analytics Dashboard */}
      {!isLoading && !error && analytics && (
        <>
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-ic-blue" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getStatusBadge(analytics.conclusion)}
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {new Date(Number(analytics.lastUpdate)).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Daily Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{formatNumber(analytics.transactionVolume.dailyCount)}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {analytics.transactionVolume.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <span className={analytics.transactionVolume.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {analytics.transactionVolume.changePercent}%
                    </span>
                  </div>
                </div>
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
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{formatNumber(analytics.activeWallets.uniqueAddresses)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(analytics.activeWallets.senders)} senders / {formatNumber(analytics.activeWallets.receivers)} receivers
                  </p>
                </div>
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
                <div className="space-y-1">
                  <p className="text-2xl font-bold">${formatNumber(analytics.liquidity.totalPoolDepth)}</p>
                  <p className="text-xs text-muted-foreground">
                    24h Vol: ${formatNumber(analytics.liquidity.volume24h)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics Tabs */}
          <Tabs defaultValue="volume" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="wallets">Wallets</TabsTrigger>
              <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
              <TabsTrigger value="developer">Developer</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>

            {/* Transaction Volume Tab */}
            <TabsContent value="volume" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Volume Trends</CardTitle>
                  <CardDescription>Recent daily and weekly transaction activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Daily Transactions</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.transactionVolume.dailyCount)}</p>
                      <p className="text-xs text-muted-foreground">
                        Avg size: ${formatNumber(analytics.transactionVolume.avgSize)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Weekly Transactions</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.transactionVolume.weeklyCount)}</p>
                      <p className="text-xs text-muted-foreground">
                        7-day average
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Trend</p>
                      <div className="flex items-center gap-2">
                        {analytics.transactionVolume.trend === 'up' ? (
                          <TrendingUp className="h-6 w-6 text-green-500" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-500" />
                        )}
                        <span className={`text-2xl font-bold ${analytics.transactionVolume.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {analytics.transactionVolume.changePercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Wallets Tab */}
            <TabsContent value="wallets" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Wallet Metrics</CardTitle>
                  <CardDescription>Unique addresses interacting with ${selectedToken}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Active</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.activeWallets.uniqueAddresses)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Senders</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.activeWallets.senders)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Receivers</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.activeWallets.receivers)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Activity ratio: {((analytics.activeWallets.senders / analytics.activeWallets.uniqueAddresses) * 100).toFixed(1)}% sending, {((analytics.activeWallets.receivers / analytics.activeWallets.uniqueAddresses) * 100).toFixed(1)}% receiving
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Liquidity Tab */}
            <TabsContent value="liquidity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Metrics</CardTitle>
                  <CardDescription>DEX volume and pool depth analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Pool Depth</p>
                      <p className="text-2xl font-bold">${formatNumber(analytics.liquidity.totalPoolDepth)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
                      <p className="text-2xl font-bold">${formatNumber(analytics.liquidity.volume24h)}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <p className="text-sm font-medium">DEX Breakdown</p>
                    {analytics.liquidity.dexBreakdown.map((dex) => (
                      <div key={dex.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{dex.name}</span>
                        <span className="text-sm font-medium">${formatNumber(dex.volume)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Developer Activity Tab */}
            <TabsContent value="developer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Developer & Contract Activity</CardTitle>
                  <CardDescription>Canister updates and smart contract interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Last Update</p>
                      <p className="text-lg font-bold">
                        {new Date(Number(analytics.developerActivity.lastUpdateTimestamp)).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor((Date.now() - Number(analytics.developerActivity.lastUpdateTimestamp)) / (1000 * 60 * 60 * 24))} days ago
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Code Upgrades</p>
                      <p className="text-2xl font-bold">{analytics.developerActivity.codeUpgrades}</p>
                      <p className="text-xs text-muted-foreground">
                        Last 90 days
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Contract Function Calls</p>
                    <p className="text-2xl font-bold">{formatNumber(analytics.developerActivity.contractCalls)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total interactions with smart contract functions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Network Distribution Tab */}
            <TabsContent value="distribution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                  <CardDescription>Concentration analysis across holders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Top 10 Holders</p>
                      <p className="text-2xl font-bold">{analytics.networkDistribution.top10Percentage}%</p>
                      <p className="text-xs text-muted-foreground">
                        of total supply
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">General Holders</p>
                      <p className="text-2xl font-bold">{analytics.networkDistribution.generalHoldersPercentage}%</p>
                      <p className="text-xs text-muted-foreground">
                        distributed across {formatNumber(analytics.networkDistribution.totalHolders)} addresses
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Concentration Level</span>
                      <Badge variant={analytics.networkDistribution.concentrationLevel === 'high' ? 'destructive' : analytics.networkDistribution.concentrationLevel === 'medium' ? 'default' : 'outline'}>
                        {analytics.networkDistribution.concentrationLevel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.networkDistribution.concentrationLevel === 'high' 
                        ? 'High concentration may indicate centralization risk'
                        : analytics.networkDistribution.concentrationLevel === 'medium'
                        ? 'Moderate distribution with balanced holder base'
                        : 'Well-distributed across many holders'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Conclusion Card */}
          <Card className="border-ic-blue/30 bg-gradient-to-br from-ic-blue/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-ic-blue" />
                Analysis Conclusion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{analytics.conclusion}</p>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Analysis generated on {new Date(Number(analytics.lastUpdate)).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
