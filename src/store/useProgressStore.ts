import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProgressService, type Achievement, type ReadingStreak, type SessionStats, type CompletionStats } from '../services/ProgressService';

interface ProgressState {
  achievements: Achievement[];
  readingStreak: ReadingStreak;
  sessionStats: SessionStats;
  completionStats: CompletionStats;
  motivationTips: string[];

  // Actions
  initializeAchievements: () => Promise<void>;
  updateProgress: (completionStats: CompletionStats) => void;
  updateReadingStreak: (readToday: boolean) => void;
  addSession: (minutesRead: number) => void;
  getAchievements: () => Achievement[];
  getUnlockedAchievements: () => Achievement[];
  getAchievementProgress: () => number;
  getReadingStreak: () => ReadingStreak;
  getSessionStats: () => SessionStats;
  getCompletionStats: (
    selectedVerses?: string[],
    notes?: unknown[],
    devotionalsCompleted?: number,
    lessonsCompleted?: number,
    coursesEnrolled?: number,
    coursesCompleted?: number
  ) => CompletionStats;
  getMotivationTips: () => string[];
  getProgressOverview: () => {
    achievements: Achievement[];
    readingStreak: ReadingStreak;
    sessionStats: SessionStats;
    completionStats: CompletionStats;
    motivationTips: string[];
  };
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      achievements: [],
      readingStreak: {
        current: 0,
        longest: 0,
        lastReadDate: new Date().toISOString().split('T')[0]
      },
      sessionStats: {
        totalSessions: 0,
        totalMinutesRead: 0,
        averageSessionLength: 0,
        lastSessionDate: '',
        sessionsThisWeek: 0,
        sessionsThisMonth: 0
      },
      completionStats: {
        booksCompleted: 0,
        chaptersCompleted: 0,
        versesRead: 0,
        notesCreated: 0,
        highlightsCreated: 0,
        devotionalsCompleted: 0,
        lessonsCompleted: 0,
        coursesEnrolled: 0,
        coursesCompleted: 0
      },
      motivationTips: [],

      initializeAchievements: async () => {
        await ProgressService.initializeAchievements();
        set({
          achievements: ProgressService.getAchievements(),
          motivationTips: ProgressService.getMotivationTips()
        });
      },

      updateProgress: (completionStats: CompletionStats) => {
        // Update service with latest completion stats
        const service = ProgressService as any;
        service.completionStats = completionStats;

        // Trigger progress update in service
        ProgressService.updateProgress();

        set({
          achievements: ProgressService.getAchievements(),
          completionStats,
          motivationTips: ProgressService.getMotivationTips()
        });
      },

      updateReadingStreak: (readToday: boolean) => {
        ProgressService.updateReadingStreak(readToday);
        set({
          readingStreak: ProgressService.getReadingStreak()
        });
      },

      addSession: (minutesRead: number) => {
        ProgressService.addSession(minutesRead);
        set({
          sessionStats: ProgressService.getSessionStats()
        });
      },

      getAchievements: () => {
        return ProgressService.getAchievements();
      },

      getUnlockedAchievements: () => {
        return ProgressService.getUnlockedAchievements();
      },

      getAchievementProgress: () => {
        return ProgressService.getAchievementProgress();
      },

      getReadingStreak: () => {
        return ProgressService.getReadingStreak();
      },

      getSessionStats: () => {
        return ProgressService.getSessionStats();
      },

      getCompletionStats: (
        selectedVerses: string[] = [],
        notes: unknown[] = [],
        devotionalsCompleted: number = 0,
        lessonsCompleted: number = 0,
        coursesEnrolled: number = 0,
        coursesCompleted: number = 0
      ) => {
        return ProgressService.getCompletionStats(
          selectedVerses,
          notes,
          devotionalsCompleted,
          lessonsCompleted,
          coursesEnrolled,
          coursesCompleted
        );
      },

      getMotivationTips: () => {
        return ProgressService.getMotivationTips();
      },

      getProgressOverview: () => {
        return ProgressService.getProgressOverview();
      },

      clearProgress: () => {
        ProgressService.clear();
        set({
          achievements: [],
          readingStreak: {
            current: 0,
            longest: 0,
            lastReadDate: new Date().toISOString().split('T')[0]
          },
          sessionStats: {
            totalSessions: 0,
            totalMinutesRead: 0,
            averageSessionLength: 0,
            lastSessionDate: '',
            sessionsThisWeek: 0,
            sessionsThisMonth: 0
          },
          completionStats: {
            booksCompleted: 0,
            chaptersCompleted: 0,
            versesRead: 0,
            notesCreated: 0,
            highlightsCreated: 0,
            devotionalsCompleted: 0,
            lessonsCompleted: 0,
            coursesEnrolled: 0,
            coursesCompleted: 0
          },
          motivationTips: []
        });
      }
    }),
    {
      name: 'progress-store',
      version: 1,
      partialize: (state) => ({
        achievements: state.achievements,
        readingStreak: state.readingStreak,
        sessionStats: state.sessionStats,
        completionStats: state.completionStats,
        motivationTips: state.motivationTips
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Reinitialize achievements from persisted state
          const service = ProgressService as any;
          service.achievements = new Map();
          service.readingStreak = state.readingStreak;
          service.sessionHistory = [];

          ProgressService.initializeAchievements();
        }
      }
    }
  )
);
