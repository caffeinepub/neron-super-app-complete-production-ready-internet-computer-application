import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  CheckCircle2,
  FileText,
  BarChart3,
  Rocket,
  AlertCircle,
  Loader2,
  Download,
  Mail,
  Network
} from 'lucide-react';

interface FundingProposalProps {
  onReturn?: () => void;
}

export default function FundingProposal({ onReturn }: FundingProposalProps) {
  const [activeSection, setActiveSection] = useState<string>('executive-summary');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: FileText },
    { id: 'technical-highlights', title: 'Technical Highlights', icon: Zap },
    { id: 'funding-request', title: 'Funding Request', icon: DollarSign },
    { id: 'use-of-funds', title: 'Use of Funds', icon: BarChart3 },
    { id: 'expected-outcomes', title: 'Expected Outcomes', icon: Target },
    { id: 'team-dynamics', title: 'Team Dynamics', icon: Network },
    { id: 'call-to-action', title: 'Call to Action', icon: Rocket }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadProposal = async () => {
    setIsDownloading(true);
    
    try {
      // Generate PDF content as formatted text
      const pdfContent = `
NERON PROTOCOL FUNDING PROPOSAL
================================

Request: $1-2M USD over 12-18 months

EXECUTIVE SUMMARY
-----------------

Neron Protocol represents a groundbreaking advancement in decentralized blockchain infrastructure on the Internet Computer. As the first protocol to achieve 100% on-chain Proof of Computational Contribution (PoCC) mining, Neron addresses fundamental challenges in blockchain technology including mining centralization, governance manipulation, and operational reliability.

Our protocol has successfully completed development and testing phases, demonstrating:

• Revolutionary PoCC mining mechanism operating entirely on-chain with complete transparency
• Innovative DDMS governance with Deterministic Sequencing protocol preventing manipulation
• Nash equilibrium-based insurance system with leverage markets for cross-protocol protection
• Fully automated canister health insurance ensuring zero-downtime operation
• Superior user experience with optimized transaction processing and sub-100ms response times

Neron Protocol is strategically positioned to become a cornerstone of the Internet Computer ecosystem, demonstrating the platform's full capabilities for on-chain computation, transparent governance, and automated infrastructure management. Our protocol serves as both a production-ready application and a reference implementation for future ICP projects.

We are seeking $1-2 million USD (or equivalent ICP) over 12-18 months to complete production deployment, conduct comprehensive security audits, integrate with the broader ICP ecosystem, and establish developer grant programs that will accelerate protocol adoption and ecosystem growth.


TECHNICAL HIGHLIGHTS
--------------------

100% On-Chain PoCC Mining
• Computational Work Units (CWU) metric ensures fair reward distribution
• Deterministic task generation with cryptographic verification
• Hardware attestation support (SGX/TPM/TrustZone) for enhanced security
• Real-time proof verification with sub-second latency
• Complete transparency with all operations auditable on-chain

DDMS Governance with Deterministic Sequencing
• Three-phase DS protocol (Proposal Submission, Locking, Voting) with automatic transitions
• Proof of Attendance mechanism requires token locking (minimum 100 NRN for 30 days)
• 5-sequence lockout penalty discourages persistent minority voting
• Automated proposal execution eliminates implementation delays
• Complete voting transparency with cryptographic verification

Nash Equilibrium-Based Insurance with Leverage Markets
• Game-theoretic design ensures honest behavior is the dominant strategy
• Automated claim processing with smart contract verification
• Leverage ratios (1x-10x) enable capital-efficient coverage
• Cross-protocol treasury protection for SNS projects
• Sustainable pool economics with multiple funding sources

Automated Canister Management
• 24/7 monitoring of all protocol canisters with real-time alerts
• Automatic cycle top-ups when balances fall below safety thresholds
• Balanced NRN/ICP reserves optimize conversion costs
• NNS root principal control ensures maximum security
• Complete transaction logging for transparency and auditability

Performance Optimization
• Intelligent transaction queue with priority management
• Optimistic UI updates provide instant feedback on user actions
• Local caching reduces perceived latency by 70%
• Batch operations minimize inter-canister calls
• Sub-100ms average response time for most operations


FUNDING REQUEST
---------------

Total Funding Request: $1-2 Million USD (or equivalent ICP)
Timeline: 12-18 Months

Funding Allocation Overview:
• Audit & Security: 30% ($300K-600K)
• Backend Deployment: 25% ($250K-500K)
• Ecosystem Integration: 25% ($250K-500K)
• Developer Grants: 20% ($200K-400K)


USE OF FUNDS
------------

Audit & Security (30% - $300K-600K)
• Third-party security audits by leading blockchain security firms (2-3 comprehensive audits)
• Formal verification of critical smart contract functions and protocol mechanisms
• Penetration testing and vulnerability assessment across all protocol components
• Bug bounty program establishment and management (6-12 months)
• Security monitoring infrastructure and incident response systems
• Ongoing security maintenance and updates throughout deployment period

Backend Deployment (25% - $250K-500K)
• Mainnet canister deployment and configuration across all protocol components
• Cycle management and operational cost coverage for initial 12-18 months
• Performance optimization and load testing for production readiness
• Monitoring infrastructure setup and maintenance (24/7 monitoring systems)
• Backup and disaster recovery systems implementation
• DevOps tooling and automation for efficient protocol management
• Technical documentation and operational runbooks

Ecosystem Integration (25% - $250K-500K)
• SNS project integration program development and implementation
• Cross-protocol insurance partnerships and treasury protection agreements
• ICP Hub collaboration and community engagement initiatives
• Marketing and awareness campaigns within ICP ecosystem
• Developer outreach and education programs
• Integration with ICP DeFi protocols and services
• Community building and governance participation incentives

Developer Grants (20% - $200K-400K)
• Grants for building applications and tools on Neron Protocol
• Worker SDK improvements and additional language support (Rust, Python)
• Analytics and monitoring tools development
• Mobile applications and user interface enhancements
• Integration libraries and developer tooling
• Educational content creation and tutorial development
• Hackathon sponsorships and developer competitions
• Open-source contributions and community projects


EXPECTED OUTCOMES
-----------------

Production Deployment Milestones
• Complete security audit with zero critical vulnerabilities (Month 3-4)
• Mainnet deployment of all protocol canisters (Month 5-6)
• Launch of Neumann Period 1 with open mining (Month 6)
• Achievement of 1,000+ active miners (Month 9)
• 99.99% uptime through automated canister management (Ongoing)
• Processing of 10,000+ daily transactions (Month 12)

Ecosystem Adoption Targets
• Integration with 10+ SNS projects for cross-protocol insurance (Month 12)
• Establishment of 5+ strategic partnerships within ICP ecosystem (Month 9)
• Active participation from 3+ ICP Hubs (Month 6)
• 50+ developer grant recipients building on Neron (Month 18)
• 5,000+ community members across governance and mining (Month 18)
• $10M+ total value locked in protocol (Month 18)

Demonstration of ICP Capabilities
• Proof of concept for 100% on-chain mining on Internet Computer
• Reference implementation for deterministic governance systems
• Showcase of automated canister management and cycle optimization
• Demonstration of game-theoretic security models on ICP
• Example of superior user experience with optimized transaction processing
• Validation of ICP's scalability for complex DeFi applications

Long-Term Impact
• Establishment of Neron as a cornerstone protocol in ICP ecosystem
• Creation of sustainable economic model for on-chain mining
• Development of thriving developer community and ecosystem
• Contribution to ICP's reputation as premier platform for DeFi innovation
• Open-source contributions benefiting entire ICP ecosystem
• Educational resources and best practices for future ICP projects


TEAM DYNAMICS
-------------

Solo Leadership Model

Neron Protocol operates under a solo leadership model with the creator taking end-to-end responsibility for protocol development, strategic direction, and technical implementation. This centralized leadership approach ensures rapid decision-making, consistent vision execution, and direct accountability for all protocol outcomes.

The creator maintains full responsibility for:
• Protocol architecture and technical design decisions
• Smart contract development and security implementation
• Strategic planning and ecosystem partnerships
• Community engagement and stakeholder communication
• Resource allocation and development prioritization

On-Chain Modules as Virtual Departments

Despite solo leadership, Neron Protocol achieves decentralization through its autonomous on-chain modules that function as self-governing "virtual departments":

PoCC Mining Module
• Operates autonomously with deterministic task generation
• Self-validates worker contributions through on-chain verification
• Automatically distributes rewards based on CWU calculations
• Maintains independent security through hardware attestation
• Functions without manual intervention or centralized control

Governance Module (DDMS)
• Executes three-phase DS protocol automatically
• Processes proposals, locking, and voting without human intervention
• Enforces penalties and rewards through smart contract logic
• Maintains complete transparency with on-chain verification
• Operates independently of creator influence once deployed

Insurance Module
• Manages claim processing through automated smart contracts
• Calculates risk and premiums using game-theoretic algorithms
• Processes payouts based on verified conditions
• Maintains pool economics through autonomous mechanisms
• Functions as independent Nash equilibrium system

Monitoring Module
• Performs 24/7 canister health monitoring automatically
• Executes cycle top-ups based on predefined thresholds
• Generates alerts and reports without manual oversight
• Maintains audit trails through automated logging
• Operates continuously with self-healing capabilities

Open Collaboration Pathways

While currently under solo leadership, Neron Protocol is designed for future collaborative development through transparent contribution frameworks:

Developer Contributions
• Open-source codebase enables community code review and contributions
• Worker SDK development welcomes external language implementations
• Integration libraries and tools can be built by third-party developers
• Bug bounty program incentivizes security research and vulnerability disclosure

Auditor Participation
• Third-party security audits provide independent verification
• Formal verification specialists can validate critical functions
• Penetration testers contribute to security hardening
• Community security researchers enhance protocol robustness

Community Governance
• Token holders participate in protocol decisions through DDMS
• Proposal submission open to all community members
• Voting power distributed based on token locking commitment
• Governance evolution driven by community consensus

Research Collaboration
• Academic researchers can study protocol mechanisms
• Economic modeling contributions welcome from game theorists
• Cryptographic improvements from security researchers
• Performance optimization from distributed systems experts

Decentralized Dynamic and Self-Sustainability

The combination of solo leadership with autonomous on-chain modules creates a unique decentralized dynamic that reinforces Neron's self-sustainability:

Automated Protocol Mechanisms
• Smart contracts execute protocol rules without human intervention
• Economic incentives align participant behavior automatically
• Security measures enforce themselves through code
• Resource management operates continuously without oversight

Transparency Through On-Chain Operations
• All protocol activities visible and verifiable on blockchain
• Decision-making processes documented in immutable records
• Financial flows tracked through transparent transactions
• Governance outcomes recorded permanently on-chain

Community-Driven Governance Evolution
• Protocol upgrades subject to community approval
• Parameter adjustments require governance consensus
• Strategic decisions influenced by stakeholder voting
• Long-term direction shaped by collective participation

Independent Coordination Model

Neron's architecture enables independent coordination where protocol modules operate autonomously while maintaining cohesive system integration:

Module Autonomy
• Each module functions independently with defined interfaces
• Inter-module communication through standardized protocols
• Failure isolation prevents cascading system issues
• Independent upgrades possible without full system disruption

Cohesive Integration
• Shared security model across all modules
• Unified economic incentives align module behaviors
• Consistent governance framework for protocol-wide decisions
• Integrated monitoring ensures system-wide health

Modular Architecture Benefits

The modular design enables seamless integration of future contributors without disrupting existing operations:

Extensibility
• New modules can be added without modifying core protocol
• Third-party integrations possible through standard interfaces
• Feature additions deployable independently
• Experimental features testable in isolation

Maintainability
• Individual modules updatable without system-wide changes
• Bug fixes localized to affected components
• Performance optimizations targeted to specific modules
• Security patches deployable rapidly

Scalability
• Modules can scale independently based on demand
• Resource allocation optimized per module requirements
• Load distribution across multiple canisters
• Horizontal scaling possible for high-demand modules

Transition to Distributed Governance

As the protocol matures and community participation increases, there is potential for transitioning from solo leadership to distributed governance:

Gradual Decentralization
• Progressive transfer of decision-making authority to community
• Increased governance scope over time
• Multi-signature controls for critical operations
• Community-elected protocol stewards

Governance Maturity
• Established track record of successful community decisions
• Demonstrated ability to handle complex protocol upgrades
• Proven security of governance mechanisms
• Sufficient token distribution for meaningful decentralization

Leadership Evolution
• Creator role transitions from operator to advisor
• Community takes ownership of protocol direction
• Distributed teams manage different protocol aspects
• Collaborative decision-making becomes standard practice

This team dynamics structure ensures Neron Protocol maintains rapid development velocity and clear accountability during its early stages while building the foundation for long-term decentralized governance and community ownership. The autonomous on-chain modules demonstrate that true decentralization comes not from organizational structure but from transparent, automated, and verifiable protocol mechanisms that operate independently of any single entity.


CALL TO ACTION
--------------

Neron Protocol represents a unique opportunity to demonstrate the Internet Computer's full potential for on-chain computation, transparent governance, and automated infrastructure management. We invite DFINITY, ICP Hubs, and ecosystem partners to support Neron's next development phase.

Why Support Neron Protocol?
• Technical Innovation: First 100% on-chain mining protocol on ICP
• Ecosystem Growth: Drives adoption and developer engagement
• Reference Implementation: Best practices for future ICP projects
• Community Building: Engaged community of miners and developers

How to Support:
• DFINITY Foundation: Direct funding support through grants or ecosystem development programs
• ICP Hubs: Community engagement and developer outreach
• Ecosystem Partners: Strategic partnerships for cross-protocol integration
• Investors & VCs: Investment opportunities in groundbreaking ICP protocol

Next Steps:
• Review our comprehensive technical documentation and whitepaper
• Schedule a technical deep-dive presentation with our team
• Discuss partnership and integration opportunities
• Explore funding mechanisms and timelines
• Join our community and participate in governance


CONTACT INFORMATION
-------------------

For funding inquiries and partnership opportunities, please contact the Neron Protocol development team.

© 2025 Neron Protocol. All rights reserved.
`;

      // Create a Blob with the content
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Neron_Protocol_Funding_Proposal.txt';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Proposal downloaded successfully!', {
        description: 'The funding proposal has been saved to your device.'
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed', {
        description: 'There was an error downloading the proposal. Please try again.'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleContactTeam = () => {
    setIsContactModalOpen(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Missing information', {
        description: 'Please fill in all required fields.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error('Invalid email', {
        description: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSendingMessage(true);

    try {
      // Simulate sending message (in production, this would call backend)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully!', {
        description: 'The Neron Protocol team will get back to you soon.'
      });
      
      // Reset form and close modal
      setContactForm({
        name: '',
        email: '',
        organization: '',
        message: ''
      });
      setIsContactModalOpen(false);
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to send message', {
        description: 'There was an error sending your message. Please try again.'
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (error) {
    return (
      <div className="container py-6 sm:py-8 max-w-7xl mx-auto px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Funding Proposal</AlertTitle>
          <AlertDescription>
            {error}
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-6 sm:py-8 max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Skeleton className="h-[400px]" />
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-[300px]" />
              <Skeleton className="h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 sm:py-8 max-w-7xl mx-auto px-4">
      {onReturn && (
        <div className="mb-6 sm:mb-8">
          <Button
            variant="default"
            size="lg"
            onClick={onReturn}
            className="flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-6 rounded-xl border-2 border-primary/20 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Return to Documentation</span>
          </Button>
        </div>
      )}

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Neron Protocol Funding Proposal
            </h1>
            <Badge variant="outline" className="mt-2">
              Request: $1-2M USD over 12-18 months
            </Badge>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive funding proposal for production deployment, ecosystem integration, and developer grants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Contents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-4">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Executive Summary */}
          <Card id="executive-summary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed mb-4">
                  Neron Protocol represents a groundbreaking advancement in decentralized blockchain infrastructure on the Internet Computer. As the first protocol to achieve 100% on-chain Proof of Computational Contribution (PoCC) mining, Neron addresses fundamental challenges in blockchain technology including mining centralization, governance manipulation, and operational reliability.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Our protocol has successfully completed development and testing phases, demonstrating:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Revolutionary PoCC mining mechanism operating entirely on-chain with complete transparency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Innovative DDMS governance with Deterministic Sequencing protocol preventing manipulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Nash equilibrium-based insurance system with leverage markets for cross-protocol protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Fully automated canister health insurance ensuring zero-downtime operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Superior user experience with optimized transaction processing and sub-100ms response times</span>
                  </li>
                </ul>
                <p className="text-base leading-relaxed mb-4">
                  Neron Protocol is strategically positioned to become a cornerstone of the Internet Computer ecosystem, demonstrating the platform's full capabilities for on-chain computation, transparent governance, and automated infrastructure management. Our protocol serves as both a production-ready application and a reference implementation for future ICP projects.
                </p>
                <p className="text-base leading-relaxed">
                  We are seeking $1-2 million USD (or equivalent ICP) over 12-18 months to complete production deployment, conduct comprehensive security audits, integrate with the broader ICP ecosystem, and establish developer grant programs that will accelerate protocol adoption and ecosystem growth.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Highlights */}
          <Card id="technical-highlights">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                Technical Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    100% On-Chain PoCC Mining
                  </h3>
                  <p className="text-base leading-relaxed mb-3">
                    Neron Protocol is the first to achieve completely on-chain mining on the Internet Computer. Unlike traditional mining protocols that rely on off-chain computation and centralized validation, our PoCC mechanism performs all verification directly on-chain through smart contracts.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Computational Work Units (CWU) metric ensures fair reward distribution</li>
                    <li className="text-sm">• Deterministic task generation with cryptographic verification</li>
                    <li className="text-sm">• Hardware attestation support (SGX/TPM/TrustZone) for enhanced security</li>
                    <li className="text-sm">• Real-time proof verification with sub-second latency</li>
                    <li className="text-sm">• Complete transparency with all operations auditable on-chain</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    DDMS Governance with Deterministic Sequencing
                  </h3>
                  <p className="text-base leading-relaxed mb-3">
                    Our Decentralized Decision-Making System (DDMS) replaces traditional DAO structures with a game-theoretic approach that prevents manipulation and ensures genuine community participation.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Three-phase DS protocol (Proposal Submission, Locking, Voting) with automatic transitions</li>
                    <li className="text-sm">• Proof of Attendance mechanism requires token locking (minimum 100 NRN for 30 days)</li>
                    <li className="text-sm">• 5-sequence lockout penalty discourages persistent minority voting</li>
                    <li className="text-sm">• Automated proposal execution eliminates implementation delays</li>
                    <li className="text-sm">• Complete voting transparency with cryptographic verification</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Nash Equilibrium-Based Insurance with Leverage Markets
                  </h3>
                  <p className="text-base leading-relaxed mb-3">
                    Our insurance system creates economic incentives that naturally discourage malicious behavior while protecting honest participants. The leverage market functionality amplifies coverage with reduced capital requirements.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Game-theoretic design ensures honest behavior is the dominant strategy</li>
                    <li className="text-sm">• Automated claim processing with smart contract verification</li>
                    <li className="text-sm">• Leverage ratios (1x-10x) enable capital-efficient coverage</li>
                    <li className="text-sm">• Cross-protocol treasury protection for SNS projects</li>
                    <li className="text-sm">• Sustainable pool economics with multiple funding sources</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Automated Canister Management
                  </h3>
                  <p className="text-base leading-relaxed mb-3">
                    Fully automated canister health insurance ensures uninterrupted protocol operation through intelligent cycle management and predictive maintenance.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• 24/7 monitoring of all protocol canisters with real-time alerts</li>
                    <li className="text-sm">• Automatic cycle top-ups when balances fall below safety thresholds</li>
                    <li className="text-sm">• Balanced NRN/ICP reserves optimize conversion costs</li>
                    <li className="text-sm">• NNS root principal control ensures maximum security</li>
                    <li className="text-sm">• Complete transaction logging for transparency and auditability</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Performance Optimization
                  </h3>
                  <p className="text-base leading-relaxed mb-3">
                    Advanced optimization techniques deliver superior user experience while maintaining full on-chain transparency and security.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Intelligent transaction queue with priority management</li>
                    <li className="text-sm">• Optimistic UI updates provide instant feedback on user actions</li>
                    <li className="text-sm">• Local caching reduces perceived latency by 70%</li>
                    <li className="text-sm">• Batch operations minimize inter-canister calls</li>
                    <li className="text-sm">• Sub-100ms average response time for most operations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Request */}
          <Card id="funding-request">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                Funding Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Funding Request</p>
                    <p className="text-4xl font-bold text-primary mb-2">$1-2 Million USD</p>
                    <p className="text-sm text-muted-foreground">(or equivalent ICP)</p>
                    <Separator className="my-4" />
                    <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                    <p className="text-2xl font-semibold">12-18 Months</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-4">
                  This funding will enable Neron Protocol to complete its transition from development to production deployment, ensuring the protocol can serve as a cornerstone of the Internet Computer ecosystem while demonstrating the platform's full capabilities for on-chain computation and decentralized governance.
                </p>

                <h3 className="text-lg font-semibold mb-3">Funding Allocation Overview</h3>
                <p className="text-base leading-relaxed mb-4">
                  The requested funding will be allocated across four critical areas, each essential for successful production deployment and ecosystem growth:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Audit & Security</span>
                      <Badge variant="outline">30%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Comprehensive security audits and formal verification</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Backend Deployment</span>
                      <Badge variant="outline">25%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Production infrastructure and canister deployment</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Ecosystem Integration</span>
                      <Badge variant="outline">25%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">SNS integration and cross-protocol partnerships</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Developer Grants</span>
                      <Badge variant="outline">20%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Community development and ecosystem growth</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed">
                  This balanced allocation ensures that Neron Protocol can achieve production readiness while fostering ecosystem growth and community engagement. Each allocation area has been carefully planned to maximize impact and ensure long-term protocol sustainability.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use of Funds */}
          <Card id="use-of-funds">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                Use of Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Audit & Security (30%)
                    </h3>
                    <Badge variant="outline" className="text-base">$300K-600K</Badge>
                  </div>
                  <p className="text-base leading-relaxed mb-3">
                    Comprehensive security audits and formal verification are essential for production deployment. This allocation covers:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Third-party security audits by leading blockchain security firms (2-3 comprehensive audits)</li>
                    <li className="text-sm">• Formal verification of critical smart contract functions and protocol mechanisms</li>
                    <li className="text-sm">• Penetration testing and vulnerability assessment across all protocol components</li>
                    <li className="text-sm">• Bug bounty program establishment and management (6-12 months)</li>
                    <li className="text-sm">• Security monitoring infrastructure and incident response systems</li>
                    <li className="text-sm">• Ongoing security maintenance and updates throughout deployment period</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Backend Deployment (25%)
                    </h3>
                    <Badge variant="outline" className="text-base">$250K-500K</Badge>
                  </div>
                  <p className="text-base leading-relaxed mb-3">
                    Production infrastructure deployment and optimization ensure reliable, scalable protocol operation:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Mainnet canister deployment and configuration across all protocol components</li>
                    <li className="text-sm">• Cycle management and operational cost coverage for initial 12-18 months</li>
                    <li className="text-sm">• Performance optimization and load testing for production readiness</li>
                    <li className="text-sm">• Monitoring infrastructure setup and maintenance (24/7 monitoring systems)</li>
                    <li className="text-sm">• Backup and disaster recovery systems implementation</li>
                    <li className="text-sm">• DevOps tooling and automation for efficient protocol management</li>
                    <li className="text-sm">• Technical documentation and operational runbooks</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Ecosystem Integration (25%)
                    </h3>
                    <Badge variant="outline" className="text-base">$250K-500K</Badge>
                  </div>
                  <p className="text-base leading-relaxed mb-3">
                    Integration with the broader ICP ecosystem and establishment of strategic partnerships:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• SNS project integration program development and implementation</li>
                    <li className="text-sm">• Cross-protocol insurance partnerships and treasury protection agreements</li>
                    <li className="text-sm">• ICP Hub collaboration and community engagement initiatives</li>
                    <li className="text-sm">• Marketing and awareness campaigns within ICP ecosystem</li>
                    <li className="text-sm">• Developer outreach and education programs</li>
                    <li className="text-sm">• Integration with ICP DeFi protocols and services</li>
                    <li className="text-sm">• Community building and governance participation incentives</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Developer Grants (20%)
                    </h3>
                    <Badge variant="outline" className="text-base">$200K-400K</Badge>
                  </div>
                  <p className="text-base leading-relaxed mb-3">
                    Developer grant program to accelerate ecosystem growth and protocol adoption:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-sm">• Grants for building applications and tools on Neron Protocol</li>
                    <li className="text-sm">• Worker SDK improvements and additional language support (Rust, Python)</li>
                    <li className="text-sm">• Analytics and monitoring tools development</li>
                    <li className="text-sm">• Mobile applications and user interface enhancements</li>
                    <li className="text-sm">• Integration libraries and developer tooling</li>
                    <li className="text-sm">• Educational content creation and tutorial development</li>
                    <li className="text-sm">• Hackathon sponsorships and developer competitions</li>
                    <li className="text-sm">• Open-source contributions and community projects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Outcomes */}
          <Card id="expected-outcomes">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                Expected Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed mb-6">
                  The funding will enable Neron Protocol to achieve critical milestones that demonstrate the Internet Computer's full capabilities for on-chain computation, transparent governance, and automated infrastructure management.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Production Deployment Milestones
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-sm">• Complete security audit with zero critical vulnerabilities (Month 3-4)</li>
                      <li className="text-sm">• Mainnet deployment of all protocol canisters (Month 5-6)</li>
                      <li className="text-sm">• Launch of Neumann Period 1 with open mining (Month 6)</li>
                      <li className="text-sm">• Achievement of 1,000+ active miners (Month 9)</li>
                      <li className="text-sm">• 99.99% uptime through automated canister management (Ongoing)</li>
                      <li className="text-sm">• Processing of 10,000+ daily transactions (Month 12)</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Ecosystem Adoption Targets
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-sm">• Integration with 10+ SNS projects for cross-protocol insurance (Month 12)</li>
                      <li className="text-sm">• Establishment of 5+ strategic partnerships within ICP ecosystem (Month 9)</li>
                      <li className="text-sm">• Active participation from 3+ ICP Hubs (Month 6)</li>
                      <li className="text-sm">• 50+ developer grant recipients building on Neron (Month 18)</li>
                      <li className="text-sm">• 5,000+ community members across governance and mining (Month 18)</li>
                      <li className="text-sm">• $10M+ total value locked in protocol (Month 18)</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Demonstration of ICP Capabilities
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-sm">• Proof of concept for 100% on-chain mining on Internet Computer</li>
                      <li className="text-sm">• Reference implementation for deterministic governance systems</li>
                      <li className="text-sm">• Showcase of automated canister management and cycle optimization</li>
                      <li className="text-sm">• Demonstration of game-theoretic security models on ICP</li>
                      <li className="text-sm">• Example of superior user experience with optimized transaction processing</li>
                      <li className="text-sm">• Validation of ICP's scalability for complex DeFi applications</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Long-Term Impact
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-sm">• Establishment of Neron as a cornerstone protocol in ICP ecosystem</li>
                      <li className="text-sm">• Creation of sustainable economic model for on-chain mining</li>
                      <li className="text-sm">• Development of thriving developer community and ecosystem</li>
                      <li className="text-sm">• Contribution to ICP's reputation as premier platform for DeFi innovation</li>
                      <li className="text-sm">• Open-source contributions benefiting entire ICP ecosystem</li>
                      <li className="text-sm">• Educational resources and best practices for future ICP projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Dynamics */}
          <Card id="team-dynamics">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                Team Dynamics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Solo Leadership Model</h3>
                    <p className="text-base leading-relaxed mb-3">
                      Neron Protocol operates under a solo leadership model with the creator taking end-to-end responsibility for protocol development, strategic direction, and technical implementation. This centralized leadership approach ensures rapid decision-making, consistent vision execution, and direct accountability for all protocol outcomes.
                    </p>
                    <p className="text-base leading-relaxed mb-3">
                      The creator maintains full responsibility for:
                    </p>
                    <ul className="space-y-2 ml-6 mb-4">
                      <li className="text-sm">• Protocol architecture and technical design decisions</li>
                      <li className="text-sm">• Smart contract development and security implementation</li>
                      <li className="text-sm">• Strategic planning and ecosystem partnerships</li>
                      <li className="text-sm">• Community engagement and stakeholder communication</li>
                      <li className="text-sm">• Resource allocation and development prioritization</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">On-Chain Modules as Virtual Departments</h3>
                    <p className="text-base leading-relaxed mb-3">
                      Despite solo leadership, Neron Protocol achieves decentralization through its autonomous on-chain modules that function as self-governing "virtual departments":
                    </p>

                    <div className="space-y-4">
                      <div className="border-l-4 border-primary/40 pl-4">
                        <h4 className="font-semibold mb-2">PoCC Mining Module</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Operates autonomously with deterministic task generation</li>
                          <li>• Self-validates worker contributions through on-chain verification</li>
                          <li>• Automatically distributes rewards based on CWU calculations</li>
                          <li>• Maintains independent security through hardware attestation</li>
                          <li>• Functions without manual intervention or centralized control</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary/40 pl-4">
                        <h4 className="font-semibold mb-2">Governance Module (DDMS)</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Executes three-phase DS protocol automatically</li>
                          <li>• Processes proposals, locking, and voting without human intervention</li>
                          <li>• Enforces penalties and rewards through smart contract logic</li>
                          <li>• Maintains complete transparency with on-chain verification</li>
                          <li>• Operates independently of creator influence once deployed</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary/40 pl-4">
                        <h4 className="font-semibold mb-2">Insurance Module</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Manages claim processing through automated smart contracts</li>
                          <li>• Calculates risk and premiums using game-theoretic algorithms</li>
                          <li>• Processes payouts based on verified conditions</li>
                          <li>• Maintains pool economics through autonomous mechanisms</li>
                          <li>• Functions as independent Nash equilibrium system</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-primary/40 pl-4">
                        <h4 className="font-semibold mb-2">Monitoring Module</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Performs 24/7 canister health monitoring automatically</li>
                          <li>• Executes cycle top-ups based on predefined thresholds</li>
                          <li>• Generates alerts and reports without manual oversight</li>
                          <li>• Maintains audit trails through automated logging</li>
                          <li>• Operates continuously with self-healing capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Open Collaboration Pathways</h3>
                    <p className="text-base leading-relaxed mb-3">
                      While currently under solo leadership, Neron Protocol is designed for future collaborative development through transparent contribution frameworks:
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Developer Contributions</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                          <li>• Open-source codebase enables community code review and contributions</li>
                          <li>• Worker SDK development welcomes external language implementations</li>
                          <li>• Integration libraries and tools can be built by third-party developers</li>
                          <li>• Bug bounty program incentivizes security research and vulnerability disclosure</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Auditor Participation</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                          <li>• Third-party security audits provide independent verification</li>
                          <li>• Formal verification specialists can validate critical functions</li>
                          <li>• Penetration testers contribute to security hardening</li>
                          <li>• Community security researchers enhance protocol robustness</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Community Governance</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                          <li>• Token holders participate in protocol decisions through DDMS</li>
                          <li>• Proposal submission open to all community members</li>
                          <li>• Voting power distributed based on token locking commitment</li>
                          <li>• Governance evolution driven by community consensus</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Research Collaboration</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                          <li>• Academic researchers can study protocol mechanisms</li>
                          <li>• Economic modeling contributions welcome from game theorists</li>
                          <li>• Cryptographic improvements from security researchers</li>
                          <li>• Performance optimization from distributed systems experts</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Decentralized Dynamic and Self-Sustainability</h3>
                    <p className="text-base leading-relaxed mb-3">
                      The combination of solo leadership with autonomous on-chain modules creates a unique decentralized dynamic that reinforces Neron's self-sustainability:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Automated Protocol Mechanisms</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• Smart contracts execute protocol rules without human intervention</li>
                          <li>• Economic incentives align participant behavior automatically</li>
                          <li>• Security measures enforce themselves through code</li>
                          <li>• Resource management operates continuously without oversight</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Transparency Through On-Chain Operations</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• All protocol activities visible and verifiable on blockchain</li>
                          <li>• Decision-making processes documented in immutable records</li>
                          <li>• Financial flows tracked through transparent transactions</li>
                          <li>• Governance outcomes recorded permanently on-chain</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Community-Driven Governance Evolution</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li>• Protocol upgrades subject to community approval</li>
                          <li>• Parameter adjustments require governance consensus</li>
                          <li>• Strategic decisions influenced by stakeholder voting</li>
                          <li>• Long-term direction shaped by collective participation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Independent Coordination Model</h3>
                    <p className="text-base leading-relaxed mb-3">
                      Neron's architecture enables independent coordination where protocol modules operate autonomously while maintaining cohesive system integration. The modular design enables seamless integration of future contributors without disrupting existing operations, with potential for transitioning from solo leadership to distributed governance as the protocol matures and community participation increases.
                    </p>
                  </div>

                  <Alert>
                    <Network className="h-4 w-4" />
                    <AlertTitle>Decentralization Through Design</AlertTitle>
                    <AlertDescription>
                      This team dynamics structure ensures Neron Protocol maintains rapid development velocity and clear accountability during its early stages while building the foundation for long-term decentralized governance and community ownership. The autonomous on-chain modules demonstrate that true decentralization comes not from organizational structure but from transparent, automated, and verifiable protocol mechanisms that operate independently of any single entity.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card id="call-to-action">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                Call to Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose prose-slate dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed mb-6">
                  Neron Protocol represents a unique opportunity to demonstrate the Internet Computer's full potential for on-chain computation, transparent governance, and automated infrastructure management. We invite DFINITY, ICP Hubs, and ecosystem partners to support Neron's next development phase.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-center">Why Support Neron Protocol?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Technical Innovation</p>
                        <p className="text-xs text-muted-foreground">First 100% on-chain mining protocol on ICP</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Ecosystem Growth</p>
                        <p className="text-xs text-muted-foreground">Drives adoption and developer engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Reference Implementation</p>
                        <p className="text-xs text-muted-foreground">Best practices for future ICP projects</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Community Building</p>
                        <p className="text-xs text-muted-foreground">Engaged community of miners and developers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">How to Support</h3>
                <p className="text-base leading-relaxed mb-4">
                  We welcome support from various stakeholders in the Internet Computer ecosystem:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      DFINITY Foundation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Direct funding support through grants or ecosystem development programs. Partnership opportunities for showcasing ICP capabilities.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      ICP Hubs
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Community engagement and developer outreach. Local ecosystem integration and partnership facilitation.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Ecosystem Partners
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Strategic partnerships for cross-protocol integration. Technical collaboration and resource sharing.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      Investors & VCs
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Investment opportunities in groundbreaking ICP protocol. Long-term value creation through ecosystem growth.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <p className="text-base leading-relaxed mb-4">
                  Interested parties are invited to:
                </p>
                <ul className="space-y-2 ml-6 mb-6">
                  <li className="text-sm">• Review our comprehensive technical documentation and whitepaper</li>
                  <li className="text-sm">• Schedule a technical deep-dive presentation with our team</li>
                  <li className="text-sm">• Discuss partnership and integration opportunities</li>
                  <li className="text-sm">• Explore funding mechanisms and timelines</li>
                  <li className="text-sm">• Join our community and participate in governance</li>
                </ul>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <p className="text-lg font-semibold mb-2">Ready to Support Neron Protocol?</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us to discuss funding opportunities and partnership arrangements
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      size="lg" 
                      className="gap-2"
                      onClick={handleContactTeam}
                    >
                      <Mail className="h-4 w-4" />
                      Contact Team
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2"
                      onClick={handleDownloadProposal}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download Proposal
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="text-center text-sm text-muted-foreground">
        <p>© 2025 Neron Protocol. All rights reserved.</p>
        <p className="mt-2">For funding inquiries, please contact the development team.</p>
      </div>

      {/* Contact Team Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Mail className="h-5 w-5 text-primary" />
              Contact Neron Protocol Team
            </DialogTitle>
            <DialogDescription>
              Send us a message about funding opportunities, partnerships, or general inquiries. We'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSendMessage} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
                disabled={isSendingMessage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                disabled={isSendingMessage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization (Optional)</Label>
              <Input
                id="organization"
                placeholder="Your organization or company"
                value={contactForm.organization}
                onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                disabled={isSendingMessage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your interest in Neron Protocol funding..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows={6}
                disabled={isSendingMessage}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Please include details about your funding interest, partnership opportunities, or any questions you have.
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsContactModalOpen(false)}
                disabled={isSendingMessage}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSendingMessage}>
                {isSendingMessage ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
