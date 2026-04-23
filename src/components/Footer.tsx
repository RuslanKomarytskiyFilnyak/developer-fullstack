import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Hecho con</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>© 2026</span>
            <span className="mx-2">•</span>
            <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors text-sm">Política de Privacidad</Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RuslanKomarytskiyFilnyak/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ruslan-komarytskiy-1665011ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:kruslan55569@gmail.com"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:618478435"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
