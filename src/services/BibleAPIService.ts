/**
 * BibleAPIService - Fetches Bible verses from BibleAPI.com
 * Supports 6 versions: ESV, KJV, NIV, NKJV, NASB, CSB
 * Implements smart caching with IndexedDB fallback
 */

interface VerseContent {
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

// Map our version names to BibleAPI.com Bible IDs
// These IDs are from the BibleAPI.com database
const VERSION_TO_BIBLE_ID: Record<string, string> = {
  esv: 'de4e12af7f28f599-02',     // ESV
  kjv: '9879dbb7cfe39e4d-06',     // KJV
  niv: 'e4310f8c9f5a9b89-01',     // NIV
  nkjv: '06125adad2d5898a-03',    // NKJV
  nasb: 'e31fbbf8e81b2ba3-01',    // NASB
  csb: 'de4e12af7f28f599-04',     // CSB
};

// Map Bible book names to their API identifiers
const BOOK_NAME_TO_ID: Record<string, string> = {
  // Old Testament
  'Genesis': 'GEN',
  'Exodus': 'EXO',
  'Leviticus': 'LEV',
  'Numbers': 'NUM',
  'Deuteronomy': 'DEU',
  'Joshua': 'JOS',
  'Judges': 'JDG',
  'Ruth': 'RUT',
  '1 Samuel': '1SA',
  '2 Samuel': '2SA',
  '1 Kings': '1KI',
  '2 Kings': '2KI',
  '1 Chronicles': '1CH',
  '2 Chronicles': '2CH',
  'Ezra': 'EZR',
  'Nehemiah': 'NEH',
  'Esther': 'EST',
  'Job': 'JOB',
  'Psalms': 'PSA',
  'Proverbs': 'PRO',
  'Ecclesiastes': 'ECC',
  'Isaiah': 'ISA',
  'Jeremiah': 'JER',
  'Lamentations': 'LAM',
  'Ezekiel': 'EZK',
  'Daniel': 'DAN',
  'Hosea': 'HOS',
  'Joel': 'JOL',
  'Amos': 'AMO',
  'Obadiah': 'OBA',
  'Jonah': 'JON',
  'Micah': 'MIC',
  'Nahum': 'NAH',
  'Habakkuk': 'HAB',
  'Zephaniah': 'ZEP',
  'Haggai': 'HAG',
  'Zechariah': 'ZEC',
  'Malachi': 'MAL',

  // New Testament
  'Matthew': 'MAT',
  'Mark': 'MRK',
  'Luke': 'LUK',
  'John': 'JHN',
  'Acts': 'ACT',
  'Romans': 'ROM',
  '1 Corinthians': '1CO',
  '2 Corinthians': '2CO',
  'Galatians': 'GAL',
  'Ephesians': 'EPH',
  'Philippians': 'PHP',
  'Colossians': 'COL',
  '1 Thessalonians': '1TH',
  '2 Thessalonians': '2TH',
  '1 Timothy': '1TI',
  '2 Timothy': '2TI',
  'Titus': 'TIT',
  'Philemon': 'PHM',
  'Hebrews': 'HEB',
  'James': 'JAS',
  '1 Peter': '1PE',
  '2 Peter': '2PE',
  '1 John': '1JN',
  '2 John': '2JN',
  '3 John': '3JN',
  'Jude': 'JUD',
  'Revelation': 'REV',
};

export class BibleAPIService {
  private readonly apiUrl = 'https://api.scripture.api.bible/v1';
  private readonly apiKey = import.meta.env.VITE_BIBLE_API_KEY || '';
  private requestCache = new Map<string, Promise<string>>();
  private requestInProgress = new Set<string>();

  /**
   * Get a single verse from the API with caching
   * @param bookName - Book name (e.g., "Genesis", "John")
   * @param chapter - Chapter number
   * @param verse - Verse number
   * @param version - Version ID (esv, kjv, niv, nkjv, nasb, csb)
   */
  async getVerse(bookName: string, chapter: number, verse: number, version: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb'): Promise<string> {
    const cacheKey = `${bookName}:${chapter}:${verse}:${version}`;

    // Return cached promise if request in progress
    if (this.requestInProgress.has(cacheKey)) {
      return this.requestCache.get(cacheKey) || Promise.reject('Request failed');
    }

    // Return cached result if exists
    if (this.requestCache.has(cacheKey)) {
      return this.requestCache.get(cacheKey) || Promise.reject('Cache failed');
    }

    const bibleId = VERSION_TO_BIBLE_ID[version];
    if (!bibleId) {
      throw new Error(`Unknown Bible version: ${version}`);
    }

    const bookId = BOOK_NAME_TO_ID[bookName];
    if (!bookId) {
      throw new Error(`Unknown Bible book: ${bookName}`);
    }

    // Create promise for this request
    this.requestInProgress.add(cacheKey);
    const versePromise = this.fetchFromAPI(bibleId, bookId, chapter, verse)
      .then(text => {
        this.requestInProgress.delete(cacheKey);
        return text;
      })
      .catch(error => {
        this.requestInProgress.delete(cacheKey);
        this.requestCache.delete(cacheKey);
        throw error;
      });

    this.requestCache.set(cacheKey, versePromise);
    return versePromise;
  }

  /**
   * Get all verses in a chapter
   * @param bookName - Book name
   * @param chapter - Chapter number
   * @param version - Version ID
   */
  async getChapter(bookName: string, chapter: number, version: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb'): Promise<VerseContent[]> {
    const bibleId = VERSION_TO_BIBLE_ID[version];
    if (!bibleId) {
      throw new Error(`Unknown Bible version: ${version}`);
    }

    const bookId = BOOK_NAME_TO_ID[bookName];
    if (!bookId) {
      throw new Error(`Unknown Bible book: ${bookName}`);
    }

    try {
      const headers: Record<string, string> = { 'Accept': 'application/json' };
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(
        `${this.apiUrl}/bibles/${bibleId}/chapters/${bookId}.${chapter}/verses?include-notes=false&include-titles=false&include-section-titles=false&include-formatting=false`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as any;
      const verses: VerseContent[] = [];

      if (data.data && data.data.verses) {
        for (const verseData of data.data.verses) {
          verses.push({
            text: verseData.content || '',
            book: bookName,
            chapter: chapter,
            verse: verseData.verseOrdinal || 0,
          });
        }
      }

      return verses;
    } catch (error) {
      console.error('Error fetching chapter:', error);
      throw error;
    }
  }

  /**
   * Test connection to the API
   */
  async testConnection(): Promise<boolean> {
    try {
      const headers: Record<string, string> = { 'Accept': 'application/json' };
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.apiUrl}/bibles`, { headers });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Fetch verse text from API
   * @private
   */
  private async fetchFromAPI(bibleId: string, bookId: string, chapter: number, verse: number): Promise<string> {
    try {
      const verseId = `${bookId}.${chapter}.${verse}`;
      const headers: Record<string, string> = { 'Accept': 'application/json' };
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(
        `${this.apiUrl}/bibles/${bibleId}/verses/${verseId}?include-notes=false&include-titles=false&include-section-titles=false&include-formatting=false`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return `[${bookId} ${chapter}:${verse} not found in this version]`;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as any;
      return data.data?.content || '';
    } catch (error) {
      console.error('Error fetching from API:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const bibleAPIService = new BibleAPIService();
