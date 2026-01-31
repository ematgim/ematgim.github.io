import { Code2, Server, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ServicesSection = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t.services.service1Title,
      desc: t.services.service1Desc,
      icon: <Code2 className="text-green-500" size={32} />
    },
    {
      title: t.services.service2Title,
      desc: t.services.service2Desc,
      icon: <Server className="text-green-500" size={32} />
    },
    {
      title: t.services.service3Title,
      desc: t.services.service3Desc,
      icon: <Zap className="text-green-500" size={32} />
    }
  ];
  
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">{t.services.title}</h2>
          <div className="h-1 w-24 bg-green-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <div key={i} className="p-10 bg-gray-900/40 rounded-3xl border border-gray-800 hover:bg-gray-900/60 hover:-translate-y-2 transition-all shadow-xl group">
              <div className="mb-8 p-4 bg-black w-fit rounded-2xl group-hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-5">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
