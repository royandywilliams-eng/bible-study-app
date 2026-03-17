import type { Verse } from '../../types/bible';
import { useBibleStore } from '../../store/useBibleStore';
import VerseCard from './VerseCard';

interface VerseListProps {
  verses: Verse[];
  bookName: string;
  chapterNum: number;
}

export default function VerseList({ verses, bookName, chapterNum }: VerseListProps) {
  const { selectedVerses, toggleVerseSelection } = useBibleStore();

  if (verses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">No verses loaded</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold mb-4">{bookName} {chapterNum}</h3>
      <div className="space-y-2">
        {verses.map(verse => {
          const verseId = `${bookName}-${chapterNum}-${verse.verseNum}`;
          const isSelected = selectedVerses.includes(verseId);

          return (
            <VerseCard
              key={verse.verseNum}
              verseNum={verse.verseNum}
              text={verse.text}
              isSelected={isSelected}
              onSelect={() => toggleVerseSelection(verseId)}
            />
          );
        })}
      </div>
    </div>
  );
}
