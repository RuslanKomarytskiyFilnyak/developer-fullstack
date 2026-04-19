import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre Mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Tecnologías', id: 'technologies' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotateY: [0, 360],
          }}
          transition={{ 
            opacity: { delay: 0.2 },
            rotateY: {
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          className="relative"
        >
          <div
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative"
            style={{
              textShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
            }}
          >
            {'<Dev />'}
            {/* 3D depth layers */}
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50"
              style={{
                transform: 'translateZ(-2px)',
                filter: 'blur(1px)',
              }}
            >
              {'<Dev />'}
            </span>
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 opacity-30"
              style={{
                transform: 'translateZ(-4px)',
                filter: 'blur(2px)',
              }}
            >
              {'<Dev />'}
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => scrollToSection(item.id)}
              className="text-slate-300 hover:text-cyan-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-slate-900/98 backdrop-blur-sm shadow-xl md:hidden"
            >
              <div className="flex flex-col gap-4 p-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-left py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}