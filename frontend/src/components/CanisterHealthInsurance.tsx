import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  Activity, 
  Zap, 
  CheckCircle, 
  Wallet,
  Copy,
  Check,
  ArrowDownUp
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetInsuranceWallet, useListTransactions, useGetTransactionStats } from '@/hooks/useQueries';

interface CanisterHealthInsuranceProps {
  variant?: 'full' | 'compact';
}

// Local type definitions for transaction data
type TransactionType = { donation: null } | { topUp: null } | { conversion: null };
type TransactionStatus = { pending: null } | { completed: null } | { failed: null };

interface Transaction {
  id: string;
  transactionType: TransactionType;
  amount: bigint;
  currency: string;
  timestamp: bigint;
  status: TransactionStatus;
  fromAddress: string;
  toAddress: string;
  conversionRate?: number;
  convertedAmount?: bigint;
}

export default function CanisterHealthInsurance({ variant = 'full' }: CanisterHealthInsuranceProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const { data: insuranceWallet, isLoading: walletLoading } = useGetInsuranceWallet();
  const { data: transactions, isLoading: transactionsLoading } = useListTransactions();
  const { data: transactionStats, isLoading: statsLoading } = useGetTransactionStats();

  const handleCopyAddress = async () => {
    if (!insuranceWallet?.address) return;
    
    try {
      await navigator.clipboard.writeText(insuranceWallet.address);
      setCopiedAddress(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const getTransactionTypeLabel = (type: TransactionType): string => {
    if (typeof type === 'object') {
      if ('donation' in type) return 'Donation';
      if ('topUp' in type) return 'Top-Up';
      if ('conversion' in type) return 'Conversion';
    }
    return String(type);
  };

  const getTransactionStatusLabel = (status: TransactionStatus): string => {
    if (typeof status === 'object') {
      if ('pending' in status) return 'Pending';
      if ('completed' in status) return 'Completed';
      if ('failed' in status) return 'Failed';
    }
    return String(status);
  };

  const displayWallet = insuranceWallet || {
    address: 'Loading...',
    balance: BigInt(0),
    status: 'active',
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  };

  const displayStats = transactionStats || {
    totalDonations: BigInt(0),
    totalTopUps: BigInt(0),
    totalConversions: BigInt(0),
    totalTransactions: BigInt(0),
  };

  const displayTransactions = (transactions || []) as Transaction[];

  if (variant === 'compact') {
    return (
      <Card className="border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-500/20 p-2 shrink-0">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2 flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                <CardTitle className="text-base md:text-lg">Canister Health Insurance</CardTitle>
                <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <CardDescription className="text-xs md:text-sm">
                Automated cycle management for all protocol canisters, controlled by NNS root
              </CardDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-2 rounded-lg bg-background/50 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Wallet Balance</p>
                  <p className="text-sm font-semibold">
                    {walletLoading ? 'Loading...' : `${Number(displayWallet.balance).toLocaleString()} cycles`}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-background/50 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
                  <p className="text-sm font-semibold">
                    {statsLoading ? 'Loading...' : displayStats.totalTransactions.toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-xs md:text-sm text-blue-700 dark:text-blue-400">
          Fully automated canister health insurance is active. All protocol canisters are monitored and topped up automatically when cycle balances are low.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Insurance Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-base md:text-xl font-bold capitalize">
                {walletLoading ? 'Loading' : displayWallet.status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {walletLoading ? '...' : Number(displayWallet.balance).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">cycles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Donations</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {statsLoading ? '...' : displayStats.totalDonations.toString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Top-Ups</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {statsLoading ? '...' : displayStats.totalTopUps.toString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">operations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Insurance Wallet Address</CardTitle>
          <CardDescription className="text-xs md:text-sm">Send donations to support canister health insurance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 md:p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <span className="text-xs md:text-sm text-muted-foreground font-medium">Wallet Address:</span>
              <Badge variant="outline" className="text-xs">Insurance Wallet</Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <code className="text-xs font-mono bg-muted px-3 py-2 rounded flex-1 break-all">
                {walletLoading ? 'Loading...' : displayWallet.address}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                className="shrink-0 w-full sm:w-auto"
                disabled={walletLoading || !insuranceWallet}
              >
                {copiedAddress ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Controlled by NNS root principal for maximum security</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Transaction & Conversion History</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Complete history of donations, top-ups, and conversions between NRN and ICP
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Loading transactions...
            </div>
          ) : displayTransactions.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No transactions yet
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {displayTransactions.map((tx) => (
                  <div key={tx.id} className="flex flex-col gap-3 p-3 md:p-4 border border-border rounded-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getTransactionTypeLabel(tx.transactionType) === 'Donation' ? (
                          <Wallet className="h-5 w-5 text-blue-500 shrink-0" />
                        ) : getTransactionTypeLabel(tx.transactionType) === 'Top-Up' ? (
                          <Zap className="h-5 w-5 text-amber-500 shrink-0" />
                        ) : (
                          <ArrowDownUp className="h-5 w-5 text-purple-500 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm md:text-base font-medium">
                            {getTransactionTypeLabel(tx.transactionType)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Number(tx.timestamp) / 1000000).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={getTransactionStatusLabel(tx.status) === 'Completed' ? 'default' : 'secondary'}
                        className="shrink-0"
                      >
                        {getTransactionStatusLabel(tx.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount: </span>
                        <span className="font-medium">{Number(tx.amount).toLocaleString()} {tx.currency}</span>
                      </div>
                      {tx.conversionRate && (
                        <div>
                          <span className="text-muted-foreground">Rate: </span>
                          <span className="font-medium">{tx.conversionRate.toFixed(4)}</span>
                        </div>
                      )}
                      {tx.convertedAmount && (
                        <div>
                          <span className="text-muted-foreground">Converted: </span>
                          <span className="font-medium">{Number(tx.convertedAmount).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">From: </span>
                        <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded break-all">
                          {tx.fromAddress}
                        </code>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">To: </span>
                        <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded break-all">
                          {tx.toAddress}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">How It Works</CardTitle>
          <CardDescription className="text-xs md:text-sm">Automated canister health insurance mechanism</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-xs md:text-sm leading-relaxed">
              The Fully Automated Canister Health Insurance system continuously monitors all protocol canisters and automatically tops them up with cycles when their balance falls below a safe threshold. This ensures uninterrupted protocol operation without manual intervention.
            </p>
            <ul className="text-xs md:text-sm space-y-2 mt-4">
              <li><strong>Automatic Monitoring:</strong> All protocol canisters are monitored 24/7 for cycle balance levels</li>
              <li><strong>Smart Top-Ups:</strong> When a canister's cycle balance drops below the threshold, it is automatically topped up</li>
              <li><strong>Donation Support:</strong> Community members can donate NRN or ICP to support the insurance wallet</li>
              <li><strong>Automatic Conversion:</strong> The system automatically converts between NRN and ICP as needed for optimal balance</li>
              <li><strong>NNS Control:</strong> The wallet is owned and controlled by the NNS root principal for maximum security</li>
              <li><strong>Transparent Operations:</strong> All transactions including donations, top-ups, and conversions are logged and visible</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
