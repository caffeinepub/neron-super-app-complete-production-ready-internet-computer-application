import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import SearchBar from './SearchBar';
import type { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { identity, clear, loginStatus } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingOut = loginStatus === 'logging-in';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 lg:px-8">
        {/* Left side - Search Bar with proper spacing for mobile hamburger */}
        <div className="flex-1 max-w-md ml-0 lg:ml-0 pl-12 lg:pl-0">
          <SearchBar onNavigate={onNavigate} />
        </div>

        {/* Right side - User Profile, Theme Toggle, Logout */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Profile Display */}
          {isAuthenticated && userProfile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('profile')}
              className="hidden sm:flex items-center gap-2 hover:bg-accent"
            >
              <div className="h-7 w-7 rounded-full bg-ic-blue/10 flex items-center justify-center">
                <span className="text-xs font-medium text-ic-blue">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium max-w-[100px] truncate">
                {userProfile.name}
              </span>
            </Button>
          )}

          {/* Mobile User Profile Icon */}
          {isAuthenticated && userProfile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('profile')}
              className="sm:hidden"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="hover:bg-accent"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Logout Button */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="border-ic-blue text-ic-blue hover:bg-ic-blue hover:text-white hidden sm:flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          )}

          {/* Mobile Logout Icon */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="sm:hidden border-ic-blue text-ic-blue hover:bg-ic-blue hover:text-white"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
