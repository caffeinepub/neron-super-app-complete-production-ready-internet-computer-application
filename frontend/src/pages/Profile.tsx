import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { 
  useGetCallerUserProfile, 
  useUpdateDisplayName,
  useGetVotingAbilityStatus,
  useGetPrincipalInfo,
  useGetSessionStatus,
  useGetPrivacyTips,
  useListMyGovernanceLocks,
  useListMyAuthSessions,
  useTerminateAuthSession,
  useTerminateAllAuthSessions
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Copy, 
  Edit2, 
  Save, 
  X,
  Lock,
  Unlock,
  Info,
  LogOut,
  Monitor
} from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: votingAbility } = useGetVotingAbilityStatus();
  const { data: principal } = useGetPrincipalInfo();
  const { data: sessionStatus } = useGetSessionStatus();
  const { data: privacyTips } = useGetPrivacyTips();
  const { data: locks } = useListMyGovernanceLocks();
  const { data: sessions } = useListMyAuthSessions();
  
  const updateDisplayName = useUpdateDisplayName();
  const terminateSession = useTerminateAuthSession();
  const terminateAllSessions = useTerminateAllAuthSessions();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');

  const handleCopyPrincipal = () => {
    if (principal) {
      navigator.clipboard.writeText(principal.toString());
      toast.success('Principal copied to clipboard');
    }
  };

  const handleEditName = () => {
    setNewDisplayName(userProfile?.name || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!newDisplayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }

    try {
      await updateDisplayName.mutateAsync(newDisplayName.trim());
      toast.success('Display name updated successfully');
      setIsEditingName(false);
    } catch (error) {
      toast.error('Failed to update display name');
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewDisplayName('');
  };

  const handleTerminateSession = async (sessionId: string) => {
    try {
      await terminateSession.mutateAsync(sessionId);
      toast.success('Session terminated successfully');
    } catch (error) {
      toast.error('Failed to terminate session');
      console.error(error);
    }
  };

  const handleTerminateAllSessions = async () => {
    try {
      await terminateAllSessions.mutateAsync();
      toast.success('All sessions terminated successfully');
    } catch (error) {
      toast.error('Failed to terminate all sessions');
      console.error(error);
    }
  };

  // Calculate voting eligibility based on locks and penalties
  const hasActiveLocks = locks && locks.some(lock => lock.status === 'locked');
  const isEligibleToVote = votingAbility && hasActiveLocks;

  // Get active sessions
  const activeSessions = sessions?.filter(s => s.status === 'active') || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your identity, voting status, and security settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Display Name Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Display Name
            </CardTitle>
            <CardDescription>
              Your anonymous display name for protocol participation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditingName ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {userProfile?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{userProfile?.name}</p>
                    <p className="text-sm text-muted-foreground">Display Name</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditName}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="displayName">New Display Name</Label>
                  <Input
                    id="displayName"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    placeholder="Enter new display name"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveName}
                    disabled={updateDisplayName.isPending}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={updateDisplayName.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voting Ability Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Voting Ability Status
            </CardTitle>
            <CardDescription>
              Your current eligibility to participate in governance voting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Voting Eligibility:</span>
              {isEligibleToVote ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Eligible to Vote
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Not Eligible
                </Badge>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Locks:</span>
                <span className="font-medium">{locks?.filter(l => l.status === 'locked').length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Locked NRN:</span>
                <span className="font-medium">
                  {locks?.filter(l => l.status === 'locked').reduce((sum, lock) => sum + Number(lock.lockedAmount), 0) || 0} NRN
                </span>
              </div>
            </div>

            {!isEligibleToVote && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Lock at least 100 NRN in governance to gain voting rights
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Internet Identity Principal Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Internet Identity Principal
            </CardTitle>
            <CardDescription>
              Your unique Internet Identity identifier
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Principal ID</Label>
              <div className="flex gap-2">
                <Input
                  value={principal?.toString() || ''}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPrincipal}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your principal is your unique identifier on the Internet Computer. Keep it private for security.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Session Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Authentication Sessions
            </CardTitle>
            <CardDescription>
              Manage your active authentication sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Status:</span>
              <Badge variant={sessionStatus === 'active' ? 'default' : 'secondary'}>
                {sessionStatus || 'Unknown'}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Sessions:</span>
                <span className="font-medium">{activeSessions.length}</span>
              </div>
            </div>

            {activeSessions.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Recent Sessions</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeSessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-2 bg-muted rounded-md text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{session.deviceInfo}</p>
                        <p className="text-muted-foreground">
                          {new Date(Number(session.createdAt) / 1000000).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        disabled={terminateSession.isPending}
                      >
                        <LogOut className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSessions.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleTerminateAllSessions}
                disabled={terminateAllSessions.isPending}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout All Sessions
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Security Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security Tips
          </CardTitle>
          <CardDescription>
            Best practices for maintaining anonymity and secure protocol participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {privacyTips?.map((tip, index) => (
              <Alert key={index}>
                <Info className="h-4 w-4" />
                <AlertDescription>{tip}</AlertDescription>
              </Alert>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Unlock className="h-4 w-4" />
              Decentralization & Anonymity
            </h3>
            <p className="text-sm text-muted-foreground">
              Your participation in the Neron Protocol contributes to its decentralization. By maintaining anonymity through display names and secure authentication, you help protect the protocol's integrity while exercising your governance rights.
            </p>
            <p className="text-sm text-muted-foreground">
              Always verify your principal ID matches your Internet Identity, lock sufficient NRN for voting rights, and regularly review your active sessions for security.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
