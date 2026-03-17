export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  passageReference?: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
  allowRetake: boolean;
  explanations: boolean;
}

export interface Lesson {
  id: string;
  weekNumber: number;
  title: string;
  objectives: string[];
  passages: string[];
  content: string;
  keyTakeaways: string[];
  reflection: string;
  resources?: string[];
  quiz: Quiz;
}

export interface StudyGuide {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  weeks: number;
  lessons: Lesson[];
  estimatedHours: number;
  syllabus: string;
  tags: string[];
  prerequisites?: string[];
  learningObjectives: string[];
}

export interface CourseProgress {
  guideId: string;
  lessonsCompleted: string[];
  currentLesson: number;
  quizScores: Record<string, number>;
  completionPercentage: number;
  startedAt: number;
  estimatedCompletionDate: string;
}

interface QuizAttempt {
  lessonId: string;
  score: number;
  passed: boolean;
  timestamp: number;
  answers: Record<string, string | number>;
}

class StudyGuidesServiceClass {
  private studyGuides: Map<string, StudyGuide> = new Map();
  private courseProgress: Map<string, CourseProgress> = new Map();
  private quizAttempts: QuizAttempt[] = [];

  loadStudyGuides(guides: StudyGuide[]): void {
    this.studyGuides.clear();
    guides.forEach(guide => {
      this.studyGuides.set(guide.id, guide);
    });
  }

  hydrate(progress: Record<string, CourseProgress>, attempts: QuizAttempt[]): void {
    this.courseProgress = new Map(Object.entries(progress || {}));
    this.quizAttempts = attempts || [];
  }

  getAllStudyGuides(): StudyGuide[] {
    return Array.from(this.studyGuides.values());
  }

  getStudyGuideById(id: string): StudyGuide | null {
    return this.studyGuides.get(id) || null;
  }

  startCourse(guideId: string): CourseProgress {
    const guide = this.studyGuides.get(guideId);
    if (!guide) {
      throw new Error(`Study guide ${guideId} not found`);
    }

    const progress: CourseProgress = {
      guideId,
      lessonsCompleted: [],
      currentLesson: 0,
      quizScores: {},
      completionPercentage: 0,
      startedAt: Date.now(),
      estimatedCompletionDate: this.calculateEstimatedDate(guide.weeks)
    };

    this.courseProgress.set(guideId, progress);
    return progress;
  }

  getCourseProgress(guideId: string): CourseProgress | null {
    return this.courseProgress.get(guideId) || null;
  }

  getAllCourseProgress(): CourseProgress[] {
    return Array.from(this.courseProgress.values());
  }

  getLessonById(lessonId: string): Lesson | null {
    for (const guide of this.studyGuides.values()) {
      const lesson = guide.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }

  submitQuizAnswers(
    lessonId: string,
    answers: Record<string, string | number>
  ): { score: number; passed: boolean; totalQuestions: number } {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) {
      throw new Error(`Lesson ${lessonId} not found`);
    }

    let correctCount = 0;
    const totalQuestions = lesson.quiz.questions.length;

    lesson.quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= lesson.quiz.passingScore;

    // Record the attempt
    this.quizAttempts.push({
      lessonId,
      score,
      passed,
      timestamp: Date.now(),
      answers
    });

    // Update course progress if lesson belongs to enrolled course
    for (const progress of this.courseProgress.values()) {
      const guide = this.studyGuides.get(progress.guideId);
      if (guide?.lessons.some(l => l.id === lessonId)) {
        if (!progress.quizScores[lessonId]) {
          progress.quizScores[lessonId] = score;
        } else {
          // Keep best score
          progress.quizScores[lessonId] = Math.max(progress.quizScores[lessonId], score);
        }

        // Mark lesson complete if passed
        if (passed && !progress.lessonsCompleted.includes(lessonId)) {
          progress.lessonsCompleted.push(lessonId);
        }

        // Update completion percentage
        progress.completionPercentage = Math.round(
          (progress.lessonsCompleted.length / guide.lessons.length) * 100
        );

        break;
      }
    }

    return { score, passed, totalQuestions };
  }

  getQuizFeedback(lessonId: string): { question: QuizQuestion; isCorrect: boolean; userAnswer: string | number | null }[] | null {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) return null;

    const lastAttempt = this.quizAttempts
      .filter(a => a.lessonId === lessonId)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (!lastAttempt) return null;

    return lesson.quiz.questions.map(question => ({
      question,
      isCorrect: lastAttempt.answers[question.id] === question.correctAnswer,
      userAnswer: lastAttempt.answers[question.id] || null
    }));
  }

  getNextLesson(guideId: string): Lesson | null {
    const progress = this.courseProgress.get(guideId);
    const guide = this.studyGuides.get(guideId);

    if (!progress || !guide) return null;

    // Find next incomplete lesson
    const nextIncomplete = guide.lessons.find(
      l => !progress.lessonsCompleted.includes(l.id)
    );

    return nextIncomplete || null;
  }

  markLessonComplete(lessonId: string): void {
    for (const progress of this.courseProgress.values()) {
      const guide = this.studyGuides.get(progress.guideId);
      if (guide?.lessons.some(l => l.id === lessonId)) {
        if (!progress.lessonsCompleted.includes(lessonId)) {
          progress.lessonsCompleted.push(lessonId);
          progress.completionPercentage = Math.round(
            (progress.lessonsCompleted.length / guide.lessons.length) * 100
          );
        }
        break;
      }
    }
  }

  getStats(): {
    enrolled: number;
    inProgress: number;
    completed: number;
    totalLessonsCompleted: number;
  } {
    const progress = this.getAllCourseProgress();
    const enrolled = progress.length;
    const inProgress = progress.filter(p => p.completionPercentage > 0 && p.completionPercentage < 100).length;
    const completed = progress.filter(p => p.completionPercentage === 100).length;
    const totalLessonsCompleted = progress.reduce((sum, p) => sum + p.lessonsCompleted.length, 0);

    return {
      enrolled,
      inProgress,
      completed,
      totalLessonsCompleted
    };
  }

  exportCourseReport(guideId: string): string {
    const progress = this.courseProgress.get(guideId);
    const guide = this.studyGuides.get(guideId);

    if (!progress || !guide) {
      throw new Error(`Course ${guideId} not found`);
    }

    const data = {
      courseTitle: guide.title,
      startedAt: new Date(progress.startedAt).toISOString(),
      completionPercentage: progress.completionPercentage,
      lessonsCompleted: progress.lessonsCompleted.length,
      totalLessons: guide.lessons.length,
      quizScores: progress.quizScores,
      estimatedCompletionDate: progress.estimatedCompletionDate
    };

    return JSON.stringify(data, null, 2);
  }

  private calculateEstimatedDate(weeks: number): string {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + weeks * 7);
    return startDate.toISOString().split('T')[0];
  }

  clear(): void {
    this.studyGuides.clear();
    this.courseProgress.clear();
    this.quizAttempts = [];
  }
}

export const StudyGuidesService = new StudyGuidesServiceClass();
