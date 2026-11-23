import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { BrainIcon, CodeIcon, ChartBarIcon, LayersIcon, DownloadIcon } from './Icons';
import { fadeLeft, fadeUp, viewportConfig } from '../animations/variants';
import { AnimatedSectionHeader, StaggerReveal, StaggerChild } from './AnimationComponents';

export const About = ({ onOpenResume }) => {
  const { about } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const highlightIcons = [
    <CodeIcon key="code" className="w-6 h-6 text-indigo-500" />,
    <ChartBarIcon key="chart" className="w-6 h-6 text-emerald-500" />,
    <BrainIcon key="brain" className="w-6 h-6 text-purple-500" />,
    <LayersIcon key="layers" className="w-6 h-6 text-amber-500" />
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSectionHeader
          badge="About Me"
          title={about.headline}
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Narrative Column */}
          <motion.div
            className="lg:col-span-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={shouldReduceMotion ? {} : {
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {about.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                variants={shouldReduceMotion ? {} : fadeLeft}
                className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              variants={shouldReduceMotion ? {} : fadeUp}
              className="pt-2 flex flex-wrap gap-4"
            >
              <motion.button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              >
                <DownloadIcon className="w-4 h-4" />
                <span>View Full Resume</span>
              </motion.button>

              <motion.a
                href="#skills"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              >
                <span>Browse Skills Matrix</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <StaggerReveal className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.highlights.map((item, idx) => (
              <StaggerChild key={idx}>
                <motion.div
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm h-full"
                  whileHover={shouldReduceMotion ? {} : {
                    y: -6,
                    borderColor: '#6366f1',
                    boxShadow: '0 12px 32px -8px rgba(99,102,241,0.18)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700"
                    whileHover={shouldReduceMotion ? {} : { rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {highlightIcons[idx % highlightIcons.length]}
                  </motion.div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
};
