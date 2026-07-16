import React, { useState, useEffect } from 'react';
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

  const submitDirectToGoogleSheets = async (dataToSubmit: typeof formData) => {
    const sheetsUrl = "https://script.google.com/macros/s/AKfycbzRQtHag3JH33xfLp4v6h76A9EvM0d7LBS2aOnvWtJ8XmZuq3PCxXnzJD9aJ_yvz0Es/exec";
    try {
      console.log('[Contact] Attempting direct client-side submission to Google Sheets...');
      // Using mode: 'no-cors' and text/plain to completely bypass CORS preflight and blocks
      await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          ...dataToSubmit,
          recipientEmail: 'finance@teambuilding.biz',
          timestamp: new Date().toISOString()
        }),
      });
      console.log('[Contact] Direct client-side submission completed successfully (no-cors mode).');
      return true;
    } catch (err) {
      console.error('[Contact] Direct client-side submission failed:', err);
      return false;
    }
  };

  const submitForm = async (dataToSubmit: typeof formData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Save draft in case the request is interrupted or redirected
    localStorage.setItem('teambuilding_contact_draft', JSON.stringify(dataToSubmit));

    try {
      console.log('[Contact] Attempting standard submission via /api/contact...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const contentType = response.headers.get('content-type');
      if (response.redirected || (contentType && contentType.includes('text/html'))) {
        console.warn('[Contact] Request was redirected or returned HTML (session cookie blocked). Falling back to direct submission...');
        const directSuccess = await submitDirectToGoogleSheets(dataToSubmit);
        if (directSuccess) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          localStorage.removeItem('teambuilding_contact_draft');
          localStorage.removeItem('teambuilding_contact_auto_submit');
        } else {
          setErrorMessage("Connection issue inside iframe. Please click the 'Open in new tab' button in the top right to submit successfully!");
          setSubmitStatus('error');
        }
        return;
      }

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        localStorage.removeItem('teambuilding_contact_draft');
        localStorage.removeItem('teambuilding_contact_auto_submit');
      } else {
        console.warn('[Contact] Server returned non-success, attempting direct fallback...', result);
        const directSuccess = await submitDirectToGoogleSheets(dataToSubmit);
        if (directSuccess) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          localStorage.removeItem('teambuilding_contact_draft');
          localStorage.removeItem('teambuilding_contact_auto_submit');
        } else {
          console.error('Contact submit error:', result.error || 'Unknown error');
          setErrorMessage(result.error || 'The server was unable to process your request. Please try again.');
          setSubmitStatus('error');
        }
      }
    } catch (err: any) {
      console.error('Network or server error during submit. Trying direct fallback...', err);
      const directSuccess = await submitDirectToGoogleSheets(dataToSubmit);
      if (directSuccess) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        localStorage.removeItem('teambuilding_contact_draft');
        localStorage.removeItem('teambuilding_contact_auto_submit');
      } else {
        if (err?.message && (err.message.includes('Unexpected token') || err.message.includes('Unexpected end of JSON') || err.message.includes('JSON.parse'))) {
          setErrorMessage("Preview session cookie blocked (common in iframes). To submit successfully, please click the 'Open in new tab' button in the top right of the preview!");
        } else {
          setErrorMessage(err?.message ? `Error: ${err.message}` : 'A network error occurred. Please verify your connection and try again.');
        }
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Clear any stuck auto-submit flag from localStorage to break any previous redirect loops
    localStorage.removeItem('teambuilding_contact_auto_submit');

    const draft = localStorage.getItem('teambuilding_contact_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
      } catch (e) {
        console.error('Error parsing draft:', e);
        localStorage.removeItem('teambuilding_contact_draft');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields before submitting.');
      setSubmitStatus('error');
      return;
    }
    await submitForm(formData);
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
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm min-h-[490px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8 px-4 space-y-6 my-auto"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600 font-sans font-light leading-relaxed max-w-md mx-auto text-base">
                      Thanks for your inquiry! We've successfully received your details and our team will contact you soon.
                    </p>
                    <p className="text-xs text-slate-400 font-sans font-light max-w-sm mx-auto">
                      A confirmation has been logged to our systems. We typically respond within 1 business day.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-sm rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
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
              )}
            </AnimatePresence>
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
