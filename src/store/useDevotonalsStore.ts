import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DevotionalsService, type Devotional } from '../services/DevotionalsService';
import { ProgressService } from '../services/ProgressService';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

interface DevotionalsState {
  devotionals: Devotional[];
  todayDevotional: Devotional | null;
  completedIds: string[];
  userReflections: Record<string, string>;
  selectedDifficulty: DifficultyLevel;

  // Actions
  loadDevotionals: (devotionals: Devotional[]) => void;
  refreshTodayDevotional: () => void;
  getTodayDevotional: () => Devotional | null;
  getDevotionalById: (id: string) => Devotional | null;
  getAllDevotionals: () => Devotional[];
  markCompleted: (id: string, completed?: boolean) => void;
  saveReflection: (id: string, notes: string) => void;
  setDifficultyFilter: (level: DifficultyLevel) => void;
  getFilteredDevotionals: () => Devotional[];
  getStreak: () => number;
  getStats: () => {
    total: number;
    completed: number;
    percentage: number;
    streak: number;
    completedThisWeek: number;
  };
  exportReflections: () => string;
  exportAsCSV: () => string;
  importFromJSON: (jsonData: string) => void;
}

export const useDevotonalsStore = create<DevotionalsState>()(
  persist(
    (set, get) => ({
      devotionals: [],
      todayDevotional: null,
      completedIds: [],
      userReflections: {},
      selectedDifficulty: 'all',

      loadDevotionals: (devotionals: Devotional[]) => {
        DevotionalsService.loadDevotionals(devotionals);
        set({
          devotionals,
          todayDevotional: DevotionalsService.getTodayDevotional()
        });
      },

      refreshTodayDevotional: () => {
        const today = DevotionalsService.getTodayDevotional();
        set({ todayDevotional: today });
      },

      getTodayDevotional: () => {
        return get().todayDevotional;
      },

      getDevotionalById: (id: string) => {
        return DevotionalsService.getDevotionalById(id);
      },

      getAllDevotionals: () => {
        return DevotionalsService.getAllDevotionals();
      },

      markCompleted: (id: string, completed: boolean = true) => {
        DevotionalsService.markCompleted(id, completed);
        const completedIds = DevotionalsService.getCompletedIds();
        set({
          completedIds,
          todayDevotional: DevotionalsService.getTodayDevotional()
        });
        // Update progress stats
        ProgressService.calculateAndStoreStats([], [], completedIds.length).catch(error => {
          console.error('Failed to update stats:', error);
        });
      },

      saveReflection: (id: string, notes: string) => {
        DevotionalsService.saveUserReflection(id, notes);
        const reflections = DevotionalsService.getUserReflections();
        set({
          userReflections: reflections,
          todayDevotional: DevotionalsService.getTodayDevotional()
        });
      },

      setDifficultyFilter: (level: DifficultyLevel) => {
        set({ selectedDifficulty: level });
      },

      getFilteredDevotionals: () => {
        const difficulty = get().selectedDifficulty;
        return DevotionalsService.filterDevotionals(
          difficulty === 'all' ? undefined : difficulty
        );
      },

      getStreak: () => {
        return DevotionalsService.getStreak();
      },

      getStats: () => {
        return DevotionalsService.getCompletionStats();
      },

      exportReflections: () => {
        return DevotionalsService.exportReflections();
      },

      exportAsCSV: () => {
        return DevotionalsService.exportAsCSV();
      },

      importFromJSON: (jsonData: string) => {
        DevotionalsService.importFromJSON(jsonData);
        const reflections = DevotionalsService.getUserReflections();
        set({
          userReflections: reflections,
          todayDevotional: DevotionalsService.getTodayDevotional()
        });
      }
    }),
    {
      name: 'devotionals-store',
      version: 1,
      partialize: (state) => ({
        completedIds: state.completedIds,
        userReflections: state.userReflections,
        selectedDifficulty: state.selectedDifficulty
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          DevotionalsService.hydrate(
            state.completedIds,
            state.userReflections
          );
        }
      }
    }
  )
);
