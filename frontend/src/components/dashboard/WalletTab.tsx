import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Copy } from 'lucide-react';
import { useGetWalletBalances, useGetWalletAddress, useGetTransactionHistory } from '../../hooks/useQueries';
import { truncateAddress } from '../../lib/utils';
import { toast } from 'sonner';

export default function WalletTab() {
  const { data: balances, isLoading: balancesLoading, refetch: refetchBalances } = useGetWalletBalances();
  const { data: walletAddress, isLoading: addressLoading } = useGetWalletAddress();
  const { data: transactions = [], isLoading: transactionsLoading } = useGetTransactionHistory();

  const handleRefresh = () => {
    refetchBalances();
    toast.success('Balances refreshed');
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('ICP address copied to clipboard');
    }
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Wallet Address Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your ICP Wallet Address</CardTitle>
          <CardDescription>
            Standard Internet Computer address format (Principal ID)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
              {addressLoading ? 'Loading...' : walletAddress ? truncateAddress(walletAddress, 16, 16) : 'Not available'}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleCopyAddress}
              disabled={!walletAddress}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Compatible with all ICP wallets and dApps for sending and receiving ICP and NRN
          </p>
        </CardContent>
      </Card>

      {/* Balance Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">ICP Balance</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={balancesLoading}>
                <RefreshCw className={`h-4 w-4 ${balancesLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {balancesLoading ? '...' : (balances?.icp || 0).toLocaleString()} ICP
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Internet Computer Protocol tokens
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">NRN Balance</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={balancesLoading}>
                <RefreshCw className={`h-4 w-4 ${balancesLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {balancesLoading ? '...' : (balances?.nrn || 0).toLocaleString()} NRN
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Neron Protocol tokens from PoCC mining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest wallet activity including mining rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading transactions...</p>
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {tx.type === 'send' ? (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium capitalize">{tx.type.replace('_', ' ')}</p>
                        <Badge variant="outline" className="text-xs">
                          {tx.token}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(tx.timestamp) / 1000000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.type === 'send' ? 'text-destructive' : 'text-green-500'}`}>
                      {tx.type === 'send' ? '-' : '+'}{tx.amount.toLocaleString()} {tx.token}
                    </p>
                    <Badge variant="outline" className="text-xs capitalize">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
          <CardDescription>
            Important information about your ICP wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Your wallet address is your Internet Identity Principal ID in standard ICP format
            </p>
            <p className="text-sm text-muted-foreground">
              • All mined NRN from PoCC mining is automatically credited to your wallet
            </p>
            <p className="text-sm text-muted-foreground">
              • Use the full Wallet page to send and receive tokens
            </p>
            <p className="text-sm text-muted-foreground">
              • This address is compatible with all ICP wallets and dApps
            </p>
            <p className="text-sm text-muted-foreground">
              • Transaction history includes all ICP and NRN transfers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
