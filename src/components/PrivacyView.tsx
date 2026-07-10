import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, Globe, FileText } from 'lucide-react';

export default function PrivacyView() {
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

  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: 'We only collect basic information necessary to provide our IT consulting and software development services. This may include your name, business email address, and any project description notes you provide in our contact forms.'
    },
    {
      icon: Globe,
      title: '2. How We Use Your Information',
      content: 'Any information we collect is used solely to reply to inquiries, evaluate project requirements, coordinate design/build services, and maintain active business communications with our clients. We do not sell or lease client information.'
    },
    {
      icon: Lock,
      title: '3. Data Protection and Security',
      content: 'We implement industry-standard administrative, physical, and electronic security safeguards to prevent unauthorized access, disclosure, or modification of any information collected on teambuilding.biz.'
    },
    {
      icon: Shield,
      title: '4. Cookies and Analytical Trackers',
      content: 'Our website uses essential and security-related cookies to provide stable browsing performance. We do not use aggressive third-party trackers or ad targeting scripts.'
    },
    {
      icon: FileText,
      title: '5. Updates to This Policy',
      content: 'We reserve the right to modify this Privacy Policy from time to time. Any changes will be posted here on this page with an updated effective revision date.'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto px-6 py-8 space-y-12 text-left"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-4 border-b border-slate-100 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Privacy Policy
        </h1>
      </motion.div>

      {/* Intro */}
      <motion.div variants={itemVariants} className="space-y-4">
        <p className="text-slate-600 font-sans font-light leading-relaxed">
          At <span className="font-semibold text-slate-900">TeamBuilding</span>, accessible from <span className="text-blue-600">teambuilding.biz</span>, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document outlines the types of information that are collected and recorded by TeamBuilding and how we utilize it.
        </p>
        <p className="text-slate-600 font-sans font-light leading-relaxed">
          If you have additional questions or require more information about our Privacy Policy, please do not hesitate to contact us at <a href="mailto:contact@teambuilding.biz" className="text-blue-600 font-medium hover:underline">contact@teambuilding.biz</a>.
        </p>
      </motion.div>

      {/* Main Sections */}
      <motion.div variants={itemVariants} className="space-y-8">
        {sections.map((sec, idx) => {
          const IconComp = sec.icon;
          return (
            <div key={idx} className="p-6 bg-slate-50/50 rounded-xl border border-slate-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <IconComp className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-sans">
                  {sec.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-sans font-light">
                  {sec.content}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>


    </motion.div>
  );
}
