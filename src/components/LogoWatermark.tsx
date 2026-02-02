import { LOGO_URL, BRAND_NAME, WATERMARK_OPACITY, WATERMARK_SIZE } from '../constants/brand';

interface LogoWatermarkProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: string;
}

const positionClasses = {
  'bottom-right': 'bottom-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'top-right': 'top-2 right-2',
  'top-left': 'top-2 left-2',
};

export default function LogoWatermark({ 
  className = '', 
  position = 'bottom-right',
  size = WATERMARK_SIZE 
}: LogoWatermarkProps) {
  return (
    <div 
      className={`absolute ${positionClasses[position]} z-[5] bg-white/90 rounded-md px-1.5 py-1 shadow-sm pointer-events-none ${className}`}
      style={{ opacity: WATERMARK_OPACITY }}
    >
      <img
        src={LOGO_URL}
        alt={BRAND_NAME}
        style={{ height: size }}
        className="w-auto object-contain"
      />
    </div>
  );
}
