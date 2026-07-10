import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';
import Logo from './components/Logo';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import ContactView from './components/ContactView';
import PrivacyView from './components/PrivacyView';
import { Menu, X, Globe, Mail, Phone, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const menuItems = [
    { label: 'Home', page: Page.Home },
    { label: 'About', page: Page.About },
    { label: 'Services', page: Page.Services },
    { label: 'Contact', page: Page.Contact }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-700">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavigate(Page.Home)}
            className="focus:outline-none hover:opacity-90 active:scale-98 transition-all duration-200"
            id="header-logo"
          >
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`relative py-2 font-sans font-medium text-sm transition-colors duration-200 cursor-pointer ${
                  currentPage === item.page
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id={`nav-item-${item.page}`}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            <button
              onClick={() => handleNavigate(Page.Contact)}
              className="bg-slate-900 hover:bg-blue-600 text-white font-sans font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all duration-300"
              id="nav-cta"
            >
              Get in touch
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden shadow-lg"
              id="mobile-nav-panel"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className={`text-left py-3 font-sans font-medium text-base border-b border-slate-50 last:border-none transition-colors ${
                      currentPage === item.page
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    id={`mobile-nav-item-${item.page}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate(Page.Contact)}
                  className="w-full text-center bg-slate-900 hover:bg-blue-600 text-white font-sans font-medium py-3 rounded-lg text-sm mt-2"
                  id="mobile-nav-cta"
                >
                  Get in touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Stage Component */}
      <main className="flex-grow" id="app-main-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === Page.Home && <HomeView onNavigate={handleNavigate} />}
            {currentPage === Page.About && <AboutView onNavigate={handleNavigate} />}
            {currentPage === Page.Services && <ServicesView onNavigate={handleNavigate} />}
            {currentPage === Page.Contact && <ContactView />}
            {currentPage === Page.Privacy && <PrivacyView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Component ("Still thinking about it?") */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800" id="app-footer">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-6 text-left">
              <Logo className="invert brightness-0" />
              <p className="text-slate-400 font-sans font-light text-sm leading-relaxed max-w-sm pt-2">
                Empowering businesses with modern software systems, reliable engineering consulting, and robust strategic IT governance.
              </p>

            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-6 text-left">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-300 font-sans">
                Still thinking about it?
              </h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-slate-400">
                {menuItems.map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => handleNavigate(item.page)}
                      className={`hover:text-white transition-colors cursor-pointer ${
                        currentPage === item.page ? 'text-blue-400 font-semibold' : ''
                      }`}
                      id={`footer-nav-item-${item.page}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleNavigate(Page.Privacy)}
                    className={`hover:text-white transition-colors cursor-pointer ${
                      currentPage === Page.Privacy ? 'text-blue-400 font-semibold' : ''
                    }`}
                    id="footer-nav-item-privacy"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Regulatory, Registration and Office Column */}
            <div className="md:col-span-4 space-y-6 text-left">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-slate-300 font-sans">
                Corporate Details
              </h4>
              <ul className="space-y-4 font-sans text-sm text-slate-400">
                <li className="flex flex-col gap-1">
                  <span className="text-slate-500 text-xs uppercase font-semibold">Registered Address</span>
                  <span className="leading-relaxed">
                    Meydan Grandstand | 6th floor | Meydan Road | Nad Al Sheba | Dubai | U.A.E.
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-slate-500 text-xs uppercase font-semibold">License Registration</span>
                  <span>License Number: 2421102.01</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
            <span>© 2026 TeamBuilding. All rights reserved.</span>
            <div className="flex gap-4">
              <button onClick={() => handleNavigate(Page.Privacy)} className="hover:text-slate-300">
                Privacy Policy
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
