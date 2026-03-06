import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wallet as WalletIcon, 
  Send, 
  Download, 
  Copy, 
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ScanLine
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetWalletBalances, useGetWalletAddress, useGetTransactionHistory, useSendTransaction } from '../hooks/useQueries';
import { truncateAddress, isValidIcpAddress } from '../lib/utils';
import QRScanner from '../components/QRScanner';

type TokenType = 'ICP' | 'NRN' | 'ckBTC' | 'ckETH' | 'cICP';

export default function Wallet() {
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenType>('NRN');
  const [showQR, setShowQR] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { data: balances, isLoading: balancesLoading, refetch: refetchBalances } = useGetWalletBalances();
  const { data: walletAddress, isLoading: addressLoading } = useGetWalletAddress();
  const { data: transactions = [], isLoading: transactionsLoading } = useGetTransactionHistory();
  const { mutate: sendTransaction, isPending: isSending } = useSendTransaction();

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('ICP address copied to clipboard');
    }
  };

  const handleScanComplete = (scannedAddress: string) => {
    setRecipientAddress(scannedAddress);
    setShowScanner(false);
    toast.success('Address scanned successfully');
  };

  const handleSend = () => {
    if (!sendAmount || !recipientAddress) {
      toast.error('Please enter amount and recipient address');
      return;
    }

    if (!isValidIcpAddress(recipientAddress)) {
      toast.error('Invalid ICP address format. Please enter a valid principal ID.');
      return;
    }

    const amount = parseFloat(sendAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    sendTransaction(
      { token: selectedToken, amount, recipient: recipientAddress },
      {
        onSuccess: () => {
          toast.success(`${amount} ${selectedToken} sent successfully`);
          setSendAmount('');
          setRecipientAddress('');
          refetchBalances();
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to send transaction');
        },
      }
    );
  };

  const handleRefresh = () => {
    refetchBalances();
    toast.success('Balances refreshed');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'mining_reward':
        return <WalletIcon className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <img
            src="/assets/generated/neron-protocol-logo.png"
            alt="Neron Protocol"
            className="h-16 w-16 object-contain mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-2">
            Wallet
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl">
            Manage your ICP, NRN, ckBTC, ckETH, and cICP balances, send and receive tokens, and view transaction history
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
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

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">ckBTC Balance</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={balancesLoading}>
                  <RefreshCw className={`h-4 w-4 ${balancesLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {balancesLoading ? '...' : (balances?.ckBTC || 0).toLocaleString()} ckBTC
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Chain-key Bitcoin tokens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">ckETH Balance</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={balancesLoading}>
                  <RefreshCw className={`h-4 w-4 ${balancesLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {balancesLoading ? '...' : (balances?.ckETH || 0).toLocaleString()} ckETH
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Chain-key Ethereum tokens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">cICP Balance</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={balancesLoading}>
                  <RefreshCw className={`h-4 w-4 ${balancesLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {balancesLoading ? '...' : (balances?.cICP || 0).toLocaleString()} cICP
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Collateralized ICP tokens
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="send" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-2 h-auto bg-muted/50 p-2">
            <TabsTrigger value="send" className="text-xs sm:text-sm">
              <Send className="h-4 w-4 mr-2" />
              Send
            </TabsTrigger>
            <TabsTrigger value="receive" className="text-xs sm:text-sm">
              <Download className="h-4 w-4 mr-2" />
              Receive
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <Clock className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Send Tab */}
          <TabsContent value="send" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Tokens</CardTitle>
                <CardDescription>
                  Transfer ICP, NRN, ckBTC, ckETH, or cICP to another wallet address (Principal ID)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-select">Select Token</Label>
                  <Tabs value={selectedToken} onValueChange={(v) => setSelectedToken(v as TokenType)}>
                    <TabsList className="grid w-full grid-cols-5 gap-1">
                      <TabsTrigger value="ICP" className="text-xs">ICP</TabsTrigger>
                      <TabsTrigger value="NRN" className="text-xs">NRN</TabsTrigger>
                      <TabsTrigger value="ckBTC" className="text-xs">ckBTC</TabsTrigger>
                      <TabsTrigger value="ckETH" className="text-xs">ckETH</TabsTrigger>
                      <TabsTrigger value="cICP" className="text-xs">cICP</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient ICP Address (Principal ID)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="recipient"
                      placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="font-mono text-sm flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowScanner(!showScanner)}
                      title="Scan QR Code"
                    >
                      <ScanLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the recipient's principal ID or scan a QR code
                  </p>
                </div>

                {showScanner && (
                  <QRScanner
                    onScanComplete={handleScanComplete}
                    onClose={() => setShowScanner(false)}
                  />
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Available: {
                      selectedToken === 'ICP' ? (balances?.icp || 0) :
                      selectedToken === 'NRN' ? (balances?.nrn || 0) :
                      selectedToken === 'ckBTC' ? (balances?.ckBTC || 0) :
                      selectedToken === 'ckETH' ? (balances?.ckETH || 0) :
                      (balances?.cICP || 0)
                    } {selectedToken}
                  </p>
                </div>

                <Alert>
                  <AlertDescription>
                    Transaction fees will be deducted from your balance. Please verify the recipient's ICP address (Principal ID) before sending.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleSend} 
                  disabled={isSending || !sendAmount || !recipientAddress}
                  className="w-full"
                >
                  {isSending ? 'Sending...' : `Send ${selectedToken}`}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receive Tab */}
          <TabsContent value="receive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Receive Tokens</CardTitle>
                <CardDescription>
                  Share your ICP wallet address (Principal ID) to receive ICP, NRN, ckBTC, ckETH, or cICP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Your ICP Wallet Address (Principal ID)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={addressLoading ? 'Loading...' : walletAddress || 'Not available'}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleCopyAddress}
                      disabled={!walletAddress}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is your standard ICP address format compatible with all ICP wallets and dApps. Use this address to receive ICP, NRN, ckBTC, ckETH, and cICP.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowQR(!showQR)}
                    disabled={!walletAddress}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {showQR ? 'Hide' : 'Show'} QR Code
                  </Button>

                  {showQR && walletAddress && (
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <div className="bg-white p-4 rounded-lg mb-2">
                        <img
                          src="/assets/generated/qr-code-display.dim_300x300.png"
                          alt="Wallet QR Code"
                          className="w-48 h-48"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground font-mono break-all max-w-md">
                        {truncateAddress(walletAddress, 12, 12)}
                      </p>
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertDescription>
                    All mined NRN from PoCC mining is automatically credited to this ICP wallet address. This address is compatible with all Internet Computer wallets and dApps and supports ICP, NRN, ckBTC, ckETH, and cICP.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all your ICP, NRN, ckBTC, ckETH, and cICP transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Loading transactions...</p>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <WalletIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getTransactionIcon(tx.type)}
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
                          <div className="flex items-center gap-1 justify-end">
                            {getStatusIcon(tx.status)}
                            <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
