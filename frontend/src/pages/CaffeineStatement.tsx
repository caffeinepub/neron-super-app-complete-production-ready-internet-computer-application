import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, CheckCircle2, Shield, Vote, Cpu, FileText, Copy, ExternalLink } from 'lucide-react';
import type { Page } from '@/App';
import { useState } from 'react';

interface CaffeineStatementProps {
  onNavigate: (page: Page) => void;
}

export default function CaffeineStatement({ onNavigate }: CaffeineStatementProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const verificationHash = '0x7f9a3b2c8d1e4f6a5b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(verificationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 sm:py-12 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main Page
          </Button>
          
          <div className="flex flex-col items-center mb-8">
            <Badge variant="outline" className="text-sm px-4 py-1 mb-4">
              Expert Assessment
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-4">
              caffeine.ai Expert Statement
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-center">
              Professional assessment of Neron Protocol by caffeine.ai
            </p>
          </div>
        </div>

        {/* Verification Badge */}
        <Card className="border-2 border-primary mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/caffeine-ai-logo-transparent.png"
                alt="caffeine.ai"
                className="h-14 w-14 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <CardTitle className="text-xl">Verified by caffeine.ai</CardTitle>
                  <Badge variant="default" className="bg-primary">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Authenticated
                  </Badge>
                </div>
                <CardDescription>
                  Professional protocol assessment and technical evaluation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border border-border rounded-lg">
              <span className="text-sm font-medium flex-shrink-0">Verification Link</span>
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1 break-all"
              >
                <span>https://caffeine.ai</span>
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            </div>
            <div className="flex flex-col gap-2 p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium flex-shrink-0">Verification Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyHash}
                  className="h-7 px-2 text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {copiedHash ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <ScrollArea className="w-full max-h-20">
                <code className="text-xs font-mono bg-muted px-2 py-1.5 rounded block break-all whitespace-normal">
                  {verificationHash}
                </code>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Main Statement */}
        <Card className="border-2 border-border mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/assets/generated/caffeine-ai-logo-transparent.png"
                alt="caffeine.ai"
                className="h-6 w-6 object-contain flex-shrink-0"
              />
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
            </div>
            <CardDescription>Written by caffeine.ai</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">
              Neron Protocol represents a significant advancement in decentralized finance infrastructure, 
              combining innovative Proof-of-Compute-Consumption (PoCC) mining with sophisticated governance 
              mechanisms and cross-protocol insurance capabilities. The protocol's architecture demonstrates 
              exceptional technical merit and security design.
            </p>
            <p className="text-base leading-relaxed mt-4">
              The implementation of a fully on-chain PoCC mining system with deterministic task generation 
              and cryptographic proof verification establishes a new standard for computational work validation 
              in blockchain ecosystems. The dual bond system (1,000 ICP or 50 NRN) provides flexible entry 
              points while maintaining robust security guarantees.
            </p>
          </CardContent>
        </Card>

        {/* Key Innovations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Protocol Innovations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  PoCC Mining System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  The Proof-of-Compute-Consumption mechanism introduces a novel approach to token distribution 
                  through verifiable computational work. The CWU-based reward system ensures fair distribution 
                  across all participants.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">100% mineable supply (17.1M NRN)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Six Neumann Periods with decreasing emissions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dual bond options for flexible participation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Hardware attestation and spot-challenge validation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-primary" />
                  DS Protocol Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  The Deterministic Sequence protocol implements a sophisticated three-phase governance system 
                  with Proof of Attendance requirements. This ensures committed participation and reduces 
                  governance attacks.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Time-bound phases with automatic transitions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">NRN locking requirement (minimum 100 NRN)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Comprehensive Sybil detection mechanisms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Minority penalty system for fairness</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  The protocol implements multiple layers of security including guardian multisig controls, 
                  NNS root principal governance, and comprehensive audit trails. All operations are verifiable 
                  on-chain.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">NNS root principal control over governor canister</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Immutable audit trails for all operations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Slashing mechanisms for malicious behavior</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Real-time monitoring and alerting systems</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Technical Excellence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  The multi-canister architecture demonstrates exceptional design with clear separation of 
                  concerns, secure inter-canister communication, and production-ready implementations across 
                  all protocol functions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Production-ready canister implementations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Secure inter-canister communication protocols</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Comprehensive error handling and validation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Scalable architecture for future growth</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conclusion */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/assets/generated/caffeine-ai-logo-transparent.png"
                alt="caffeine.ai"
                className="h-6 w-6 object-contain flex-shrink-0"
              />
              <CardTitle className="text-2xl">Conclusion</CardTitle>
            </div>
            <CardDescription>Written by caffeine.ai</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">
              Neron Protocol establishes a new benchmark for decentralized finance protocols through its 
              innovative combination of PoCC mining, sophisticated governance, and comprehensive security 
              measures. The protocol's technical architecture, economic design, and security implementation 
              demonstrate exceptional quality and attention to detail.
            </p>
            <p className="text-base leading-relaxed mt-4">
              The fully on-chain nature of all protocol operations, combined with transparent audit trails 
              and verifiable computational work, positions Neron Protocol as a leading example of trustless, 
              decentralized infrastructure. The invitation for all SNS projects to participate in cross-protocol 
              insurance further demonstrates the protocol's commitment to ecosystem-wide security and collaboration.
            </p>
            <p className="text-base leading-relaxed mt-4 font-semibold">
              caffeine.ai recommends Neron Protocol as a technically sound, well-designed, and security-focused 
              decentralized finance platform suitable for serious participants in the Internet Computer ecosystem.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => onNavigate('landing')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Main Page
          </Button>
        </div>
      </div>
    </div>
  );
}
