import { Menu, X, Home, User, Briefcase, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Inicio', id: 'hero', icon: Home },
    { label: 'Sobre Mí', id: 'about', icon: User },
    { label: 'Proyectos', id: 'projects', icon: Briefcase },
    { label: 'Tecnologías', id: 'technologies', icon: Cpu },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/95 shadow-xl h-16' : 'h-20 bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('hero')} 
            className="text-xl font-bold text-white cursor-pointer"
          >
            <span className="text-cyan-400">{'<'}</span> Ruslan <span className="text-blue-500">{'/>'}</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-white bg-slate-800/50 rounded-lg"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu via Portal to ensure it is ABOVE EVERYTHING */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#0f172a',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column'
              }}
              className="md:hidden"
            >
              {/* Internal Header for Menu */}
              <div className="h-20 px-6 flex items-center justify-between border-b border-white/5 shadow-2xl">
                <div className="text-xl font-bold text-white">
                  <span className="text-cyan-400"> MENU </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-white bg-slate-800 rounded-xl"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 flex flex-col justify-center gap-8 px-10">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-cyan-400">
                      <item.icon size={32} />
                    </div>
                    <span className="text-3xl font-bold text-white">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Bottom */}
              <div className="p-12 text-center border-t border-white/5">
                <p className="text-slate-600 font-mono">RUSLAN KOMARYTSKIY — 2026</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}