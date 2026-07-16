import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, AlertCircle, MapPin, Building2, Mail } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields before submitting.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Contact submit error:', result.error || 'Unknown error');
        setErrorMessage(result.error || 'The server was unable to process your request. Please try again.');
        setSubmitStatus('error');
      }
    } catch (err: any) {
      console.error('Network or server error during submit:', err);
      setErrorMessage(err?.message ? `Error: ${err.message}` : 'A network error occurred. Please verify your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16 pb-16 pt-8"
    >

      {/* Main Contact Content */}
      <section className="max-w-7xl mx-auto px-6 text-left space-y-10">
        <div className="space-y-4">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            We’d love to hear from you
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-slate-600 font-sans font-light leading-relaxed max-w-4xl">
            Whether you are looking for custom development, IT strategic insights, or enterprise system integrations, our team is ready to assist.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Portal Message Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
              Get in touch
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700 font-sans">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 font-sans">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-700 font-sans">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700 font-sans">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-200 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Status Feedbacks */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg text-sm flex items-center gap-3 font-sans"
                  >
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Your message has been sent successfully! Our team will get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-lg text-sm flex items-center gap-3 font-sans"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{errorMessage || 'An error occurred. Please try again.'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-sans font-semibold py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm cursor-pointer"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
                <Send className={`w-4 h-4 transition-transform ${isSubmitting ? 'translate-x-1 translate-y-[-2px]' : 'group-hover:translate-x-0.5'}`} />
              </button>
            </form>
          </motion.div>

          {/* Contact & Corporate Info Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8 bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 h-full">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                Corporate Headquarters
              </h3>
              <p className="text-sm text-slate-500 font-sans font-light leading-relaxed">
                We're based in Montevideo, Uruguay. Feel free to contact us or send an inquiry.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">Company Name</h4>
                  <p className="text-sm text-slate-600 font-sans font-light">TEAM BUILDING URUGUAY SAS</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">Address</h4>
                  <p className="text-sm text-slate-600 font-sans font-light leading-relaxed">
                    Avenida General Fructuoso Rivera number 6666,<br />
                    Montevideo, Uruguay
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">Email Contacts</h4>
                  <p className="text-sm text-slate-600 font-sans font-light">
                  <a href="mailto:finance@teambuilding.biz" className="text-blue-600 hover:underline">finance@teambuilding.biz</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>
    </motion.div>
  );
}
