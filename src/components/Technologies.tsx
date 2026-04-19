import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MemoryGame } from './MemoryGame';
import type { IconType } from 'react-icons';
import { sendEvent } from '../utils/analytics';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFirebase,
  SiGraphql,
  SiRedux,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

interface Technology {
  name: string;
  icon: IconType;
  color: string;
  id: string;
}

interface PuzzlePieceProps {
  tech: Technology;
  index: number;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  totalCols: number;
  totalRows: number;
}

function PuzzlePiece({ tech, index, onDragStart, onDragEnd, isDragging, totalCols, totalRows }: PuzzlePieceProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = tech.icon;

  const handleDragStart = () => {
    onDragStart(tech.id);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  const handleClick = () => {
    if (!isFlipped) {
      sendEvent('Puzzle', 'Piece Revealed', tech.name);
    }
    setIsFlipped((prev) => !prev);
  };

  // Calculate background position for the puzzle image
  const row = Math.floor(index / totalCols);
  const col = index % totalCols;
  const bgX = (col / (totalCols - 1)) * 100;
  const bgY = (row / (totalRows - 1)) * 100;

  // SVG puzzle piece paths
  const puzzleShapes = [
    `polygon(0% 20%, 0% 80%, 20% 100%, 80% 100%, 100% 80%, 100% 60%, 95% 55%, 95% 45%, 100% 40%, 100% 20%, 80% 0%, 60% 0%, 55% -5%, 45% -5%, 40% 0%, 20% 0%)`,
    `polygon(0% 20%, 0% 80%, 20% 100%, 40% 100%, 45% 105%, 55% 105%, 60% 100%, 80% 100%, 100% 80%, 100% 60%, 105% 55%, 105% 45%, 100% 40%, 100% 20%, 80% 0%, 60% 0%, 55% 5%, 45% 5%, 40% 0%, 20% 0%)`,
    `polygon(-5% 45%, -5% 55%, 0% 60%, 0% 80%, 20% 100%, 40% 100%, 45% 105%, 55% 105%, 60% 100%, 80% 100%, 100% 80%, 100% 20%, 80% 0%, 20% 0%, 0% 20%, 0% 40%)`,
    `polygon(5% 45%, 5% 55%, 0% 60%, 0% 80%, 20% 100%, 40% 100%, 45% 95%, 55% 95%, 60% 100%, 80% 100%, 100% 80%, 100% 20%, 80% 0%, 20% 0%, 0% 20%, 0% 40%)`,
  ];

  const clipPath = puzzleShapes[index % puzzleShapes.length];

  return (
    <div className="w-full" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))', aspectRatio: '1 / 1' }}>
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.3, rotate: Math.random() * 360 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: 'spring', stiffness: 200, damping: 15, delay: index * 0.03 }
        }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-full h-full cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front Face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"
            style={{ clipPath: clipPath, backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-[15%] bg-gradient-to-br from-slate-800 to-slate-900 rounded-md flex flex-col items-center justify-center gap-1.5 p-2">
              <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                <Icon size={32} color={tech.color === '#000000' ? '#ffffff' : tech.color} />
              </div>
              <span className="text-[10px] text-slate-200 font-semibold text-center leading-tight hidden sm:block">
                {tech.name}
              </span>
            </div>
            {/* Decorative Elements */}
            <div className="absolute inset-0 border-[2px] border-slate-900/50" style={{ clipPath: clipPath }} />
            <div className="absolute inset-[2px] border border-slate-400/30" style={{ clipPath: clipPath }} />
          </div>

          {/* Back Face - Puzzle Image */}
          <div
            className="absolute w-full h-full"
            style={{
              clipPath: clipPath,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundImage: 'url(/puzzle-reveal.png)',
              backgroundSize: `${totalCols * 100}% ${totalRows * 100}%`,
              backgroundPosition: `${bgX}% ${bgY}%`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/10" /> {/* Slight overlay for depth */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Technologies() {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [cols, setCols] = useState(2);

  // Responsive column detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCols(8);
      else if (window.innerWidth >= 768) setCols(4);
      else setCols(2);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGameStart = () => {
    if (!showMemoryGame) {
      sendEvent('Game', 'Started');
    }
    setShowMemoryGame(!showMemoryGame);
  };

  const allTechnologies: Technology[] = [
    // Frontend
    { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB' },
    { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 'vuejs', name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
    { id: 'tailwind', name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { id: 'html5', name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { id: 'css3', name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    // Backend
    { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { id: 'express', name: 'Express', icon: SiExpress, color: '#000000' },
    { id: 'javascript-3', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { id: 'graphql', name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { id: 'firebase', name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    // DevOps & Tools
    { id: 'git', name: 'Git', icon: SiGit, color: '#F05032' },
    { id: 'docker', name: 'Estibador', icon: SiDocker, color: '#2496ED' },
    { id: 'redux', name: 'Redux', icon: SiRedux, color: '#764ABC' },
    // Duplicates to reach 32
    { id: 'react-2', name: 'React', icon: SiReact, color: '#61DAFB' },
    { id: 'nextjs-2', name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { id: 'typescript-2', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 'javascript-2', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 'vuejs-2', name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
    { id: 'tailwind-2', name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { id: 'html5-2', name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { id: 'css3-2', name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { id: 'nodejs-2', name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { id: 'express-2', name: 'Express', icon: SiExpress, color: '#000000' },
    { id: 'javascript-4', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 'postgresql-2', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { id: 'mongodb-2', name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  ];

  const totalRows = Math.ceil(allTechnologies.length / cols);

  return (
    <section id="technologies" className="py-20 px-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tecnologías</span> & Herramientas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400 max-w-2xl mx-auto mb-2">
            Stack tecnológico con el que trabajo día a día
          </p>
          <p className="text-cyan-400 text-sm flex items-center justify-center gap-2">
            <span>🧩</span>
            <span>Haz clic en las piezas para descubrir la imagen oculta</span>
            <span>🧩</span>
          </p>
          <button
            onClick={handleGameStart}
            className="mt-4 px-6 py-2 bg-slate-800 text-cyan-400 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300"
          >
            {showMemoryGame ? 'Ver Rompecabezas' : 'Jugar al Juego de Memoria'}
          </button>
        </motion.div>

        {showMemoryGame ? (
          <div className="w-full flex gap-6 mb-16 min-h-[600px] bg-slate-900/30 rounded-2xl p-8 border border-slate-700/50">
            <MemoryGame />
          </div>
        ) : (
          <div className="mb-16 bg-slate-900/30 rounded-2xl p-8 border border-slate-700/50">
            <div
              className="grid gap-4 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                maxWidth: cols === 8 ? '100%' : cols === 4 ? '600px' : '300px'
              }}
            >
              {allTechnologies.map((tech, index) => (
                <PuzzlePiece
                  key={tech.id}
                  tech={tech}
                  index={index}
                  onDragStart={(id) => setDraggingId(id)}
                  onDragEnd={() => setDraggingId(null)}
                  isDragging={draggingId === tech.id}
                  totalCols={cols}
                  totalRows={totalRows}
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl text-cyan-400 mb-6">Otras Competencias</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Agile/Scrum', 'UI/UX Design', 'Testing', 'Microservices', 'WebSockets', 'OAuth', 'SEO', 'REST APIs', 'CI/CD'].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
