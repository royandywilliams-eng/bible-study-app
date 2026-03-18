import type { Note } from './NotesService';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type QuestionType = 'fill-first-word' | 'fill-last-word' | 'fill-middle' | 'choose-correct' | 'true-false';

export interface MemoryVerse {
  id: string;
  passageId: string;
  bookName: string;
  chapterNum: number;
  verseNum: number;
  verseText: string;
  difficulty: DifficultyLevel;
  addedAt: number;
  lastReviewedAt: number;
  nextReviewAt: number;
  correctCount: number;
  totalAttempts: number;
  streak: number;
  isBookmarked: boolean;
}

export interface MemoryVerseChallenge {
  id: string;
  memoryVerse: MemoryVerse;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
  timestamp?: number;
}

export interface MemoryVerseStats {
  totalMemoryVerses: number;
  mastered: number;  // 100% correct
  learning: number;  // 50-99% correct
  needsWork: number; // 0-49% correct
  currentStreak: number;
  totalCorrect: number;
  totalAttempts: number;
  accuracy: number;
}

export interface MemoryVerseSession {
  id: string;
  startedAt: number;
  completedAt?: number;
  challenges: MemoryVerseChallenge[];
  score: number;
  totalQuestions: number;
  accuracy: number;
}

class MemoryVerseServiceClass {
  private memoryVerses: Map<string, MemoryVerse> = new Map();
  private currentSession: MemoryVerseSession | null = null;
  private sessions: MemoryVerseSession[] = [];

  /**
   * Initialize with existing memory verses
   */
  hydrate(verses: MemoryVerse[]): void {
    this.memoryVerses.clear();
    verses.forEach(verse => {
      this.memoryVerses.set(verse.id, verse);
    });
  }

  /**
   * Add a highlighted verse to memory verses list
   */
  addMemoryVerse(note: Note, difficulty: DifficultyLevel = 'medium'): MemoryVerse {
    const id = `${note.passageId}-memory`;
    const now = Date.now();

    const memoryVerse: MemoryVerse = {
      id,
      passageId: note.passageId,
      bookName: note.bookName,
      chapterNum: note.chapterNum,
      verseNum: note.verseNum,
      verseText: note.verseText,
      difficulty,
      addedAt: now,
      lastReviewedAt: 0,
      nextReviewAt: now,
      correctCount: 0,
      totalAttempts: 0,
      streak: 0,
      isBookmarked: note.type === 'bookmark'
    };

    this.memoryVerses.set(id, memoryVerse);
    return memoryVerse;
  }

  /**
   * Remove a memory verse
   */
  removeMemoryVerse(id: string): boolean {
    return this.memoryVerses.delete(id);
  }

  /**
   * Get a single memory verse
   */
  getMemoryVerse(id: string): MemoryVerse | undefined {
    return this.memoryVerses.get(id);
  }

  /**
   * Get all memory verses
   */
  getAllMemoryVerses(): MemoryVerse[] {
    return Array.from(this.memoryVerses.values());
  }

  /**
   * Get verses due for review (spaced repetition)
   */
  getVersesDueForReview(limit: number = 10): MemoryVerse[] {
    const now = Date.now();
    return this.getAllMemoryVerses()
      .filter(v => v.nextReviewAt <= now)
      .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
      .slice(0, limit);
  }

  /**
   * Get verses by difficulty
   */
  getVersesByDifficulty(difficulty: DifficultyLevel): MemoryVerse[] {
    return this.getAllMemoryVerses().filter(v => v.difficulty === difficulty);
  }

  /**
   * Generate a quiz question for a verse
   */
  generateChallenge(verse: MemoryVerse): MemoryVerseChallenge {
    const type = this.selectQuestionType(verse.difficulty);
    const { question, options, correctAnswer } = this.generateQuestion(verse, type);

    return {
      id: `${verse.id}-${Date.now()}`,
      memoryVerse: verse,
      type,
      question,
      options,
      correctAnswer
    };
  }

  /**
   * Select question type based on difficulty
   */
  private selectQuestionType(difficulty: DifficultyLevel): QuestionType {
    const rand = Math.random();

    switch (difficulty) {
      case 'easy':
        // Easy: mostly choose-correct and true-false
        return rand < 0.6 ? 'choose-correct' : 'true-false';

      case 'medium':
        // Medium: mix of all types
        if (rand < 0.3) return 'fill-first-word';
        if (rand < 0.6) return 'choose-correct';
        return 'true-false';

      case 'hard':
        // Hard: mostly fill-in
        if (rand < 0.4) return 'fill-first-word';
        if (rand < 0.4) return 'fill-middle';
        if (rand < 0.15) return 'fill-last-word';
        return 'choose-correct';

      default:
        return 'choose-correct';
    }
  }

  /**
   * Generate a question based on type
   */
  private generateQuestion(verse: MemoryVerse, type: QuestionType) {
    const text = verse.verseText;
    const words = text.split(/\s+/);

    switch (type) {
      case 'fill-first-word': {
        const firstWord = words[0];
        const remaining = words.slice(1).join(' ');
        return {
          question: `Complete: "_____ ${remaining.substring(0, 50)}..."`,
          correctAnswer: firstWord,
          options: this.generateOptions(firstWord, 4)
        };
      }

      case 'fill-last-word': {
        const lastWord = words[words.length - 1];
        const beginning = words.slice(0, -1).join(' ');
        return {
          question: `Complete: "${beginning.substring(0, 50)}... _____"`,
          correctAnswer: lastWord,
          options: this.generateOptions(lastWord, 4)
        };
      }

      case 'fill-middle': {
        const middleIndex = Math.floor(words.length / 2);
        const middleWord = words[middleIndex];
        const before = words.slice(0, middleIndex).join(' ');
        const after = words.slice(middleIndex + 1).join(' ');
        return {
          question: `Complete: "${before} _____ ${after}"`,
          correctAnswer: middleWord,
          options: this.generateOptions(middleWord, 4)
        };
      }

      case 'choose-correct': {
        return {
          question: `Which of these is the correct quote?`,
          options: this.generateVerseOptions(text, 4),
          correctAnswer: text
        };
      }

      case 'true-false': {
        const shouldBeTrue = Math.random() > 0.5;
        const testVerse = shouldBeTrue
          ? text
          : this.scrambleVerse(text);

        return {
          question: `Is this the correct verse? "${testVerse.substring(0, 60)}..."`,
          options: ['True', 'False'],
          correctAnswer: shouldBeTrue ? 'True' : 'False'
        };
      }

      default:
        return {
          question: text,
          correctAnswer: text
        };
    }
  }

  /**
   * Generate similar word options
   */
  private generateOptions(correct: string, count: number): string[] {
    const options = [correct];

    // Common distractors based on word patterns
    const distractors = this.getCommonWords();
    for (let i = 1; i < count && distractors.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * distractors.length);
      options.push(distractors[randomIndex]);
      distractors.splice(randomIndex, 1);
    }

    // Shuffle
    return options.sort(() => Math.random() - 0.5);
  }

  /**
   * Generate verse variations for choose-correct
   */
  private generateVerseOptions(correct: string, count: number): string[] {
    const options = [correct];

    // Generate variations
    for (let i = 1; i < count; i++) {
      options.push(this.variedVerse(correct));
    }

    return options.sort(() => Math.random() - 0.5);
  }

  /**
   * Create a variation of the verse
   */
  private variedVerse(text: string): string {
    const words = text.split(/\s+/);
    const index = Math.floor(Math.random() * Math.min(5, words.length));

    // Swap a word with a similar word
    const wordVariations: { [key: string]: string[] } = {
      'the': ['a', 'that', 'this', 'your'],
      'and': ['but', 'or', 'yet', 'so'],
      'god': ['lord', 'father', 'jesus', 'christ'],
      'said': ['spoke', 'told', 'declared', 'proclaimed'],
      'love': ['like', 'care', 'adore', 'cherish']
    };

    const original = words[index]?.toLowerCase();
    const variations = wordVariations[original] || ['word', 'thing', 'way', 'time'];
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];

    words[index] = words[index]?.replace(words[index], randomVariation);
    return words.join(' ');
  }

  /**
   * Scramble a verse
   */
  private scrambleVerse(text: string): string {
    const words = text.split(/\s+/);
    if (words.length < 2) return text;

    // Swap random words
    for (let i = 0; i < Math.floor(words.length / 3); i++) {
      const i1 = Math.floor(Math.random() * words.length);
      const i2 = Math.floor(Math.random() * words.length);
      [words[i1], words[i2]] = [words[i2], words[i1]];
    }

    return words.join(' ');
  }

  /**
   * Get common Bible words for distractors
   */
  private getCommonWords(): string[] {
    return [
      'Lord', 'God', 'Jesus', 'Christ', 'Father', 'Spirit', 'love', 'faith',
      'grace', 'truth', 'light', 'way', 'life', 'shall', 'said', 'came',
      'days', 'people', 'word', 'unto', 'them', 'unto', 'behold', 'earth'
    ];
  }

  /**
   * Record a challenge answer
   */
  recordAnswer(challenge: MemoryVerseChallenge, userAnswer: string): MemoryVerseChallenge {
    challenge.userAnswer = userAnswer;
    challenge.isCorrect = userAnswer === challenge.correctAnswer;
    challenge.timestamp = Date.now();

    return challenge;
  }

  /**
   * Update memory verse based on challenge result
   */
  updateMemoryVerseProgress(verse: MemoryVerse, isCorrect: boolean): MemoryVerse {
    verse.totalAttempts++;
    if (isCorrect) {
      verse.correctCount++;
      verse.streak++;
    } else {
      verse.streak = 0;
    }

    verse.lastReviewedAt = Date.now();

    // Spaced repetition: schedule next review
    const accuracy = verse.correctCount / verse.totalAttempts;
    const dayInMs = 24 * 60 * 60 * 1000;

    if (accuracy >= 0.9) {
      // 90%+ accuracy: review in 3 days
      verse.nextReviewAt = verse.lastReviewedAt + dayInMs * 3;
    } else if (accuracy >= 0.7) {
      // 70-89% accuracy: review in 1 day
      verse.nextReviewAt = verse.lastReviewedAt + dayInMs;
    } else {
      // Below 70%: review in 4 hours
      verse.nextReviewAt = verse.lastReviewedAt + (4 * 60 * 60 * 1000);
    }

    this.memoryVerses.set(verse.id, verse);
    return verse;
  }

  /**
   * Get statistics
   */
  getStatistics(): MemoryVerseStats {
    const verses = this.getAllMemoryVerses();
    if (verses.length === 0) {
      return {
        totalMemoryVerses: 0,
        mastered: 0,
        learning: 0,
        needsWork: 0,
        currentStreak: 0,
        totalCorrect: 0,
        totalAttempts: 0,
        accuracy: 0
      };
    }

    const totalCorrect = verses.reduce((sum, v) => sum + v.correctCount, 0);
    const totalAttempts = verses.reduce((sum, v) => sum + v.totalAttempts, 0);
    const maxStreak = Math.max(...verses.map(v => v.streak), 0);

    return {
      totalMemoryVerses: verses.length,
      mastered: verses.filter(v => v.totalAttempts > 0 && v.correctCount / v.totalAttempts >= 1).length,
      learning: verses.filter(v => {
        if (v.totalAttempts === 0) return false;
        const acc = v.correctCount / v.totalAttempts;
        return acc >= 0.5 && acc < 1;
      }).length,
      needsWork: verses.filter(v => {
        if (v.totalAttempts === 0) return true;
        return v.correctCount / v.totalAttempts < 0.5;
      }).length,
      currentStreak: maxStreak,
      totalCorrect,
      totalAttempts,
      accuracy: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0
    };
  }

  /**
   * Create a session
   */
  startSession(verses: MemoryVerse[]): MemoryVerseSession {
    const session: MemoryVerseSession = {
      id: `session-${Date.now()}`,
      startedAt: Date.now(),
      challenges: verses.map(v => this.generateChallenge(v)),
      score: 0,
      totalQuestions: verses.length,
      accuracy: 0
    };

    this.currentSession = session;
    return session;
  }

  /**
   * Complete a session
   */
  completeSession(): MemoryVerseSession | null {
    if (!this.currentSession) return null;

    const challenges = this.currentSession.challenges;
    const correct = challenges.filter(c => c.isCorrect).length;

    this.currentSession.score = correct;
    this.currentSession.accuracy = (correct / this.currentSession.totalQuestions) * 100;
    this.currentSession.completedAt = Date.now();

    this.sessions.push(this.currentSession);

    // Update verse progress
    challenges.forEach(c => {
      this.updateMemoryVerseProgress(c.memoryVerse, c.isCorrect || false);
    });

    const completed = this.currentSession;
    this.currentSession = null;
    return completed;
  }

  /**
   * Get session history
   */
  getSessionHistory(limit: number = 10): MemoryVerseSession[] {
    return this.sessions.slice(-limit).reverse();
  }

  /**
   * Export memory verses as JSON
   */
  exportAsJSON(): string {
    return JSON.stringify(this.getAllMemoryVerses(), null, 2);
  }

  /**
   * Import memory verses from JSON
   */
  importFromJSON(jsonString: string): MemoryVerse[] {
    const verses = JSON.parse(jsonString) as MemoryVerse[];
    verses.forEach(v => {
      this.memoryVerses.set(v.id, v);
    });
    return verses;
  }
}

export const MemoryVerseService = new MemoryVerseServiceClass();
