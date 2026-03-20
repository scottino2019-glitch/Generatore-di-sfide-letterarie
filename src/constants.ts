import { GameType, GameContent } from "./types";

export const STATIC_GAMES: Record<GameType, GameContent[]> = {
  anagrams: [
    {
      type: 'anagrams',
      title: 'Anagramma Classico',
      content: 'ATTORE',
      solution: 'TEATRO',
      hint: 'Un luogo dove si recita.'
    },
    {
      type: 'anagrams',
      title: 'Anagramma di Città',
      content: 'AMOR',
      solution: 'ROMA',
      hint: 'La capitale d\'Italia.'
    },
    {
      type: 'anagrams',
      title: 'Anagramma di Oggetto',
      content: 'CALORE',
      solution: 'CORALE',
      hint: 'Relativo a un coro.'
    }
  ],
  riddles: [
    {
      type: 'riddles',
      title: 'L\'Enigma del Tempo',
      content: 'Più invecchia, più diventa corta. Cos\'è?',
      solution: 'La candela',
      hint: 'Si accende quando manca la luce.'
    },
    {
      type: 'riddles',
      title: 'L\'Oggetto Misterioso',
      content: 'Ha i denti ma non morde mai. Cos\'è?',
      solution: 'Il pettine',
      hint: 'Si usa per i capelli.'
    },
    {
      type: 'riddles',
      title: 'Il Viaggiatore',
      content: 'Gira il mondo stando in un angolo. Cos\'è?',
      solution: 'Il francobollo',
      hint: 'Si mette sulle lettere.'
    }
  ],
  wordchain: [
    {
      type: 'wordchain',
      title: 'Catena della Natura',
      content: 'Sole -> Mare -> Pesce -> Rete -> Pescatori',
      solution: 'Associazione logica di elementi marini.',
      hint: 'Pensa a una giornata in spiaggia.'
    },
    {
      type: 'wordchain',
      title: 'Catena del Mattino',
      content: 'Sveglia -> Caffè -> Colazione -> Lavoro -> Computer',
      solution: 'Routine quotidiana.',
      hint: 'Cosa fai appena ti svegli?'
    }
  ],
  synonyms: [
    {
      type: 'synonyms',
      title: 'Sfida Semantica',
      content: 'Trova sinonimi per: VELOCE',
      solution: 'Rapido, lesto, svelto, fulmineo.',
      hint: 'Qualcuno che corre molto.'
    },
    {
      type: 'synonyms',
      title: 'Contrari',
      content: 'Trova il contrario di: GENEROSO',
      solution: 'Avaro, egoista, spilorcio.',
      hint: 'Qualcuno che non vuole dare nulla.'
    }
  ],
  twisters: [
    {
      type: 'twisters',
      title: 'Il Classico',
      content: 'Trentatré trentini entrarono a Trento tutti e trentatré trotterellando.',
      solution: 'Ripetilo 3 volte velocemente!',
      hint: 'Attento alla lettera T.'
    },
    {
      type: 'twisters',
      title: 'Sotto la panca',
      content: 'Sotto la panca la capra campa, sopra la panca la capra crepa.',
      solution: 'Non confondere sopra e sotto!',
      hint: 'Pensa a una capra.'
    }
  ]
};
