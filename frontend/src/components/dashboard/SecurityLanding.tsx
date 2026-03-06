import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, FileText, HelpCircle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useListSecurityEvents, useListMyAuthSessions } from '@/hooks/useQueries';

interface SecurityLandingProps {
  onViewSecurity: () => void;
}

export default function SecurityLanding({ onViewSecurity }: SecurityLandingProps) {
  const { data: securityEvents = [] } = useListSecurityEvents();
  const { data: authSessions = [] } = useListMyAuthSessions();
  
  const activeSessions = authSessions.filter(s => s.status === 'active').length;
  const recentEvents = securityEvents.slice(0, 5).length;

  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <Alert className="border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
        <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">Security Status: Secure</p>
              <p className="text-sm text-green-800 dark:text-green-200">
                All security systems operational • No threats detected
              </p>
            </div>
            <Badge variant="default" className="bg-green-600">
              {activeSessions} Active Sessions
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Overview Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Security Overview</CardTitle>
          <CardDescription className="text-base">
            Monitor security status, manage access control, and view audit logs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Access Control</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage user roles, permissions, and authorization levels
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Audit Logs</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View security events, login attempts, and system activities
              </p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Security Reports</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate and download comprehensive security status reports
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Security Metrics
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Active Sessions: {activeSessions}</li>
              <li>Recent Security Events: {recentEvents}</li>
              <li>Threats Blocked (24h): 0</li>
              <li>System Uptime: 99.7%</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onViewSecurity} size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              View Security Dashboard
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Configure Access Control
            </Button>
            <Button variant="outline" className="justify-start">
              <Eye className="mr-2 h-4 w-4" />
              View Audit Logs
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
              <AccordionTrigger>What security features are available?</AccordionTrigger>
              <AccordionContent>
                The protocol includes access control management, authentication session tracking, comprehensive audit logging, security reporting, threat detection, and multi-session management. All security events are logged and can be reviewed at any time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I manage my sessions?</AccordionTrigger>
              <AccordionContent>
                You can view all active sessions, see device information and login times, and terminate individual sessions or all sessions at once. This helps you maintain control over your account access across different devices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are audit logs?</AccordionTrigger>
              <AccordionContent>
                Audit logs record all security-related events including login attempts, permission changes, failed access attempts, and administrative actions. These logs provide transparency and help track any suspicious activity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How are security reports generated?</AccordionTrigger>
              <AccordionContent>
                Security reports are automatically generated based on system activity and can be downloaded for offline review. Reports include security status summaries, threat detection information, and compliance metrics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What is access control?</AccordionTrigger>
              <AccordionContent>
                Access control manages user roles (Admin, User, Guest) and permissions. Regular users have read-only access to view their roles, while administrators can manage access levels and permissions for all users.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
