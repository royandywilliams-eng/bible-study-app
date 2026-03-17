import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, HighlightColor, NoteType, NoteFilter } from '../services/NotesService';
import { NotesService } from '../services/NotesService';
import type { SearchResult } from '../services/SearchService';

interface NotesState {
  notes: Note[];
  selectedFilter: NoteFilter;
  showNotesPanel: boolean;

  // Actions
  addNote: (result: SearchResult, type: NoteType, highlightColor?: HighlightColor, noteText?: string) => void;
  removeNote: (passageId: string) => void;
  getNote: (passageId: string) => Note | undefined;
  filterNotes: (filter: NoteFilter) => Note[];
  setSelectedFilter: (filter: NoteFilter) => void;
  toggleNotesPanel: () => void;
  addTag: (passageId: string, tag: string) => void;
  removeTag: (passageId: string, tag: string) => void;
  exportNotes: (format: 'json' | 'csv') => string;
  importNotes: (data: string) => void;
  isHighlighted: (passageId: string) => boolean;
  isBookmarked: (passageId: string) => boolean;
  getStatistics: () => any;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
        notes: [],
        selectedFilter: {},
        showNotesPanel: false,

      addNote: (result, type, highlightColor, noteText) => {
        NotesService.addNote(result, type, highlightColor, noteText);
        set({ notes: NotesService.getAllNotes() });
      },

      removeNote: (passageId) => {
        NotesService.removeNote(passageId);
        set({ notes: NotesService.getAllNotes() });
      },

      getNote: (passageId) => {
        return NotesService.getNote(passageId);
      },

      filterNotes: (filter) => {
        return NotesService.filterNotes(filter);
      },

      setSelectedFilter: (filter) => {
        set({ selectedFilter: filter, notes: NotesService.filterNotes(filter) });
      },

      toggleNotesPanel: () => {
        set((state) => ({ showNotesPanel: !state.showNotesPanel }));
      },

      addTag: (passageId, tag) => {
        NotesService.addTag(passageId, tag);
        set({ notes: NotesService.getAllNotes() });
      },

      removeTag: (passageId, tag) => {
        NotesService.removeTag(passageId, tag);
        set({ notes: NotesService.getAllNotes() });
      },

      exportNotes: (format) => {
        if (format === 'json') {
          return NotesService.exportAsJSON();
        } else {
          return NotesService.exportAsCSV();
        }
      },

      importNotes: (data) => {
        try {
          NotesService.importFromJSON(data);
          set({ notes: NotesService.getAllNotes() });
        } catch (error) {
          console.error('Import failed:', error);
          throw error;
        }
      },

      isHighlighted: (passageId) => {
        return NotesService.isHighlighted(passageId);
      },

      isBookmarked: (passageId) => {
        return NotesService.isBookmarked(passageId);
      },

      getStatistics: () => {
        return NotesService.getStatistics();
      },
    }),
    {
      name: 'notes-store',
    }
  )
);
