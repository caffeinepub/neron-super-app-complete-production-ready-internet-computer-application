import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, HardDrive, MemoryStick, Monitor, ExternalLink, CheckCircle2, Zap } from 'lucide-react';
import { useGetHardwareRequirements } from '@/hooks/useQueries';

interface HardwareRequirementsProps {
  variant?: 'full' | 'compact';
}

export default function HardwareRequirements({ variant = 'full' }: HardwareRequirementsProps) {
  const { data: requirements, isLoading } = useGetHardwareRequirements();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Hardware Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!requirements) {
    return null;
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Hardware Requirements for PoCC Mining
        </CardTitle>
        <CardDescription>
          Recommended laptop specifications for optimal mining performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Requirements Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">CPU</h3>
            </div>
            <p className="text-sm text-muted-foreground">{requirements.cpu}</p>
            <Badge variant="outline" className="text-xs">Minimum Requirement</Badge>
          </div>

          <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <MemoryStick className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Memory</h3>
            </div>
            <p className="text-sm text-muted-foreground">{requirements.memory}</p>
            <Badge variant="outline" className="text-xs">Recommended</Badge>
          </div>

          <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Storage</h3>
            </div>
            <p className="text-sm text-muted-foreground">{requirements.storage}</p>
            <Badge variant="outline" className="text-xs">Required</Badge>
          </div>

          <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">GPU</h3>
            </div>
            <p className="text-sm text-muted-foreground">{requirements.gpu}</p>
            <Badge variant="outline" className="text-xs">Enhanced Performance</Badge>
          </div>
        </div>

        {/* Intel Ultra 9 285 Highlight */}
        {variant === 'full' && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-blue-900 dark:text-blue-100">Intel Box Core Ultra 9 285 - Excellent for Neron Mining</h3>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {requirements.cpuComparison}
            </p>
            <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                {requirements.cpuDetails}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="h-4 w-4" />
              <span><strong>Expected Performance:</strong> 40-60% higher CWU output than standard i7 processors</span>
            </div>
          </div>
        )}

        {/* Visual Chart */}
        {variant === 'full' && (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="font-semibold mb-3 text-purple-900 dark:text-purple-100">Quick Reference Chart</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-800 dark:text-purple-200 font-medium">CPU:</span>
                <span className="text-purple-900 dark:text-purple-100">Intel i7 / AMD Ryzen 7 (min)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-800 dark:text-purple-200 font-medium">Excellent CPU:</span>
                <span className="text-purple-900 dark:text-purple-100 font-bold">Intel Ultra 9 285</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-800 dark:text-purple-200 font-medium">RAM:</span>
                <span className="text-purple-900 dark:text-purple-100">16GB+ (32GB with Ultra 9 285)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-800 dark:text-purple-200 font-medium">Storage:</span>
                <span className="text-purple-900 dark:text-purple-100">SSD (1TB NVMe optimal)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-800 dark:text-purple-200 font-medium">GPU:</span>
                <span className="text-purple-900 dark:text-purple-100">RTX 3060+ / Radeon 6700XT+</span>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Laptops */}
        {requirements.recommendedLaptops.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Recommended Laptop Models</h3>
            <p className="text-sm text-muted-foreground">
              Top laptop options for performance and reliability in PoCC mining:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {requirements.recommendedLaptops.map((laptop, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{laptop.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Note */}
        {variant === 'full' && (
          <div className="p-4 bg-muted border border-border rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Performance Considerations</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Higher CPU clock speeds improve CWU calculation performance</li>
              <li>• Intel Ultra 9 285 offers 40-60% better performance than minimum-spec CPUs</li>
              <li>• Dedicated GPU significantly enhances computational throughput</li>
              <li>• SSD storage reduces task loading and proof submission latency</li>
              <li>• Additional RAM allows for parallel task processing (32GB recommended with Ultra 9 285)</li>
              <li>• Desktop systems can accommodate Ultra 9 285 for maximum performance</li>
            </ul>
          </div>
        )}

        {/* Buying Guide Link */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open(requirements.buyingGuideLink, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Detailed Buying Guide
        </Button>
      </CardContent>
    </Card>
  );
}
