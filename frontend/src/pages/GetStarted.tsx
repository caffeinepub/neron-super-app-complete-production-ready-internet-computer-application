import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Cpu, 
  Vote, 
  Shield, 
  Wallet,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  HelpCircle,
  FileText,
  Home as HomeIcon,
  Lock,
  Unlock,
  Server,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import type { Page } from '@/App';
import HardwareRequirements from '@/components/HardwareRequirements';
import MiningManual from '@/components/MiningManual';

interface GetStartedProps {
  onNavigate: (page: Page) => void;
}

export default function GetStarted({ onNavigate }: GetStartedProps) {
  const [activeChapter, setActiveChapter] = useState('introduction');

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-2">
            Get Started with Neron Protocol
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl">
            Your comprehensive guide to participating in PoCC mining, governance, and insurance
          </p>
        </div>

        {/* Chapter Navigation */}
        <Tabs value={activeChapter} onValueChange={setActiveChapter} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="introduction" className="flex items-center gap-2 py-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Introduction</span>
              <span className="sm:hidden">Intro</span>
            </TabsTrigger>
            <TabsTrigger value="mining" className="flex items-center gap-2 py-2">
              <Cpu className="h-4 w-4" />
              <span className="hidden sm:inline">Mining Setup</span>
              <span className="sm:hidden">Mining</span>
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2 py-2">
              <Vote className="h-4 w-4" />
              <span className="hidden sm:inline">Governance</span>
              <span className="sm:hidden">Gov</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2 py-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Insurance</span>
              <span className="sm:hidden">Ins</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2 py-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Wallet Config</span>
              <span className="sm:hidden">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-2">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Security Tips</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Chapter 1: Introduction */}
          <TabsContent value="introduction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6" />
                  Introduction to Neron Protocol
                </CardTitle>
                <CardDescription>
                  Understanding the core mission and key innovations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What is Neron Protocol?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Neron Protocol is a comprehensive decentralized platform featuring Proof-of-Compute-Consumption (PoCC) mining, 
                    governance participation through NRN locking, and insurance mechanisms with leverage markets. Built entirely 
                    on the Internet Computer, Neron represents a leading innovation in fully on-chain DeFi.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Innovations</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                      <Cpu className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">PoCC Mining</h4>
                        <p className="text-sm text-muted-foreground">
                          Revolutionary Proof-of-Compute-Consumption mining system with 100% on-chain validation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                      <Vote className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">DDMS Governance</h4>
                        <p className="text-sm text-muted-foreground">
                          Decentralized Decision Making System with Deterministic Sequence protocol
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                      <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Nash Insurance</h4>
                        <p className="text-sm text-muted-foreground">
                          Insurance system with leverage markets designed as Nash equilibrium game
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                      <Server className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Full Auditability</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete transparency with comprehensive monitoring and audit systems
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Why Neron Protocol?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">100% mineable supply - all 17,100,000 NRN tokens earned through PoCC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">No pre-allocation - fair distribution through computational work</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">Fully on-chain - complete transparency and auditability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">Deflationary design - fixed supply with sustainable value creation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">Cross-protocol insurance - protecting both NRN and SNS project treasuries</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => setActiveChapter('mining')} className="flex items-center gap-2">
                    Next: Mining Setup
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => onNavigate('whitepaper')} variant="outline">
                    Read Full Whitepaper
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chapter 2: Mining Setup */}
          <TabsContent value="mining" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Cpu className="h-6 w-6" />
                  Mining Setup Guide
                </CardTitle>
                <CardDescription>
                  Complete guide to setting up and participating in PoCC mining
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="overview">
                    <AccordionTrigger className="text-lg font-semibold">
                      Mining Overview
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        PoCC mining is the exclusive method for earning NRN tokens. The system uses a Compute-Work Unit (CWU) 
                        model to measure computational contributions and distribute rewards fairly across six Neumann Periods.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">CWU Formula:</h4>
                        <code className="block p-3 bg-muted rounded-md text-sm">
                          CWU = α*cpu_cycles + β*gpu_flops + γ*memory_reads
                        </code>
                        <p className="text-sm text-muted-foreground">
                          Default coefficients: α=1e-9, β=1e-12, γ=1e-10
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hardware">
                    <AccordionTrigger className="text-lg font-semibold">
                      Hardware Requirements
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <HardwareRequirements variant="compact" />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="registration">
                    <AccordionTrigger className="text-lg font-semibold">
                      Worker Registration
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Register workers with dual bond options to start mining:
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Option 1: ICP Bond</h4>
                          <p className="text-2xl font-bold text-primary mb-2">1,000 ICP</p>
                          <p className="text-sm text-muted-foreground">
                            Standard bond requirement for general mining periods (1-5)
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Option 2: NRN Bond</h4>
                          <p className="text-2xl font-bold text-primary mb-2">50 NRN</p>
                          <p className="text-sm text-muted-foreground">
                            Alternative bond using earned NRN tokens
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <h4 className="font-semibold">Registration Steps:</h4>
                        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                          <li>Ensure hardware meets minimum requirements</li>
                          <li>Select bond type (1,000 ICP or 50 NRN)</li>
                          <li>Submit worker registration through Mining interface</li>
                          <li>Wait for on-chain verification</li>
                          <li>Begin submitting computational proofs</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mining-process">
                    <AccordionTrigger className="text-lg font-semibold">
                      Mining Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Fetch Tasks</h4>
                            <p className="text-sm text-muted-foreground">
                              Retrieve deterministic computational puzzles from the protocol
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Execute Computation</h4>
                            <p className="text-sm text-muted-foreground">
                              Perform CPU-bound computations, memory access patterns, and zkSNARK-friendly tasks
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Submit Proofs</h4>
                            <p className="text-sm text-muted-foreground">
                              Submit computational proofs for on-chain verification
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            4
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Earn Rewards</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive NRN rewards based on your CWU share: reward = R_P * (CWU_worker / CWU_total_period)
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manual">
                    <AccordionTrigger className="text-lg font-semibold">
                      Complete Mining Manual
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <MiningManual variant="compact" />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                    Start Mining Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveChapter('governance')} variant="outline" className="flex items-center gap-2">
                    Next: Governance
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chapter 3: Governance Participation */}
          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Vote className="h-6 w-6" />
                  Governance Participation
                </CardTitle>
                <CardDescription>
                  Learn how to participate in protocol governance through NRN locking and voting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ds-protocol">
                    <AccordionTrigger className="text-lg font-semibold">
                      DS Protocol Overview
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        The Deterministic Sequence (DS) protocol implements a three-phase governance system with automatic 
                        transitions and time-bound phases for transparent, fair decision-making.
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Phase 1: Proposal Submission (10 days)</h4>
                          <p className="text-sm text-muted-foreground">
                            Submit proposals with 10 NRN fee (20% to treasury, 80% locked and refunded/transferred based on outcome)
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Phase 2: Locking Phase (5 days)</h4>
                          <p className="text-sm text-muted-foreground">
                            Lock NRN tokens (minimum 100 NRN) for 30-day period to declare attendance and gain voting eligibility
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Phase 3: Voting Phase (10 days)</h4>
                          <p className="text-sm text-muted-foreground">
                            Cast votes on active proposals - only participants who locked NRN can vote
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="locking">
                    <AccordionTrigger className="text-lg font-semibold">
                      NRN Locking Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="p-4 rounded-lg border bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold">Proof of Attendance</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Lock NRN tokens to declare your attendance and gain voting rights. The minimum lock amount is 100 NRN, 
                          and tokens are frozen for 30 days.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Locking Steps:</h4>
                        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                          <li>Navigate to Governance section</li>
                          <li>Select "Lock to Vote" option</li>
                          <li>Enter lock amount (minimum 100 NRN)</li>
                          <li>Confirm 30-day lock period</li>
                          <li>Submit transaction and wait for confirmation</li>
                        </ol>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
                        <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Locked tokens cannot be transferred or used until the 30-day period expires. Plan accordingly.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="unlocking">
                    <AccordionTrigger className="text-lg font-semibold">
                      NRN Unlocking Process
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="p-4 rounded-lg border bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Unlock className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold">Unlock Your Tokens</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          After the 30-day lock period expires, you can unlock your NRN tokens and regain full control.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Unlocking Steps:</h4>
                        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                          <li>Wait for 30-day lock period to expire</li>
                          <li>Navigate to Governance section</li>
                          <li>Click "Unlock NRN" button</li>
                          <li>Review unlock eligibility status</li>
                          <li>Confirm unlock transaction</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="voting">
                    <AccordionTrigger className="text-lg font-semibold">
                      Voting Mechanisms
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Only participants who locked NRN during the Locking Phase can vote. Each address gets one vote, 
                        and votes are encrypted until results are published on-chain.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Weighted Voting Power</h4>
                            <p className="text-sm text-muted-foreground">
                              Voting power calculated based on locked NRN amount against 17.1M total supply
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">One Vote Per Identity</h4>
                            <p className="text-sm text-muted-foreground">
                              Sybil resistance through identity hashes and clustering algorithms
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Penalty System</h4>
                            <p className="text-sm text-muted-foreground">
                              5-sequence lockout for minority voters, no penalty on 50/50 splits
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                    View Governance
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveChapter('insurance')} variant="outline" className="flex items-center gap-2">
                    Next: Insurance
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chapter 4: Insurance Mechanics */}
          <TabsContent value="insurance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="h-6 w-6" />
                  Insurance Mechanics
                </CardTitle>
                <CardDescription>
                  Understanding the insurance system with leverage markets and Nash equilibrium design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="overview">
                    <AccordionTrigger className="text-lg font-semibold">
                      Insurance System Overview
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        The insurance system provides comprehensive protection for both the NRN treasury and participating 
                        SNS projects through cross-protocol insurance coverage with leverage market functionality.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Coverage Options</h4>
                          <p className="text-sm text-muted-foreground">
                            Multiple coverage tiers with flexible premium structures
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Leverage Markets</h4>
                          <p className="text-sm text-muted-foreground">
                            Amplify protection with reduced capital through leverage ratios
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">SNS Integration</h4>
                          <p className="text-sm text-muted-foreground">
                            Cross-protocol treasury protection for participating SNS projects
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Nash Equilibrium</h4>
                          <p className="text-sm text-muted-foreground">
                            Game theory design ensuring optimal economic incentive alignment
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="leverage">
                    <AccordionTrigger className="text-lg font-semibold">
                      Leverage Market Functionality
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Users can provide or purchase leveraged insurance coverage to amplify protection with reduced capital requirements.
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Provide Leveraged Coverage</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Deposit collateral and set leverage ratios to provide amplified insurance coverage
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Dynamic leverage ratio adjustment</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Real-time collateral calculations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Risk assessment and monitoring</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Purchase Leveraged Coverage</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Amplify protection with reduced capital requirements through leverage
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Flexible leverage ratios</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Market condition monitoring</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                              <span>Position management tools</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="claims">
                    <AccordionTrigger className="text-lg font-semibold">
                      Claim Processing
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Submit Claim</h4>
                            <p className="text-sm text-muted-foreground">
                              Provide detailed claim information and supporting documentation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Multi-Stage Verification</h4>
                            <p className="text-sm text-muted-foreground">
                              Claims undergo thorough verification with leverage impact assessment
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Approval & Payout</h4>
                            <p className="text-sm text-muted-foreground">
                              Approved claims receive leverage-adjusted payouts automatically
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sns">
                    <AccordionTrigger className="text-lg font-semibold">
                      SNS Project Integration
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        All SNS projects are invited to mine NRN tokens through PoCC and participate in mutual insurance 
                        coverage protecting both the NRN treasury and their own project treasuries.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Integration Benefits:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Cross-protocol treasury protection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Access to leverage market functionality</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Mutual insurance coverage benefits</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Participation in PoCC mining ecosystem</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                    View Insurance
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveChapter('wallet')} variant="outline" className="flex items-center gap-2">
                    Next: Wallet Config
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chapter 5: Wallet Configuration */}
          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Wallet className="h-6 w-6" />
                  Wallet Configuration
                </CardTitle>
                <CardDescription>
                  Complete guide to managing your ICP and NRN tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="setup">
                    <AccordionTrigger className="text-lg font-semibold">
                      Wallet Setup
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Your wallet is automatically created when you log in with Internet Identity. No additional setup required.
                      </p>
                      <div className="p-4 rounded-lg border bg-primary/5">
                        <h4 className="font-semibold mb-2">Automatic Features:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Instant wallet creation on first login</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Standard ICP address format</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Multi-token support (ICP, NRN)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Automatic mining reward crediting</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="balances">
                    <AccordionTrigger className="text-lg font-semibold">
                      Viewing Balances
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        View real-time balances for both ICP and NRN tokens with automatic updates.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">ICP Balance</h4>
                          <p className="text-sm text-muted-foreground">
                            View your ICP holdings used for transactions and mining bonds
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">NRN Balance</h4>
                          <p className="text-sm text-muted-foreground">
                            Track earned NRN from mining and governance participation
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sending">
                    <AccordionTrigger className="text-lg font-semibold">
                      Sending Tokens
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Enter Recipient Address</h4>
                            <p className="text-sm text-muted-foreground">
                              Input standard ICP address format with validation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Specify Amount</h4>
                            <p className="text-sm text-muted-foreground">
                              Enter token amount with automatic balance validation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Review & Confirm</h4>
                            <p className="text-sm text-muted-foreground">
                              Check transaction details including fees before confirming
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="receiving">
                    <AccordionTrigger className="text-lg font-semibold">
                      Receiving Tokens
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Share your wallet address to receive ICP and NRN tokens from other users.
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Address Display</h4>
                          <p className="text-sm text-muted-foreground">
                            View your wallet address in standard ICP format with copy-to-clipboard functionality
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">QR Code Generation</h4>
                          <p className="text-sm text-muted-foreground">
                            Generate QR codes for easy address sharing and mobile scanning
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Automatic Crediting</h4>
                          <p className="text-sm text-muted-foreground">
                            Mined NRN rewards are automatically credited to your wallet balance
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="history">
                    <AccordionTrigger className="text-lg font-semibold">
                      Transaction History
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Track all ICP and NRN transactions with complete history including timestamps, amounts, and transaction types.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">History Features:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Complete transaction records</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Timestamps and transaction types</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Mining reward tracking</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>Export functionality</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => onNavigate('wallet')} className="flex items-center gap-2">
                    Open Wallet
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveChapter('security')} variant="outline" className="flex items-center gap-2">
                    Next: Security Tips
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chapter 6: Security Tips */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <AlertCircle className="h-6 w-6" />
                  Security Tips
                </CardTitle>
                <CardDescription>
                  Best practices for safe participation in the protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="authentication">
                    <AccordionTrigger className="text-lg font-semibold">
                      Authentication Best Practices
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Use Internet Identity</h4>
                            <p className="text-sm text-muted-foreground">
                              Leverage Internet Identity's secure authentication for protocol access
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Manage Active Sessions</h4>
                            <p className="text-sm text-muted-foreground">
                              Regularly review and terminate unused authentication sessions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Secure Your Devices</h4>
                            <p className="text-sm text-muted-foreground">
                              Keep devices used for protocol access secure and up-to-date
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy">
                    <AccordionTrigger className="text-lg font-semibold">
                      Privacy Protection
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Use Anonymous Display Names</h4>
                            <p className="text-sm text-muted-foreground">
                              Maintain anonymity by using non-identifying display names
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Keep Principal Private</h4>
                            <p className="text-sm text-muted-foreground">
                              Avoid sharing your Internet Identity principal publicly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">Review Privacy Settings</h4>
                            <p className="text-sm text-muted-foreground">
                              Regularly check and update your privacy preferences
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hardware">
                    <AccordionTrigger className="text-lg font-semibold">
                      Hardware Attestation
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Hardware attestation ensures worker verification and prevents malicious mining activities.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Attestation Requirements:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Verified hardware specifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Spot-challenge system for ongoing validation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span>Slashing mechanisms for non-compliance</span>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="monitoring">
                    <AccordionTrigger className="text-lg font-semibold">
                      Security Monitoring
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        The protocol includes comprehensive security monitoring and audit systems.
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Audit Trails</h4>
                          <p className="text-sm text-muted-foreground">
                            All protocol activities are logged with immutable audit trails
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Threat Detection</h4>
                          <p className="text-sm text-muted-foreground">
                            Real-time monitoring for suspicious activities and security incidents
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <h4 className="font-semibold mb-2">Access Control</h4>
                          <p className="text-sm text-muted-foreground">
                            Role-based access control with proper permission management
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reporting">
                    <AccordionTrigger className="text-lg font-semibold">
                      Security Reporting
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        If you discover security vulnerabilities or suspicious activities, report them immediately.
                      </p>
                      <div className="p-4 rounded-lg border bg-destructive/10">
                        <h4 className="font-semibold mb-2 text-destructive">Report Security Issues</h4>
                        <p className="text-sm text-muted-foreground">
                          Contact the protocol administrators through the Security section to report any security concerns.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                    View Security Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveChapter('introduction')} variant="outline">
                    Back to Introduction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Navigation Footer */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={() => onNavigate('whitepaper')} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Read the Whitepaper
              </Button>
              <Button onClick={() => onNavigate('documentation')} variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
              <Button onClick={() => onNavigate('home')} variant="outline" className="w-full justify-start">
                <HomeIcon className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
              <Button onClick={() => onNavigate('wallet')} variant="outline" className="w-full justify-start">
                <Wallet className="h-4 w-4 mr-2" />
                Open Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
