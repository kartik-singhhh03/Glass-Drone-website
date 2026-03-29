import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BeforeAfterSliderProps {
  image: string;
  className?: string;
}

const BeforeAfterSlider = ({ image, className = '' }: BeforeAfterSliderProps) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState(50);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none touch-none cursor-ew-resize group ${className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image (Simulated dirty with CSS filters so we don't need a real separate image) */}
      <img loading="lazy" 
        src={image} 
        alt="Before cleaning" 
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-[0.9] sepia-[0.3] grayscale-[0.2]" 
      />
      
      {/* After Image (Clean Image) */}
      <img loading="lazy" 
        src={image} 
        alt="After cleaning" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
        style={{ clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` }}
      />
      
      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center pointer-events-none drop-shadow-xl"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex gap-1 items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="w-1 h-3 bg-blue-accent/30 rounded-full"></div>
          <div className="w-1 h-5 bg-blue-accent/60 rounded-full"></div>
          <div className="w-1 h-3 bg-blue-accent/30 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute top-6 left-6 bg-dark/60 backdrop-blur-md text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider z-20 pointer-events-none">{t('slider.before')}</div>
      <div className="absolute top-6 right-6 bg-blue-accent/90 backdrop-blur-md text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider z-20 pointer-events-none">{t('slider.after')}</div>
    </div>
  );
};

export default BeforeAfterSlider;
