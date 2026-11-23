import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, SendIcon, CodeIcon } from './Icons';
import { heroStagger, fadeUp, floatAnimation, floatAnimationSlow, floatAnimationFast, scaleIn } from '../animations/variants';

// Typing Effect Hook
function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 1800) {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(() => (shouldReduceMotion ? texts[0] : ''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        setDisplayText(texts[0]);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const currentText = texts[currentIndex];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration, shouldReduceMotion]);

  return displayText;
}

// Hero Slideshow Slide Data
const slides = [
  {
    badge: 'Available for Full-time Roles',
    highlight: 'Software Engineer',
    description: 'Building high-performance web applications with React, ASP.NET MVC, and Python — from idea to production.',
    color: 'from-indigo-600 via-purple-600 to-pink-500'
  },
  {
    badge: 'Data Analytics Specialist',
    highlight: 'Power BI Expert',
    description: 'Transforming raw datasets into interactive KPI dashboards using Power BI, DAX, Power Query, and SQL.',
    color: 'from-emerald-500 via-teal-500 to-cyan-500'
  },
  {
    badge: 'AI & Full-Stack Developer',
    highlight: 'Python & React Developer',
    description: 'Crafting AI-driven platforms like RoomiLink AI — combining FastAPI backends with beautiful React frontends.',
    color: 'from-orange-500 via-pink-500 to-rose-500'
  }
];

export const Hero = ({ onOpenResume }) => {
  const { personal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  // Typing effect for roles
  const typedText = useTypingEffect(personal.titles, 75, 35, 2000);

  // Slideshow state
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const goToSlide = (idx) => {
    setSlideDirection(idx > slideIndex ? 1 : -1);
    setSlideIndex(idx);
  };

  const currentSlide = slides[slideIndex];

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -20 : 20, transition: { duration: 0.3 } })
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">

      {/* Animated gradient background blobs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-500/15 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={heroStagger}
          >
            {/* Animated Slideshow Badge + Description */}
            <motion.div variants={fadeUp}>
              <motion.div
                key={`badge-${slideIndex}`}
                className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                  {currentSlide.badge}
                </span>
              </motion.div>
            </motion.div>

            {/* Name & Typing Effect */}
            <motion.div variants={fadeUp}>
              <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                Hello, World! I'm
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {personal.name}
              </h1>

              {/* Typing Effect Role */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mt-2 overflow-hidden">
                <span className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentSlide.color} bg-clip-text text-transparent`}>
                  {typedText}
                  <motion.span
                    className="inline-block w-0.5 h-6 sm:h-7 bg-indigo-500 ml-0.5 align-middle"
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(1)' }}
                  />
                </span>
              </div>
            </motion.div>

            {/* Animated Slide Description */}
            <motion.div variants={fadeUp} className="relative h-16 sm:h-14 overflow-hidden">
              <motion.p
                key={`desc-${slideIndex}`}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed absolute inset-0"
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {currentSlide.description}
              </motion.p>
            </motion.div>

            {/* Slideshow Dots + Pause/Play Controls */}
            <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      idx === slideIndex
                        ? 'w-6 h-2 bg-indigo-600 dark:bg-indigo-400'
                        : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 dark:hover:bg-indigo-500'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
              >
                {isPaused ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </motion.div>

            {/* Quick Location & Email */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                {personal.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MailIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                {personal.email}
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <motion.button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.button>

              <motion.a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <CodeIcon className="w-4 h-4 text-indigo-500" />
                <span>Explore Projects</span>
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <SendIcon className="w-4 h-4" />
                <span>Contact Me</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center lg:justify-start space-x-3 pt-3"
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Connect:</span>
              {[
                { href: personal.github, label: 'GitHub Profile', Icon: GithubIcon },
                { href: personal.linkedin, label: 'LinkedIn Profile', Icon: LinkedinIcon },
                { href: `mailto:${personal.email}`, label: 'Send Email', Icon: MailIcon }
              ].map(({ href, label, Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: [-3, 3, 0] }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl"
                animate={shouldReduceMotion ? {} : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Profile Card */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 p-3 shadow-2xl flex flex-col items-center justify-center"
                variants={floatAnimation}
                animate="animate"
              >
                {/* Avatar Block */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center shadow-inner">
                  <div className="text-center text-white">
                    <motion.div
                      className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg"
                      animate={shouldReduceMotion ? {} : { boxShadow: ['0 0 0 0 rgba(99,102,241,0)', '0 0 0 12px rgba(99,102,241,0.15)', '0 0 0 0 rgba(99,102,241,0)'] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <span className="font-extrabold text-4xl tracking-tighter text-white">VM</span>
                    </motion.div>
                    <div className="mt-3">
                      <p className="text-xs font-bold tracking-wider uppercase text-indigo-200">Engineer & Analyst</p>
                      <p className="text-[11px] text-indigo-100/80">Adarsh College, Vita</p>
                    </div>
                  </div>
                </div>

                {/* Micro Stats */}
                <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-100/90 dark:bg-slate-800/80 rounded-xl p-2 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">BCA Score</p>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">75% (04/2026)</p>
                  </div>
                  <div className="bg-slate-100/90 dark:bg-slate-800/80 rounded-xl p-2 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">SSC Distinction</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">88.80%</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-3 -right-2 sm:-right-4 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
                variants={floatAnimationFast}
                animate="animate"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">React & JS</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-4 sm:-left-8 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
                variants={floatAnimationSlow}
                animate="animate"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Python & AI</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -right-2 sm:-right-4 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
                variants={floatAnimation}
                animate="animate"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Power BI & SQL</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Banner */}
        <motion.div
          className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
        >
          {personal.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/70 text-center transition-colors"
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, borderColor: '#6366f1' }}
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{stat.value}</p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
