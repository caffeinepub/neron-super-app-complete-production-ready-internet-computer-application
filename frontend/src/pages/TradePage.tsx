import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useGetTradePairs, useCreateTradeRequest, useConfirmTrade, useGetTradeConfirmations } from '@/hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function TradePage() {
  const [fromToken, setFromToken] = useState('ckBTC');
  const [toToken, setToToken] = useState('ICP');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingTradeId, setPendingTradeId] = useState<string | null>(null);

  const { data: tradePairs = [], isLoading: pairsLoading } = useGetTradePairs();
  const { data: confirmations = [] } = useGetTradeConfirmations();
  const createTrade = useCreateTradeRequest();
  const confirmTrade = useConfirmTrade();

  const tokens = ['ckBTC', 'ckETH', 'ICP', 'cICP', 'NRN'];

  const currentPair = tradePairs.find(
    (pair) => pair.base === fromToken && pair.quote === toToken
  );

  const rate = currentPair?.rate || 0;
  const slippage = currentPair?.slippage || 0;
  const estimatedReceive = amount ? parseFloat(amount) * rate : 0;
  const slippageAmount = estimatedReceive * slippage;
  const minReceive = estimatedReceive - slippageAmount;

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleCreateTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!currentPair) {
      toast.error('Trading pair not available');
      return;
    }

    try {
      const tradeId = await createTrade.mutateAsync({
        from: fromToken,
        to: toToken,
        amount: parseFloat(amount),
        rate,
        slippage,
      });
      setPendingTradeId(tradeId);
      setShowConfirmation(true);
    } catch (error) {
      toast.error('Failed to create trade request');
    }
  };

  const handleConfirmTrade = async () => {
    if (!pendingTradeId) return;

    try {
      await confirmTrade.mutateAsync(pendingTradeId);
      toast.success('Trade executed successfully!');
      setShowConfirmation(false);
      setPendingTradeId(null);
      setAmount('');
    } catch (error) {
      toast.error('Failed to execute trade');
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trade</h1>
        <p className="text-muted-foreground">
          Convert between ckBTC, ckETH, ICP, cICP, and NRN with real-time rates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Swap Tokens</CardTitle>
            <CardDescription>Exchange tokens with competitive rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From</Label>
              <div className="flex gap-2">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token} value={token}>
                        {token}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapTokens}
                className="rounded-full"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <div className="flex gap-2">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token} value={token}>
                        {token}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={estimatedReceive.toFixed(6)}
                  readOnly
                  className="flex-1 bg-muted"
                />
              </div>
            </div>

            {currentPair && amount && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">
                    1 {fromToken} = {rate} {toToken}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slippage</span>
                  <span className="font-medium">{(slippage * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Received</span>
                  <span className="font-medium">
                    {minReceive.toFixed(6)} {toToken}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleCreateTrade}
              disabled={!amount || !currentPair || createTrade.isPending}
              className="w-full"
            >
              {createTrade.isPending ? 'Creating Trade...' : 'Review Trade'}
            </Button>

            {!currentPair && fromToken !== toToken && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Trading pair {fromToken}/{toToken} is not available
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Trading Pairs</CardTitle>
              <CardDescription>Real-time exchange rates</CardDescription>
            </CardHeader>
            <CardContent>
              {pairsLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading pairs...</div>
              ) : (
                <div className="space-y-2">
                  {tradePairs.slice(0, 10).map((pair, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setFromToken(pair.base);
                        setToToken(pair.quote);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {pair.base}/{pair.quote}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{pair.rate.toFixed(6)}</div>
                        <div className="text-xs text-muted-foreground">
                          {(pair.slippage * 100).toFixed(2)}% slippage
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Your trading history</CardDescription>
            </CardHeader>
            <CardContent>
              {confirmations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No trades yet
                </div>
              ) : (
                <div className="space-y-2">
                  {confirmations.slice(0, 5).map((confirmation) => (
                    <div
                      key={confirmation.tradeId}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        {confirmation.confirmed ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-yellow-500" />
                        )}
                        <div>
                          <div className="font-medium text-sm">
                            {confirmation.from} → {confirmation.to}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(Number(confirmation.timestamp) / 1000000).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{confirmation.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          {confirmation.confirmed ? 'Confirmed' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Trade</DialogTitle>
            <DialogDescription>
              Review your trade details before confirming
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium">
                  {amount} {fromToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">
                  {estimatedReceive.toFixed(6)} {toToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">
                  1 {fromToken} = {rate} {toToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slippage</span>
                <span className="font-medium">{(slippage * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Received</span>
                <span className="font-medium">
                  {minReceive.toFixed(6)} {toToken}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmTrade} disabled={confirmTrade.isPending}>
              {confirmTrade.isPending ? 'Confirming...' : 'Confirm Trade'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
