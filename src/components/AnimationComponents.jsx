import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportConfig } from '../animations/variants';

// Wraps any section with a scroll-triggered fade-up reveal
export const ScrollReveal = ({ children, className = '', delay = 0, variant = 'fadeUp' }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    fadeUp,
    fadeIn,
    fadeLeft,
    fadeRight,
    scaleIn
  };

  const selectedVariant = variants[variant] || fadeUp;

  // Respect reduced motion — no movement, just fade
  const reducedVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={shouldReduceMotion ? reducedVariant : selectedVariant}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
};

// Stagger container that reveals children one by one on scroll
export const StaggerReveal = ({ children, className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const container = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } }
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay }
        }
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={container}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger child — to be used inside StaggerReveal
export const StaggerChild = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const childVariant = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : fadeUp;

  return (
    <motion.div className={className} variants={childVariant}>
      {children}
    </motion.div>
  );
};

// Section header with animated underline
export const AnimatedSectionHeader = ({ badge, title, description, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`text-center max-w-3xl mx-auto ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={shouldReduceMotion ? fadeIn : staggerContainer}
    >
      {badge && (
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 mb-3"
        >
          <span>{badge}</span>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        variants={shouldReduceMotion ? {} : {
          hidden: { width: 0 },
          visible: { width: 64, transition: { duration: 0.6, delay: 0.3 } }
        }}
        className="h-1 bg-indigo-600 rounded-full mx-auto mt-4"
        style={{ width: 64 }}
      />
    </motion.div>
  );
};

