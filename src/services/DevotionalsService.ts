export interface Devotional {
  id: string;                    // Format: "MM-DD" (repeats yearly)
  date: string;                  // Human-readable date like "January 1"
  title: string;
  passages: string[];            // e.g., ["Genesis 1:1-3", "John 1:1-5"]
  dailyReading: string;          // 200-300 word reflection
  reflection: string;            // Main journal prompt
  prompts: string[];             // 2-3 reflection questions
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  completed?: boolean;
  userNotes?: string;
}

interface DevotionalStats {
  total: number;
  completed: number;
  percentage: number;
  streak: number;
  completedThisWeek: number;
}

class DevotionalsServiceClass {
  private devotionals: Map<string, Devotional> = new Map();
  private completedIds: Set<string> = new Set();
  private userReflections: Map<string, string> = new Map();

  loadDevotionals(devotionalsList: Devotional[]): void {
    this.devotionals.clear();
    devotionalsList.forEach(d => {
      this.devotionals.set(d.id, d);
    });
  }

  hydrate(completed: string[], reflections: Record<string, string>): void {
    this.completedIds = new Set(completed);
    this.userReflections = new Map(Object.entries(reflections || {}));
  }

  getTodayDevotional(): Devotional | null {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const id = `${month}-${day}`;

    const devotional = this.devotionals.get(id);
    if (!devotional) return null;

    return {
      ...devotional,
      completed: this.completedIds.has(id),
      userNotes: this.userReflections.get(id)
    };
  }

  getDevotionalById(id: string): Devotional | null {
    const devotional = this.devotionals.get(id);
    if (!devotional) return null;

    return {
      ...devotional,
      completed: this.completedIds.has(id),
      userNotes: this.userReflections.get(id)
    };
  }

  getAllDevotionals(): Devotional[] {
    return Array.from(this.devotionals.values()).map(d => ({
      ...d,
      completed: this.completedIds.has(d.id),
      userNotes: this.userReflections.get(d.id)
    }));
  }

  markCompleted(id: string, completed: boolean = true): void {
    if (completed) {
      this.completedIds.add(id);
    } else {
      this.completedIds.delete(id);
    }
  }

  saveUserReflection(id: string, notes: string): void {
    if (notes.trim()) {
      this.userReflections.set(id, notes);
    } else {
      this.userReflections.delete(id);
    }
  }

  filterDevotionals(
    difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all',
    tags?: string[]
  ): Devotional[] {
    let filtered = this.getAllDevotionals();

    if (difficulty && difficulty !== 'all') {
      filtered = filtered.filter(d => d.difficulty === difficulty);
    }

    if (tags && tags.length > 0) {
      filtered = filtered.filter(d =>
        tags.some(tag => d.tags.includes(tag))
      );
    }

    return filtered;
  }

  getStreak(): number {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const id = `${month}-${day}`;

      if (this.completedIds.has(id)) {
        streak++;
      } else if (i > 0) {
        // Allow today to not be completed yet
        break;
      }
    }

    return streak;
  }

  getCompletionStats(): DevotionalStats {
    const total = this.devotionals.size;
    const completed = this.completedIds.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const streak = this.getStreak();

    // Calculate completed this week
    const today = new Date();
    let completedThisWeek = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const id = `${month}-${day}`;

      if (this.completedIds.has(id)) {
        completedThisWeek++;
      }
    }

    return {
      total,
      completed,
      percentage,
      streak,
      completedThisWeek
    };
  }

  getCompletedIds(): string[] {
    return Array.from(this.completedIds);
  }

  getUserReflections(): Record<string, string> {
    return Object.fromEntries(this.userReflections);
  }

  exportReflections(): string {
    const data: Array<{
      date: string;
      title: string;
      userNotes: string;
    }> = [];

    this.userReflections.forEach((notes, id) => {
      const devotional = this.devotionals.get(id);
      if (devotional) {
        data.push({
          date: devotional.date,
          title: devotional.title,
          userNotes: notes
        });
      }
    });

    return JSON.stringify(data, null, 2);
  }

  exportAsCSV(): string {
    const rows = [['Date', 'Title', 'Reflection Notes']];

    this.userReflections.forEach((notes, id) => {
      const devotional = this.devotionals.get(id);
      if (devotional) {
        rows.push([
          devotional.date,
          devotional.title,
          notes.replace(/"/g, '""') // Escape quotes
        ]);
      }
    });

    return rows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }

  importFromJSON(jsonData: string): void {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          // Find devotional by date/title match and restore notes
          const devotional = Array.from(this.devotionals.values()).find(
            d => d.date === item.date && d.title === item.title
          );
          if (devotional) {
            this.userReflections.set(devotional.id, item.userNotes);
          }
        });
      }
    } catch (error) {
      console.error('Failed to import reflections:', error);
    }
  }

  clear(): void {
    this.devotionals.clear();
    this.completedIds.clear();
    this.userReflections.clear();
  }
}

export const DevotionalsService = new DevotionalsServiceClass();
