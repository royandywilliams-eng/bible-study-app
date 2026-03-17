import type { Verse, Testament } from '../../types/bible';
import { useBibleStore } from '../../store/useBibleStore';
import { VerseHighlight } from '../Notes/VerseHighlight';
import type { SearchResult } from '../../services/SearchService';
import VerseCard from './VerseCard';

interface VerseListProps {
  verses: Verse[];
  bookName: string;
  chapterNum: number;
  bookNumber: number;
  testament: Testament;
  isDarkMode?: boolean;
}

export default function VerseList({
  verses,
  bookName,
  chapterNum,
  bookNumber,
  testament,
  isDarkMode = false
}: VerseListProps) {
  const { selectedVerses, toggleVerseSelection } = useBibleStore();

  if (verses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">No verses loaded</p>
      </div>
    );
  }

  // Helper function to convert verse to SearchResult format
  const verseToSearchResult = (verse: Verse): SearchResult => ({
    bookId: bookNumber.toString(),
    bookName,
    bookNumber,
    testament: testament as 'OT' | 'NT',
    chapterNum,
    verseNum: verse.verseNum,
    verseText: verse.text,
    score: 0
  });

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold mb-4">{bookName} {chapterNum}</h3>
      <div className="space-y-4">
        {verses.map(verse => {
          const verseId = `${bookName}-${chapterNum}-${verse.verseNum}`;
          const isSelected = selectedVerses.includes(verseId);
          const searchResult = verseToSearchResult(verse);

          return (
            <div key={verse.verseNum} className="space-y-2">
              <VerseCard
                verseNum={verse.verseNum}
                text={verse.text}
                isSelected={isSelected}
                onSelect={() => toggleVerseSelection(verseId)}
                bookName={bookName}
                chapterNum={chapterNum}
              />
              <div className="ml-4">
                <VerseHighlight result={searchResult} isDarkMode={isDarkMode} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
