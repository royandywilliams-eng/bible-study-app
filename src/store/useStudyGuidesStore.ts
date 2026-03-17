import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudyGuidesService, type StudyGuide, type CourseProgress } from '../services/StudyGuidesService';

interface StudyGuidesState {
  studyGuides: StudyGuide[];
  courseProgress: Record<string, CourseProgress>;

  // Actions
  loadStudyGuides: (guides: StudyGuide[]) => void;
  getAllStudyGuides: () => StudyGuide[];
  getStudyGuideById: (id: string) => StudyGuide | null;
  enrollCourse: (guideId: string) => CourseProgress | null;
  getProgressForCourse: (guideId: string) => CourseProgress | null;
  getAllProgress: () => CourseProgress[];
  submitQuizAnswers: (lessonId: string, answers: Record<string, string | number>) => { score: number; passed: boolean; totalQuestions: number };
  getQuizFeedback: (lessonId: string) => any;
  getNextLesson: (guideId: string) => any;
  markLessonComplete: (lessonId: string) => void;
  getStats: () => { enrolled: number; inProgress: number; completed: number; totalLessonsCompleted: number };
  exportCourseReport: (guideId: string) => string;
}

export const useStudyGuidesStore = create<StudyGuidesState>()(
  persist(
    (set, get) => ({
      studyGuides: [],
      courseProgress: {},

      loadStudyGuides: (guides: StudyGuide[]) => {
        StudyGuidesService.loadStudyGuides(guides);
        set({
          studyGuides: guides
        });
      },

      getAllStudyGuides: () => {
        return StudyGuidesService.getAllStudyGuides();
      },

      getStudyGuideById: (id: string) => {
        return StudyGuidesService.getStudyGuideById(id);
      },

      enrollCourse: (guideId: string) => {
        try {
          const progress = StudyGuidesService.startCourse(guideId);
          const current = get().courseProgress;
          set({
            courseProgress: {
              ...current,
              [guideId]: progress
            }
          });
          return progress;
        } catch (error) {
          console.error('Failed to enroll in course:', error);
          return null;
        }
      },

      getProgressForCourse: (guideId: string) => {
        return StudyGuidesService.getCourseProgress(guideId);
      },

      getAllProgress: () => {
        return StudyGuidesService.getAllCourseProgress();
      },

      submitQuizAnswers: (lessonId: string, answers: Record<string, string | number>) => {
        const result = StudyGuidesService.submitQuizAnswers(lessonId, answers);
        const progress = StudyGuidesService.getAllCourseProgress();
        const progressRecord: Record<string, CourseProgress> = {};
        progress.forEach(p => {
          progressRecord[p.guideId] = p;
        });
        set({ courseProgress: progressRecord });
        return result;
      },

      getQuizFeedback: (lessonId: string) => {
        return StudyGuidesService.getQuizFeedback(lessonId);
      },

      getNextLesson: (guideId: string) => {
        return StudyGuidesService.getNextLesson(guideId);
      },

      markLessonComplete: (lessonId: string) => {
        StudyGuidesService.markLessonComplete(lessonId);
        const progress = StudyGuidesService.getAllCourseProgress();
        const progressRecord: Record<string, CourseProgress> = {};
        progress.forEach(p => {
          progressRecord[p.guideId] = p;
        });
        set({ courseProgress: progressRecord });
      },

      getStats: () => {
        return StudyGuidesService.getStats();
      },

      exportCourseReport: (guideId: string) => {
        return StudyGuidesService.exportCourseReport(guideId);
      }
    }),
    {
      name: 'study-guides-store',
      version: 1,
      partialize: (state) => ({
        courseProgress: state.courseProgress
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          StudyGuidesService.hydrate(
            state.courseProgress,
            []
          );
        }
      }
    }
  )
);
