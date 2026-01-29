import { Mail, ExternalLink, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block p-5 bg-green-500/10 rounded-3xl mb-10 shadow-inner">
          <Mail className="text-green-500" size={40} />
        </div>
        <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">
          {t.contact.title1} <br />
          <span className="text-green-500 italic">{t.contact.title2}</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-14 font-light leading-relaxed">
          {t.contact.subtitle}
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="mailto:emilio@dev.com" className="w-full md:w-auto px-12 py-6 bg-green-500 text-[#0a0a0a] rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(34,197,94,0.25)]">
            {t.contact.cta} <ExternalLink size={24} />
          </a>
          <div className="flex gap-4">
            <a href="#" className="p-5 bg-gray-900 rounded-2xl border border-gray-800 hover:text-green-500 hover:border-green-500/50 transition-all shadow-xl">
              <Linkedin size={28} />
            </a>
            <a href="#" className="p-5 bg-gray-900 rounded-2xl border border-gray-800 hover:text-green-500 hover:border-green-500/50 transition-all shadow-xl">
              <Github size={28} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Grid decorativo de fondo */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
};
