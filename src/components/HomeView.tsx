import React from 'react';
import { motion } from 'motion/react';
import { Page } from '../types';
import { Cpu, Users, ShieldCheck, Award, ArrowRight, Code, HelpCircle, Activity, Settings, BookOpen, Layers } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
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

  const values = [
    {
      icon: Cpu,
      title: 'Innovative Thinking',
      description: 'We use the latest technologies to turn ideas into reality, leading in software development.'
    },
    {
      icon: Users,
      title: 'Client-Centric Focus',
      description: 'We focus on each client\'s unique needs, ensuring personalized and successful solutions.'
    },
    {
      icon: ShieldCheck,
      title: 'Unwavering Reliability',
      description: 'We deliver dependable, high-quality solutions, building trust and long-term partnerships.'
    },
    {
      icon: Award,
      title: 'Holistic Expertise',
      description: 'Our diverse team finds unique opportunities, driving innovation and effective solutions.'
    }
  ];

  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Crafting innovative, scalable, and robust software solutions that align with your business objectives. From web and mobile applications to complex enterprise systems, we bring your vision to life.'
    },
    {
      icon: Settings,
      title: 'IT Strategy and Consulting',
      description: 'Navigating the complexities of technology with strategic insights and a clear roadmap. We help you leverage cutting-edge technologies to optimize operations, enhance productivity, and achieve your business goals.'
    },
    {
      icon: Layers,
      title: 'System Integration',
      description: 'Ensuring seamless connectivity across your IT ecosystem. We integrate disparate systems to create a cohesive and efficient technology environment, maximizing your investment and streamlining operations.'
    },
    {
      icon: Activity,
      title: 'Project Management',
      description: 'Delivering projects on time, within scope, and on budget. Our project managers and agile coaches guide your teams through the project lifecycle, fostering agility and ensuring successful outcomes.'
    },
    {
      icon: BookOpen,
      title: 'Training and Support',
      description: 'Empowering your team with the knowledge and skills to excel. We offer technical training and ongoing support to keep your systems running smoothly and efficiently.'
    },
    {
      icon: HelpCircle,
      title: 'Product Management',
      description: 'Bringing your product ideas to market with strategic vision and meticulous execution. From concept to MVP development, we manage the product lifecycle to ensure market success.'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 pb-16"
    >
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center pt-8 md:pt-16">
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-blue-100/30 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={itemVariants} className="lg:col-span-12 space-y-8 text-left max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight text-slate-900 leading-[1.1]">
              Discover digital opportunities and build <span className="text-blue-600">tailored solutions</span> to unlock them
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-sans font-light leading-relaxed max-w-2xl">
              — Partner with us to tap your full potential and achieve extraordinary success in today's dynamic digital landscape.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate(Page.Services)}
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md shadow-blue-100 transition duration-200 cursor-pointer"
              >
                Check the services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate(Page.Contact)}
                className="inline-flex items-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-sans font-semibold text-sm px-6 py-3.5 rounded-lg shadow-xs transition duration-200 cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-slate-50/50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold font-sans tracking-tight text-slate-900">
              Our Values
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col text-left space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-sans">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-light flex-grow">{val.description}</p>
                  <button
                    onClick={() => onNavigate(Page.About)}
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group/btn hover:text-blue-700 w-fit pt-2 cursor-pointer"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-slate-900">
              Comprehensive Services Tailored to Your Needs
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
            <p className="text-slate-600 text-lg font-sans font-light leading-relaxed">
              From custom software development to strategic IT consulting, our expert team delivers innovative, reliable solutions that drive success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((ser, idx) => {
              const IconComp = ser.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col text-left space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                    {ser.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-light flex-grow">
                    {ser.description}
                  </p>
                  <button
                    onClick={() => onNavigate(Page.Services)}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm pt-4 group/btn cursor-pointer"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise (CTA) Section */}
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
