import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants/data';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectsSection = () => {
  const { t } = useLanguage();
  const translation = t.projects;

  const getProjectCopy = (project: (typeof PROJECTS)[number]) => {
    if (project.translationKey === 'agent') {
      return {
        title: translation.agentTitle,
        description: translation.agentDesc,
        longDescription: translation.agentLongDesc
      };
    }

    if (project.translationKey === 'portfolio') {
      return {
        title: translation.portfolioTitle,
        description: translation.portfolioDesc,
        longDescription: translation.portfolioLongDesc
      };
    }

    return {
      title: project.title,
      description: project.description,
      longDescription: project.longDescription
    };
  };

  const getStatLabel = (labelKey?: 'precision' | 'latency' | 'uptime', fallback?: string) => {
    if (labelKey === 'precision') return translation.precision;
    if (labelKey === 'latency') return translation.latency;
    if (labelKey === 'uptime') return translation.uptime;
    return fallback ?? '';
  };

  return (
    <section id="projects" className="py-24 border-y border-gray-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-3">
          <span className="text-green-500 font-mono">04.</span>
          {translation.title}
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-1 gap-8">
          {PROJECTS.map((project, index) => (
            (() => {
              const copy = getProjectCopy(project);
              return (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-green-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-8 md:p-12">
                {/* Project Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                      {copy.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{copy.description}</p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {copy.longDescription}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 p-4 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg border border-green-500/20 group-hover:border-green-500/40 group-hover:from-green-500/30 transition-all">
                    {project.image}
                  </div>
                </div>

                {/* Stats */}
                {project.stats && project.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-black/30 rounded-lg border border-gray-800/50">
                    {project.stats.map((stat) => (
                      <div key={`${stat.label ?? stat.labelKey}-${stat.value}`} className="text-center">
                        <div className="text-green-400 font-bold text-xl mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-300 uppercase tracking-widest font-mono">
                          {getStatLabel(stat.labelKey, stat.label)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {(project.link || project.github) && (
                  <div className="flex gap-4 pt-6 border-t border-gray-800">
                    {project.link && (
                      <a
                        href={project.link}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-[#0a0a0a] transition-colors group/btn"
                      >
                        <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                        {translation.viewProject}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${copy.title} on GitHub`}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 hover:border-green-500/50 rounded-lg font-semibold text-gray-100 transition-colors group/btn"
                      >
                        <Github size={18} className="group-hover/btn:text-green-400 transition-colors" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
              );
            })()
          ))}
        </div>

        
      </div>
    </section>
  );
};
