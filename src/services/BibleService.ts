import type { BibleBook, Verse, Testament } from '../types/bible';
import DatabaseService from './database/DatabaseService';

interface CurrentPassage {
  testament: Testament;
  bookNumber: number;
  bookName: string;
  chapterNum: number;
  verseNum: number;
}

class BibleService {
  private static instance: BibleService;
  private books: BibleBook[] = [];

  private constructor() {
    // No initialization needed
  }

  static getInstance(): BibleService {
    if (!BibleService.instance) {
      BibleService.instance = new BibleService();
    }
    return BibleService.instance;
  }

  async loadAllBooks(): Promise<BibleBook[]> {
    if (this.books.length > 0) return this.books;
    this.books = await DatabaseService.getDB().then(db => db.getAll('bibleBooks'));
    return this.books || [];
  }

  async getBook(id: string): Promise<BibleBook | undefined> {
    return DatabaseService.getDB().then(db => db.get('bibleBooks', id));
  }

  async getBooksByTestament(testament: Testament): Promise<BibleBook[]> {
    return DatabaseService.getDB().then(db => db.getAllFromIndex('bibleBooks', 'by-testament', testament));
  }

  async getChapter(bookId: string, chapterNum: number): Promise<Verse[]> {
    const book = await this.getBook(bookId);
    if (!book) return [];

    const chapter = book.chapters.find(ch => ch.chapterNum === chapterNum);
    return chapter ? chapter.verses : [];
  }

  async getVerse(bookId: string, chapterNum: number, verseNum: number, version: string = 'esv'): Promise<string> {
    const verses = await this.getChapter(bookId, chapterNum);
    const verse = verses.find(v => v.verseNum === verseNum);

    if (verse?.versions && version in verse.versions) {
      return verse.versions[version as keyof typeof verse.versions] || verse.text || '';
    }

    return verse?.text || '';
  }

  getBookIdFromNumber(testament: Testament, bookNumber: number): string {
    return `${testament}-${String(bookNumber).padStart(2, '0')}`;
  }

  parseBookId(bookId: string): { testament: Testament; bookNumber: number } {
    const [testament, bookNumber] = bookId.split('-');
    return {
      testament: testament as Testament,
      bookNumber: parseInt(bookNumber, 10),
    };
  }

  // Navigate to next chapter
  async getNextChapter(current: CurrentPassage): Promise<CurrentPassage | null> {
    const book = await this.getBook(`${current.testament}-${String(current.bookNumber).padStart(2, '0')}`);
    if (!book) return null;

    if (current.chapterNum < book.totalChapters) {
      return { ...current, chapterNum: current.chapterNum + 1, verseNum: 1 };
    }

    // Move to next book
    const allBooks = await this.loadAllBooks();
    const currentBook = allBooks.find(b => b.bookNumber === current.bookNumber && b.testament === current.testament);
    if (!currentBook) return null;

    const nextTestament = current.testament === 'OT' ? 'OT' : 'NT';
    const isLastOTBook = current.testament === 'OT' && current.bookNumber === 39;
    const nextTestament2 = isLastOTBook ? 'NT' : nextTestament;

    const nextBookNumber = isLastOTBook ? 1 : current.bookNumber + 1;
    const nextBook = allBooks.find(b => b.bookNumber === nextBookNumber && b.testament === nextTestament2);

    if (!nextBook) return null;

    return {
      testament: nextTestament2,
      bookNumber: nextBookNumber,
      bookName: nextBook.bookName,
      chapterNum: 1,
      verseNum: 1,
    };
  }

  // Navigate to previous chapter
  async getPreviousChapter(current: CurrentPassage): Promise<CurrentPassage | null> {
    if (current.chapterNum > 1) {
      const book = await this.getBook(`${current.testament}-${String(current.bookNumber).padStart(2, '0')}`);
      if (!book) return null;
      return { ...current, chapterNum: current.chapterNum - 1, verseNum: 1 };
    }

    // Move to previous book
    const allBooks = await this.loadAllBooks();
    const isFirstNTBook = current.testament === 'NT' && current.bookNumber === 1;
    const prevTestament = isFirstNTBook ? 'OT' : current.testament;
    const prevBookNumber = isFirstNTBook ? 39 : current.bookNumber - 1;

    if (prevBookNumber < 1) return null;

    const prevBook = allBooks.find(b => b.bookNumber === prevBookNumber && b.testament === prevTestament);
    if (!prevBook) return null;

    return {
      testament: prevTestament,
      bookNumber: prevBookNumber,
      bookName: prevBook.bookName,
      chapterNum: prevBook.totalChapters,
      verseNum: 1,
    };
  }

  // Format passage reference for display (e.g., "John 3:16")
  formatPassageReference(bookName: string, chapterNum: number, verseNum?: number): string {
    if (verseNum) {
      return `${bookName} ${chapterNum}:${verseNum}`;
    }
    return `${bookName} ${chapterNum}`;
  }

  // Parse passage reference (e.g., "John 3:16" -> {bookName, chapterNum, verseNum})
  parsePassageReference(reference: string): { bookName: string; chapterNum: number; verseNum?: number } | null {
    const match = reference.match(/^(.+?)\s+(\d+):?(\d+)?$/);
    if (!match) return null;

    return {
      bookName: match[1],
      chapterNum: parseInt(match[2], 10),
      verseNum: match[3] ? parseInt(match[3], 10) : undefined,
    };
  }

  // Get total number of verses in a chapter
  async getVerseCountInChapter(bookId: string, chapterNum: number): Promise<number> {
    const verses = await this.getChapter(bookId, chapterNum);
    return verses.length;
  }

  // Get total verses in a book
  async getVerseCountInBook(bookId: string): Promise<number> {
    const book = await this.getBook(bookId);
    if (!book) return 0;
    return book.chapters.reduce((sum, ch) => sum + ch.verses.length, 0);
  }
}

export default BibleService.getInstance();
