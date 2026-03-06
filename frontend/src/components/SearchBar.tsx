import { useState, useEffect, useRef } from 'react';
import { Search, FileText, Wallet, BookOpen, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import type { Page } from '../App';

interface SearchBarProps {
  onNavigate: (page: Page) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  page: Page;
  icon: React.ReactNode;
}

const searchablePages: SearchResult[] = [
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Interactive guides for Mining, Governance, Insurance, and more',
    page: 'tutorials',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    description: 'Manage ICP, NRN, ckBTC, ckETH, and cICP tokens',
    page: 'wallet',
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Comprehensive protocol documentation and guides',
    page: 'documentation',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 'whitepaper',
    title: 'Whitepaper',
    description: 'Technical specifications and protocol details',
    page: 'whitepaper',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 'trade',
    title: 'Trade',
    description: 'Token conversion and trading interface',
    page: 'trade',
    icon: <TrendingUp className="h-4 w-4" />,
  },
];

export default function SearchBar({ onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchablePages.filter(
        (page) =>
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (page: Page) => {
    onNavigate(page);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search pages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="pl-8 pr-3 h-9 text-sm bg-background"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-[100] shadow-lg border bg-background max-h-[400px] overflow-hidden">
          <ScrollArea className="h-full max-h-[400px]">
            <div className="p-2 space-y-1">
              {results.map((result) => (
                <Button
                  key={result.id}
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 px-3 hover:bg-accent"
                  onClick={() => handleSelect(result.page)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-0.5 shrink-0">{result.icon}</div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium text-sm truncate">{result.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{result.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <Card className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-[100] shadow-lg border bg-background">
          <div className="p-4 text-center text-sm text-muted-foreground">
            No results found for "{query}"
          </div>
        </Card>
      )}
    </div>
  );
}
