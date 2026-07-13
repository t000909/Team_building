import React from 'react';
import { motion } from 'motion/react';
import { Page } from '../types';
import { Code, Settings, Layers, Activity, BookOpen, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (page: Page) => void;
}

export default function ServicesView({ onNavigate }: ServicesViewProps) {
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

  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Crafting innovative, scalable, and robust software solutions that align with your business objectives. From web and mobile applications to complex enterprise systems, we bring your vision to life.',
      bullets: [
        'Future-proof software that grows with your business',
        'Solutions specifically designed to meet your unique requirements',
        'Streamlines processes and improves productivity'
      ]
    },
    {
      icon: Settings,
      title: 'IT Strategy and Consulting',
      description: 'Navigating the complexities of technology with strategic insights and a clear roadmap. We help you leverage cutting-edge technologies to optimize operations, enhance productivity, and achieve your business goals.',
      bullets: [
        'Clear direction to achieve your IT and business goals.',
        'Ensures technology supports your business objectives.',
        'Long-term planning for continued success.'
      ]
    },
    {
      icon: Layers,
      title: 'System Integration',
      description: 'Ensuring seamless connectivity across your IT ecosystem. We integrate disparate systems to create a cohesive and efficient technology environment, maximizing your investment and streamlining operations.',
      bullets: [
        'Improved system performance and reliability.',
        'Unified systems that work together efficiently.',
        'Smooth data transfer between systems, enhancing productivity.'
      ]
    },
    {
      icon: Activity,
      title: 'Project Management',
      description: 'Delivering projects on time, within scope, and on budget. Our project managers and agile coaches guide your teams through the project lifecycle, fostering agility and ensuring successful outcomes.',
      bullets: [
        'Agile processes tailored to your velocity and team size.',
        'Predictable deliveries with transparent sprint tracking.',
        'Risk mitigation plans and continuous scope management.'
      ]
    },
    {
      icon: BookOpen,
      title: 'Training and Support',
      description: 'Empowering your team with the knowledge and skills to excel. We offer technical training and ongoing support to keep your systems running smoothly and efficiently.',
      bullets: [
        'Skilled staff that can handle new technologies confidently.',
        'Access to expert guidance and troubleshooting.',
        'Keeps systems running with minimal interruptions.'
      ]
    },
    {
      icon: HelpCircle,
      title: 'Product Management',
      description: 'Bringing your product ideas to market with strategic vision and meticulous execution. From concept to MVP development, we manage the product lifecycle to ensure market success.',
      bullets: [
        'Products launched successfully, maximizing market potential.',
        'Products managed effectively from concept to launch.',
        'Solutions designed to satisfy market demands.'
      ]
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 pb-16 pt-8"
    >

      {/* Detailed Services Grid */}
      <section className="max-w-7xl mx-auto px-6 text-left space-y-6">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
         <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
          Comprehensive Services Tailored to Your Needs
        </motion.h1>
        <div className="w-12 h-1 bg-blue-600 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((ser, idx) => {
              const IconComp = ser.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col text-left space-y-6 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">
                      {ser.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-light flex-grow">
                    {ser.description}
                  </p>

                  {/* Bullet points section */}
                  {ser.bullets && (
                    <ul className="space-y-2.5 border-t border-slate-100 pt-4 flex-shrink-0">
                      {ser.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-start gap-2.5 text-sm text-slate-700 font-sans">
                          <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise Call To Action */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-16 text-white rounded-2xl mx-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-8">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight leading-snug"
          >
            Ready to bring your software ideas or strategic roadmap to life?
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate(Page.Contact)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold font-sans px-6 py-3 rounded-lg shadow-sm hover:shadow transition duration-200 cursor-pointer"
            >
              Get in touch
            </button>
            <button
              onClick={() => onNavigate(Page.About)}
              className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-semibold font-sans px-6 py-3 rounded-lg transition duration-200 cursor-pointer"
            >
              Learn about us
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
