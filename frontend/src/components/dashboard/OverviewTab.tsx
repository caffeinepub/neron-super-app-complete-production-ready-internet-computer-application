import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CaffeineAiReviewCard from '../CaffeineAiReviewCard';
import { 
  useGetCurrentNeumannPeriod,
  useListPoccWorkers,
  useListPoccRewards,
  useGetWalletBalances
} from '../../hooks/useQueries';
import { 
  TrendingUp, 
  FileText,
  Cpu,
  Wallet
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateToDocumentation: () => void;
}

export default function OverviewTab({ onNavigateToDocumentation }: OverviewTabProps) {
  const { data: currentPeriod } = useGetCurrentNeumannPeriod();
  const { data: workers = [] } = useListPoccWorkers();
  const { data: rewards = [] } = useListPoccRewards();
  const { data: balances } = useGetWalletBalances();

  const totalRewards = rewards.reduce((sum, reward) => sum + Number(reward.nrnReward), 0);
  const activeWorkers = workers.filter(w => w.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <CaffeineAiReviewCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Mineable Supply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17,100,000 NRN</div>
            <Badge variant="secondary" className="mt-2">100% Mineable</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentPeriod ? currentPeriod.name : 'Loading...'}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {currentPeriod ? `${Number(currentPeriod.nrnAllocation).toLocaleString()} NRN` : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkers}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Mining participants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balances?.nrn.toLocaleString() || 0} NRN</div>
            <p className="text-xs text-muted-foreground mt-2">
              {balances?.icp.toLocaleString() || 0} ICP
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              PoCC Mining Status
            </CardTitle>
            <CardDescription>
              Current Neumann Period and mining progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentPeriod ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Period</span>
                    <span className="font-medium">{currentPeriod.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Allocation</span>
                    <span className="font-medium">{Number(currentPeriod.nrnAllocation).toLocaleString()} NRN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline">{currentPeriod.status}</Badge>
                  </div>
                </div>
                <Progress value={35} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Mining progress toward next period transition
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Loading period information...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Overview
            </CardTitle>
            <CardDescription>
              Your ICP and NRN balances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NRN Balance</span>
                <span className="font-medium">{balances?.nrn.toLocaleString() || 0} NRN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ICP Balance</span>
                <span className="font-medium">{balances?.icp.toLocaleString() || 0} ICP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Rewards</span>
                <span className="font-medium">{totalRewards.toLocaleString()} NRN</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              All mined NRN is automatically credited to your wallet
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation Portal
          </CardTitle>
          <CardDescription>
            Comprehensive protocol documentation including whitepaper, funding proposal, roadmap, and security appendix
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Access detailed documentation covering all aspects of the Neron Protocol including PoCC mining, 
            DDMS governance, Nash equilibrium insurance, automated canister management, and technical achievements. 
            Review the funding proposal for production deployment and ecosystem integration plans.
          </p>
          <Button onClick={onNavigateToDocumentation} variant="outline" className="w-full sm:w-auto">
            <FileText className="h-4 w-4 mr-2" />
            View Documentation Portal
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest governance locks and mining rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewards.slice(0, 5).map((reward) => (
              <div key={reward.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mining Reward</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Number(reward.timestamp) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+{Number(reward.nrnReward).toLocaleString()} NRN</p>
                  <Badge variant="outline" className="text-xs">{reward.status}</Badge>
                </div>
              </div>
            ))}
            {rewards.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vesting Schedule</CardTitle>
          <CardDescription>Token vesting from general mining pool</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Vested</span>
              <span className="text-sm font-medium">0 NRN</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Available to Claim</span>
              <span className="text-sm font-medium">0 NRN</span>
            </div>
            <Progress value={0} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Vesting schedules from the 15,500,000 NRN general mining pool
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
