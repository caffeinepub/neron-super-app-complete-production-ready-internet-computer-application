interface NeronLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'header' | 'subtle' | 'glow';
  className?: string;
}

export default function NeronLogo({ size = 'md', variant = 'default', className = '' }: NeronLogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const dimension = sizeMap[size];

  // Use the header variant for smaller sizes, main logo for larger
  const logoSrc = size === 'sm' || size === 'md' 
    ? '/assets/generated/neron-modern-logo-header-transparent.dim_200x200.png'
    : '/assets/generated/neron-modern-logo-transparent.dim_400x400.png';

  const variantClass = {
    default: '',
    header: 'neron-logo-header',
    subtle: 'neron-logo-subtle',
    glow: 'neron-logo-glow',
  }[variant];

  return (
    <img
      src={logoSrc}
      alt="Neron Protocol - Modern Logo"
      width={dimension}
      height={dimension}
      className={`${variantClass} ${className}`}
      style={{ width: dimension, height: dimension }}
    />
  );
}
