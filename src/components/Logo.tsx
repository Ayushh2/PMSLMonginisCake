import { LOGO_URL, BRAND_NAME } from '../constants/brand';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-14',
};

export default function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={LOGO_URL}
        alt={BRAND_NAME}
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
      {showText && (
        <span className="font-playfair font-bold text-xl text-magenta-700">
          {BRAND_NAME}
        </span>
      )}
    </div>
  );
}
