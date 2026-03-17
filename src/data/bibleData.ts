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

// Sample verse content for demo purposes with correct scriptural references
// In production, load actual Bible text from a file or API

// OLD TESTAMENT VERSES - mapped to their correct locations
interface VerseMapping {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const OT_VERSE_MAPPINGS: VerseMapping[] = [
  { book: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
  { book: 'Exodus', chapter: 20, verse: 1, text: 'And God spoke all these words, saying, "I am the Lord your God."' },
  { book: 'Leviticus', chapter: 19, verse: 18, text: 'Love your neighbor as yourself. All the Law and the Prophets hang on these two commandments.' },
  { book: 'Numbers', chapter: 6, verse: 24, text: 'The Lord bless you and keep you; the Lord make his face to shine upon you.' },
  { book: 'Deuteronomy', chapter: 6, verse: 5, text: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' },
  { book: 'Joshua', chapter: 1, verse: 8, text: 'Keep this Book of the Law always on your lips; meditate on it day and night.' },
  { book: 'Judges', chapter: 6, verse: 14, text: 'The Lord turned to him and said, "Go in the strength you have and save Israel."' },
  { book: 'Ruth', chapter: 3, verse: 11, text: 'All the people of my town know that you are a woman of noble character.' },
  { book: '1 Samuel', chapter: 16, verse: 7, text: 'The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.' },
  { book: '2 Samuel', chapter: 22, verse: 31, text: 'As for God, his way is perfect: The Lord\'s word is flawless.' },
  { book: '1 Kings', chapter: 3, verse: 12, text: 'I will give you a wise and discerning heart, so that there will never have been anyone like you.' },
  { book: '2 Kings', chapter: 2, verse: 11, text: 'As they were walking along and talking together, suddenly a chariot of fire appeared.' },
  { book: '1 Chronicles', chapter: 16, verse: 11, text: 'Look to the Lord and his strength; seek his face always.' },
  { book: '2 Chronicles', chapter: 7, verse: 14, text: 'If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven.' },
  { book: 'Ezra', chapter: 7, verse: 10, text: 'For Ezra had devoted himself to the study and observance of the Law of the Lord.' },
  { book: 'Nehemiah', chapter: 8, verse: 8, text: 'They read from the Book of the Law of God, making it clear and giving the meaning so that the people understood what was being read.' },
  { book: 'Esther', chapter: 4, verse: 14, text: 'For if you remain silent at this time, relief and deliverance for the Jews will arise from another place.' },
  { book: 'Job', chapter: 19, verse: 25, text: 'I know that my redeemer lives, and that in the end he will stand on the earth.' },
  { book: 'Psalms', chapter: 23, verse: 1, text: 'The Lord is my shepherd, I lack nothing.' },
  { book: 'Proverbs', chapter: 9, verse: 10, text: 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.' },
  { book: 'Ecclesiastes', chapter: 12, verse: 13, text: 'Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the whole duty of humankind.' },
  { book: 'Isaiah', chapter: 40, verse: 31, text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.' },
  { book: 'Jeremiah', chapter: 29, verse: 11, text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.' },
  { book: 'Lamentations', chapter: 3, verse: 22, text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail.' },
  { book: 'Ezekiel', chapter: 36, verse: 26, text: 'I will give you a new heart and put a new spirit in you.' },
  { book: 'Daniel', chapter: 6, verse: 10, text: 'Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed.' },
  { book: 'Hosea', chapter: 6, verse: 6, text: 'For I desire mercy, not sacrifice, and acknowledgment of God rather than burnt offerings.' },
  { book: 'Joel', chapter: 2, verse: 28, text: 'And afterward, I will pour out my Spirit on all people.' },
  { book: 'Amos', chapter: 5, verse: 24, text: 'But let justice roll on like a river, righteousness like a never-failing stream!' },
  { book: 'Obadiah', chapter: 1, verse: 3, text: 'The pride of your heart has deceived you.' },
  { book: 'Jonah', chapter: 2, verse: 10, text: 'And the Lord commanded the fish, and it vomited Jonah onto dry land.' },
  { book: 'Micah', chapter: 6, verse: 8, text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.' },
  { book: 'Nahum', chapter: 1, verse: 7, text: 'The Lord is good, a refuge in times of trouble.' },
  { book: 'Habakkuk', chapter: 2, verse: 4, text: 'See, the enemy is puffed up; his desires are not upright—but the righteous person will live by their faithfulness.' },
  { book: 'Zephaniah', chapter: 3, verse: 17, text: 'The Lord your God is with you, the Mighty Warrior who saves.' },
  { book: 'Haggai', chapter: 2, verse: 4, text: 'But now be strong, Zerubbabel\', declares the Lord. \'Be strong, Joshua son of Jozadak, the high priest. Be strong, all you people of the land\', declares the Lord.' },
  { book: 'Zechariah', chapter: 2, verse: 8, text: 'For this is what the Lord Almighty says: "After the Glorious One has sent me against the nations that have plundered you—for whoever touches you touches the apple of his eye."' },
  { book: 'Malachi', chapter: 3, verse: 10, text: 'Bring the whole tithe into the storehouse that there may be food in my house.' },
];

// NEW TESTAMENT VERSES - mapped to their correct locations
const NT_VERSE_MAPPINGS: VerseMapping[] = [
  { book: 'Matthew', chapter: 5, verse: 16, text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.' },
  { book: 'Mark', chapter: 12, verse: 30, text: 'Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.' },
  { book: 'Luke', chapter: 1, verse: 37, text: 'For no word from God will ever fail.' },
  { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
  { book: 'Acts', chapter: 1, verse: 8, text: 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.' },
  { book: 'Romans', chapter: 3, verse: 23, text: 'For all have sinned and fall short of the glory of God.' },
  { book: '1 Corinthians', chapter: 16, verse: 14, text: 'Let all that you do be done in love.' },
  { book: '2 Corinthians', chapter: 5, verse: 17, text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!' },
  { book: 'Galatians', chapter: 5, verse: 22, text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.' },
  { book: 'Ephesians', chapter: 2, verse: 8, text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.' },
  { book: 'Philippians', chapter: 4, verse: 13, text: 'I can do all this through Christ, who gives me strength.' },
  { book: 'Colossians', chapter: 3, verse: 16, text: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit.' },
  { book: '1 Thessalonians', chapter: 5, verse: 17, text: 'Pray without ceasing.' },
  { book: '2 Thessalonians', chapter: 3, verse: 3, text: 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.' },
  { book: '1 Timothy', chapter: 6, verse: 10, text: 'For the love of money is a root of all kinds of evil.' },
  { book: '2 Timothy', chapter: 2, verse: 2, text: 'And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.' },
  { book: 'Titus', chapter: 2, verse: 11, text: 'For the grace of God has appeared that offers salvation to all people.' },
  { book: 'Philemon', chapter: 1, verse: 6, text: 'I pray that you may be active in sharing your faith, so that you will have a full understanding of every good thing we have in Christ.' },
  { book: 'Hebrews', chapter: 11, verse: 1, text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
  { book: 'James', chapter: 1, verse: 22, text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says.' },
  { book: '1 Peter', chapter: 5, verse: 7, text: 'Cast all your anxiety on him because he cares for you.' },
  { book: '2 Peter', chapter: 1, verse: 3, text: 'His divine power has given us everything we need for a godly life through our knowledge of him who called us by his own glory and goodness.' },
  { book: '1 John', chapter: 4, verse: 7, text: 'Dear friends, let us love one another, for love comes from God.' },
  { book: '2 John', chapter: 1, verse: 6, text: 'And this is love: that we walk in obedience to his commands.' },
  { book: '3 John', chapter: 1, verse: 11, text: 'Dear friend, do not imitate what is evil but what is good.' },
  { book: 'Jude', chapter: 1, verse: 24, text: 'To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy.' },
  { book: 'Revelation', chapter: 21, verse: 4, text: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.' },
];

function generateSampleVerses(bookName: string, testament: 'OT' | 'NT', chapterNum: number, verseCount: number = 25) {
  // Get the appropriate verse mappings for this testament
  const verseMappings = testament === 'OT' ? OT_VERSE_MAPPINGS : NT_VERSE_MAPPINGS;

  // Create a map of book+chapter combinations that have real verses
  const mappedVerses = new Map<string, VerseMapping>();
  verseMappings.forEach(vm => {
    if (vm.book === bookName && vm.chapter === chapterNum) {
      mappedVerses.set(`${vm.book}:${vm.chapter}:${vm.verse}`, vm);
    }
  });

  return Array.from({ length: verseCount }, (_, i) => {
    const verseNum = i + 1;
    const key = `${bookName}:${chapterNum}:${verseNum}`;

    // Check if we have a real verse for this exact location
    const mappedVerse = mappedVerses.get(key);
    const text = mappedVerse
      ? mappedVerse.text
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
