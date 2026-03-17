import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { BibleBook, Testament } from '../../types/bible';

interface BibleDB extends DBSchema {
  bibleBooks: {
    key: string;
    value: BibleBook;
    indexes: {
      'by-testament': Testament;
      'by-book-number': number;
      'by-book-name': string;
    };
  };
  devotionals: {
    key: string;
    value: {
      id: string;
      date: string;
      title: string;
      passage: string[];
      dailyReading: string;
      reflection: string;
      prompts: string[];
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      tags: string[];
    };
    indexes: {
      'by-date': string;
      'by-difficulty': string;
    };
  };
  studyGuides: {
    key: string;
    value: {
      id: string;
      title: string;
      description: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      estimatedHours: number;
      lessons: any[];
    };
  };
  userNotes: {
    key: string;
    value: {
      id: string;
      passageId: string;
      type: 'note' | 'highlight';
      text: string;
      color?: string;
      createdAt: number;
      updatedAt: number;
      tags?: string[];
    };
    indexes: {
      'by-passage': string;
      'by-type': string;
      'by-created': number;
    };
  };
  userProgress: {
    key: string;
    value: {
      id: string;
      totalBooksRead: number;
      totalChaptersRead: number;
      totalVersesRead: number;
      readingStreak: number;
      lastReadDate: string;
      completionPercentage: number;
      bookProgress: Record<string, { chaptersRead: number; totalChapters: number; percentage: number }>;
      sessionHistory: Array<{ date: string; booksRead: string[]; chaptersRead: number; duration: number }>;
    };
  };
  bookmarks: {
    key: string;
    value: {
      id: string;
      passageId: string;
      label: string;
      createdAt: number;
    };
    indexes: {
      'by-passage': string;
      'by-created': number;
    };
  };
  completedLessons: {
    key: string;
    value: {
      lessonId: string;
      guideId: string;
      completed: boolean;
      quizScore?: number;
      completedAt: number;
      timeSpent: number;
    };
  };
  searchIndex: {
    key: string;
    value: {
      id: string;
      idx: any;
      lastUpdated: number;
    };
  };
}

class DatabaseService {
  private static instance: DatabaseService;
  private db: IDBPDatabase<BibleDB> | null = null;
  private static readonly DB_NAME = 'bible-study-db';
  private static readonly DB_VERSION = 1;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    if (this.db) return;

    this.db = await openDB<BibleDB>(DatabaseService.DB_NAME, DatabaseService.DB_VERSION, {
      upgrade(db) {
        // Bible Books store
        if (!db.objectStoreNames.contains('bibleBooks')) {
          const bibleStore = db.createObjectStore('bibleBooks', { keyPath: 'id' });
          bibleStore.createIndex('by-testament', 'testament');
          bibleStore.createIndex('by-book-number', 'bookNumber');
          bibleStore.createIndex('by-book-name', 'bookName');
        }

        // Devotionals store
        if (!db.objectStoreNames.contains('devotionals')) {
          const devotionalStore = db.createObjectStore('devotionals', { keyPath: 'id' });
          devotionalStore.createIndex('by-date', 'date');
          devotionalStore.createIndex('by-difficulty', 'difficulty');
        }

        // Study Guides store
        if (!db.objectStoreNames.contains('studyGuides')) {
          db.createObjectStore('studyGuides', { keyPath: 'id' });
        }

        // User Notes store
        if (!db.objectStoreNames.contains('userNotes')) {
          const notesStore = db.createObjectStore('userNotes', { keyPath: 'id' });
          notesStore.createIndex('by-passage', 'passageId');
          notesStore.createIndex('by-type', 'type');
          notesStore.createIndex('by-created', 'createdAt');
        }

        // User Progress store
        if (!db.objectStoreNames.contains('userProgress')) {
          db.createObjectStore('userProgress', { keyPath: 'id' });
        }

        // Bookmarks store
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarksStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarksStore.createIndex('by-passage', 'passageId');
          bookmarksStore.createIndex('by-created', 'createdAt');
        }

        // Completed Lessons store
        if (!db.objectStoreNames.contains('completedLessons')) {
          db.createObjectStore('completedLessons', { keyPath: 'lessonId' });
        }

        // Search Index store
        if (!db.objectStoreNames.contains('searchIndex')) {
          db.createObjectStore('searchIndex', { keyPath: 'id' });
        }
      },
    });
  }

  async getDB(): Promise<IDBPDatabase<BibleDB>> {
    if (!this.db) {
      await this.initialize();
    }
    return this.db!;
  }

  async addBibleBooks(books: BibleBook[]): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction('bibleBooks', 'readwrite');
    for (const book of books) {
      await tx.store.add(book);
    }
    await tx.done;
  }

  async getBibleBook(id: string): Promise<BibleBook | undefined> {
    const db = await this.getDB();
    return db.get('bibleBooks', id);
  }

  async getAllBibleBooks(): Promise<BibleBook[]> {
    const db = await this.getDB();
    return db.getAll('bibleBooks');
  }

  async getBibleBooksByTestament(testament: Testament): Promise<BibleBook[]> {
    const db = await this.getDB();
    return db.getAllFromIndex('bibleBooks', 'by-testament', testament);
  }

  async addUserNote(note: any): Promise<void> {
    const db = await this.getDB();
    await db.add('userNotes', note);
  }

  async updateUserNote(note: any): Promise<void> {
    const db = await this.getDB();
    await db.put('userNotes', note);
  }

  async getUserNotesByPassage(passageId: string): Promise<any[]> {
    const db = await this.getDB();
    return db.getAllFromIndex('userNotes', 'by-passage', passageId);
  }

  async getAllUserNotes(): Promise<any[]> {
    const db = await this.getDB();
    return db.getAll('userNotes');
  }

  async deleteUserNote(id: string): Promise<void> {
    const db = await this.getDB();
    await db.delete('userNotes', id);
  }

  async addOrUpdateProgress(progress: any): Promise<void> {
    const db = await this.getDB();
    await db.put('userProgress', progress);
  }

  async getProgress(): Promise<any | undefined> {
    const db = await this.getDB();
    return db.get('userProgress', 'progress-summary');
  }

  async clearAllData(): Promise<void> {
    const db = await this.getDB();
    const stores = ['bibleBooks', 'userNotes', 'userProgress', 'bookmarks', 'completedLessons', 'searchIndex'] as const;
    const tx = db.transaction(stores, 'readwrite');
    for (const store of stores) {
      await tx.objectStore(store).clear();
    }
    await tx.done;
  }
}

export default DatabaseService.getInstance();
