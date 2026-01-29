import { Battery, Anchor, Dna, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ExperienceSection = () => {
  const { t } = useLanguage();
  
  const experiences = [
    {
      company: t.experience.exp1Company,
      role: t.experience.exp1Role,
      period: t.experience.exp1Period,
      milestone: t.experience.exp1Milestone,
      desc: t.experience.exp1Desc,
      tags: ['NestJs', 'Angular', 'MongoDB', 'SAP', 'CI/CD'],
      icon: <Battery className="text-green-400" />
    },
    {
      company: t.experience.exp2Company,
      role: t.experience.exp2Role,
      period: t.experience.exp2Period,
      milestone: t.experience.exp2Milestone,
      desc: t.experience.exp2Desc,
      tags: ['Docker Swarm', 'MariaDB', 'SAP', 'Spring Boot', 'Port APIs'],
      icon: <Anchor className="text-blue-400" />
    },
    {
      company: t.experience.exp3Company,
      role: t.experience.exp3Role,
      period: t.experience.exp3Period,
      milestone: t.experience.exp3Milestone,
      desc: t.experience.exp3Desc,
      tags: ['Kubernetes', 'Kafka', 'Java', 'MongoDB', 'Big Data'],
      icon: <Dna className="text-red-400" />
    },
    {
      company: t.experience.exp4Company,
      role: t.experience.exp4Role,
      period: t.experience.exp4Period,
      milestone: t.experience.exp4Milestone,
      desc: t.experience.exp4Desc,
      tags: ['Oracle', 'PL/SQL', 'Vue.js', 'Spring'],
      icon: <Package className="text-orange-400" />
    }
  ];
  
  return (
    <section id="experience" className="py-24 bg-black relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-20 flex items-center gap-4">
          <span className="text-green-500 font-mono text-xl">03.</span> 
          {t.experience.title}
        </h2>

        <div className="space-y-20">
          {experiences.map((job, i) => (
            <div key={i} className="group relative pl-10 md:pl-0 border-l border-gray-800 md:border-l-0">
              <div className="md:grid md:grid-cols-12 gap-10">
                <div className="md:col-span-3 mb-6 md:mb-0">
                  <p className="font-mono text-green-500 font-bold text-sm tracking-widest">{job.period}</p>
                  <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] font-bold mt-2 leading-tight">{job.company}</p>
                </div>
                <div className="md:col-span-9 p-10 bg-gray-900/30 rounded-[2rem] border border-gray-800 group-hover:border-green-500/30 group-hover:bg-gray-900/40 transition-all shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    {job.icon}
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-black rounded-xl border border-gray-800">{job.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{job.milestone}</h3>
                      <p className="text-green-400/80 font-mono text-xs mt-1 uppercase tracking-widest">{job.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-8 text-lg leading-relaxed font-light">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className={`px-4 py-1.5 text-[10px] font-bold font-mono border rounded-full tracking-wider ${['Kubernetes', 'SAP', 'NestJs', 'Architecture', 'Docker Swarm'].includes(tag) ? 'bg-green-500/5 border-green-500/40 text-green-400' : 'bg-black border-gray-800 text-gray-500'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
