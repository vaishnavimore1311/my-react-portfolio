import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpIcon, GithubIcon, LinkedinIcon } from './Icons';
import { fadeUp, viewportConfig } from '../animations/variants';

export const Footer = () => {
  const { personal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { href: personal.github, icon: GithubIcon, label: 'GitHub' },
    { href: personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          variants={shouldReduceMotion ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >

          {/* Logo & Persona */}
          <motion.div
            className="flex items-center space-x-3 text-center md:text-left"
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
              V
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {personal.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Software Engineer &bull; Pune, India
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            {quickLinks.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                className="hover:text-indigo-600 dark:hover:text-white transition-colors"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {label}
              </motion.a>
            ))}
          </div>

          {/* Back to top & Socials */}
          <div className="flex items-center space-x-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                whileHover={shouldReduceMotion ? {} : { scale: 1.12, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
            <motion.button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-xs cursor-pointer"
              title="Back to Top"
              whileHover={shouldReduceMotion ? {} : { scale: 1.12, y: -3 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowUpIcon className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2"
          variants={shouldReduceMotion ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Built with <span className="text-indigo-600 font-semibold">React.js</span>, <span className="text-sky-500 font-semibold">Tailwind CSS</span> &amp; <span className="text-purple-500 font-semibold">Vite</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
