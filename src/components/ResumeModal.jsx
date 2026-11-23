import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { CloseIcon, DownloadIcon, MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon, GraduationCapIcon, AwardIcon } from './Icons';
import { modalBackdrop, modalContent } from '../animations/variants';

export const ResumeModal = ({ isOpen, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const { personal, education, skillCategories, projects, certifications } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const resumeContent = `
=====================================================
${personal.name.toUpperCase()} - ${personal.role.toUpperCase()}
=====================================================
Email: ${personal.email} | Phone: ${personal.phone} | Location: ${personal.location}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}

-----------------------------------------------------
EDUCATION
-----------------------------------------------------
${education.map(e => `• ${e.degree} - ${e.institution} (${e.period}) - Score: ${e.score}\n  ${e.description}`).join('\n\n')}

-----------------------------------------------------
TECHNICAL SKILLS
-----------------------------------------------------
${skillCategories.map(c => `• ${c.name}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

-----------------------------------------------------
FEATURED PROJECTS
-----------------------------------------------------
${projects.map(p => `• ${p.title} (${p.period})\n  ${p.tagline}\n  Tech: ${p.technologies.join(', ')}\n  Key Highlights: ${p.keyFeatures.join('; ')}`).join('\n\n')}

-----------------------------------------------------
CERTIFICATES
-----------------------------------------------------
${certifications.map(c => `• ${c.name} (${c.date}) - ${c.issuer}`).join('\n')}
=====================================================
    `;

    const blob = new Blob([resumeContent.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          variants={shouldReduceMotion ? {} : modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8"
            variants={shouldReduceMotion ? {} : modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <GraduationCapIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Curriculum Vitae</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Official Profile &amp; Credentials</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm cursor-pointer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download Text CV</span>
                </motion.button>
                <motion.button
                  onClick={handlePrint}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <span>Print / PDF</span>
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close modal"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <CloseIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Printable/Preview Resume Content */}
            <div className="space-y-6 text-slate-800 dark:text-slate-200 font-sans">
              {/* Header */}
              <div className="text-center border-b border-slate-100 dark:border-slate-800/80 pb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{personal.name}</h1>
                <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mt-1">{personal.role}</p>

                <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-3">
                  <span className="flex items-center gap-1.5"><MailIcon className="w-3.5 h-3.5 text-indigo-500" /> {personal.email}</span>
                  <span className="flex items-center gap-1.5"><PhoneIcon className="w-3.5 h-3.5 text-indigo-500" /> {personal.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPinIcon className="w-3.5 h-3.5 text-indigo-500" /> {personal.location}</span>
                </div>

                <div className="flex justify-center gap-4 text-xs md:text-sm text-indigo-600 dark:text-indigo-400 mt-2">
                  <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <span>•</span>
                  <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/50 pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{edu.degree}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{edu.institution}</p>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Percentage: {edu.score}</p>
                      </div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                        {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/50 pb-1 mb-3">
                  Technical &amp; Professional Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {skillCategories.map((cat, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">{cat.name}:</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {cat.skills.map(s => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/50 pb-1 mb-3">
                  Key Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{proj.title}</h3>
                        <span className="text-slate-500 font-mono text-[11px]">{proj.period}</span>
                      </div>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium my-0.5">{proj.tagline}</p>
                      <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{proj.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-700 dark:text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/50 pb-1 mb-3">
                  Certifications &amp; Recognitions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center space-x-2">
                      <AwardIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
              Click outside or close to return to portfolio.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
