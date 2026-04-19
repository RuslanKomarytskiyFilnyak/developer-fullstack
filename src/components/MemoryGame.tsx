import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
  SiGit,
} from 'react-icons/si';

interface CardContent {
  type: 'icon' | 'text';
  value: IconType | string;
}

interface Card {
  id: number;
  pairId: number;
  content: CardContent;
  isFlipped: boolean;
  isMatched: boolean;
}

const gameData: { pairId: number; logo: CardContent; text: CardContent }[] = [
  { pairId: 1, logo: { type: 'icon', value: SiReact }, text: { type: 'text', value: 'Librería de UI' } },
  { pairId: 2, logo: { type: 'icon', value: SiNextdotjs }, text: { type: 'text', value: 'Framework de React' } },
  { pairId: 3, logo: { type: 'icon', value: SiNodedotjs }, text: { type: 'text', value: 'Entorno de ejecución' } },
  { pairId: 4, logo: { type: 'icon', value: SiDocker }, text: { type: 'text', value: 'Contenedores' } },
  { pairId: 5, logo: { type: 'icon', value: SiTypescript }, text: { type: 'text', value: 'Superset de JS' } },
  { pairId: 6, logo: { type: 'icon', value: SiTailwindcss }, text: { type: 'text', value: 'Framework de CSS' } },
  { pairId: 7, logo: { type: 'icon', value: SiPython }, text: { type: 'text', value: 'Lenguaje de Programación' } },
  { pairId: 8, logo: { type: 'icon', value: SiPostgresql }, text: { type: 'text', value: 'Base de Datos SQL' } },
  { pairId: 9, logo: { type: 'icon', value: SiGit }, text: { type: 'text', value: 'Control de Versiones' } },
];

const generateShuffledCards = (): Card[] => {
  const cards: Omit<Card, 'id'>[] = [];
  gameData.forEach(({ pairId, logo, text }) => {
    cards.push({ pairId, content: logo, isFlipped: false, isMatched: false });
    cards.push({ pairId, content: text, isFlipped: false, isMatched: false });
  });

  return cards
    .map((card, index) => ({ ...card, id: index }))
    .sort(() => Math.random() - 0.5);
};

const CardFace = ({ children, isMatched }: { children: React.ReactNode; isMatched: boolean }) => (
  <div
    className={`relative w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-lg p-1`}
  >
    <div className={`relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-md flex flex-col items-center justify-center gap-1.5 p-2`}>
      {children}
    </div>
    {/* Decorative Elements */}
    <div className="absolute inset-0 rounded-lg border-2 border-slate-900/50" />
    <div className="absolute inset-[2px] rounded-lg border border-slate-400/30" />
    <div className={`absolute inset-0 rounded-lg transition-colors duration-300 ${isMatched ? 'border-2 border-green-500' : 'border-2 border-transparent'}`} />
  </div>
);

function MemoryCard({ card, onCardClick }: { card: Card; onCardClick: (id: number) => void }) {
  const CardIcon = card.content.type === 'icon' ? card.content.value as IconType : null;

  return (
    <div
      className="w-24 h-24 cursor-pointer"
      style={{ perspective: '1000px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }}
      onClick={() => onCardClick(card.id)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Face */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <CardFace isMatched={false}>
            <span className="text-5xl text-slate-400 font-bold">?</span>
          </CardFace>
        </div>

        {/* Front Face */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <CardFace isMatched={card.isMatched}>
            {card.content.type === 'icon' && CardIcon && (
              <CardIcon size="50%" color={card.isMatched ? '#4ade80' : '#22d3ee'} />
            )}
            {card.content.type === 'text' && (
              <p className={`text-center font-semibold ${card.isMatched ? 'text-green-400' : 'text-white'}`}>
                {card.content.value as string}
              </p>
            )}
          </CardFace>
        </div>
      </motion.div>
    </div>
  );
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(generateShuffledCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstCardId)!;
      const secondCard = cards.find(c => c.id === secondCardId)!;

      if (firstCard.pairId === secondCard.pairId) {
        setCards(prev => prev.map(c => (c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c)));
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => (flippedCards.includes(c.id) ? { ...c, isFlipped: false } : c)));
          resetTurn();
        }, 1200);
      }
    }
  }, [flippedCards, cards]);

  const resetTurn = () => {
    setFlippedCards([]);
    setIsChecking(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2) return;
    const selectedCard = cards.find(c => c.id === id);
    if (!selectedCard || selectedCard.isFlipped || selectedCard.isMatched) return;

    setCards(prev => prev.map(c => (c.id === id ? { ...c, isFlipped: true } : c)));
    setFlippedCards(prev => [...prev, id]);
    if (flippedCards.length === 0) {
      setMoves(moves + 1);
    }
  };

  const handleReset = () => {
    setCards(generateShuffledCards());
    setFlippedCards([]);
    setIsChecking(false);
    setMoves(0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 max-w-4xl">
        <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 whitespace-nowrap">Juego de Memoria</h2>
        <div className="text-right">
          <p className="text-xl text-white">Movimientos: {moves}</p>
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
        {cards.map(card => (
          <MemoryCard key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
