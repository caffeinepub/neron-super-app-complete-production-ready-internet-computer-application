import NeronLogo from './NeronLogo';

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <NeronLogo size="sm" variant="subtle" />
            <span className="text-sm font-medium text-muted-foreground">
              Neron Protocol
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025. Built with love using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
