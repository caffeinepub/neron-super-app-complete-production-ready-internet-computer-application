import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, Lock, Shield, HelpCircle, ArrowRight, CheckCircle2, Info, Unlock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useListDsProposals, useListDsLocks } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface GovernanceLandingProps {
  onStartGovernance: () => void;
}

export default function GovernanceLanding({ onStartGovernance }: GovernanceLandingProps) {
  const { identity } = useInternetIdentity();
  const { data: proposals = [] } = useListDsProposals();
  const { data: locks = [] } = useListDsLocks();
  
  const userPrincipal = identity?.getPrincipal().toString();
  const userLocks = locks.filter(lock => lock.locker.toString() === userPrincipal);
  const userLockedNRN = userLocks.reduce((sum, lock) => sum + Number(lock.lockedAmount), 0);
  const votingEligible = userLockedNRN >= 100;

  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <Alert className="border-2 border-primary bg-primary/10">
        <Vote className="h-4 w-4 text-primary" />
        <AlertDescription>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold">Governance Status: {votingEligible ? 'Eligible to Vote' : 'Not Eligible'}</p>
              <p className="text-sm text-muted-foreground">
                {votingEligible ? `You have locked ${userLockedNRN.toLocaleString('en-US')} NRN` : 'Lock 100+ NRN to participate'}
              </p>
            </div>
            <Badge variant={votingEligible ? "default" : "secondary"}>
              {proposals.length} Active Proposals
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Overview Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Governance Overview</CardTitle>
          <CardDescription className="text-base">
            Participate in protocol governance through the Deterministic Sequence (DS) protocol with Proof of Attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Lock NRN</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Lock minimum 100 NRN for 30 days to declare attendance and gain voting rights
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Vote on Proposals</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cast your vote during the voting phase to shape protocol decisions
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Unlock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Unlock Tokens</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Reclaim your locked NRN after the 30-day lock period expires
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              DS Protocol Phases
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Proposal Submission (10 days): Create proposals with 10 NRN fee</li>
              <li>Locking Phase (5 days): Lock NRN to declare attendance</li>
              <li>Voting Phase (10 days): Cast votes on active proposals</li>
              <li>Automatic execution of approved proposals</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Participate in governance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onStartGovernance} size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              View Proposals & Vote
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Lock NRN for Voting
            </Button>
            <Button variant="outline" className="justify-start">
              <Unlock className="mr-2 h-4 w-4" />
              Unlock My Tokens
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-2 border-green-500/50 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <CardTitle>NNS Root Control</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            The governance system is controlled by the NNS root principal (rdmx6-jaaaa-aaaaa-aaadq-cai) for enhanced security and protocol compliance.
          </p>
          <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Proof of Attendance?</AccordionTrigger>
              <AccordionContent>
                Proof of Attendance is a governance mechanism where you lock NRN tokens (minimum 100 NRN) for 30 days to demonstrate your commitment to the protocol. This lock grants you voting rights and ensures thoughtful participation in governance decisions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the DS protocol work?</AccordionTrigger>
              <AccordionContent>
                The Deterministic Sequence (DS) protocol has three automatic phases: Proposal Submission (10 days), Locking (5 days), and Voting (10 days). Each phase transitions automatically, ensuring fair and transparent governance with time-bound decision-making.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>When can I unlock my tokens?</AccordionTrigger>
              <AccordionContent>
                You can unlock your NRN tokens after the 30-day lock period expires. The unlock feature is always accessible, and you can reclaim your tokens immediately once the lock period ends. Check the Unlock section to see which tokens are eligible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What are minority penalties?</AccordionTrigger>
              <AccordionContent>
                If you consistently vote with the losing minority, you may receive a 5-sequence lockout penalty. This encourages thoughtful voting and prevents manipulation. However, 50/50 vote splits result in no penalties (invalidation neutrality).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How is voting power calculated?</AccordionTrigger>
              <AccordionContent>
                Your voting power is based on the amount of NRN you have locked. More locked tokens = more voting power. All voting power is calculated against the 17.1M total NRN supply, ensuring fair representation across all participants.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
