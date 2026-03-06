import { useEffect, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useQRScanner } from '../qr-code/useQRScanner';

interface QRScannerProps {
  onScanComplete: (data: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScanComplete, onClose }: QRScannerProps) {
  const {
    qrResults,
    isScanning,
    isActive,
    isSupported,
    error,
    canStartScanning,
    startScanning,
    stopScanning,
    videoRef,
    canvasRef,
  } = useQRScanner({
    facingMode: 'environment',
    scanInterval: 100,
    maxResults: 1,
  });

  useEffect(() => {
    if (canStartScanning) {
      startScanning();
    }
    return () => {
      if (isActive) {
        stopScanning();
      }
    };
  }, [canStartScanning]);

  useEffect(() => {
    if (qrResults.length > 0) {
      const latestResult = qrResults[0];
      onScanComplete(latestResult.data);
      stopScanning();
    }
  }, [qrResults, onScanComplete, stopScanning]);

  if (isSupported === false) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Camera Not Supported</CardTitle>
          <CardDescription>
            Your device or browser does not support camera access for QR scanning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <CardTitle>Scan QR Code</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Position the QR code within the camera view to scan the ICP address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-primary rounded-lg animate-pulse" />
            </div>
          )}

          {/* Status indicator */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
              {isScanning ? (
                <span className="text-green-500 font-medium">Scanning...</span>
              ) : (
                <span className="text-muted-foreground">Initializing camera...</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={canStartScanning ? startScanning : stopScanning}
            disabled={!isSupported}
            className="flex-1"
          >
            {isActive ? 'Stop Scanning' : 'Start Scanning'}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
