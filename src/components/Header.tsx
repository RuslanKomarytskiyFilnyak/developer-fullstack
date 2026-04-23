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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20"
        style={{
          backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        <nav className="container mx-auto px-6 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="text-xl md:text-2xl font-bold text-white cursor-pointer select-none whitespace-nowrap flex-shrink-0"
          >
            <span className="text-cyan-400">{'<'}</span> Ruslan <span className="text-blue-500">{'/>'}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-sm lg:text-base font-medium text-slate-300 hover:text-white transition-colors relative group py-1 whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="md:hidden p-2 text-white bg-slate-800 rounded-lg flex-shrink-0"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#0f172a',
                zIndex: 1000000,
                display: 'flex',
                flexDirection: 'column'
            }}
          >
            <div className="flex items-center justify-between px-8 h-20 border-b border-white/10">
              <span className="text-xl font-bold text-cyan-400">NAVEGACIÓN</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-white bg-slate-800 rounded-xl"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 flex flex-col p-8 gap-4 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-5 p-5 bg-slate-800/50 rounded-2xl border border-white/5 active:scale-95 transition-transform text-left"
                >
                  <div className="text-cyan-400 bg-cyan-400/10 p-3 rounded-xl">
                    <item.icon size={24} />
                  </div>
                  <span className="text-xl font-bold text-white">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-10 text-center border-t border-white/5">
              <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">Ruslan Portfolio © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}