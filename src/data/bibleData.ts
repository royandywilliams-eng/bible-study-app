import type { BibleBook, Testament } from '../types/bible';

// Sample Bible data structure
// In a real app, this would be loaded from a file or server
const BIBLE_BOOKS_METADATA: Array<{
  testament: Testament;
  bookNumber: number;
  bookName: string;
  totalChapters: number;
}> = [
  // Old Testament (39 books)
  { testament: 'OT', bookNumber: 1, bookName: 'Genesis', totalChapters: 50 },
  { testament: 'OT', bookNumber: 2, bookName: 'Exodus', totalChapters: 40 },
  { testament: 'OT', bookNumber: 3, bookName: 'Leviticus', totalChapters: 27 },
  { testament: 'OT', bookNumber: 4, bookName: 'Numbers', totalChapters: 36 },
  { testament: 'OT', bookNumber: 5, bookName: 'Deuteronomy', totalChapters: 34 },
  { testament: 'OT', bookNumber: 6, bookName: 'Joshua', totalChapters: 24 },
  { testament: 'OT', bookNumber: 7, bookName: 'Judges', totalChapters: 21 },
  { testament: 'OT', bookNumber: 8, bookName: 'Ruth', totalChapters: 4 },
  { testament: 'OT', bookNumber: 9, bookName: '1 Samuel', totalChapters: 31 },
  { testament: 'OT', bookNumber: 10, bookName: '2 Samuel', totalChapters: 24 },
  { testament: 'OT', bookNumber: 11, bookName: '1 Kings', totalChapters: 22 },
  { testament: 'OT', bookNumber: 12, bookName: '2 Kings', totalChapters: 25 },
  { testament: 'OT', bookNumber: 13, bookName: '1 Chronicles', totalChapters: 29 },
  { testament: 'OT', bookNumber: 14, bookName: '2 Chronicles', totalChapters: 36 },
  { testament: 'OT', bookNumber: 15, bookName: 'Ezra', totalChapters: 10 },
  { testament: 'OT', bookNumber: 16, bookName: 'Nehemiah', totalChapters: 13 },
  { testament: 'OT', bookNumber: 17, bookName: 'Esther', totalChapters: 10 },
  { testament: 'OT', bookNumber: 18, bookName: 'Job', totalChapters: 42 },
  { testament: 'OT', bookNumber: 19, bookName: 'Psalms', totalChapters: 150 },
  { testament: 'OT', bookNumber: 20, bookName: 'Proverbs', totalChapters: 31 },
  { testament: 'OT', bookNumber: 21, bookName: 'Ecclesiastes', totalChapters: 12 },
  { testament: 'OT', bookNumber: 22, bookName: 'Isaiah', totalChapters: 66 },
  { testament: 'OT', bookNumber: 23, bookName: 'Jeremiah', totalChapters: 52 },
  { testament: 'OT', bookNumber: 24, bookName: 'Lamentations', totalChapters: 5 },
  { testament: 'OT', bookNumber: 25, bookName: 'Ezekiel', totalChapters: 48 },
  { testament: 'OT', bookNumber: 26, bookName: 'Daniel', totalChapters: 12 },
  { testament: 'OT', bookNumber: 27, bookName: 'Hosea', totalChapters: 14 },
  { testament: 'OT', bookNumber: 28, bookName: 'Joel', totalChapters: 3 },
  { testament: 'OT', bookNumber: 29, bookName: 'Amos', totalChapters: 9 },
  { testament: 'OT', bookNumber: 30, bookName: 'Obadiah', totalChapters: 1 },
  { testament: 'OT', bookNumber: 31, bookName: 'Jonah', totalChapters: 4 },
  { testament: 'OT', bookNumber: 32, bookName: 'Micah', totalChapters: 7 },
  { testament: 'OT', bookNumber: 33, bookName: 'Nahum', totalChapters: 3 },
  { testament: 'OT', bookNumber: 34, bookName: 'Habakkuk', totalChapters: 3 },
  { testament: 'OT', bookNumber: 35, bookName: 'Zephaniah', totalChapters: 3 },
  { testament: 'OT', bookNumber: 36, bookName: 'Haggai', totalChapters: 2 },
  { testament: 'OT', bookNumber: 37, bookName: 'Zechariah', totalChapters: 14 },
  { testament: 'OT', bookNumber: 38, bookName: 'Malachi', totalChapters: 4 },

  // New Testament (27 books)
  { testament: 'NT', bookNumber: 1, bookName: 'Matthew', totalChapters: 28 },
  { testament: 'NT', bookNumber: 2, bookName: 'Mark', totalChapters: 16 },
  { testament: 'NT', bookNumber: 3, bookName: 'Luke', totalChapters: 24 },
  { testament: 'NT', bookNumber: 4, bookName: 'John', totalChapters: 21 },
  { testament: 'NT', bookNumber: 5, bookName: 'Acts', totalChapters: 28 },
  { testament: 'NT', bookNumber: 6, bookName: 'Romans', totalChapters: 16 },
  { testament: 'NT', bookNumber: 7, bookName: '1 Corinthians', totalChapters: 16 },
  { testament: 'NT', bookNumber: 8, bookName: '2 Corinthians', totalChapters: 13 },
  { testament: 'NT', bookNumber: 9, bookName: 'Galatians', totalChapters: 6 },
  { testament: 'NT', bookNumber: 10, bookName: 'Ephesians', totalChapters: 6 },
  { testament: 'NT', bookNumber: 11, bookName: 'Philippians', totalChapters: 4 },
  { testament: 'NT', bookNumber: 12, bookName: 'Colossians', totalChapters: 4 },
  { testament: 'NT', bookNumber: 13, bookName: '1 Thessalonians', totalChapters: 5 },
  { testament: 'NT', bookNumber: 14, bookName: '2 Thessalonians', totalChapters: 3 },
  { testament: 'NT', bookNumber: 15, bookName: '1 Timothy', totalChapters: 6 },
  { testament: 'NT', bookNumber: 16, bookName: '2 Timothy', totalChapters: 4 },
  { testament: 'NT', bookNumber: 17, bookName: 'Titus', totalChapters: 3 },
  { testament: 'NT', bookNumber: 18, bookName: 'Philemon', totalChapters: 1 },
  { testament: 'NT', bookNumber: 19, bookName: 'Hebrews', totalChapters: 13 },
  { testament: 'NT', bookNumber: 20, bookName: 'James', totalChapters: 5 },
  { testament: 'NT', bookNumber: 21, bookName: '1 Peter', totalChapters: 5 },
  { testament: 'NT', bookNumber: 22, bookName: '2 Peter', totalChapters: 3 },
  { testament: 'NT', bookNumber: 23, bookName: '1 John', totalChapters: 5 },
  { testament: 'NT', bookNumber: 24, bookName: '2 John', totalChapters: 1 },
  { testament: 'NT', bookNumber: 25, bookName: '3 John', totalChapters: 1 },
  { testament: 'NT', bookNumber: 26, bookName: 'Jude', totalChapters: 1 },
  { testament: 'NT', bookNumber: 27, bookName: 'Revelation', totalChapters: 22 },
];

// Sample verse content for demo purposes
// In production, load actual Bible text from a file or API

const OT_VERSES = [
  "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",
  "Trust in the Lord with all your heart and lean not on your own understanding.",
  "But as for me and my household, we will serve the Lord.",
  "The Lord is my shepherd, I lack nothing.",
  "Blessed are those who dwell in your house, ever singing your praise.",
  "Your word is a lamp to my feet and a light to my path.",
  "Love the Lord your God with all your heart and with all your soul and with all your mind.",
  "Love your neighbor as yourself. All the Law and the Prophets hang on these two commandments.",
  "Blessed is the one whose delight is in the law of the Lord.",
  "In the beginning, God created the heavens and the earth.",
  "The heavens declare the glory of God; the skies proclaim the work of his hands.",
  "Praise the Lord from the heavens; praise him in the heights above.",
  "Great is the Lord and most worthy of praise; his greatness no one can fathom.",
  "The Lord is my light and my salvation—whom shall I fear?",
  "Teach us to number our days, that we may gain a heart of wisdom.",
];

const NT_VERSES = [
  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  "God is love, and whoever abides in love abides in God, and God in them.",
  "Greater love has no one than this: to lay down one's life for one's friends.",
  "Let all that you do be done in love.",
  "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal.",
  "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
  "And now these three remain: faith, hope and love. But the greatest of these is love.",
  "Be completely humble and gentle; be patient, bearing with one another in love.",
  "Above all, love each other deeply, because love covers a multitude of sins.",
  "Dear friends, since God so loved us, we also ought to love one another.",
  "Beloved, let us love one another, for love is from God.",
  "By this everyone will know that you are my disciples, if you love one another.",
  "I can do all this through Christ, who gives me strength.",
  "For it is by grace you have been saved, through faith.",
  "Jesus answered, I am the way and the truth and the life.",
  "Let the peace of Christ rule in your hearts.",
];

function generateSampleVerses(bookName: string, testament: 'OT' | 'NT', chapterNum: number, verseCount: number = 25) {
  const versePool = testament === 'OT' ? OT_VERSES : NT_VERSES;

  return Array.from({ length: verseCount }, (_, i) => {
    const verseNum = i + 1;
    // Use a mix of actual sample verses and placeholder text
    const useActualVerse = Math.random() > 0.3; // 70% chance of actual verse
    const text = useActualVerse
      ? versePool[(bookName.charCodeAt(0) + chapterNum + verseNum) % versePool.length]
      : `This is ${bookName} ${chapterNum}:${verseNum}. Sample verse text for demonstration purposes.`;

    return {
      verseNum,
      text,
    };
  });
}

function generateSampleChapters(bookName: string, testament: 'OT' | 'NT', chapterCount: number) {
  return Array.from({ length: chapterCount }, (_, i) => ({
    chapterNum: i + 1,
    verses: generateSampleVerses(bookName, testament, i + 1, 20 + Math.floor(Math.random() * 30)),
  }));
}

export function generateSampleBibleData(): BibleBook[] {
  return BIBLE_BOOKS_METADATA.map((meta) => ({
    id: `${meta.testament}-${String(meta.bookNumber).padStart(2, '0')}`,
    testament: meta.testament,
    bookNumber: meta.bookNumber,
    bookName: meta.bookName,
    totalChapters: meta.totalChapters,
    chapters: generateSampleChapters(meta.bookName, meta.testament, Math.min(meta.totalChapters, 3)), // Limit to 3 chapters for demo
  }));
}

export const BIBLE_BOOKS_LIST = BIBLE_BOOKS_METADATA;
