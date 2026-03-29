import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
  </svg>
);

const WhatsAppCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Click-to-call CTA (Phone) */}
      <a 
        href="tel:+3725503644" 
        className="pointer-events-auto flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/40 shadow-lg text-dark hover:bg-white transition-all transform hover:-translate-y-1 group"
      >
        <div className="w-6 h-6 rounded-full bg-blue-accent/10 flex items-center justify-center text-blue-accent group-hover:bg-blue-accent group-hover:text-white transition-colors">
          <Phone size={12} fill="currentColor" />
        </div>
        <span className="text-[14px] font-bold">+372 550 3644</span>
      </a>

      {/* Floating WhatsApp CTA */}
      <div className="relative pointer-events-auto group">
        
        {/* Tooltip */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-dark text-white text-sm font-medium py-1.5 px-3 rounded-lg shadow-xl relative">
            {t('whatsapp.chat_with_us')}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-[5px] border-transparent border-l-dark w-0 h-0"></div>
          </div>
        </div>

        {/* Ripple Effects (3 layers) */}
        <div className="absolute inset-0 rounded-full bg-blue-accent animate-ripple opacity-60"></div>
        <div className="absolute inset-0 rounded-full bg-blue-accent animate-ripple opacity-40" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute inset-0 rounded-full bg-blue-accent animate-ripple opacity-20" style={{ animationDelay: '1.2s' }}></div>

        {/* Main Button */}
        <a 
          href="https://wa.me/3725503644" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-14 h-14 md:w-16 md:h-16 bg-blue-accent rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_rgba(0,172,206,0.5)] transform transition-transform duration-300 hover:scale-110"
        >
          <WhatsAppIcon className="w-8 h-8 md:w-9 md:h-9" />
        </a>
      </div>

    </div>
  );
};

export default WhatsAppCTA;
