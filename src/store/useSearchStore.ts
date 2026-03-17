import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SearchResult } from '../services/SearchService';

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  searchHistory: string[];
  maxHistoryItems: number;

  // Actions
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set) => ({
        query: '',
        results: [],
        isSearching: false,
        searchHistory: [],
        maxHistoryItems: 10,

        setQuery: (query: string) => set({ query }),
        setResults: (results: SearchResult[]) => set({ results }),
        setIsSearching: (isSearching: boolean) => set({ isSearching }),

        addToHistory: (query: string) =>
          set((state) => {
            const filtered = state.searchHistory.filter(q => q !== query);
            const newHistory = [query, ...filtered].slice(0, state.maxHistoryItems);
            return { searchHistory: newHistory };
          }),

        clearHistory: () => set({ searchHistory: [] }),
        clearResults: () => set({ results: [], query: '' }),
      }),
      {
        name: 'search-store',
      }
    )
  )
);
