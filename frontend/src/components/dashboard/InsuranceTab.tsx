import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, CheckCircle, Clock, AlertCircle, Plus, Network, Handshake } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InsuranceTab() {
  const claims = [
    {
      id: 'CLM-001',
      type: 'Mining Equipment Failure',
      amount: '5,000 NRN',
      status: 'Under Review',
      submitted: '2025-01-20',
    },
    {
      id: 'CLM-002',
      type: 'Network Outage',
      amount: '2,500 NRN',
      status: 'Approved',
      submitted: '2025-01-15',
    },
    {
      id: 'CLM-003',
      type: 'Smart Contract Bug',
      amount: '10,000 NRN',
      status: 'Paid',
      submitted: '2025-01-10',
    },
  ];

  const snsProjects = [
    { name: 'OpenChat', coverage: '500,000 NRN', status: 'Active', nrnMined: '2,500,000', participation: 'NP2' },
    { name: 'Sonic', coverage: '450,000 NRN', status: 'Active', nrnMined: '1,800,000', participation: 'NP1' },
    { name: 'ICPSwap', coverage: '500,000 NRN', status: 'Active', nrnMined: '3,200,000', participation: 'NP3' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-500">
          Insurance canister is not deployed. This demonstrates the insurance interface with mock claims and SNS integration examples.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="sns">SNS Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coverage Amount</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,000 NRN</div>
                <p className="text-xs text-muted-foreground mt-1">Active coverage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium Paid</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150 NRN</div>
                <p className="text-xs text-muted-foreground mt-1">Monthly premium</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Claims Paid</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,500 NRN</div>
                <p className="text-xs text-muted-foreground mt-1">Lifetime total</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Coverage</CardTitle>
                <CardDescription>Active insurance policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { type: 'Mining Equipment', coverage: '5,000 NRN', premium: '75 NRN/month' },
                    { type: 'Smart Contract', coverage: '3,000 NRN', premium: '50 NRN/month' },
                    { type: 'Network Outage', coverage: '2,000 NRN', premium: '25 NRN/month' },
                  ].map((policy, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{policy.type}</p>
                        <p className="text-sm text-muted-foreground">{policy.premium}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:text-right gap-3">
                        <p className="font-mono text-sm">{policy.coverage}</p>
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Coverage
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Pool</CardTitle>
                <CardDescription>Pool statistics and health (from the 15.6M mineable supply)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Total Pool Size</span>
                    <span className="font-medium">Available</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Active Policies</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">SNS Projects with Coverage</span>
                    <span className="font-medium">{snsProjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Claims Ratio</span>
                    <span className="font-medium">2.3%</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Pool Health</span>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The insurance pool is well-capitalized and can cover all active policies including SNS projects with a high reserve ratio. SNS projects mine NRN through PoCC computational work across Neumann Periods 1-5 (15.6M total mineable supply with no pre-allocation).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Claims History</CardTitle>
                  <CardDescription>Your submitted insurance claims</CardDescription>
                </div>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit Claim
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claims.map((claim) => (
                  <div key={claim.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        claim.status === 'Paid' ? 'bg-green-500/10' :
                        claim.status === 'Approved' ? 'bg-blue-500/10' :
                        'bg-amber-500/10'
                      }`}>
                        {claim.status === 'Paid' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : claim.status === 'Approved' ? (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{claim.id} - {claim.type}</p>
                        <p className="text-sm text-muted-foreground">Submitted {claim.submitted}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:text-right">
                      <div>
                        <p className="font-mono text-sm mb-1">{claim.amount}</p>
                        <Badge variant={
                          claim.status === 'Paid' ? 'default' :
                          claim.status === 'Approved' ? 'secondary' :
                          'outline'
                        }>
                          {claim.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sns" className="space-y-6 mt-0">
          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-5 w-5 text-blue-500" />
                <CardTitle>SNS Project Integration Program</CardTitle>
              </div>
              <CardDescription>
                Cross-protocol insurance and PoCC mining for all SNS projects on the Internet Computer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Handshake className="h-4 w-4" />
                  Open Invitation to All SNS Projects
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Neron Protocol invites all SNS projects to participate in NRN PoCC mining and create insurance policies that protect both the NRN treasury and SNS project treasuries. Mine NRN by contributing computational work across Neumann Periods 1-5 (15.6M total mineable supply with no pre-allocation).
                </p>
                <div className="grid gap-4 lg:grid-cols-2 pt-2">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Benefits for SNS Projects:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                      <li>Mine NRN through PoCC computational work</li>
                      <li>Participate in Neumann Periods 1-5</li>
                      <li>Diversify treasury with NRN holdings</li>
                      <li>Access comprehensive insurance coverage</li>
                      <li>Participate in Neron governance</li>
                      <li>Contribute to protocol security</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Coverage Options:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                      <li>Customized coverage per SNS project</li>
                      <li>Smart contract vulnerability protection</li>
                      <li>Governance attack coverage</li>
                      <li>Cross-protocol integration insurance</li>
                      <li>Mutual insurance pool</li>
                      <li>Multi-DAO voting for claims</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Participating SNS Projects</h4>
                  <Badge variant="secondary">{snsProjects.length} Active</Badge>
                </div>
                {snsProjects.map((project) => (
                  <div key={project.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Coverage: {project.coverage} • Mined: {project.nrnMined} NRN
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PoCC Mining Period: {project.participation}
                      </p>
                    </div>
                    <Badge variant="default" className="self-start sm:self-center">{project.status}</Badge>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm font-medium mb-2">How SNS Projects Participate:</p>
                <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Submit integration proposal to Neron DDMS</li>
                  <li>Community votes on SNS project acceptance (66% approval)</li>
                  <li>Approved projects receive PoCC mining access</li>
                  <li>Contribute computational work to earn NRN from 15.6M mineable supply (no pre-allocation)</li>
                  <li>Participate across Neumann Periods 1-5</li>
                  <li>Purchase insurance coverage (customized per project)</li>
                  <li>Participate in governance and multi-DAO voting for claims</li>
                </ol>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Submit SNS Integration Proposal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
