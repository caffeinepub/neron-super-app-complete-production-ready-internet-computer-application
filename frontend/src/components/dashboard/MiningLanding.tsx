import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, TrendingUp, HelpCircle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetCurrentNeumannPeriod, useListPoccWorkers } from '@/hooks/useQueries';

interface MiningLandingProps {
  onStartMining: () => void;
}

export default function MiningLanding({ onStartMining }: MiningLandingProps) {
  const { data: currentPeriod } = useGetCurrentNeumannPeriod();
  const { data: workers = [] } = useListPoccWorkers();
  
  const activeWorkers = workers.filter(w => w.status === 'active').length;
  const isNp0 = currentPeriod?.id === 'NP0';

  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100">Mining Status: Active</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {isNp0 ? 'Neumann Period 0 (Creator-Exclusive)' : `${currentPeriod?.name || 'Loading...'} - Open Mining`}
              </p>
            </div>
            <Badge variant="default" className="bg-blue-600">
              {activeWorkers} Active Workers
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Overview Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">PoCC Mining Overview</CardTitle>
          <CardDescription className="text-base">
            Earn NRN rewards by contributing computational work through Proof-of-Compute-Consumption mining
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Register Workers</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Set up mining workers with dual bond options (1,000 ICP or 50 NRN)
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Submit Proofs</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete computational tasks and submit proofs to earn CWU
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Earn Rewards</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive NRN rewards based on your CWU contribution
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Key Information
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Total Supply: 17.1M NRN (100% mineable via PoCC)</li>
              <li>Current Period: {currentPeriod?.name || 'Loading...'} - {Number(currentPeriod?.nrnAllocation || 0).toLocaleString('en-US')} NRN</li>
              <li>Bond Requirement: {isNp0 ? 'No bond (creator-exclusive)' : '1,000 ICP or 50 NRN'}</li>
              <li>CWU Formula: α*cpu_cycles + β*gpu_flops + γ*memory_reads</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with PoCC mining</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onStartMining} size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Start Mining
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              View Hardware Requirements
            </Button>
            <Button variant="outline" className="justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Read Mining Manual
            </Button>
          </div>
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
              <AccordionTrigger>What is PoCC mining?</AccordionTrigger>
              <AccordionContent>
                Proof-of-Compute-Consumption (PoCC) mining is a revolutionary mining mechanism where you earn NRN rewards by contributing computational work. Unlike traditional mining, PoCC is fully on-chain and verifiable, ensuring fair distribution of the 17.1M total NRN supply.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the bond requirements?</AccordionTrigger>
              <AccordionContent>
                For general mining (Neumann Periods 1-5), you need to bond either 1,000 ICP or 50 NRN to register as a worker. Neumann Period 0 is creator-exclusive with no bond requirement. Bonds ensure commitment and can be slashed for malicious behavior.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How are rewards calculated?</AccordionTrigger>
              <AccordionContent>
                Rewards are calculated based on your Compute-Work Units (CWU) contribution relative to the total CWU in the period. The formula is: reward_worker = R_P * (CWU_worker / CWU_total_period), where R_P is the period's NRN allocation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What hardware do I need?</AccordionTrigger>
              <AccordionContent>
                Recommended: Intel i7/AMD Ryzen 7 CPU, 16GB+ RAM, SSD storage, and NVIDIA RTX 3060+ or AMD Radeon 6700XT+ GPU. Check the Hardware Requirements section for detailed specifications and laptop recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do Neumann Periods work?</AccordionTrigger>
              <AccordionContent>
                There are 6 Neumann Periods (NP0-NP5) with decreasing NRN allocations. NP0 (1.6M NRN) is creator-exclusive. NP1-5 (15.5M NRN total) are open for general mining. Each period transitions automatically when its NRN allocation is fully mined.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
