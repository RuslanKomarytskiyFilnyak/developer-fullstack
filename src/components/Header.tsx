import { Menu, X, Home, User, Briefcase, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer group flex items-center gap-2"
          >
            <div className="text-2xl font-bold text-white flex items-center gap-1">
              <span className="text-cyan-400">{'<'}</span>
              <span>Dev</span>
              <span className="text-blue-500">{'/>'}</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            <Menu size={28} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 backdrop-blur-2xl md:hidden flex flex-col justify-center px-10"
          >
            {/* Dedicated Close Button at top-right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-slate-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-all duration-300"
            >
              <X size={32} />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-8 max-w-md mx-auto w-full">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-6 group text-left w-full"
                >
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 shrink-0">
                    <item.icon size={28} className="text-slate-200 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex flex-col items-start translate-y-0.5">
                    <span className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">Ver {item.label.toLowerCase()}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bottom Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-10 right-10 py-8 border-t border-white/10 flex justify-between items-center"
            >
              <div className="text-slate-600 text-sm font-bold tracking-widest uppercase">Ruslan 2026</div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <div className="text-cyan-400 text-xs font-bold tracking-tighter uppercase">Online</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}