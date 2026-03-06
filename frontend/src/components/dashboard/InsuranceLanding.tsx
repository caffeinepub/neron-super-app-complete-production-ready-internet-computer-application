import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Network, HelpCircle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface InsuranceLandingProps {
  onViewInsurance: () => void;
}

export default function InsuranceLanding({ onViewInsurance }: InsuranceLandingProps) {
  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100">Insurance Status: Active</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Coverage: 10,000 NRN • 3 SNS Projects Participating
              </p>
            </div>
            <Badge variant="default" className="bg-blue-600">
              Pool Health: Excellent
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Overview Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Insurance Overview</CardTitle>
          <CardDescription className="text-base">
            Protect your assets and participate in cross-protocol insurance with SNS projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Coverage Options</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Choose from mining equipment, smart contract, and network outage coverage
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Submit Claims</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                File insurance claims and track their status through the review process
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">SNS Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Participate in cross-protocol insurance with other SNS projects
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Insurance Pool Information
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Pool funded from 15.6M mineable NRN supply</li>
              <li>1,234 active policies across all participants</li>
              <li>3 SNS projects with mutual coverage</li>
              <li>2.3% claims ratio (excellent health)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your insurance coverage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onViewInsurance} size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              View Insurance Dashboard
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Submit New Claim
            </Button>
            <Button variant="outline" className="justify-start">
              <Network className="mr-2 h-4 w-4" />
              View SNS Projects
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
              <AccordionTrigger>What types of coverage are available?</AccordionTrigger>
              <AccordionContent>
                The protocol offers coverage for mining equipment failures, smart contract vulnerabilities, network outages, and other protocol-related risks. Each coverage type has specific terms and premium rates based on risk assessment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the SNS Integration Program work?</AccordionTrigger>
              <AccordionContent>
                All SNS projects are invited to mine NRN through PoCC (Neumann Periods 1-5) and create mutual insurance policies. This protects both the NRN treasury and SNS project treasuries through cross-protocol coverage and multi-DAO voting on claims.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I submit a claim?</AccordionTrigger>
              <AccordionContent>
                To submit a claim, navigate to the insurance dashboard and click "Submit Claim." Provide details about the incident, supporting documentation, and the claim amount. Claims go through multi-stage verification before approval and payment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is the insurance pool health?</AccordionTrigger>
              <AccordionContent>
                The insurance pool is funded from the 15.6M mineable NRN supply and maintains excellent health with a 2.3% claims ratio. The pool is well-capitalized and can cover all active policies with a high reserve ratio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How are premiums calculated?</AccordionTrigger>
              <AccordionContent>
                Premiums are calculated based on coverage type, amount, risk assessment, and pool health. Monthly premiums are paid in NRN and contribute to the insurance pool. Premium rates are adjusted periodically based on claims experience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
