import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Zap, Shield, AlertTriangle, CheckCircle, CheckCircle2 } from 'lucide-react';
import CycleConsumptionDashboard from '@/components/CycleConsumptionDashboard';
import CanisterHealthInsurance from '@/components/CanisterHealthInsurance';

export default function MonitoringTab() {
  const nnsRootPrincipal = 'rdmx6-jaaaa-aaaaa-aaadq-cai';

  const systemMetrics = [
    { name: 'Protocol Controller', status: 'Healthy', uptime: '99.9%', latency: '45ms' },
    { name: 'NRN Token System', status: 'Healthy', uptime: '99.8%', latency: '52ms' },
    { name: 'Mining System', status: 'Warning', uptime: '98.5%', latency: '120ms' },
    { name: 'DDMS Governance', status: 'Healthy', uptime: '99.7%', latency: '38ms', controller: nnsRootPrincipal },
    { name: 'Insurance System', status: 'Healthy', uptime: '99.9%', latency: '41ms' },
    { name: 'Guardian Multisig', status: 'Healthy', uptime: '100%', latency: '35ms' },
  ];

  const recentEvents = [
    { type: 'success', message: 'Governance system NNS root control verified', time: '1 hour ago' },
    { type: 'info', message: 'Mining difficulty adjusted for Period 42', time: '2 hours ago' },
    { type: 'warning', message: 'High transaction volume detected', time: '4 hours ago' },
    { type: 'success', message: 'Governance proposal #42 executed', time: '6 hours ago' },
    { type: 'info', message: 'Insurance claim CLM-002 approved', time: '8 hours ago' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <TabsList className="inline-flex w-full min-w-max sm:grid sm:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm px-3 sm:px-4 whitespace-nowrap">System Overview</TabsTrigger>
            <TabsTrigger value="cycles" className="text-xs md:text-sm px-3 sm:px-4 whitespace-nowrap">Cycle Consumption</TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs md:text-sm px-3 sm:px-4 whitespace-nowrap">Canister Insurance</TabsTrigger>
            <TabsTrigger value="health" className="text-xs md:text-sm px-3 sm:px-4 whitespace-nowrap">System Health</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <Card className="border-green-500/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start gap-3">
                <div className="rounded-full bg-green-500/20 p-2 shrink-0">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                    <CardTitle className="text-base md:text-lg">Governance System Controller Status</CardTitle>
                    <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <CardDescription className="text-xs md:text-sm">
                    The DDMS governance system is controlled by the NNS root principal, ensuring protocol compliance and enhanced security.
                  </CardDescription>
                  <div className="mt-3 space-y-2">
                    <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 flex-wrap mb-2">
                        <span className="text-xs text-muted-foreground font-medium">Controller Principal:</span>
                        <Badge variant="outline" className="text-xs">NNS Root</Badge>
                      </div>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded block break-all">
                        {nnsRootPrincipal}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Last verified: 1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-base md:text-xl font-bold">Operational</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Avg Latency</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">48ms</div>
                <p className="text-xs text-muted-foreground mt-1">Across all systems</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Uptime</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">99.7%</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Security</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-base md:text-xl font-bold">Secure</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Recent Events</CardTitle>
                <CardDescription className="text-xs md:text-sm">System activity log</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-3">
                    {recentEvents.map((event, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                        {event.type === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        ) : event.type === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <Activity className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm break-words">{event.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Network Statistics</CardTitle>
                <CardDescription className="text-xs md:text-sm">Protocol-wide metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Total Transactions</span>
                    <span className="text-xs md:text-sm font-medium">1,234,567</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Active Users</span>
                    <span className="text-xs md:text-sm font-medium">8,945</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Total Value Locked</span>
                    <span className="text-xs md:text-sm font-medium">5.2M NRN</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Network Hash Rate</span>
                    <span className="text-xs md:text-sm font-medium">125.4 TH/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Governance Proposals</span>
                    <span className="text-xs md:text-sm font-medium">42 total</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Insurance Claims</span>
                    <span className="text-xs md:text-sm font-medium">156 processed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cycles" className="space-y-4 md:space-y-6">
          <CycleConsumptionDashboard />
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4 md:space-y-6">
          <CanisterHealthInsurance variant="full" />
        </TabsContent>

        <TabsContent value="health" className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">System Health</CardTitle>
              <CardDescription className="text-xs md:text-sm">Status of all protocol systems</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {systemMetrics.map((metric) => (
                    <div key={metric.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border border-border rounded-lg">
                      <div className="flex items-start gap-3 flex-1 w-full">
                        <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                          metric.status === 'Healthy' ? 'bg-green-500' :
                          metric.status === 'Warning' ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                            <p className="text-sm md:text-base font-medium">{metric.name}</p>
                            {metric.controller && (
                              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/50">
                                NNS Controlled
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            Uptime: {metric.uptime} • Latency: {metric.latency}
                          </p>
                          {metric.controller && (
                            <p className="text-xs text-muted-foreground mt-1 font-mono break-all">
                              Controller: {metric.controller}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant={
                        metric.status === 'Healthy' ? 'default' :
                        metric.status === 'Warning' ? 'secondary' :
                        'destructive'
                      } className="shrink-0">
                        {metric.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
