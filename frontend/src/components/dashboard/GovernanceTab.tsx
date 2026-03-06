import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Vote, ThumbsUp, ThumbsDown, Clock, Plus, Shield, CheckCircle2, Lock, AlertTriangle, Timer, Ban, UserCheck, Info, Unlock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState, useEffect } from 'react';
import { useListDsProposals, useCreateDsProposal, useLockNrnForVoting, useCastDsVote, useListDsLocks, useListDsPenalties, useLockNrnForProofOfAttendance, useUnlockNern } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';

type DsPhase = { proposalSubmission: null } | { locking: null } | { voting: null };

export default function GovernanceTab() {
  const [lockAmounts, setLockAmounts] = useState<Record<string, string>>({});
  const [lockErrors, setLockErrors] = useState<Record<string, string>>({});
  const [lockSuccess, setLockSuccess] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProposalTitle, setNewProposalTitle] = useState('');
  const [newProposalDescription, setNewProposalDescription] = useState('');
  const [proofOfAttendanceLockAmount, setProofOfAttendanceLockAmount] = useState('');
  const [proofOfAttendanceLockError, setProofOfAttendanceLockError] = useState('');
  const [proofOfAttendanceLockSuccess, setProofOfAttendanceLockSuccess] = useState(false);

  const { identity } = useInternetIdentity();
  const { data: proposals = [], isLoading: proposalsLoading, refetch: refetchProposals } = useListDsProposals();
  const { data: locks = [], refetch: refetchLocks } = useListDsLocks();
  const { data: penalties = [] } = useListDsPenalties();
  const createProposal = useCreateDsProposal();
  const lockTokens = useLockNrnForVoting();
  const lockForProofOfAttendance = useLockNrnForProofOfAttendance();
  const unlockTokens = useUnlockNern();
  const castVote = useCastDsVote();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const userPrincipal = identity?.getPrincipal().toString();
  const userLocks = locks.filter(lock => lock.locker.toString() === userPrincipal);
  const userLockedNRN = userLocks.reduce((sum, lock) => sum + Number(lock.lockedAmount), 0);
  
  const userPenalties = penalties.filter(p => p.participant.toString() === userPrincipal && Number(p.endTimestamp) > Date.now() * 1000000);
  const userPenaltyStatus = {
    isLocked: userPenalties.length > 0,
    sequencesRemaining: userPenalties.length > 0 ? 5 : 0,
  };

  const nnsRootPrincipal = 'rdmx6-jaaaa-aaaaa-aaadq-cai';

  const getTimeRemaining = (endTime: Date) => {
    const diff = endTime.getTime() - currentTime.getTime();
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const getPhaseLabel = (phase: DsPhase) => {
    if ('proposalSubmission' in phase) return 'Submission (10 days)';
    if ('locking' in phase) return 'Locking (5 days)';
    if ('voting' in phase) return 'Voting (10 days)';
    return 'Unknown';
  };

  const handleCreateProposal = async () => {
    if (!newProposalTitle || !newProposalDescription) return;
    
    try {
      await createProposal.mutateAsync({
        title: newProposalTitle,
        description: newProposalDescription,
        feePaid: BigInt(10),
      });
      setIsCreateDialogOpen(false);
      setNewProposalTitle('');
      setNewProposalDescription('');
      toast.success('Proposal created successfully!');
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Failed to create proposal. Please try again.');
    }
  };

  const validateLockAmount = (amount: string, setError: (error: string) => void): boolean => {
    const numAmount = parseFloat(amount);
    
    if (!amount || amount.trim() === '') {
      setError('Please enter an amount');
      return false;
    }
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid positive number');
      return false;
    }
    
    if (numAmount < 100) {
      setError('Minimum lock amount is 100 NRN');
      return false;
    }
    
    if (!Number.isInteger(numAmount)) {
      setError('Please enter a whole number');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleProofOfAttendanceLockAmountChange = (value: string) => {
    setProofOfAttendanceLockAmount(value);
    setProofOfAttendanceLockSuccess(false);
    if (value) {
      validateLockAmount(value, setProofOfAttendanceLockError);
    } else {
      setProofOfAttendanceLockError('');
    }
  };

  const handleProofOfAttendanceLock = async () => {
    if (!validateLockAmount(proofOfAttendanceLockAmount, setProofOfAttendanceLockError)) {
      return;
    }
    
    try {
      await lockForProofOfAttendance.mutateAsync(BigInt(Math.floor(parseFloat(proofOfAttendanceLockAmount))));
      
      const lockedAmount = Math.floor(parseFloat(proofOfAttendanceLockAmount));
      setProofOfAttendanceLockAmount('');
      setProofOfAttendanceLockError('');
      setProofOfAttendanceLockSuccess(true);
      
      await refetchLocks();
      
      toast.success(`Successfully locked ${lockedAmount} NRN for Proof of Attendance! You can now participate in voting.`);
      
      setTimeout(() => {
        setProofOfAttendanceLockSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error locking tokens:', error);
      const errorMessage = error?.message || 'Failed to lock tokens. Please try again.';
      setProofOfAttendanceLockError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleUnlock = async (lockId: string, lockedAmount: number) => {
    try {
      await unlockTokens.mutateAsync(lockId);
      
      await refetchLocks();
      
      toast.success(`Successfully unlocked ${lockedAmount.toLocaleString('en-US')} NRN! Your tokens are now available.`);
    } catch (error: any) {
      console.error('Error unlocking tokens:', error);
      const errorMessage = error?.message || 'Failed to unlock tokens. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleLockAmountChange = (proposalId: string, value: string) => {
    setLockAmounts(prev => ({ ...prev, [proposalId]: value }));
    setLockSuccess(prev => ({ ...prev, [proposalId]: false }));
    if (value) {
      validateLockAmount(value, (error) => {
        setLockErrors(prev => ({ ...prev, [proposalId]: error }));
      });
    } else {
      setLockErrors(prev => ({ ...prev, [proposalId]: '' }));
    }
  };

  const handleLockTokens = async (proposalId: string) => {
    const amount = lockAmounts[proposalId];
    
    if (!validateLockAmount(amount, (error) => {
      setLockErrors(prev => ({ ...prev, [proposalId]: error }));
    })) {
      return;
    }
    
    try {
      await lockTokens.mutateAsync({
        proposalId,
        amount: BigInt(Math.floor(parseFloat(amount))),
      });
      
      setLockAmounts(prev => ({ ...prev, [proposalId]: '' }));
      setLockErrors(prev => ({ ...prev, [proposalId]: '' }));
      setLockSuccess(prev => ({ ...prev, [proposalId]: true }));
      
      await refetchLocks();
      
      toast.success(`Successfully locked ${Math.floor(parseFloat(amount))} NRN! You can now vote when the voting phase begins.`);
      
      setTimeout(() => {
        setLockSuccess(prev => ({ ...prev, [proposalId]: false }));
      }, 5000);
    } catch (error: any) {
      console.error('Error locking tokens:', error);
      const errorMessage = error?.message || 'Failed to lock tokens. Please try again.';
      setLockErrors(prev => ({ ...prev, [proposalId]: errorMessage }));
      toast.error(errorMessage);
    }
  };

  const handleVote = async (proposalId: string, voteFor: boolean) => {
    try {
      await castVote.mutateAsync({
        proposalId,
        vote: voteFor,
      });
      toast.success(`Vote cast successfully! You voted ${voteFor ? 'FOR' : 'AGAINST'} the proposal.`);
      await refetchProposals();
    } catch (error: any) {
      console.error('Error casting vote:', error);
      const errorMessage = error?.message || 'Failed to cast vote. Please try again.';
      toast.error(errorMessage);
    }
  };

  const getProposalPhaseEndTime = (proposal: any) => {
    const createdAt = Number(proposal.createdAt) / 1000000;
    const phase = proposal.phase;
    
    if ('proposalSubmission' in phase) {
      return new Date(createdAt + 10 * 24 * 60 * 60 * 1000);
    } else if ('locking' in phase) {
      return new Date(createdAt + 15 * 24 * 60 * 60 * 1000);
    } else if ('voting' in phase) {
      return new Date(createdAt + 25 * 24 * 60 * 60 * 1000);
    }
    return new Date();
  };

  const getUserLockedAmountForProposal = (proposalId: string): number => {
    const proposalLocks = locks.filter(lock => 
      lock.proposalId === proposalId && 
      lock.locker.toString() === userPrincipal &&
      lock.status === 'locked'
    );
    return proposalLocks.reduce((sum, lock) => sum + Number(lock.lockedAmount), 0);
  };

  const getUserLockDurationForProposal = (proposalId: string): string => {
    const proposalLocks = locks.filter(lock => 
      lock.proposalId === proposalId && 
      lock.locker.toString() === userPrincipal &&
      lock.status === 'locked'
    );
    
    if (proposalLocks.length === 0) return '';
    
    const latestLock = proposalLocks[proposalLocks.length - 1];
    const unlockTime = Number(latestLock.unlockTimestamp) / 1000000;
    const now = Date.now();
    const daysRemaining = Math.ceil((unlockTime - now) / (1000 * 60 * 60 * 24));
    
    return `${daysRemaining} days remaining`;
  };

  const getUnlockableLocksForUser = () => {
    const now = Date.now() * 1000000;
    return locks.filter(lock => 
      lock.locker.toString() === userPrincipal &&
      lock.status === 'locked' &&
      Number(lock.unlockTimestamp) <= now
    );
  };

  const unlockableLocks = getUnlockableLocksForUser();
  const totalUnlockableAmount = unlockableLocks.reduce((sum, lock) => sum + Number(lock.lockedAmount), 0);

  return (
    <div className="space-y-6 p-6">
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="border border-primary p-2">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg">Proof of Attendance Governance</CardTitle>
                  <Badge variant="outline" className="border-primary">
                    <Lock className="h-3 w-3 mr-1" />
                    Lock to Vote
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  To participate in governance, you must lock NRN tokens (minimum 100 NRN) to declare your attendance and gain voting rights. This Proof of Attendance mechanism ensures committed participation in protocol decisions. You can unlock your tokens after the lock period expires.
                </CardDescription>
                <div className="mt-3 p-3 border border-border bg-muted/30">
                  <p className="text-xs text-muted-foreground">
                    <strong>How it works:</strong> Lock a minimum of 100 NRN for 30 days at any time to demonstrate your commitment. Only participants who locked tokens can vote during the Voting Phase. After the lock period ends, you can unlock your tokens at any time using the Unlock feature below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5" data-guide="proof-of-attendance">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="border-2 border-primary p-2 bg-background">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-xl">Lock to Vote</CardTitle>
                  <Badge variant="default" className="bg-primary">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Always Available
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Lock your NRN tokens at any time to participate in governance voting. Your tokens will be locked for 30 days as proof of your commitment to the protocol.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-primary/50 bg-primary/5">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                This feature is always accessible regardless of the current DS protocol phase. Lock your tokens now to ensure you can vote when proposals enter the voting phase.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="space-y-2" data-guide="lock-input">
                <Label htmlFor="proof-of-attendance-lock" className="text-sm font-medium">
                  Lock Amount (Minimum: 100 NRN)
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <Input
                      id="proof-of-attendance-lock"
                      type="number"
                      min="100"
                      step="1"
                      placeholder="Enter amount (min. 100 NRN)"
                      value={proofOfAttendanceLockAmount}
                      onChange={(e) => handleProofOfAttendanceLockAmountChange(e.target.value)}
                      className={proofOfAttendanceLockError ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      disabled={lockForProofOfAttendance.isPending}
                    />
                    {proofOfAttendanceLockError && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {proofOfAttendanceLockError}
                      </p>
                    )}
                  </div>
                  <Button 
                    onClick={handleProofOfAttendanceLock} 
                    disabled={!proofOfAttendanceLockAmount || !!proofOfAttendanceLockError || lockForProofOfAttendance.isPending}
                    className="min-w-[140px]"
                    size="lg"
                  >
                    {lockForProofOfAttendance.isPending ? (
                      <>
                        <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Locking...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Lock NRN
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-muted/50 border border-border space-y-2">
                <p className="text-sm font-medium">Lock Requirements:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Minimum lock amount: 100 NRN</li>
                  <li>Lock period: 30 days from lock time</li>
                  <li>Proof of Attendance for voting rights</li>
                  <li>Tokens frozen during lock period</li>
                  <li>Available at any time, regardless of phase</li>
                  <li>Immediate confirmation upon successful lock</li>
                </ul>
              </div>
            </div>

            {proofOfAttendanceLockSuccess && (
              <Alert className="border-green-500 bg-green-500/10 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-400 font-medium">
                  Lock successful! Your tokens are now locked and you can vote on proposals during the voting phase.
                </AlertDescription>
              </Alert>
            )}

            {userLockedNRN > 0 && !proofOfAttendanceLockSuccess && (
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  You have locked {userLockedNRN.toLocaleString('en-US')} NRN total and declared attendance. You can vote on proposals during the voting phase.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-500/5" data-guide="unlock-tokens">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="border-2 border-blue-500 p-2 bg-background">
                <Unlock className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-xl">Unlock Tokens</CardTitle>
                  <Badge variant="outline" className="border-blue-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Always Available
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Unlock your previously locked NRN tokens after the 30-day lock period expires. This feature is always accessible and allows you to reclaim your tokens at any time after eligibility.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-500/50 bg-blue-500/5">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                This feature is always accessible regardless of the current DS protocol phase. You can unlock your tokens immediately after the 30-day lock period expires.
              </AlertDescription>
            </Alert>

            {unlockableLocks.length > 0 ? (
              <div className="space-y-3">
                <div className="p-4 bg-blue-500/10 border-2 border-blue-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Unlockable Tokens</span>
                    <Badge variant="default" className="bg-blue-500">
                      {unlockableLocks.length} Lock{unlockableLocks.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total Amount</span>
                    <span className="text-lg font-bold text-blue-500">{totalUnlockableAmount.toLocaleString('en-US')} NRN</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {unlockableLocks.map((lock) => (
                    <div key={lock.id} className="p-4 border-2 border-blue-500/50 bg-blue-500/5 flex items-center justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium">
                          {Number(lock.lockedAmount).toLocaleString('en-US')} NRN
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lock period expired - Ready to unlock
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lock ID: {lock.id.substring(0, 20)}...
                        </p>
                      </div>
                      <Button
                        onClick={() => handleUnlock(lock.id, Number(lock.lockedAmount))}
                        disabled={unlockTokens.isPending}
                        size="sm"
                        className="min-w-[120px] bg-blue-500 hover:bg-blue-600"
                      >
                        {unlockTokens.isPending ? (
                          <>
                            <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Unlocking...
                          </>
                        ) : (
                          <>
                            <Unlock className="mr-2 h-4 w-4" />
                            Unlock
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center space-y-3">
                <div className="flex justify-center">
                  <div className="p-3 border-2 border-muted rounded-full">
                    <Unlock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">No Unlockable Tokens</p>
                  <p className="text-xs text-muted-foreground">
                    You don't have any tokens that are eligible for unlocking at this time.
                  </p>
                </div>
                <div className="p-3 bg-muted/50 border border-border space-y-1">
                  <p className="text-xs font-medium">Unlock Eligibility:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc text-left">
                    <li>Tokens must be locked for 30 days</li>
                    <li>Lock period must have expired</li>
                    <li>Unlock available immediately after expiry</li>
                    <li>Check back after your lock period ends</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-500">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="border border-green-500 p-2">
                <Shield className="h-5 w-5" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg">Governor Canister Security</CardTitle>
                  <Badge variant="outline" className="border-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    NNS Controlled
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  The governor canister is controlled by the NNS root principal for security.
                </CardDescription>
                <div className="mt-3 p-3 border border-border">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground font-medium">NNS Root Principal:</span>
                    <code className="text-xs font-mono bg-muted px-2 py-1 break-all">
                      {nnsRootPrincipal}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLockedNRN.toLocaleString('en-US')} NRN</div>
            <p className="text-xs text-muted-foreground mt-1">Based on locked tokens</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked NRN</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLockedNRN.toLocaleString('en-US')}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently locked</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unlockable NRN</CardTitle>
            <Unlock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalUnlockableAmount.toLocaleString('en-US')}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to unlock</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All phases</p>
          </CardContent>
        </Card>
      </div>

      {userPenaltyStatus.isLocked && (
        <Alert className="border-2 border-red-500">
          <Ban className="h-4 w-4" />
          <AlertDescription>
            You are under penalty lockout. You cannot participate in the next {userPenaltyStatus.sequencesRemaining} cycles.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Proposals</h3>
          <p className="text-sm text-muted-foreground">Lock NRN tokens and vote on protocol decisions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-guide="create-proposal">
              <Plus className="mr-2 h-4 w-4" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Proposal</DialogTitle>
              <DialogDescription>
                Submit a new proposal. Fee: 10 NRN
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  value={newProposalTitle}
                  onChange={(e) => setNewProposalTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={newProposalDescription}
                  onChange={(e) => setNewProposalDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProposal} disabled={createProposal.isPending || !newProposalTitle || !newProposalDescription}>
                {createProposal.isPending && <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {proposalsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : proposals.length === 0 ? (
        <Card className="border-2 border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No proposals yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const phaseEndTime = getProposalPhaseEndTime(proposal);
            const proposalLocks = locks.filter(lock => lock.proposalId === proposal.id && lock.status === 'locked');
            const totalLockedNRN = proposalLocks.reduce((sum, lock) => sum + Number(lock.lockedAmount), 0);
            const userHasLocked = proposalLocks.some(lock => lock.locker.toString() === userPrincipal);
            const userLockedAmount = getUserLockedAmountForProposal(proposal.id);
            const userLockDuration = getUserLockDurationForProposal(proposal.id);
            const lockAmount = lockAmounts[proposal.id] || '';
            const lockError = lockErrors[proposal.id] || '';
            const showLockSuccess = lockSuccess[proposal.id] || false;
            
            return (
              <Card key={proposal.id} className="border-2 border-border">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                        <Badge variant={proposal.status === 'Active' ? 'default' : 'outline'}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <CardDescription>{proposal.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline">
                        <Timer className="h-3 w-3 mr-1" />
                        {getPhaseLabel(proposal.phase)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {getTimeRemaining(phaseEndTime)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Phase</span>
                      <Badge variant="outline">
                        {getPhaseLabel(proposal.phase)}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {'proposalSubmission' in proposal.phase && (
                        <p>Submission phase (10 days). Proposals can be created with 10 NRN fee.</p>
                      )}
                      {'locking' in proposal.phase && (
                        <p>Locking phase (5 days). Lock a minimum of 100 NRN for 30 days to declare attendance and gain voting rights.</p>
                      )}
                      {'voting' in proposal.phase && (
                        <p>Voting phase (10 days). Cast your vote if you locked tokens during the Locking Phase.</p>
                      )}
                    </div>
                  </div>

                  {totalLockedNRN > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Total Locked (Proof of Attendance)
                      </span>
                      <span className="font-medium">{totalLockedNRN.toLocaleString('en-US')} NRN</span>
                    </div>
                  )}

                  {userLockedAmount > 0 && (
                    <div className="p-3 border-2 border-green-500/50 bg-green-500/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Your Locked Amount
                        </span>
                        <span className="text-lg font-bold text-green-500">{userLockedAmount.toLocaleString('en-US')} NRN</span>
                      </div>
                      {userLockDuration && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Lock Duration</span>
                          <span className="font-medium">{userLockDuration}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {'voting' in proposal.phase && userHasLocked && (
                    <div className="space-y-3" data-guide="vote-buttons">
                      <div className="p-3 border border-primary/50 bg-primary/5">
                        <p className="text-sm font-medium mb-2">Cast Your Vote</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          You locked {userLockedAmount.toLocaleString('en-US')} NRN. You can now vote on this proposal.
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleVote(proposal.id, false)}
                            disabled={castVote.isPending}
                            className="min-w-[100px]"
                          >
                            {castVote.isPending ? (
                              <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ThumbsDown className="mr-2 h-4 w-4" />
                            )}
                            Against
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleVote(proposal.id, true)}
                            disabled={castVote.isPending}
                            className="min-w-[100px]"
                          >
                            {castVote.isPending ? (
                              <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ThumbsUp className="mr-2 h-4 w-4" />
                            )}
                            For
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {'voting' in proposal.phase && !userHasLocked && (
                    <Alert className="border-2 border-amber-500 bg-amber-500/10">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-amber-700 dark:text-amber-400">
                        You did not lock tokens. You cannot vote on this proposal. Use the Proof of Attendance section above to lock tokens for future proposals.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Proposal Fee</span>
                    <span className="font-medium">{Number(proposal.feePaid)} NRN</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
