import lunr from 'lunr';
import type { BibleBook } from '../types/bible';

export interface SearchResult {
  bookId: string;
  bookName: string;
  bookNumber: number;
  testament: 'OT' | 'NT';
  chapterNum: number;
  verseNum: number;
  verseText: string;
  score: number;
}

class SearchServiceClass {
  private searchIndex: lunr.Index | null = null;
  private verseMap: Map<string, SearchResult> = new Map();
  private indexBuilt: boolean = false;

  /**
   * Build search index from all Bible books
   */
  async buildSearchIndex(books: BibleBook[]): Promise<void> {
    // Skip if index already built
    if (this.indexBuilt && this.searchIndex) {
      return;
    }


    const documents: any[] = [];
    this.verseMap.clear();

    books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.verses.forEach(verse => {
          const docId = `${book.id}-${chapter.chapterNum}-${verse.verseNum}`;

          documents.push({
            id: docId,
            bookId: book.id,
            bookName: book.bookName,
            bookNumber: book.bookNumber,
            testament: book.testament,
            chapterNum: chapter.chapterNum,
            verseNum: verse.verseNum,
            text: verse.text,
            content: `${book.bookName} ${chapter.chapterNum}:${verse.verseNum} ${verse.text}`
          });

          this.verseMap.set(docId, {
            bookId: book.id,
            bookName: book.bookName,
            bookNumber: book.bookNumber,
            testament: book.testament,
            chapterNum: chapter.chapterNum,
            verseNum: verse.verseNum,
            verseText: verse.text,
            score: 0
          });
        });
      });
    });

    // Build Lunr index
    this.searchIndex = lunr(function(this: any) {
      this.ref('id');
      this.field('content', { boost: 10 });
      this.field('bookName', { boost: 5 });
      this.field('text');

      documents.forEach((doc: any) => this.add(doc));
    });

    this.indexBuilt = true;
  }

  /**
   * Search Bible text for keywords
   */
  search(query: string, limit: number = 50): SearchResult[] {
    if (!this.searchIndex) {
      console.warn('Search index not built. Call buildSearchIndex first.');
      return [];
    }

    if (!query.trim()) {
      return [];
    }

    try {
      const results = this.searchIndex.search(query);

      return results
        .slice(0, limit)
        .map((result: any) => {
          const match = this.verseMap.get(result.ref);
          if (match) {
            return { ...match, score: parseFloat(result.score.toFixed(2)) };
          }
          return null;
        })
        .filter((result: any): result is SearchResult => result !== null);
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  /**
   * Search for specific book by name
   */
  searchBooks(books: BibleBook[], query: string): BibleBook[] {
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book =>
      book.bookName.toLowerCase().includes(lowercaseQuery) ||
      book.bookNumber.toString().includes(lowercaseQuery)
    );
  }

  /**
   * Get books organized by testament with descriptions
   */
  getBooksByTestament(books: BibleBook[]): {
    OT: BibleBook[];
    NT: BibleBook[];
  } {
    return {
      OT: books.filter(book => book.testament === 'OT'),
      NT: books.filter(book => book.testament === 'NT')
    };
  }

  /**
   * Get popular passages for quick access
   */
  getPopularPassages(books: BibleBook[]): SearchResult[] {
    const popular = [
      { book: 'Genesis', chapter: 1, verse: 1 },
      { book: 'Psalm', chapter: 23, verse: 1 },
      { book: 'John', chapter: 3, verse: 16 },
      { book: 'John', chapter: 11, verse: 35 },
      { book: 'Romans', chapter: 3, verse: 23 },
      { book: 'Romans', chapter: 6, verse: 23 },
      { book: '1 Corinthians', chapter: 13, verse: 4 },
      { book: 'Philippians', chapter: 4, verse: 4 },
      { book: 'Matthew', chapter: 5, verse: 3 },
      { book: 'Revelation', chapter: 21, verse: 4 },
    ];

    const results: SearchResult[] = [];

    popular.forEach(passage => {
      const book = books.find(b => b.bookName === passage.book);
      if (book) {
        const chapter = book.chapters.find(c => c.chapterNum === passage.chapter);
        if (chapter) {
          const verse = chapter.verses.find(v => v.verseNum === passage.verse);
          if (verse) {
            results.push({
              bookId: book.id,
              bookName: book.bookName,
              bookNumber: book.bookNumber,
              testament: book.testament,
              chapterNum: chapter.chapterNum,
              verseNum: verse.verseNum,
              verseText: verse.text,
              score: 1.0
            });
          }
        }
      }
    });

    return results;
  }

  /**
   * Get search suggestions based on partial input
   */
  getSearchSuggestions(query: string, books: BibleBook[], limit: number = 5): string[] {
    if (!query.trim()) {
      return [];
    }

    const lowercaseQuery = query.toLowerCase();
    const bookNames = new Set<string>();

    books.forEach(book => {
      if (book.bookName.toLowerCase().includes(lowercaseQuery)) {
        bookNames.add(book.bookName);
      }
    });

    return Array.from(bookNames).slice(0, limit);
  }
}

// Export singleton instance
export const SearchService = new SearchServiceClass();
