import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Testament, BibleBook } from '../types/bible';
import { ProgressService } from '../services/ProgressService';

interface CurrentPassage {
  testament: Testament;
  bookNumber: number;
  bookName: string;
  chapterNum: number;
  verseNum: number;
}

interface BibleStoreState {
  bibleBooks: BibleBook[];
  currentPassage: CurrentPassage;
  selectedVerses: string[]; // Array of passage IDs like "OT-01-01-05"
  bibleVersion: 'esv' | 'kjv';

  // Actions
  setBibleBooks: (books: BibleBook[]) => void;
  initializeBibleData: () => Promise<void>;
  setCurrentPassage: (passage: CurrentPassage) => void;
  setSelectedVerses: (verseIds: string[]) => void;
  toggleVerseSelection: (verseId: string) => void;
  clearSelection: () => void;
  setBibleVersion: (version: 'esv' | 'kjv') => void;
}

const initialPassage: CurrentPassage = {
  testament: 'NT',
  bookNumber: 1,
  bookName: 'Matthew',
  chapterNum: 1,
  verseNum: 1,
};

export const useBibleStore = create<BibleStoreState>()(
  persist(
    (set) => ({
      bibleBooks: [],
      currentPassage: initialPassage,
      selectedVerses: [],
      bibleVersion: 'esv',

      setBibleBooks: (books) => set({ bibleBooks: books }),

      initializeBibleData: async () => {
        try {
          // Import the generated Bible data
          const { generateSampleBibleData } = await import('../data/bibleData');
          const books = generateSampleBibleData();
          set({ bibleBooks: books });
        } catch (error) {
          console.error('Failed to load Bible data:', error);
          throw error;
        }
      },

      setCurrentPassage: (passage) => set({ currentPassage: passage }),

      setSelectedVerses: (verseIds) => {
        set({ selectedVerses: verseIds });
        // Update progress stats
        ProgressService.calculateAndStoreStats(verseIds, []).catch(error => {
          console.error('Failed to update stats:', error);
        });
      },

      toggleVerseSelection: (verseId) =>
        set((state) => {
          const isSelected = state.selectedVerses.includes(verseId);
          const updatedVerses = isSelected
            ? state.selectedVerses.filter((id) => id !== verseId)
            : [...state.selectedVerses, verseId];

          // Update progress stats
          ProgressService.calculateAndStoreStats(updatedVerses, []).catch(error => {
            console.error('Failed to update stats:', error);
          });

          return { selectedVerses: updatedVerses };
        }),

      clearSelection: () => {
        set({ selectedVerses: [] });
        // Update progress stats
        ProgressService.calculateAndStoreStats([], []).catch(error => {
          console.error('Failed to update stats:', error);
        });
      },

      setBibleVersion: (version) => set({ bibleVersion: version }),
    }),
    {
      name: 'bible-store',
      version: 1,
    }
  )
);
