import { ChevronRight } from 'lucide-react';
import profileImage from '../assets/profile.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <header id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Texto Hero */}
          <div className="md:col-span-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
              {t.hero.title1}{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                {t.hero.title2}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light border-l-2 border-green-500 pl-6 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-green-500 hover:bg-green-400 text-[#0a0a0a] rounded font-bold transition-all flex items-center gap-2 shadow-lg shadow-green-500/20">
                {t.hero.cta1} <ChevronRight size={18} />
              </a>
              <a href="#experience" className="px-8 py-4 bg-gray-900 border border-gray-800 hover:border-gray-600 text-white rounded font-bold transition-all">
                {t.hero.cta2}
              </a>
            </div>
          </div>

          {/* Fotografía de Emilio */}
          <div className="md:col-span-4 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[320px] md:max-w-full">
              {/* Glow decorativo detrás de la foto */}
              <div className="absolute -inset-4 bg-green-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-green-500/30 transition-all duration-500" />
              
              {/* Contenedor de la Imagen */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-800 bg-gray-900 group-hover:border-green-500/50 transition-all duration-500 shadow-2xl">
                <img 
                  src={profileImage} 
                  alt={t.hero.imageAlt}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                
                {/* Etiqueta flotante */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                  <p className="text-xs font-mono text-green-400 mb-1">{t.hero.statusLabel}</p>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{t.hero.statusText}</p>
                </div>
              </div>

              {/* Elementos decorativos tipo "tech" */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-green-500/50 rounded-tr-xl" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-green-500/50 rounded-bl-xl" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
