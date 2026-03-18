import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MemoryVerse, MemoryVerseChallenge, MemoryVerseStats, MemoryVerseSession, DifficultyLevel } from '../services/MemoryVerseService';
import { MemoryVerseService } from '../services/MemoryVerseService';
import type { Note } from '../services/NotesService';

interface MemoryVerseStoreState {
  memoryVerses: MemoryVerse[];
  currentSession: MemoryVerseSession | null;
  sessionHistory: MemoryVerseSession[];
  selectedDifficulty: DifficultyLevel | 'all';

  // Actions
  addMemoryVerse: (note: Note, difficulty?: DifficultyLevel) => void;
  removeMemoryVerse: (id: string) => void;
  getMemoryVerse: (id: string) => MemoryVerse | undefined;
  getVersesDueForReview: (limit?: number) => MemoryVerse[];
  getVersesByDifficulty: (difficulty: DifficultyLevel) => MemoryVerse[];
  generateChallenge: (verse: MemoryVerse) => MemoryVerseChallenge;
  recordAnswer: (challenge: MemoryVerseChallenge, answer: string) => MemoryVerseChallenge;
  updateProgress: (verse: MemoryVerse, isCorrect: boolean) => void;
  getStatistics: () => MemoryVerseStats;
  startSession: (verses: MemoryVerse[]) => MemoryVerseSession;
  completeSession: () => MemoryVerseSession | null;
  getSessionHistory: (limit?: number) => MemoryVerseSession[];
  setSelectedDifficulty: (difficulty: DifficultyLevel | 'all') => void;
  exportMemoryVerses: () => string;
  importMemoryVerses: (jsonString: string) => void;
}

export const useMemoryVerseStore = create<MemoryVerseStoreState>()(
  persist(
    (set) => ({
      memoryVerses: [],
      currentSession: null,
      sessionHistory: [],
      selectedDifficulty: 'all',

      addMemoryVerse: (note, difficulty = 'medium') => {
        MemoryVerseService.addMemoryVerse(note, difficulty);
        set({ memoryVerses: MemoryVerseService.getAllMemoryVerses() });
      },

      removeMemoryVerse: (id) => {
        MemoryVerseService.removeMemoryVerse(id);
        set({ memoryVerses: MemoryVerseService.getAllMemoryVerses() });
      },

      getMemoryVerse: (id) => {
        return MemoryVerseService.getMemoryVerse(id);
      },

      getVersesDueForReview: (limit = 10) => {
        return MemoryVerseService.getVersesDueForReview(limit);
      },

      getVersesByDifficulty: (difficulty) => {
        return MemoryVerseService.getVersesByDifficulty(difficulty);
      },

      generateChallenge: (verse) => {
        return MemoryVerseService.generateChallenge(verse);
      },

      recordAnswer: (challenge, answer) => {
        return MemoryVerseService.recordAnswer(challenge, answer);
      },

      updateProgress: (verse, isCorrect) => {
        MemoryVerseService.updateMemoryVerseProgress(verse, isCorrect);
        set({ memoryVerses: MemoryVerseService.getAllMemoryVerses() });
      },

      getStatistics: () => {
        return MemoryVerseService.getStatistics();
      },

      startSession: (verses) => {
        const session = MemoryVerseService.startSession(verses);
        set({ currentSession: session });
        return session;
      },

      completeSession: () => {
        const completed = MemoryVerseService.completeSession();
        if (completed) {
          set({
            currentSession: null,
            memoryVerses: MemoryVerseService.getAllMemoryVerses(),
            sessionHistory: MemoryVerseService.getSessionHistory()
          });
        }
        return completed;
      },

      getSessionHistory: (limit = 10) => {
        return MemoryVerseService.getSessionHistory(limit);
      },

      setSelectedDifficulty: (difficulty) => {
        set({ selectedDifficulty: difficulty });
      },

      exportMemoryVerses: () => {
        return MemoryVerseService.exportAsJSON();
      },

      importMemoryVerses: (jsonString) => {
        try {
          MemoryVerseService.importFromJSON(jsonString);
          set({ memoryVerses: MemoryVerseService.getAllMemoryVerses() });
        } catch (error) {
          console.error('Import failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'memory-verse-store',
    }
  )
);
