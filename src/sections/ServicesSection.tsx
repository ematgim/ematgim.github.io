import { SERVICES } from '../constants/data';

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">¿Cómo puedo ayudarte?</h2>
          <div className="h-1 w-24 bg-green-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {SERVICES.map((service, i) => (
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
