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
  bibleVersion: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb';
  isOffline: boolean;
  isLoadingChapter: boolean;

  // Actions
  setBibleBooks: (books: BibleBook[]) => void;
  initializeBibleData: () => Promise<void>;
  setCurrentPassage: (passage: CurrentPassage) => void;
  setSelectedVerses: (verseIds: string[]) => void;
  toggleVerseSelection: (verseId: string) => void;
  clearSelection: () => void;
  setBibleVersion: (version: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb') => void;
  setOfflineStatus: (offline: boolean) => void;
  setLoadingChapter: (loading: boolean) => void;
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
    (set) => {
      // Clear local storage to remove any potentially corrupted data
      if (typeof window !== 'undefined') {
        // Check if we need to clean up corrupted data
        const storedData = localStorage.getItem('bible-store');
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData);
            // If bibleBooks exists but is empty or corrupted, clear it
            if (parsed.state?.bibleBooks && Array.isArray(parsed.state.bibleBooks)) {
              const books = parsed.state.bibleBooks;
              // Check for data corruption - e.g., Genesis marked as NT
              const genesis = books.find((b: any) => b.bookName === 'Genesis');
              if (genesis && genesis.testament === 'NT') {
                console.warn('⚠️ Detected corrupted Bible data - Genesis marked as NT. Clearing corrupted cache.');
                localStorage.removeItem('bible-store');
              }
            }
          } catch (e) {
            console.warn('Could not validate stored Bible data:', e);
          }
        }

        window.addEventListener('online', () => set({ isOffline: false }));
        window.addEventListener('offline', () => set({ isOffline: true }));
      }

      return {
        bibleBooks: [],
        currentPassage: initialPassage,
        selectedVerses: [],
        bibleVersion: 'esv',
        isOffline: typeof window !== 'undefined' ? !navigator.onLine : false,
        isLoadingChapter: false,

        setBibleBooks: (books) => set({ bibleBooks: books }),

        initializeBibleData: async () => {
          try {
            console.log('🔄 Initializing Bible data...');

            // Try to load from API.Bible first
            let books;
            try {
              console.log('📡 Attempting to load from API.Bible...');
              const { loadCompleteBibleFromAPI } = await import('../data/bibleData');
              books = await loadCompleteBibleFromAPI('esv');
              console.log('✅ Successfully loaded from API.Bible!');
            } catch (apiError) {
              console.warn('⚠️ API.Bible unavailable, loading fallback data...');
              const { loadFallbackBible } = await import('../services/FallbackBibleLoader');
              books = await loadFallbackBible();
            }

            // Validate the data - ensure testament classification is correct
            books.forEach(book => {
              if (!book.testament || !['OT', 'NT'].includes(book.testament)) {
                console.error(`Invalid testament for book: ${book.bookName}`, book);
                throw new Error(`Invalid testament for book ${book.bookName}`);
              }
            });

            // Log Genesis 1:1 for verification
            const genesisBook = books.find(b => b.bookName === 'Genesis');
            if (genesisBook) {
              console.log(`✅ Genesis 1:1 verified - Testament: ${genesisBook.testament}, Chapters: ${genesisBook.chapters.length}`);

              if (genesisBook.testament !== 'OT') {
                throw new Error(`Data integrity error: Genesis is ${genesisBook.testament}, not OT`);
              }
            }

            // Count total verses
            const totalVerses = books.reduce((sum, book) => {
              return sum + book.chapters.reduce((chapterSum, chapter) => {
                return chapterSum + (chapter.verses?.length || 0);
              }, 0);
            }, 0);

            console.log(`✅ Bible data loaded successfully: ${books.length} books, ${totalVerses} verses`);
            set({ bibleBooks: books });
          } catch (error) {
            console.error('❌ Failed to load Bible data:', error);
            // Clear local storage if data is corrupted
            if (typeof window !== 'undefined') {
              try {
                localStorage.removeItem('bible-store');
                console.log('🔄 Cleared corrupted bible-store from local storage');
              } catch (e) {
                console.error('Failed to clear local storage:', e);
              }
            }
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

        setOfflineStatus: (offline) => set({ isOffline: offline }),

        setLoadingChapter: (loading) => set({ isLoadingChapter: loading }),
      };
    },
    {
      name: 'bible-store',
      version: 1,
    }
  )
);
