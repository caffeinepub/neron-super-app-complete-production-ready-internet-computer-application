import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Cpu, Zap, Clock, TrendingUp, Shield, Activity, Info, CheckCircle2, AlertCircle, Lock, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { 
  useGetCurrentNeumannPeriod,
  useRegisterMiningWorker,
  useListMyMiningWorkers,
  useListMyMiningProofs,
  useGetDecentralizationMetrics,
  useGetMyMiningAuditEntries,
  useDeactivateMiningWorker,
  useGetPoccCwuFormula,
  useGetPoccMinimumBond,
  useListPoccCwuStats
} from '@/hooks/useQueries';
import { toast } from 'sonner';
import HardwareRequirements from '@/components/HardwareRequirements';
import MiningManual from '@/components/MiningManual';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MiningTab() {
  const [bondType, setBondType] = useState<'icp' | 'nrn'>('nrn');
  const [bondAmount, setBondAmount] = useState('');
  const [cryptographicIdentity, setCryptographicIdentity] = useState('');
  const [hardwareSpecs, setHardwareSpecs] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const { data: currentPeriod, isLoading: periodLoading } = useGetCurrentNeumannPeriod();
  const { data: workers = [] } = useListMyMiningWorkers();
  const { data: proofs = [] } = useListMyMiningProofs();
  const { data: metrics } = useGetDecentralizationMetrics();
  const { data: auditEntries = [] } = useGetMyMiningAuditEntries();
  const { data: cwuFormula } = useGetPoccCwuFormula();
  const { data: minimumBond } = useGetPoccMinimumBond();
  const { data: cwuStats = [] } = useListPoccCwuStats();
  const { mutate: registerWorker, isPending: isRegistering } = useRegisterMiningWorker();
  const { mutate: deactivateWorker } = useDeactivateMiningWorker();

  const isNp0 = currentPeriod?.id === 'NP0';
  const minBondIcp = 1000;
  const minBondNrn = Number(minimumBond || BigInt(50));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleRegisterWorker = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNp0) {
      if (!cryptographicIdentity.trim()) {
        toast.error('Cryptographic identity is required');
        return;
      }
      if (!hardwareSpecs.trim()) {
        toast.error('Hardware specifications are required');
        return;
      }

      try {
        registerWorker(
          { 
            cryptographicIdentity,
            hardwareSpecs,
            bondAmount: BigInt(0),
            bondToken: 'NRN'
          },
          {
            onSuccess: (workerId) => {
              toast.success(`Worker registered successfully! ID: ${workerId}`);
              setCryptographicIdentity('');
              setHardwareSpecs('');
            },
            onError: (error) => {
              console.error('Registration error:', error);
              toast.error('Failed to register worker');
            },
          }
        );
      } catch (error) {
        console.error('Registration error:', error);
        toast.error('Failed to process registration');
      }
      return;
    }

    const bondValue = parseFloat(bondAmount);
    const minRequired = bondType === 'icp' ? minBondIcp : minBondNrn;

    if (isNaN(bondValue) || bondValue < minRequired) {
      toast.error(`Minimum bond amount is ${minRequired} ${bondType.toUpperCase()}`);
      return;
    }

    if (!cryptographicIdentity.trim()) {
      toast.error('Cryptographic identity is required');
      return;
    }

    if (!hardwareSpecs.trim()) {
      toast.error('Hardware specifications are required');
      return;
    }

    try {
      const bondAmountBigInt = BigInt(Math.floor(bondValue));
      
      registerWorker(
        { 
          cryptographicIdentity,
          hardwareSpecs,
          bondAmount: bondAmountBigInt,
          bondToken: bondType.toUpperCase()
        },
        {
          onSuccess: (workerId) => {
            toast.success(`Worker registered successfully! ID: ${workerId}`);
            setBondAmount('');
            setCryptographicIdentity('');
            setHardwareSpecs('');
          },
          onError: (error) => {
            console.error('Registration error:', error);
            toast.error('Failed to register worker');
          },
        }
      );
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to process registration');
    }
  };

  const mockNrnMined = 4500000;
  const nrnAllocation = currentPeriod ? Number(currentPeriod.nrnAllocation) : 8000000;
  const progressPercentage = (mockNrnMined / nrnAllocation) * 100;
  const remainingNrn = nrnAllocation - mockNrnMined;

  const totalCwu = cwuStats.reduce((sum: number, stat: any) => sum + stat.totalCwu, 0);
  const activeWorkers = workers.filter((w: any) => w.status === 'active').length;

  const decentralizationScore = metrics ? metrics.decentralizationScore : 0;
  const totalWorkers = metrics ? Number(metrics.totalWorkers) : 0;
  const totalProofs = metrics ? Number(metrics.totalProofs) : 0;
  const verifiedProofs = metrics ? Number(metrics.verifiedProofs) : 0;
  const averageVerifiers = metrics ? metrics.averageVerifiers : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          <div className="space-y-1">
            <p className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-100">Enhanced Decentralized PoCC Mining Active</p>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              Earn NRN rewards through verified computational work. All proofs are cryptographically signed and validated by multiple verifiers before reward distribution. Complete on-chain auditability ensures trustless mining.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {isNp0 && (
        <Alert className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-semibold text-sm sm:text-base text-amber-900 dark:text-amber-100">Neumann Period 0 - Creator-Exclusive Mining</p>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                This period (1,600,000 NRN) is exclusively available for mining by the protocol creator with no bond requirement. General mining will open in Neumann Period 1 after NP0 completion with dual bond options (1,000 ICP or 50 NRN).
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <TabsList className="inline-flex w-full min-w-max sm:grid sm:grid-cols-8 gap-1 sm:gap-1.5 h-auto bg-muted/50 p-1.5">
            <TabsTrigger value="overview" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Overview
            </TabsTrigger>
            <TabsTrigger value="verification" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Verification
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Manual
            </TabsTrigger>
            <TabsTrigger value="hardware" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Hardware
            </TabsTrigger>
            <TabsTrigger value="registration" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Register
            </TabsTrigger>
            <TabsTrigger value="status" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Status
            </TabsTrigger>
            <TabsTrigger value="proofs" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Proofs
            </TabsTrigger>
            <TabsTrigger value="audit" className="text-xs py-2 px-2 sm:px-3 whitespace-nowrap">
              Audit
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Current Neumann Period</CardTitle>
                  <CardDescription className="text-xs">
                    All 17.1M NRN are mineable via PoCC. NP0 (1.6M) is creator-exclusive with no bond; NP1-5 (15.5M) are open for general mining with dual bond options.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {periodLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : currentPeriod ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">Active Period</p>
                          <p className="text-xl sm:text-2xl font-bold">{currentPeriod.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {isNp0 ? 'Creator-exclusive (no bond)' : 'Open mining (1,000 ICP or 50 NRN)'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">CWU Target</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-xl sm:text-2xl font-bold">{Number(currentPeriod.cwuTarget).toLocaleString('en-US')}</p>
                            <Badge variant="outline" className="text-xs">Target</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Compute-Work Units</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">Period Allocation</p>
                          <p className="text-xl sm:text-2xl font-bold">{nrnAllocation.toLocaleString('en-US')} NRN</p>
                          <p className="text-xs text-muted-foreground">
                            {isNp0 ? '9.4% of total supply' : 'From 15.5M open mining supply'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-3 sm:pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium">NRN Mining Progress</span>
                          <Badge variant="outline" className="text-xs">{mockNrnMined.toLocaleString('en-US')} / {nrnAllocation.toLocaleString('en-US')} NRN</Badge>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{progressPercentage.toFixed(1)}% complete</span>
                          <span>{remainingNrn.toLocaleString('en-US')} NRN until period transition</span>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                          <div className="space-y-1 flex-1">
                            <p className="text-xs sm:text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                              Next Period Transition
                            </p>
                            <p className="text-xs text-yellow-800 dark:text-yellow-200">
                              {isNp0 
                                ? `Automatic transition to NP1 (open mining with dual bond options) when creator completes mining ${remainingNrn.toLocaleString('en-US')} NRN. NP1 will open 8,000,000 NRN for general mining with 1,000 ICP or 50 NRN bond requirement.`
                                : `Automatic transition to next period when ${remainingNrn.toLocaleString('en-US')} NRN is mined. New CWU target will take effect immediately.`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No active period</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Active Workers</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold">{activeWorkers}</div>
                    <p className="text-xs text-muted-foreground">Total registered: {workers.length}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Total CWU</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold">{totalCwu.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">Compute-Work Units</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Verified Proofs</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold">{verifiedProofs}</div>
                    <p className="text-xs text-muted-foreground">Total proofs: {totalProofs}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="verification" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Verified Proof Status Dashboard
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Real-time verification status and decentralization metrics for all mining proofs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-black/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Decentralization Score</span>
                        <Badge variant="outline" className="text-xs">
                          {(decentralizationScore * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress value={decentralizationScore * 100} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        Measures network distribution and proof verification quality
                      </p>
                    </div>

                    <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-black/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Average Verifiers</span>
                        <Badge variant="outline" className="text-xs">
                          {averageVerifiers.toFixed(1)} nodes
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Each proof validated by multiple independent verifiers
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-black/20">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
                      Anti-Double-Mining Protection
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <p>Each computational proof has a unique immutable identifier preventing duplicate submissions</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <p>Cryptographic timestamps ensure temporal ordering and prevent replay attacks</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <p>Multi-verifier consensus required before reward distribution (minimum 2/3 agreement)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <p>Complete on-chain audit trail for all proofs and verifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-black/20">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                      Verification Process
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-bold shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-sm font-medium">Proof Submission</p>
                          <p className="text-xs text-muted-foreground">Worker submits cryptographically signed proof with unique identifier</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-bold shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-sm font-medium">Multi-Verifier Validation</p>
                          <p className="text-xs text-muted-foreground">Multiple independent nodes validate proof authenticity and uniqueness</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-bold shrink-0">
                          3
                        </div>
                        <div>
                          <p className="text-sm font-medium">Consensus Confirmation</p>
                          <p className="text-xs text-muted-foreground">Minimum 2/3 verifier agreement required for proof acceptance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-bold shrink-0">
                          4
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reward Distribution</p>
                          <p className="text-xs text-muted-foreground">Rewards issued only after complete verification and consensus</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="manual" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="pr-4">
              <MiningManual variant="full" />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hardware" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="pr-4">
              <HardwareRequirements variant="full" />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="registration" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
                    Register as PoCC Worker
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {isNp0 
                      ? 'Register to participate in creator-exclusive PoCC mining (no bond required)'
                      : 'Register to participate in PoCC mining and earn NRN rewards (choose 1,000 ICP or 50 NRN bond)'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterWorker} className="space-y-3 sm:space-y-4">
                    {!isNp0 && (
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-xs sm:text-sm">Bond Type</Label>
                        <RadioGroup value={bondType} onValueChange={(value) => setBondType(value as 'icp' | 'nrn')}>
                          <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="icp" id="bond-icp" />
                            <Label htmlFor="bond-icp" className="flex-1 cursor-pointer">
                              <div className="font-medium text-xs sm:text-sm">ICP Bond</div>
                              <div className="text-xs text-muted-foreground">Minimum 1,000 ICP required</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="nrn" id="bond-nrn" />
                            <Label htmlFor="bond-nrn" className="flex-1 cursor-pointer">
                              <div className="font-medium text-xs sm:text-sm">NRN Bond</div>
                              <div className="text-xs text-muted-foreground">Minimum 50 NRN required</div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {!isNp0 && (
                      <div className="space-y-2">
                        <Label htmlFor="bond-amount" className="text-xs sm:text-sm">
                          Bond Amount ({bondType.toUpperCase()})
                        </Label>
                        <Input
                          id="bond-amount"
                          type="number"
                          inputMode="decimal"
                          step="1"
                          min={bondType === 'icp' ? minBondIcp : minBondNrn}
                          placeholder={`Minimum ${bondType === 'icp' ? minBondIcp : minBondNrn} ${bondType.toUpperCase()}`}
                          value={bondAmount}
                          onChange={(e) => setBondAmount(e.target.value)}
                          disabled={isRegistering}
                          className="text-sm sm:text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum bond: {bondType === 'icp' ? `${minBondIcp} ICP` : `${minBondNrn} NRN`}
                        </p>
                      </div>
                    )}

                    {isNp0 && (
                      <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                        <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription>
                          <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
                            No bond required for Neumann Period 0 (creator-exclusive mining period)
                          </p>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="crypto-identity" className="text-xs sm:text-sm">Cryptographic Identity</Label>
                      <Input
                        id="crypto-identity"
                        type="text"
                        placeholder="Enter cryptographic identity (e.g., public key hash)"
                        value={cryptographicIdentity}
                        onChange={(e) => setCryptographicIdentity(e.target.value)}
                        disabled={isRegistering}
                        className="text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Unique cryptographic identifier for proof signing and verification
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hardware-specs" className="text-xs sm:text-sm">Hardware Specifications</Label>
                      <Input
                        id="hardware-specs"
                        type="text"
                        placeholder="Enter hardware specs (e.g., CPU, RAM, GPU)"
                        value={hardwareSpecs}
                        onChange={(e) => setHardwareSpecs(e.target.value)}
                        disabled={isRegistering}
                        className="text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Hardware profile for optimal task assignment and verification
                      </p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-muted border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium">CWU Calculation Formula</p>
                        <code className="text-xs font-mono block p-2 bg-background rounded border break-all">
                          {cwuFormula || 'CWU = α*cpu_cycles + β*gpu_flops + γ*memory_reads'}
                        </code>
                        <p className="text-xs text-muted-foreground">
                          Default coefficients: α=1e-9, β=1e-12, γ=1e-10
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isRegistering || (!isNp0 && !bondAmount) || !cryptographicIdentity || !hardwareSpecs}
                    >
                      {isRegistering ? (
                        <>
                          <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Cpu className="mr-2 h-4 w-4" />
                          Register Worker
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              {workers.length > 0 ? (
                <Card className="border-2 border-border">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg">Registered Workers</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Your PoCC worker nodes and verification status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      {workers.map((worker: any) => (
                        <div key={worker.id} className="p-3 border border-border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1 flex-1">
                              <p className="text-xs sm:text-sm font-medium">Worker #{worker.id.slice(-8)}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {worker.bondToken} Bond: {worker.bondAmount.toString()}
                                </Badge>
                                <Badge variant={worker.status === 'active' ? 'default' : 'outline'} className="text-xs">
                                  {worker.status}
                                </Badge>
                                <Badge variant={worker.verificationStatus === 'verified' ? 'default' : 'outline'} className="text-xs">
                                  {worker.verificationStatus}
                                </Badge>
                              </div>
                            </div>
                            {worker.status === 'active' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (confirm('Are you sure you want to deactivate this worker?')) {
                                    deactivateWorker(worker.id);
                                  }
                                }}
                              >
                                Deactivate
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p><strong>Crypto ID:</strong> {worker.cryptographicIdentity.slice(0, 16)}...</p>
                            <p><strong>Hardware:</strong> {worker.hardwareSpecs}</p>
                            <p><strong>Registered:</strong> {new Date(Number(worker.registeredAt) / 1000000).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-border">
                  <CardContent className="py-12">
                    <div className="text-center space-y-3">
                      <Cpu className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground">No workers registered yet</p>
                      <Button onClick={() => setActiveSection('registration')} variant="outline">
                        Register Your First Worker
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="proofs" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Mining Proofs</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Your submitted proofs and verification status</CardDescription>
                </CardHeader>
                <CardContent>
                  {proofs.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground">
                      <Shield className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-xs sm:text-sm">No proofs submitted yet. Start mining to generate proofs!</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {proofs.map((proof: any) => (
                        <div key={proof.proofId} className="p-3 border border-border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1 flex-1">
                              <p className="text-xs sm:text-sm font-medium">Proof #{proof.proofId.slice(-8)}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant={proof.verificationStatus === 'verified' ? 'default' : proof.verificationStatus === 'pending' ? 'outline' : 'destructive'} className="text-xs">
                                  {proof.verificationStatus}
                                </Badge>
                                <Badge variant={proof.rewardStatus === 'distributed' ? 'default' : 'outline'} className="text-xs">
                                  Reward: {proof.rewardStatus}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs sm:text-sm font-medium">CWU</p>
                              <p className="text-sm sm:text-lg font-bold">{proof.cwuAmount.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p><strong>Worker:</strong> {proof.workerId.slice(-8)}</p>
                            <p><strong>Hash:</strong> {proof.computationHash.slice(0, 16)}...</p>
                            <p><strong>Signature:</strong> {proof.cryptographicSignature.slice(0, 16)}...</p>
                            <p><strong>Submitted:</strong> {new Date(Number(proof.timestamp) / 1000000).toLocaleString()}</p>
                            <p><strong>Verifiers:</strong> {proof.verifierConsensus.length} nodes</p>
                            {proof.rewardAmount > 0 && (
                              <p><strong>Reward:</strong> {proof.rewardAmount.toFixed(2)} NRN</p>
                            )}
                          </div>
                          {proof.verifierConsensus.length > 0 && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs font-medium mb-1">Verifier Consensus:</p>
                              <div className="space-y-1">
                                {proof.verifierConsensus.map((v: any, idx: number) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    {v.validationResult ? (
                                      <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                                    )}
                                    <span className="text-muted-foreground">
                                      Verifier {v.verifierPrincipal.toString().slice(0, 8)}... - {v.validationResult ? 'Approved' : 'Rejected'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4 pr-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Mining Audit Trail</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Complete on-chain audit log of your mining activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {auditEntries.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground">
                      <Activity className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-xs sm:text-sm">No audit entries yet. Start mining to generate audit logs!</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {auditEntries.map((entry: any) => (
                        <div key={entry.entryId} className="p-3 border border-border rounded-lg space-y-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {entry.action}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(Number(entry.timestamp) / 1000000).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{entry.details}</p>
                          {entry.proofId && (
                            <p className="text-xs text-muted-foreground">
                              <strong>Proof ID:</strong> {entry.proofId.slice(-8)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

