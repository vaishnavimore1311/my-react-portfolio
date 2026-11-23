import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, ExternalLinkIcon, SparklesIcon, CheckCircleIcon, CloseIcon } from './Icons';
import { scaleIn, viewportConfig } from '../animations/variants';
import { AnimatedSectionHeader } from './AnimationComponents';

export const Projects = () => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Full-Stack & AI', 'Web Application', 'Data Analytics'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSectionHeader
          badge="Portfolio Work"
          title="Featured Projects"
          description="Real-world applications spanning artificial intelligence matching, cloud-ready enterprise web systems, and interactive business intelligence."
          className="mb-12"
        />

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={shouldReduceMotion ? {} : scaleIn}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600'
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              {selectedCategory === cat && (
                <motion.span
                  layoutId="categoryPill"
                  className="absolute inset-0 rounded-full bg-indigo-600"
                  style={{ zIndex: -1 }}
                />
              )}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden group"
                whileHover={shouldReduceMotion ? {} : {
                  y: -6,
                  boxShadow: '0 20px 48px -12px rgba(99,102,241,0.22)',
                  borderColor: '#6366f1'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-transparent dark:from-slate-800/60 dark:via-slate-800/20 dark:to-transparent border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                            <SparklesIcon className="w-3 h-3 text-amber-500" /> Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50 whitespace-nowrap">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Key Highlights:</p>
                      <ul className="space-y-1.5">
                        {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech, tIdx) => (
                        <motion.span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.08, backgroundColor: 'rgb(238 242 255)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <motion.button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer"
                        whileHover={shouldReduceMotion ? {} : { x: 4 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        View Details & Architecture →
                      </motion.button>

                      <div className="flex items-center space-x-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: -5 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -1 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                        >
                          <span>Code</span>
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  {activeModalProject.category}
                </span>
                <motion.button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <CloseIcon className="w-6 h-6" />
                </motion.button>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeModalProject.title}</h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{activeModalProject.tagline}</p>
              <p className="text-xs font-mono text-slate-400 mt-1">Development Period: {activeModalProject.period}</p>

              <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">{activeModalProject.description}</p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">Complete Feature Set:</h4>
                  <ul className="space-y-2">
                    {activeModalProject.keyFeatures.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start space-x-2 text-xs sm:text-sm"
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.07 + 0.2 }}
                      >
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700"
                        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 + 0.3, type: 'spring' }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <motion.a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Visit GitHub Repo</span>
                </motion.a>
                <motion.button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
