import { TrendingUp, ShieldCheck, Target } from 'lucide-react';
import { TECH_STACK } from '../constants/data';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 border-y border-gray-900 bg-[#0c0c0c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-green-500 font-mono">01.</span> 
              El Código es el Medio, el Resultado el Fin.
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Mi enfoque es pragmático: elimino la fricción técnica para maximizar la eficiencia operativa. En <strong className="text-white">Power Electronics</strong>, mi misión es evolucionar el código core de <strong className="text-white">Power On Support</strong>, asegurando que el stock y el soporte técnico escalen sin errores.
              </p>
              <p>
                Domino el ciclo completo: desde la orquestación en <strong className="text-white">Kubernetes</strong> hasta la integración profunda con <strong className="text-white">SAP</strong>. He orquestado datos genómicos masivos y flujos logísticos portuarios donde cada milisegundo cuenta.
              </p>
              <p>
                Entiendo la tecnología como un activo financiero. Mi trabajo es garantizar que ese activo sea <strong className="text-white">fiable, seguro y extremadamente escalable</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center group">
                <TrendingUp className="text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Escalabilidad Industrial</span>
              </div>
              <div className="text-center group">
                <ShieldCheck className="text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Fiabilidad Crítica</span>
              </div>
              <div className="text-center group">
                <Target className="text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Foco en Resultados</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="group p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-500/50 transition-all flex flex-col items-center gap-3 text-center">
                <div className="p-3 bg-black rounded-lg group-hover:rotate-12 transition-transform shadow-inner">
                  {tech.icon}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
