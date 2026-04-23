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
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer group"
          >
            <div className="text-2xl font-bold text-white relative flex items-center gap-2">
              <span className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300">{'<'}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Dev</span>
              <span className="text-blue-500 group-hover:-rotate-12 transition-transform duration-300">{'/>'}</span>
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
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-[70] p-2 text-slate-300 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
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
            className="fixed inset-0 z-[65] bg-slate-950/60 backdrop-blur-3xl md:hidden overflow-hidden"
          >
            {/* Clickable background to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="relative h-full flex flex-col justify-center px-8 pointer-events-none">
              <div className="flex flex-col gap-6 pointer-events-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-6 group text-left"
                  >
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                      <item.icon size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-sm text-slate-500">Ir a la sección de {item.label.toLowerCase()}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Bottom Decoration */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-8 right-8 py-8 border-t border-white/10 flex justify-between items-center pointer-events-auto"
              >
                <div className="text-slate-500 text-sm">Portfolio 2026</div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <div className="text-cyan-400 text-sm font-medium">Disponible para proyectos</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}