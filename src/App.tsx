/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Puzzle, 
  MessageSquare, 
  Zap, 
  BookOpen, 
  RotateCcw,
  ChevronRight,
  Brain,
  Type,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import { GameType, GameContent } from './types';
import { STATIC_GAMES } from './constants';

const GAME_TYPES: { id: GameType; name: string; icon: any; color: string; description: string }[] = [
  { id: 'anagrams', name: 'Anagrammi', icon: RotateCcw, color: 'bg-blue-50 text-blue-600', description: 'Rimescola le lettere per trovare la parola nascosta.' },
  { id: 'riddles', name: 'Indovinelli', icon: Brain, color: 'bg-purple-50 text-purple-600', description: 'Metti alla prova il tuo intuito con enigmi classici.' },
  { id: 'wordchain', name: 'Catena di Parole', icon: Zap, color: 'bg-amber-50 text-amber-600', description: 'Trova i legami logici tra sequenze di parole.' },
  { id: 'synonyms', name: 'Sinonimi e Contrari', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600', description: 'Espandi il tuo vocabolario con sfide semantiche.' },
  { id: 'twisters', name: 'Scioglilingua', icon: MessageSquare, color: 'bg-rose-50 text-rose-600', description: 'Sfida la tua dizione con frasi impossibili.' },
];

export default function App() {
  const [selectedType, setSelectedType] = useState<GameType>('anagrams');
  const [gameIndex, setGameIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const currentGames = useMemo(() => STATIC_GAMES[selectedType], [selectedType]);
  const currentGame = currentGames[gameIndex % currentGames.length];

  const handleNext = () => {
    setGameIndex(prev => (prev + 1) % currentGames.length);
    setShowSolution(false);
  };

  const handlePrev = () => {
    setGameIndex(prev => (prev - 1 + currentGames.length) % currentGames.length);
    setShowSolution(false);
  };

  const handleTypeChange = (type: GameType) => {
    setSelectedType(type);
    setGameIndex(0);
    setShowSolution(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Type size={18} strokeWidth={2.5} />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Logos</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
            <span className="text-emerald-600 cursor-default">Giochi</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Preferiti</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Informazioni</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-8">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 px-2">Categorie</h2>
              <div className="grid gap-2">
                {GAME_TYPES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleTypeChange(game.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left group border ${
                      selectedType === game.id 
                        ? 'bg-white shadow-md border-emerald-200 ring-1 ring-emerald-100' 
                        : 'hover:bg-white hover:shadow-sm border-transparent hover:border-black/5'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${game.color} transition-transform ${selectedType === game.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <game.icon size={20} />
                    </div>
                    <div>
                      <span className={`font-semibold block ${selectedType === game.id ? 'text-emerald-700' : 'text-neutral-700'}`}>
                        {game.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wide font-medium">
                        {currentGames.length} giochi disponibili
                      </span>
                    </div>
                    {selectedType === game.id && (
                      <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="p-6 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Impara Giocando</h3>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                  {GAME_TYPES.find(g => g.id === selectedType)?.description}
                </p>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-80">
                  <span>Sfida {gameIndex + 1} di {currentGames.length}</span>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Puzzle size={120} strokeWidth={1} />
              </div>
            </section>
          </div>

          {/* Right Column: Game Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${selectedType}-${gameIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm min-h-[500px] flex flex-col p-8 md:p-12"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${GAME_TYPES.find(g => g.id === selectedType)?.color}`}>
                      {React.createElement(GAME_TYPES.find(g => g.id === selectedType)?.icon, { size: 20 })}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-neutral-800">{currentGame.title}</h2>
                      <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Livello Base</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePrev}
                      className="p-2 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Precedente"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="p-2 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Successivo"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center text-center py-8">
                  <div className="bg-neutral-50 rounded-2xl p-8 w-full border border-neutral-100 mb-8">
                    <p className="text-2xl md:text-3xl font-serif text-neutral-800 leading-relaxed italic">
                      "{currentGame.content}"
                    </p>
                  </div>

                  {currentGame.hint && !showSolution && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full text-sm font-medium mb-8"
                    >
                      <Brain size={16} />
                      Indizio: {currentGame.hint}
                    </motion.div>
                  )}

                  <div className="w-full space-y-4">
                    <button 
                      onClick={() => setShowSolution(!showSolution)}
                      className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                        showSolution 
                          ? 'bg-neutral-100 text-neutral-600' 
                          : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-200'
                      }`}
                    >
                      {showSolution ? <EyeOff size={20} /> : <Eye size={20} />}
                      {showSolution ? 'Nascondi Soluzione' : 'Mostra Soluzione'}
                    </button>

                    <AnimatePresence>
                      {showSolution && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-emerald-900">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 block mb-2">Soluzione Corretta</span>
                            <p className="text-xl font-bold">{currentGame.solution}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center text-neutral-500">
            <Type size={12} strokeWidth={3} />
          </div>
          <span className="font-bold text-neutral-500">Logos</span>
        </div>
        <p>© 2026 Logos - Giochi linguistici per amanti delle parole.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Termini</a>
        </div>
      </footer>
    </div>
  );
}
