import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserProfile } from '@/backend';

interface ProfileSetupProps {
  onComplete: () => void;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState('');
  const { identity } = useInternetIdentity();
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && identity) {
      const profile: UserProfile = {
        name: name.trim(),
        votingAbility: false,
        principal: identity.getPrincipal(),
        sessionStatus: 'active',
        privacyTips: [
          'Use anonymous display names',
          'Keep your principal private',
          'Follow security best practices',
        ],
        completedWelcome: false,
        completedRevolutionaryUpgrades: false,
        completedGetStarted: false,
        completedDocumentation: false,
        completedWhitepaper: false,
        completedTutorial: false,
        onboardingProgress: BigInt(0),
        onboardingCompleted: false,
      };
      saveProfile(profile, {
        onSuccess: () => {
          onComplete();
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile Setup</CardTitle>
          <CardDescription>
            Please enter your name to complete your profile setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending || !name.trim()}>
              {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
