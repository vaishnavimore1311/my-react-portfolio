import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const PageLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, shouldReduceMotion ? 300 : 1600);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Pulsing ring */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              className="absolute w-24 h-24 rounded-full border-2 border-indigo-500/30"
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full border-2 border-indigo-400/40"
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.4, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Initials badge */}
            <motion.div
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40"
              animate={shouldReduceMotion ? {} : {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-mono font-black text-white text-3xl tracking-tight">VM</span>
            </motion.div>
          </div>

          {/* Name */}
          <motion.p
            className="text-white font-bold text-xl tracking-wide mb-2"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Vaishnavi More
          </motion.p>
          <motion.p
            className="text-indigo-400 text-xs font-mono tracking-widest uppercase mb-8"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Software Engineer · Data Analyst
          </motion.p>

          {/* Loading dots */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-indigo-500"
                animate={shouldReduceMotion ? {} : {
                  y: [0, -8, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

