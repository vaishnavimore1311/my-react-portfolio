import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GraduationCapIcon, CheckCircleIcon } from './Icons';
import { fadeLeft, fadeRight } from '../animations/variants';
import { AnimatedSectionHeader } from './AnimationComponents';

export const Education = () => {
  const { education } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSectionHeader
          badge="Academic Background"
          title="Education Journey"
          description="A chronological timeline of my formal education, academic performance, and foundational technical training."
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            className="absolute top-2 bottom-2 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-indigo-200 dark:bg-indigo-900/60"
            initial={shouldReduceMotion ? {} : { scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          <div className="space-y-10">
            {education.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const cardVariant = shouldReduceMotion ? {} : (isEven ? fadeLeft : fadeRight);

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start">

                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md z-10"
                    initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: idx * 0.15 + 0.2 }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 10 }}
                  >
                    <GraduationCapIcon className="w-4 h-4" />
                  </motion.div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                  }`}>
                    <motion.div
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      variants={cardVariant}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={shouldReduceMotion ? {} : {
                        y: -6,
                        borderColor: '#6366f1',
                        boxShadow: '0 12px 32px -8px rgba(99,102,241,0.18)'
                      }}
                    >
                      <div className={`flex flex-wrap items-center gap-2 mb-2 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                          {item.period}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {item.score}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.degree}</h3>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{item.institution}</p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{item.description}</p>

                      <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-1.5 ${
                        isEven ? 'md:items-end' : 'md:items-start'
                      }`}>
                        {item.highlights.map((h, hIdx) => (
                          <motion.div
                            key={hIdx}
                            className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400"
                            initial={shouldReduceMotion ? {} : { opacity: 0, x: isEven ? 10 : -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + hIdx * 0.07 + 0.3 }}
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>{h}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
