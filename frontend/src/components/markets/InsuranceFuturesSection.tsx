import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, AlertCircle, DollarSign, BarChart3 } from 'lucide-react';
import { useGetInsuranceFutures, useCreateInsuranceFutures } from '@/hooks/useQueries';
import { toast } from 'sonner';

export default function InsuranceFuturesSection() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [asset, setAsset] = useState('NRN');
  const [contractSize, setContractSize] = useState('');
  const [leverage, setLeverage] = useState('2');
  const [entryPrice, setEntryPrice] = useState('');

  const { data: futures = [], isLoading } = useGetInsuranceFutures();
  const createFutures = useCreateInsuranceFutures();

  const handleCreateFutures = async () => {
    if (!contractSize || !entryPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createFutures.mutateAsync({
        asset,
        contractSize: parseFloat(contractSize),
        leverage: parseFloat(leverage),
        entryPrice: parseFloat(entryPrice),
      });
      toast.success('Insurance futures contract created!');
      setShowCreateDialog(false);
      setContractSize('');
      setEntryPrice('');
    } catch (error) {
      toast.error('Failed to create futures contract');
    }
  };

  const calculatePnL = (futures: any) => {
    const priceDiff = futures.currentPrice - futures.entryPrice;
    const pnl = (priceDiff / futures.entryPrice) * futures.contractSize * futures.leverage;
    return pnl;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Insurance Futures Contracts</CardTitle>
              <CardDescription>
                Leveraged derivative contracts based on insurance coverage
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              Create Contract
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading futures...</div>
          ) : futures.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No active futures contracts</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first insurance futures contract
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {futures.map((contract) => {
                const pnl = calculatePnL(contract);
                const isProfitable = pnl > 0;

                return (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${isProfitable ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {isProfitable ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{contract.asset} Futures</div>
                        <div className="text-sm text-muted-foreground">
                          {contract.contractSize.toFixed(2)} NRN • {contract.leverage.toFixed(1)}x leverage
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Entry</div>
                        <div className="font-medium">{contract.entryPrice.toFixed(4)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className="font-medium">{contract.currentPrice.toFixed(4)}</div>
                      </div>
                      <div className="text-right min-w-24">
                        <div className="text-sm text-muted-foreground">PnL</div>
                        <div className={`font-medium ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                          {isProfitable ? '+' : ''}{pnl.toFixed(2)} NRN
                        </div>
                      </div>
                      <Badge
                        variant={
                          contract.status === 'active'
                            ? 'default'
                            : contract.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {contract.status}
                      </Badge>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Insurance Futures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-ic-blue/10 h-fit">
              <DollarSign className="h-5 w-5 text-ic-blue" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Leveraged Positions</h4>
              <p className="text-sm text-muted-foreground">
                Amplify your exposure to insurance coverage prices with leverage up to 10x
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-ic-blue/10 h-fit">
              <TrendingUp className="h-5 w-5 text-ic-blue" />
            </div>
            <div>
              <h4 className="font-medium mb-1">PnL Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Monitor your profit and loss in real-time based on insurance premium movements
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10 h-fit">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Risk Management</h4>
              <p className="text-sm text-muted-foreground">
                Higher leverage increases both potential profits and losses. Trade responsibly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Insurance Futures Contract</DialogTitle>
            <DialogDescription>
              Set up a leveraged derivative position based on insurance coverage
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Asset</Label>
              <Input value={asset} onChange={(e) => setAsset(e.target.value)} placeholder="NRN" />
            </div>
            <div className="space-y-2">
              <Label>Contract Size (NRN)</Label>
              <Input
                type="number"
                value={contractSize}
                onChange={(e) => setContractSize(e.target.value)}
                placeholder="100.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Leverage (1x - 10x)</Label>
              <Input
                type="number"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                placeholder="2"
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <Label>Entry Price</Label>
              <Input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="0.0000"
              />
            </div>
            {contractSize && leverage && entryPrice && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Exposure</span>
                  <span className="font-medium">
                    {(parseFloat(contractSize) * parseFloat(leverage)).toFixed(2)} NRN
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Required Margin</span>
                  <span className="font-medium">
                    {(parseFloat(contractSize) * parseFloat(entryPrice)).toFixed(2)} NRN
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFutures} disabled={createFutures.isPending}>
              {createFutures.isPending ? 'Creating...' : 'Create Contract'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
