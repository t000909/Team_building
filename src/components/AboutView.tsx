import React from 'react';
import { motion } from 'motion/react';
import { Page } from '../types';
import { Compass, Lightbulb, CheckCircle, ShieldAlert, HeartHandshake, Eye, Sparkles, Trophy, Target, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: Page) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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

  const coreValues = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Exploring and implementing the latest technological advancements to deliver cutting-edge solutions.'
    },
    {
      icon: Trophy,
      title: 'Integrity',
      description: 'Maintaining the highest standards of quality in everything we do, ensuring our services consistently exceed your expectations.'
    },
    {
      icon: Target,
      title: 'Client Success',
      description: 'Building strong, long-term partnerships by focusing on unique needs and delivering personalized solutions.'
    },
    {
      icon: HeartHandshake,
      title: 'Reliability',
      description: 'Delivering dependable, high-quality services that you can consistently count on for your business needs.'
    },
    {
      icon: Sparkles,
      title: 'Continuous Improvement',
      description: 'Embracing a culture of continuous learning to refine our skills, processes, and services, ensuring we stay ahead in the industry.'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 pb-16 pt-8"
    >

      {/* Two Column Section */}
       <section className="max-w-7xl mx-auto px-6 text-left space-y-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
          We strive for excellence
        </motion.h1>
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <p className="text-slate-600 font-sans font-light leading-relaxed">
              Our mission at <span className="font-medium text-slate-900">TeamBuilding</span> is to empower businesses by providing innovative, reliable, and strategic IT solutions that drive growth and success. We align technology with your core business values, creating platforms that allow your business to scale naturally and confidently.
            </p>
            <p className="text-slate-600 font-sans font-light leading-relaxed">
              We leverage holistic engineering expertise, innovative methodology, and deep product sense to turn ideas into scalable realities, from minimum viable products to enterprise-grade integrations.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <div className="w-full aspect-auto lg:aspect-[16/10] py-8 lg:py-0 bg-gradient-to-tr from-slate-50 to-blue-50/20 rounded-xl border border-slate-200 p-4 sm:p-6 flex items-center justify-center relative overflow-hidden">
              {/* Symbolic decorative vectors */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-300/10 rounded-full blur-2xl" />
              
              <div className="flex flex-col gap-4 text-slate-800 w-full max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold font-sans text-slate-900">100% Client Commitment</h4>
                    <p className="text-sm text-slate-500 font-sans font-light">Custom tailored engineering for individual needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold font-sans text-slate-900">Agile Process Execution</h4>
                    <p className="text-sm text-slate-500 font-sans font-light">Transparency, speed, and continuous feedback.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold font-sans text-slate-900">Uncompromised Reliability</h4>
                    <p className="text-sm text-slate-500 font-sans font-light">Enterprise grade standards in every line of code.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Detail List */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold font-sans tracking-tight text-slate-900">
            Our Values
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          <p className="text-slate-600 text-lg font-sans font-light max-w-2xl mx-auto">
            These foundational pillars define how we partner with you, execute projects, and measure our mutual success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 text-left flex flex-col space-y-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-sans font-light flex-grow">{val.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Promise (CTA) */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-16 text-white rounded-2xl mx-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-8">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight leading-snug"
          >
            Our promise to you is built on a foundation of trust, excellence, and unwavering commitment to your success.
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate(Page.Contact)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold font-sans px-6 py-3 rounded-lg shadow-sm hover:shadow transition duration-200 cursor-pointer"
            >
              Get in touch
            </button>
            <button
              onClick={() => onNavigate(Page.Services)}
              className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-semibold font-sans px-6 py-3 rounded-lg transition duration-200 cursor-pointer"
            >
              Our Services
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
