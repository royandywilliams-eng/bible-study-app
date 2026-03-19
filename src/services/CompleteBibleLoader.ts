import type { BibleBook, Testament } from '../types/bible';
import { bibleAPIService } from './BibleAPIService';

// Old Testament book abbreviations (in order)
const OT_ABBREVIATIONS = [
  'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
  '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
  'ECC', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA',
  'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'
];

class CompleteBibleLoaderClass {
  private isLoading = false;
  private loadedBooks: BibleBook[] | null = null;

  /**
   * Get testament type from book abbreviation
   */
  private getTestament(abbr: string): Testament {
    return OT_ABBREVIATIONS.includes(abbr) ? 'OT' : 'NT';
  }

  /**
   * Get book number from its position in the Bible
   */
  private getBookNumber(abbr: string): number {
    // Find position in combined list of all abbreviations
    const allAbbrs = [
      'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
      '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
      'ECC', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA',
      'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL',
      // New Testament
      'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
      'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS',
      '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'
    ];

    const index = allAbbrs.indexOf(abbr);
    return index >= 0 ? index + 1 : 0;
  }

  /**
   * Load complete Bible from API and transform to BibleBook format
   */
  async loadCompleteBible(version: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb' = 'esv'): Promise<BibleBook[]> {
    // Return cached if already loaded
    if (this.loadedBooks && this.loadedBooks.length > 0) {
      console.log('📖 Using cached Bible data');
      return this.loadedBooks;
    }

    if (this.isLoading) {
      console.log('⏳ Bible load already in progress, waiting...');
      // Wait for loading to complete
      while (this.isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.loadedBooks || [];
    }

    this.isLoading = true;

    try {
      // Fetch complete Bible from API
      const apiBooks = await bibleAPIService.loadCompleteBible(version);

      // Transform API response to BibleBook format
      const bibleBooks: BibleBook[] = apiBooks.map((apiBook: any) => {
        const testament = this.getTestament(apiBook.abbreviation);
        const bookNumber = this.getBookNumber(apiBook.abbreviation);

        return {
          id: `${testament}-${String(bookNumber).padStart(2, '0')}`,
          testament,
          bookNumber,
          bookName: apiBook.name,
          totalChapters: apiBook.chapters.length,
          chapters: apiBook.chapters.map((chapter: any) => ({
            chapterNum: chapter.chapterNum,
            verses: chapter.verses || []
          }))
        };
      });

      // Validate Genesis 1:1
      const genesisBook = bibleBooks.find(b => b.bookName.includes('Genesis'));
      if (genesisBook) {
        const verse = genesisBook.chapters[0]?.verses[0];
        console.log(`✓ Genesis 1:1 verified - Testament: ${genesisBook.testament}, Text: "${verse?.text?.substring(0, 50)}..."`);

        // Validate it's OT, not NT
        if (genesisBook.testament !== 'OT') {
          console.error('❌ ERROR: Genesis is marked as ' + genesisBook.testament + ', not OT!');
          throw new Error('Data validation failed: Genesis testament is incorrect');
        }
      }

      this.loadedBooks = bibleBooks;
      return bibleBooks;
    } catch (error) {
      console.error('Failed to load complete Bible:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Clear cached data and force reload on next call
   */
  clearCache(): void {
    this.loadedBooks = null;
    console.log('📖 Bible cache cleared');
  }

  /**
   * Check if Bible is currently loading
   */
  isCurrentlyLoading(): boolean {
    return this.isLoading;
  }
}

export const CompleteBibleLoader = new CompleteBibleLoaderClass();
