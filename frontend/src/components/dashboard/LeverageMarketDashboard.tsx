import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle, 
  Info, 
  BarChart3, 
  DollarSign,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { useListMyLeveragePositions, useCreateLeveragePosition, useUpdateLeveragePosition, useCloseLeveragePosition } from '@/hooks/useQueries';
import { toast } from 'sonner';

export default function LeverageMarketDashboard() {
  const [collateral, setCollateral] = useState('1000');
  const [leverageRatio, setLeverageRatio] = useState([2]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const { data: positions = [], isLoading } = useListMyLeveragePositions();
  const createPosition = useCreateLeveragePosition();
  const updatePosition = useUpdateLeveragePosition();
  const closePosition = useCloseLeveragePosition();

  const calculateCoverage = () => {
    const collateralAmount = parseFloat(collateral) || 0;
    return Math.floor(collateralAmount * leverageRatio[0]);
  };

  const calculateRisk = () => {
    if (leverageRatio[0] <= 2) return 'Low';
    if (leverageRatio[0] <= 5) return 'Medium';
    if (leverageRatio[0] <= 7) return 'High';
    return 'Very High';
  };

  const handleCreatePosition = async () => {
    try {
      const collateralAmount = BigInt(Math.floor(parseFloat(collateral) * 100000000));
      const coverage = BigInt(calculateCoverage() * 100000000);
      
      await createPosition.mutateAsync({
        collateralAmount,
        leverageRatio: leverageRatio[0],
        coverageAmount: coverage,
      });
      
      toast.success('Leverage position created successfully');
      setCollateral('1000');
      setLeverageRatio([2]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create leverage position');
    }
  };

  const handleClosePosition = async (positionId: string) => {
    try {
      await closePosition.mutateAsync(positionId);
      toast.success('Position closed successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to close position');
    }
  };

  const poolStats = {
    totalLeveragedCoverage: '5,250,000 NRN',
    utilizationRate: '42%',
    availableCapacity: '7,500,000 NRN',
    activePositions: positions.length,
  };

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-500">
          <strong>Insurance Leverage Market:</strong> Amplify your coverage with less capital. Use leverage to hedge protocol risk or earn higher returns by underwriting leveraged insurance.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leveraged Coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolStats.totalLeveragedCoverage}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolStats.utilizationRate}</div>
            <p className="text-xs text-muted-foreground mt-1">Pool capacity used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Capacity</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolStats.availableCapacity}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for leverage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolStats.activePositions}</div>
            <p className="text-xs text-muted-foreground mt-1">Your positions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Position</TabsTrigger>
          <TabsTrigger value="positions">My Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Leverage Position</CardTitle>
                <CardDescription>Amplify your insurance coverage with leverage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="collateral">Collateral Amount (NRN)</Label>
                  <Input
                    id="collateral"
                    type="number"
                    placeholder="1000"
                    value={collateral}
                    onChange={(e) => setCollateral(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum: 100 NRN
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Leverage Ratio</Label>
                    <Badge variant={
                      calculateRisk() === 'Low' ? 'default' :
                      calculateRisk() === 'Medium' ? 'secondary' :
                      calculateRisk() === 'High' ? 'outline' :
                      'destructive'
                    }>
                      {calculateRisk()} Risk
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={leverageRatio}
                      onValueChange={setLeverageRatio}
                      min={1}
                      max={10}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1x</span>
                      <span className="font-semibold text-foreground">{leverageRatio[0]}x</span>
                      <span>10x</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Collateral:</span>
                    <span className="font-medium">{collateral} NRN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Leverage:</span>
                    <span className="font-medium">{leverageRatio[0]}x</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-semibold">Total Coverage:</span>
                    <span className="font-bold text-primary">{calculateCoverage()} NRN</span>
                  </div>
                </div>

                <Alert className={
                  calculateRisk() === 'Low' ? 'border-green-500/50 bg-green-500/10' :
                  calculateRisk() === 'Medium' ? 'border-yellow-500/50 bg-yellow-500/10' :
                  'border-red-500/50 bg-red-500/10'
                }>
                  <AlertTriangle className={`h-4 w-4 ${
                    calculateRisk() === 'Low' ? 'text-green-500' :
                    calculateRisk() === 'Medium' ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                  <AlertDescription className={
                    calculateRisk() === 'Low' ? 'text-green-700 dark:text-green-300' :
                    calculateRisk() === 'Medium' ? 'text-yellow-700 dark:text-yellow-300' :
                    'text-red-700 dark:text-red-300'
                  }>
                    {calculateRisk() === 'Low' && 'Low risk: Conservative leverage with minimal liquidation risk.'}
                    {calculateRisk() === 'Medium' && 'Medium risk: Moderate leverage with balanced risk/reward.'}
                    {calculateRisk() === 'High' && 'High risk: Aggressive leverage with increased liquidation risk.'}
                    {calculateRisk() === 'Very High' && 'Very high risk: Maximum leverage with significant liquidation risk.'}
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCreatePosition}
                  disabled={createPosition.isPending || !collateral || parseFloat(collateral) < 100}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {createPosition.isPending ? 'Creating...' : 'Create Leverage Position'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Leverage Works</CardTitle>
                <CardDescription>Understanding leveraged insurance coverage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Amplified Coverage</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use leverage to multiply your insurance coverage. With 2x leverage, 1,000 NRN collateral provides 2,000 NRN coverage.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Capital Efficiency</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Achieve the same coverage with less capital. Leverage allows you to protect more assets while maintaining liquidity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Hedge Protocol Risk</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use leveraged positions to hedge against protocol risks or market volatility with amplified protection.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Risk Management</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Higher leverage increases both potential returns and risks. Monitor your positions and adjust leverage based on market conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Example Scenario:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Deposit 1,000 NRN as collateral</li>
                    <li>Select 3x leverage ratio</li>
                    <li>Receive 3,000 NRN total coverage</li>
                    <li>Pay premiums on 3,000 NRN coverage</li>
                    <li>Earn higher returns if underwriting</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Leverage Positions</CardTitle>
              <CardDescription>Manage your active leveraged insurance positions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading positions...</div>
              ) : positions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active positions. Create your first leverage position to get started.
                </div>
              ) : (
                <div className="space-y-3">
                  {positions.map((position) => (
                    <div key={position.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Position #{position.id.slice(-8)}</p>
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(Number(position.createdAt) / 1000000).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={position.status === 'active' ? 'default' : 'secondary'}>
                          {position.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Collateral</p>
                          <p className="font-medium">{(Number(position.collateralAmount) / 100000000).toFixed(2)} NRN</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Leverage</p>
                          <p className="font-medium">{position.leverageRatio}x</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Coverage</p>
                          <p className="font-medium">{(Number(position.coverageAmount) / 100000000).toFixed(2)} NRN</p>
                        </div>
                      </div>

                      {position.status === 'active' && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedPosition(position.id)}
                          >
                            Adjust Leverage
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleClosePosition(position.id)}
                            disabled={closePosition.isPending}
                          >
                            Close Position
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Statistics</CardTitle>
                <CardDescription>Real-time leverage market metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm text-muted-foreground">Average Leverage Ratio</span>
                    <span className="font-semibold">3.2x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm text-muted-foreground">Total Active Positions</span>
                    <span className="font-semibold">847</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="font-semibold">125,000 NRN</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm text-muted-foreground">Pool Utilization</span>
                    <span className="font-semibold">42%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Leverage positions by risk level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low Risk (1-2x)</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Medium Risk (2-5x)</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">High Risk (5-7x)</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Very High Risk (7-10x)</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Historical leverage market performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">+12.5%</p>
                  <p className="text-xs text-muted-foreground">30-day returns</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">98.7%</p>
                  <p className="text-xs text-muted-foreground">Position success rate</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">2.1%</p>
                  <p className="text-xs text-muted-foreground">Liquidation rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
