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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900 shadow-xl' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('hero')} 
            className="text-xl font-bold text-white cursor-pointer"
          >
            <span className="text-cyan-400">{'<'}</span> Ruslan <span className="text-blue-500">{'/>'}</span>
          </div>

          <div className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-white"
          >
            <Menu size={28} />
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
            className="fixed inset-0 z-[9999] bg-[#0f172a] md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
              <span className="text-xl font-bold text-cyan-400">MENÚ</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white bg-slate-800 rounded-lg"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col p-8 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-6 p-6 bg-slate-800/50 rounded-2xl border border-white/5"
                >
                  <item.icon size={24} className="text-cyan-400" />
                  <span className="text-2xl font-bold text-white">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto p-12 text-center">
              <p className="text-slate-600 font-mono text-sm tracking-widest">© 2026 RUSLAN KOMARYTSKIY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}