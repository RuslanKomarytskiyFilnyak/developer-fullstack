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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md h-16' : 'h-20 bg-transparent'}`}>
        <nav className="container mx-auto px-6 h-full flex items-center justify-between">
          <div onClick={() => scrollToSection('hero')} className="text-xl font-bold text-white cursor-pointer select-none">
            <span className="text-cyan-400">{'<'}</span> Ruslan <span className="text-blue-500">{'/>'}</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-white">
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* Full Screen Slide Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-slate-900 md:hidden flex flex-col pt-24 px-10"
          >
            {/* Close Button Inside Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-white bg-slate-800 rounded-2xl border border-white/10"
            >
              <X size={32} />
            </button>

            {/* Menu Links */}
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-6 p-6 bg-slate-800 rounded-3xl border border-white/5 text-left"
                >
                  <div className="text-cyan-400"><item.icon size={30} /></div>
                  <span className="text-2xl font-bold text-white">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Bottom Tag */}
            <div className="mt-auto mb-10 text-center">
              <p className="text-slate-500 text-sm font-mono tracking-tighter">© 2026 RUSLAN KOMARYTSKIY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}