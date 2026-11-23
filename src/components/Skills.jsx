import { useState, useRef } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { fadeUp, viewportConfig } from '../animations/variants';
import { AnimatedSectionHeader } from './AnimationComponents';

// Animated progress bar that fires when scrolled into view
const AnimatedSkillBar = ({ level, shouldReduceMotion }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={shouldReduceMotion
          ? { duration: 0 }
          : { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
        }
      />
    </div>
  );
};

export const Skills = () => {
  const { skillCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', ...skillCategories.map(c => c.name)];

  const getFilteredSkills = () => {
    let list = [];
    skillCategories.forEach(cat => {
      if (selectedCategory === 'All' || selectedCategory === cat.name) {
        cat.skills.forEach(s => {
          list.push({ ...s, category: cat.name });
        });
      }
    });
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }
    return list;
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSectionHeader
          badge="Technical Capabilities"
          title="Skills & Expertise"
          description="A comprehensive overview of programming languages, web engineering stacks, data analytics suites, and development workflows."
          className="mb-12"
        />

        {/* Filter Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search skill (e.g. Python, SQL)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={`${skill.name}-${skill.category}`}
                variants={shouldReduceMotion ? {} : {
                  hidden: { opacity: 0, y: 24, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={shouldReduceMotion ? {} : {
                  y: -4,
                  boxShadow: '0 8px 24px -6px rgba(99,102,241,0.2)',
                  borderColor: '#6366f1'
                }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-200 group cursor-default"
                layout
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {skill.name.substring(0, 2).toUpperCase()}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{skill.name}</h3>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{skill.category}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{skill.level}%</span>
                </div>
                <AnimatedSkillBar level={skill.level} shouldReduceMotion={shouldReduceMotion} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <motion.div
            className="text-center py-12 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm">No skills found matching "{searchTerm}". Try another keyword!</p>
          </motion.div>
        )}

        {/* Domain Matrix Footer */}
        <motion.div
          className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-100 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Data Analytics & Full-Stack Synergy
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Specialized in combining interactive web frontends with clean data pipelines, Power BI reporting, and predictive AI algorithms.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Power Query & DAX', 'ASP.NET & C#', 'React & FastAPI'].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
