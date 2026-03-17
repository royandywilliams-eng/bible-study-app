export type Testament = 'OT' | 'NT';

export interface Verse {
  verseNum: number;
  text: string;
}

export interface Chapter {
  chapterNum: number;
  verses: Verse[];
}

export interface BibleBook {
  id: string; // Format: "OT-01" for Genesis, "NT-01" for Matthew
  testament: Testament;
  bookNumber: number;
  bookName: string;
  totalChapters: number;
  chapters: Chapter[];
}

export interface BibleVersion {
  id: string; // e.g., 'esv', 'kjv'
  name: string;
  abbreviation: string;
}

export interface BibleData {
  version: string;
  timestamp: number;
  books: BibleBook[];
}

export interface PassageReference {
  testament: Testament;
  bookNumber: number;
  bookName?: string;
  chapterNum?: number;
  verseNum?: number;
}

export interface VerseRange {
  startBook: string;
  startChapter: number;
  startVerse: number;
  endBook: string;
  endChapter: number;
  endVerse: number;
}
