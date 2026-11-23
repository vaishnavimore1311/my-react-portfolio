import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircleIcon, AlertCircleIcon, CopyIcon, CheckIcon, GithubIcon, LinkedinIcon } from './Icons';
import { AnimatedSectionHeader } from './AnimationComponents';
import { fadeLeft, fadeRight, scaleIn, viewportConfig } from '../animations/variants';

export const Contact = () => {
  const { personal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Please enter your full name.';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = 'Email address is required.';
      else if (!emailRegex.test(value)) error = 'Please enter a valid email address.';
    } else if (name === 'subject') {
      if (!value.trim()) error = 'Please provide a subject.';
      else if (value.trim().length < 3) error = 'Subject must be at least 3 characters.';
    } else if (name === 'message') {
      if (!value.trim()) error = 'Message cannot be empty.';
      else if (value.trim().length < 10) error = 'Message should be at least 10 characters long.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1200);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const socialLinks = [
    { href: personal.github, icon: GithubIcon, label: 'GitHub' },
    { href: personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <AnimatedSectionHeader
          badge="Get In Touch"
          title="Let's Build Something Great Together"
          subtitle="Have a project in mind, an exciting job opportunity, or simply want to connect? Send a message or reach out directly!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            variants={shouldReduceMotion ? {} : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-indigo-200 text-sm mt-2 leading-relaxed">
                Feel free to contact me via email or phone. I'm responsive and look forward to discussing engineering and data initiatives.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                {/* Email */}
                <motion.div
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                  whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3 truncate mr-2">
                    <div className="p-2 rounded-xl bg-white/20">
                      <MailIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs text-indigo-200 font-medium">Email</p>
                      <a href={`mailto:${personal.email}`} className="text-xs sm:text-sm font-semibold hover:underline truncate block">
                        {personal.email}
                      </a>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(personal.email, 'email')}
                    title="Copy Email"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  >
                    {copiedType === 'email' ? <CheckIcon className="w-4 h-4 text-emerald-300" /> : <CopyIcon className="w-4 h-4 text-white" />}
                  </motion.button>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                  whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/20">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200 font-medium">Phone</p>
                      <a href={`tel:${personal.phone}`} className="text-xs sm:text-sm font-semibold hover:underline">
                        {personal.phone}
                      </a>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(personal.phone, 'phone')}
                    title="Copy Phone"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  >
                    {copiedType === 'phone' ? <CheckIcon className="w-4 h-4 text-emerald-300" /> : <CopyIcon className="w-4 h-4 text-white" />}
                  </motion.button>
                </motion.div>

                {/* Location */}
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="p-2 rounded-xl bg-white/20">
                    <MapPinIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 font-medium">Location</p>
                    <p className="text-xs sm:text-sm font-semibold">{personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs text-indigo-200">Find me on:</span>
                <div className="flex items-center space-x-3">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label={label}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.15, y: -2 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Banner */}
            <motion.div
              className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center space-x-3"
              variants={shouldReduceMotion ? {} : scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Open for Opportunities</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">Software Engineer, Full-Stack Developer, and Data Analyst roles.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            variants={shouldReduceMotion ? {} : fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                Fill out the form below. All fields include client-side validation.
              </p>

              {/* Success Notification */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    key="success"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start space-x-3"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Thank you for reaching out, Vaishnavi will get back to you shortly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          key="name-err"
                          initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"
                        >
                          <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                        errors.email
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          key="email-err"
                          initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"
                        >
                          <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Job Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        key="subject-err"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"
                      >
                        <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400">
                      {formData.message.length} chars (min 10)
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message details here..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                    }`}
                  ></textarea>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        key="msg-err"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"
                      >
                        <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
                  whileHover={shouldReduceMotion || isSubmitting ? {} : { scale: 1.02, y: -1 }}
                  whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
