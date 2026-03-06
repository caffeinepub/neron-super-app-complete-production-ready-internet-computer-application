import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { useGetMarketData } from '@/hooks/useQueries';
import InsuranceFuturesSection from '@/components/markets/InsuranceFuturesSection';

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState('coverages');
  const { data: marketData, isLoading } = useGetMarketData();

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    );
  }

  const coverages = marketData?.insuranceCoverages || [];
  const premiumPrices = marketData?.premiumPrices || [];
  const leverageRatios = marketData?.leverageRatios || [];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Insurance Markets</h1>
        <p className="text-muted-foreground">
          Trade insurance coverages and manage your protection positions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Coverages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coverages.length}</div>
            <p className="text-xs text-muted-foreground">Available positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {premiumPrices.length > 0
                ? (premiumPrices.reduce((a, b) => a + b, 0) / premiumPrices.length).toFixed(2)
                : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">Per coverage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Leverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leverageRatios.length > 0
                ? (leverageRatios.reduce((a, b) => a + b, 0) / leverageRatios.length).toFixed(1)
                : '0.0'}x
            </div>
            <p className="text-xs text-muted-foreground">Market average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coverages.reduce((sum, c) => sum + c.coverageAmount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">NRN protected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coverages">Insurance Coverages</TabsTrigger>
          <TabsTrigger value="futures">Insurance Futures</TabsTrigger>
        </TabsList>

        <TabsContent value="coverages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Insurance Coverages</CardTitle>
              <CardDescription>
                Purchase or sell insurance coverage positions with leverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              {coverages.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No active coverages available</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later for new insurance positions
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {coverages.map((coverage) => (
                    <div
                      key={coverage.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-ic-blue/10">
                          <Shield className="h-5 w-5 text-ic-blue" />
                        </div>
                        <div>
                          <div className="font-medium">{coverage.asset} Coverage</div>
                          <div className="text-sm text-muted-foreground">
                            {coverage.coverageAmount.toFixed(2)} NRN protected
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{coverage.premium.toFixed(4)} NRN</div>
                          <div className="text-sm text-muted-foreground">Premium</div>
                        </div>
                        <Badge variant={coverage.leverage > 5 ? 'destructive' : 'default'}>
                          {coverage.leverage.toFixed(1)}x
                        </Badge>
                        <Badge
                          variant={
                            coverage.status === 'active'
                              ? 'default'
                              : coverage.status === 'pending'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {coverage.status}
                        </Badge>
                        <Button size="sm">Trade</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Insurance Trading Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-ic-blue/10 h-fit">
                  <DollarSign className="h-5 w-5 text-ic-blue" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Purchase Coverage</h4>
                  <p className="text-sm text-muted-foreground">
                    Buy insurance positions to protect your assets with leveraged coverage
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-ic-blue/10 h-fit">
                  <TrendingUp className="h-5 w-5 text-ic-blue" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Sell Coverage</h4>
                  <p className="text-sm text-muted-foreground">
                    List your insurance positions for sale to other users
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10 h-fit">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Leverage Risks</h4>
                  <p className="text-sm text-muted-foreground">
                    Higher leverage multiplies both potential gains and losses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="futures" className="space-y-4">
          <InsuranceFuturesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
