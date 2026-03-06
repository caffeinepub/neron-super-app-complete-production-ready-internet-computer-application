import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, TrendingUp, HelpCircle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MonitoringLandingProps {
  onViewMonitoring: () => void;
}

export default function MonitoringLanding({ onViewMonitoring }: MonitoringLandingProps) {
  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <Alert className="border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
        <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">System Status: Operational</p>
              <p className="text-sm text-green-800 dark:text-green-200">
                All systems healthy • 99.7% uptime • 48ms avg latency
              </p>
            </div>
            <Badge variant="default" className="bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Healthy
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Overview Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">System Monitoring Overview</CardTitle>
          <CardDescription className="text-base">
            Monitor system health, performance metrics, and cycle consumption across all protocol systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">System Health</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor uptime, latency, and operational status of all systems
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Cycle Consumption</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Track cycle usage, burn rates, and consumption targets
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Performance Metrics</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View network statistics and protocol-wide metrics
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Key Metrics
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>System Uptime: 99.7% (Last 30 days)</li>
              <li>Average Latency: 48ms across all systems</li>
              <li>Cycle Consumption Target: 300T - 10,000T cycles/month</li>
              <li>Active Systems: 6 (All operational)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access monitoring dashboards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onViewMonitoring} size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              View Monitoring Dashboard
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Zap className="mr-2 h-4 w-4" />
              Cycle Consumption
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              System Health
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
              <AccordionTrigger>What is cycle consumption?</AccordionTrigger>
              <AccordionContent>
                Cycle consumption refers to the computational resources used by the protocol. The backend is designed for intensive workloads targeting 300,000 trillion to 10,000,000 trillion cycles per month, ensuring robust operation and scalability.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How is system health monitored?</AccordionTrigger>
              <AccordionContent>
                System health is monitored through uptime tracking, latency measurements, and status checks across all protocol systems including mining, governance, insurance, and security. Real-time alerts notify of any anomalies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are the cycle consumption targets?</AccordionTrigger>
              <AccordionContent>
                The protocol targets a baseline of 300,000 trillion cycles per month under typical usage, with scalability up to 10,000,000 trillion cycles per month during peak activity. This ensures robust computational capacity for all operations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I view performance metrics?</AccordionTrigger>
              <AccordionContent>
                Performance metrics are available in the monitoring dashboard, including network statistics, transaction counts, active users, total value locked, and system-specific metrics. All data is updated in real-time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What systems are monitored?</AccordionTrigger>
              <AccordionContent>
                All protocol systems are monitored including the Protocol Controller, NRN Token System, Mining System, DDMS Governance (NNS controlled), Insurance System, and Guardian Multisig. Each system's health, uptime, and latency are tracked continuously.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
