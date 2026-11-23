import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { AwardIcon, ExternalLinkIcon, CheckCircleIcon } from './Icons';
import { AnimatedSectionHeader, StaggerReveal, StaggerChild } from './AnimationComponents';

export const Certifications = () => {
  const { certifications } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSectionHeader
          badge="Verified Credentials"
          title="Certificates & Honors"
          description="Professional certifications and verified assessments demonstrating programming acumen and domain expertise."
          className="mb-16"
        />

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <StaggerChild key={cert.id}>
              <motion.div
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full"
                whileHover={shouldReduceMotion ? {} : {
                  y: -6,
                  borderColor: '#6366f1',
                  boxShadow: '0 16px 36px -8px rgba(99,102,241,0.2)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50"
                      whileHover={shouldReduceMotion ? {} : { rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <AwardIcon className="w-6 h-6" />
                    </motion.div>
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{cert.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">Issued by {cert.issuer}</p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{cert.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 + sIdx * 0.05 + 0.2, type: 'spring' }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verify Credential</span>
                    <ExternalLinkIcon className="w-3 h-3 ml-0.5" />
                  </motion.a>
                </div>
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};
