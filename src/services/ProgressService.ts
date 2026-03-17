
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress?: number;
  target?: number;
}

export interface ReadingStreak {
  current: number;
  longest: number;
  lastReadDate: string;
}

export interface SessionStats {
  totalSessions: number;
  totalMinutesRead: number;
  averageSessionLength: number;
  lastSessionDate: string;
  sessionsThisWeek: number;
  sessionsThisMonth: number;
}

export interface CompletionStats {
  booksCompleted: number;
  chaptersCompleted: number;
  versesRead: number;
  notesCreated: number;
  highlightsCreated: number;
  devotionalsCompleted: number;
  lessonsCompleted: number;
  coursesEnrolled: number;
  coursesCompleted: number;
}

export interface ProgressOverview {
  achievements: Achievement[];
  readingStreak: ReadingStreak;
  sessionStats: SessionStats;
  completionStats: CompletionStats;
  motivationTips: string[];
}

class ProgressServiceClass {
  private achievements: Map<string, Achievement> = new Map();
  private readingStreak: ReadingStreak = {
    current: 0,
    longest: 0,
    lastReadDate: new Date().toISOString().split('T')[0]
  };
  private sessionHistory: { date: string; minutesRead: number }[] = [];

  initializeAchievements(): void {
    const achievementList: Achievement[] = [
      // Reading Achievements
      {
        id: 'first-chapter',
        title: 'First Steps',
        description: 'Read your first chapter of the Bible',
        icon: '📖',
        target: 1,
        progress: 0
      },
      {
        id: 'reading-marathon',
        title: 'Marathon Reader',
        description: 'Read 10 chapters',
        icon: '🏃',
        target: 10,
        progress: 0
      },
      {
        id: 'book-complete',
        title: 'Book Master',
        description: 'Complete reading an entire book',
        icon: '✅',
        target: 1,
        progress: 0
      },
      {
        id: 'ot-explorer',
        title: 'OT Explorer',
        description: 'Read from all OT books',
        icon: '🗺️',
        target: 39,
        progress: 0
      },
      {
        id: 'nt-explorer',
        title: 'NT Explorer',
        description: 'Read from all NT books',
        icon: '🗺️',
        target: 27,
        progress: 0
      },

      // Note-Taking Achievements
      {
        id: 'note-taker',
        title: 'Reflective Soul',
        description: 'Create your first note',
        icon: '📝',
        target: 1,
        progress: 0
      },
      {
        id: 'highlight-artist',
        title: 'Color Coder',
        description: 'Create 10 highlights',
        icon: '🌈',
        target: 10,
        progress: 0
      },
      {
        id: 'annotation-expert',
        title: 'Annotation Expert',
        description: 'Create 50 notes',
        icon: '📚',
        target: 50,
        progress: 0
      },

      // Devotional Achievements
      {
        id: 'daily-reader',
        title: 'Daily Reader',
        description: 'Complete 7 devotionals in a row',
        icon: '✨',
        target: 7,
        progress: 0
      },
      {
        id: 'devotion-master',
        title: 'Devotion Master',
        description: 'Complete 30 devotionals',
        icon: '🌟',
        target: 30,
        progress: 0
      },
      {
        id: 'one-year-plan',
        title: 'One Year Devotion',
        description: 'Complete 365 devotionals',
        icon: '🏆',
        target: 365,
        progress: 0
      },

      // Study Achievements
      {
        id: 'course-starter',
        title: 'Course Starter',
        description: 'Enroll in your first study course',
        icon: '🎓',
        target: 1,
        progress: 0
      },
      {
        id: 'course-complete',
        title: 'Course Graduate',
        description: 'Complete your first course',
        icon: '🎉',
        target: 1,
        progress: 0
      },
      {
        id: 'scholar',
        title: 'Scholar',
        description: 'Complete 3 courses',
        icon: '👨‍🎓',
        target: 3,
        progress: 0
      },

      // Time Achievements
      {
        id: 'one-hour',
        title: 'One Hour Club',
        description: 'Spend 1 hour reading',
        icon: '⏱️',
        target: 60,
        progress: 0
      },
      {
        id: 'ten-hours',
        title: 'Ten Hour Devotee',
        description: 'Spend 10 hours reading',
        icon: '⏳',
        target: 600,
        progress: 0
      },
      {
        id: 'century-reader',
        title: 'Century Reader',
        description: 'Spend 100 hours reading',
        icon: '💯',
        target: 6000,
        progress: 0
      },

      // Streak Achievements
      {
        id: 'streak-week',
        title: 'Week Warrior',
        description: 'Maintain a 7-day reading streak',
        icon: '🔥',
        target: 7,
        progress: 0
      },
      {
        id: 'streak-month',
        title: 'Month Master',
        description: 'Maintain a 30-day reading streak',
        icon: '🔥🔥',
        target: 30,
        progress: 0
      }
    ];

    achievementList.forEach(a => this.achievements.set(a.id, a));
  }

  updateProgress(): void {
    // This would be called whenever progress changes
    // Updates achievement progress based on current stats
    const completionStats = this.getCompletionStats();

    // Update achievement progress
    this.achievements.forEach((achievement) => {
      switch (achievement.id) {
        case 'first-chapter':
          achievement.progress = completionStats.chaptersCompleted > 0 ? 1 : 0;
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'reading-marathon':
          achievement.progress = Math.min(completionStats.chaptersCompleted, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'book-complete':
          achievement.progress = Math.min(completionStats.booksCompleted, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'note-taker':
          achievement.progress = completionStats.notesCreated > 0 ? 1 : 0;
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'highlight-artist':
          achievement.progress = Math.min(completionStats.highlightsCreated, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'daily-reader':
          achievement.progress = Math.min(this.readingStreak.current, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'devotion-master':
          achievement.progress = Math.min(completionStats.devotionalsCompleted, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'course-starter':
          achievement.progress = completionStats.coursesEnrolled > 0 ? 1 : 0;
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
        case 'course-complete':
          achievement.progress = Math.min(completionStats.coursesCompleted, achievement.target!);
          if (achievement.progress === achievement.target) {
            achievement.unlockedAt = Date.now();
          }
          break;
      }
    });
  }

  getAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  getUnlockedAchievements(): Achievement[] {
    return Array.from(this.achievements.values()).filter(a => a.unlockedAt);
  }

  getAchievementProgress(): number {
    const unlockedCount = this.getUnlockedAchievements().length;
    const totalCount = this.achievements.size;
    return Math.round((unlockedCount / totalCount) * 100);
  }

  getReadingStreak(): ReadingStreak {
    return this.readingStreak;
  }

  updateReadingStreak(readToday: boolean): void {
    const today = new Date().toISOString().split('T')[0];

    if (readToday) {
      if (this.readingStreak.lastReadDate === today) {
        return; // Already counted today
      }

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (this.readingStreak.lastReadDate === yesterday) {
        this.readingStreak.current++;
      } else {
        this.readingStreak.current = 1;
      }

      this.readingStreak.lastReadDate = today;
      this.readingStreak.longest = Math.max(this.readingStreak.longest, this.readingStreak.current);
    }
  }

  addSession(minutesRead: number): void {
    const today = new Date().toISOString().split('T')[0];
    this.sessionHistory.push({ date: today, minutesRead });
  }

  getSessionStats(): SessionStats {
    const thisWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    const thisMonth = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

    const totalMinutes = this.sessionHistory.reduce((sum, s) => sum + s.minutesRead, 0);
    const sessionsThisWeek = this.sessionHistory.filter(s => s.date >= thisWeek).length;
    const sessionsThisMonth = this.sessionHistory.filter(s => s.date >= thisMonth).length;

    return {
      totalSessions: this.sessionHistory.length,
      totalMinutesRead: totalMinutes,
      averageSessionLength: this.sessionHistory.length > 0 ? Math.round(totalMinutes / this.sessionHistory.length) : 0,
      lastSessionDate: this.sessionHistory.length > 0 ? this.sessionHistory[this.sessionHistory.length - 1].date : '',
      sessionsThisWeek,
      sessionsThisMonth
    };
  }

  getCompletionStats(): CompletionStats {
    // Get stats from all stores
    // Note: In real implementation, would integrate with actual stores
    return {
      booksCompleted: 0,
      chaptersCompleted: 0,
      versesRead: 0,
      notesCreated: 0,
      highlightsCreated: 0,
      devotionalsCompleted: 0,
      lessonsCompleted: 0,
      coursesEnrolled: 0,
      coursesCompleted: 0
    };
  }

  getMotivationTips(): string[] {
    const tips = [
      'Reading consistently is more important than reading quickly. Aim for daily reflection time.',
      'Try highlighting key verses and writing personal notes. This deepens understanding.',
      'Consider studying a single book deeply rather than jumping around.',
      'Join a small group or study with a friend to discuss what you\'re learning.',
      'Pray before reading. Ask God to illuminate His Word to you.',
      'Don\'t rush through Scripture. Take time to meditate on passages that speak to you.',
      'Consider memorizing key verses. Repetition helps them transform your thinking.',
      'Study the historical context of passages. Understanding the "why" deepens meaning.',
      'Use the cross-references to see how themes connect throughout Scripture.',
      'Challenge yourself to apply what you\'re learning to your daily life.',
      'Keep a prayer journal alongside your Bible reading.',
      'Celebrate your progress. Every chapter read is spiritual growth.',
      'If you miss a day, don\'t get discouraged. Pick it back up tomorrow.',
      'Variety helps. Alternate between Old Testament and New Testament.',
      'Read different translations to get fresh insights on familiar passages.'
    ];

    return tips.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  getProgressOverview(): ProgressOverview {
    this.updateProgress();

    return {
      achievements: this.getAchievements(),
      readingStreak: this.getReadingStreak(),
      sessionStats: this.getSessionStats(),
      completionStats: this.getCompletionStats(),
      motivationTips: this.getMotivationTips()
    };
  }

  clear(): void {
    this.achievements.clear();
    this.sessionHistory = [];
  }
}

export const ProgressService = new ProgressServiceClass();
