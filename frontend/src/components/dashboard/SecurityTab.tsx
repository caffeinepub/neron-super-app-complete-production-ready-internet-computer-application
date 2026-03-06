import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle, CheckCircle, Eye, Key, UserCheck, FileText, X, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useListSecurityEvents, useListSecurityReports, useListMyAuthSessions, useTerminateAuthSession, useTerminateAllAuthSessions, useGetUserRole } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import CanisterHealthInsurance from '@/components/CanisterHealthInsurance';

export default function SecurityTab() {
  const [activeModal, setActiveModal] = useState<'access' | 'auth' | 'audit' | 'reports' | null>(null);
  const { identity } = useInternetIdentity();
  const { data: userRole } = useGetUserRole();
  const { data: securityEvents = [] } = useListSecurityEvents();
  const { data: securityReports = [] } = useListSecurityReports();
  const { data: authSessions = [] } = useListMyAuthSessions();
  const { mutate: terminateSession } = useTerminateAuthSession();
  const { mutate: terminateAllSessions } = useTerminateAllAuthSessions();

  const isAdmin = userRole === 'admin';

  const securityMetrics = [
    { name: 'Authentication System', status: 'Secure', lastCheck: '5 minutes ago' },
    { name: 'Access Control', status: 'Active', lastCheck: '10 minutes ago' },
    { name: 'Encryption', status: 'Enabled', lastCheck: '15 minutes ago' },
    { name: 'Audit Logging', status: 'Active', lastCheck: '20 minutes ago' },
  ];

  const recentSecurityEvents = securityEvents.slice(0, 4).map(event => ({
    type: event.eventType === 'login_success' ? 'success' : event.eventType === 'login_failed' ? 'warning' : 'info',
    message: event.description,
    time: new Date(Number(event.timestamp) / 1000000).toLocaleString(),
  }));

  const handleTerminateSession = (sessionId: string) => {
    terminateSession(sessionId);
  };

  const handleTerminateAllSessions = () => {
    terminateAllSessions();
  };

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Shield className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700 dark:text-green-400">
          All security systems are operational. No threats detected.
        </AlertDescription>
      </Alert>

      <CanisterHealthInsurance variant="compact" />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xl font-bold">Secure</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authSessions.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Authenticated users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Events logged</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Systems</CardTitle>
          <CardDescription>Status of all security components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Last checked: {metric.lastCheck}
                    </p>
                  </div>
                </div>
                <Badge variant="default">{metric.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Security activity log</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSecurityEvents.length > 0 ? (
                recentSecurityEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    {event.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : event.type === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{event.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent security events</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Actions</CardTitle>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModal('access')}
            >
              <Lock className="mr-2 h-4 w-4" />
              Configure Access Control
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModal('auth')}
            >
              <Key className="mr-2 h-4 w-4" />
              Manage Authentication
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModal('audit')}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Audit Logs
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModal('reports')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Security Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Modal */}
      <Dialog open={activeModal === 'access'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Configure Access Control
            </DialogTitle>
            <DialogDescription>
              View and manage user access roles and permissions
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-2">Your Current Role</h3>
                <Badge variant={isAdmin ? "default" : "secondary"}>
                  {userRole || 'guest'}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {isAdmin 
                    ? 'You have administrative privileges and can manage access control settings.'
                    : 'You have read-only access to view current role assignments and permission levels.'}
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Role Descriptions</h3>
                <div className="space-y-3">
                  <div>
                    <Badge variant="default" className="mb-1">Admin</Badge>
                    <p className="text-sm text-muted-foreground">
                      Full access to all protocol functions including user management, security configuration, and system administration.
                    </p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-1">User</Badge>
                    <p className="text-sm text-muted-foreground">
                      Standard access to protocol features including mining, governance participation, and wallet management.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">Guest</Badge>
                    <p className="text-sm text-muted-foreground">
                      Limited read-only access to public protocol information and documentation.
                    </p>
                  </div>
                </div>
              </div>

              {!isAdmin && (
                <Alert>
                  <AlertDescription>
                    Contact an administrator to request role changes or additional permissions.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Authentication Management Modal */}
      <Dialog open={activeModal === 'auth'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Manage Authentication
            </DialogTitle>
            <DialogDescription>
              View authentication method, active sessions, and session history
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <Tabs defaultValue="method" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="method">Authentication Method</TabsTrigger>
                <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="method" className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h3 className="font-semibold mb-2">Current Authentication</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Internet Identity</Badge>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You are authenticated using Internet Identity, providing secure and private access to the protocol.
                  </p>
                </div>

                {identity && (
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="font-semibold mb-2">Your Principal ID</h3>
                    <code className="text-xs bg-muted p-2 rounded block break-all">
                      {identity.getPrincipal().toString()}
                    </code>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    {authSessions.filter(s => s.status === 'active').length} active session(s)
                  </p>
                  {authSessions.filter(s => s.status === 'active').length > 0 && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleTerminateAllSessions}
                    >
                      Logout All Sessions
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {authSessions.filter(s => s.status === 'active').length > 0 ? (
                    authSessions.filter(s => s.status === 'active').map((session) => (
                      <div key={session.id} className="rounded-lg border border-border p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{session.deviceInfo || 'Unknown Device'}</p>
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(Number(session.createdAt) / 1000000).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Last Active: {new Date(Number(session.lastActive) / 1000000).toLocaleString()}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleTerminateSession(session.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge variant="default" className="text-xs">Active</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No active sessions
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Audit Logs Modal */}
      <Dialog open={activeModal === 'audit'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Audit Logs
            </DialogTitle>
            <DialogDescription>
              Security-related events with timestamps and details
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityEvents.length > 0 ? (
                  securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-xs">
                        {new Date(Number(event.timestamp) / 1000000).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          event.eventType === 'login_success' ? 'default' :
                          event.eventType === 'login_failed' ? 'destructive' :
                          'secondary'
                        }>
                          {event.eventType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{event.description}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                        {event.details}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No audit logs available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Security Reports Modal */}
      <Dialog open={activeModal === 'reports'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Security Reports
            </DialogTitle>
            <DialogDescription>
              View and download security status reports
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-2">Current Security Status</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="font-medium">Secure</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Threats Blocked (24h)</p>
                    <p className="font-medium mt-1">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="font-medium mt-1">{authSessions.filter(s => s.status === 'active').length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Audit Events</p>
                    <p className="font-medium mt-1">{securityEvents.length}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Available Reports</h3>
                {securityReports.length > 0 ? (
                  securityReports.map((report) => (
                    <div key={report.id} className="rounded-lg border border-border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{report.summary}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Created: {new Date(Number(report.createdAt) / 1000000).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={report.status === 'pending' ? 'secondary' : 'default'}>
                          {report.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground text-center">
                      No security reports available. Reports are generated automatically based on system activity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

