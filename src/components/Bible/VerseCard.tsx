import { useMemo } from 'react';
import { useNotesStore } from '../../store/useNotesStore';

interface VerseCardProps {
  verseNum: number;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  bookName: string;
  chapterNum: number;
}

const HIGHLIGHT_COLORS = {
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', border: 'border-l-yellow-400 dark:border-l-yellow-600' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-l-blue-400 dark:border-l-blue-600' },
  green: { bg: 'bg-green-100 dark:bg-green-900/50', border: 'border-l-green-400 dark:border-l-green-600' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/50', border: 'border-l-pink-400 dark:border-l-pink-600' },
};

export default function VerseCard({
  verseNum,
  text,
  isSelected,
  onSelect,
  bookName,
  chapterNum
}: VerseCardProps) {
  const notes = useNotesStore(state => state.notes);

  // Determine highlight color for this verse
  const highlightInfo = useMemo(() => {
    const passageId = `${bookName} ${chapterNum}:${verseNum}`;
    const note = notes.find(n => n.passageId === passageId);

    if (note) {
      console.log('📌 Found note for', passageId, '- Type:', note.type, 'Color:', note.highlightColor);
    }
    if (!note) return null;
    if (note.type === 'highlight' && note.highlightColor && note.highlightColor !== 'none') {
      return {
        color: note.highlightColor as keyof typeof HIGHLIGHT_COLORS,
        hasNoteText: !!note.noteText
      };
    }
    if (note.type === 'bookmark') {
      return {
        color: 'yellow' as const,
        hasNoteText: !!note.noteText,
        isBookmark: true
      };
    }
    if (note.type === 'note' && note.noteText) {
      return {
        color: 'blue' as const,
        hasNoteText: true,
        isNoteOnly: true
      };
    }
    return null;
  }, [notes, bookName, chapterNum, verseNum]);

  const highlightColor = highlightInfo?.color || 'yellow';
  const colorClasses = HIGHLIGHT_COLORS[highlightColor];

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    console.log('🎯 VerseCard.handleClick fired! Target:', target.tagName, 'nearest button?', target.closest('button'));
    // Don't trigger selection if clicking on a button
    if (target.closest('button')) {
      console.log('🚫 Click was on button, ignoring');
      return;
    }
    console.log('✅ VerseCard.onSelect() called');
    onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 border-l-4 relative ${
        highlightInfo
          ? `${colorClasses.bg} ${colorClasses.border}`
          : isSelected
          ? 'bg-yellow-100 dark:bg-yellow-900 border-l-yellow-400 dark:border-l-yellow-600'
          : 'bg-slate-50 dark:bg-slate-800 border-l-slate-300 dark:border-l-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
      }`}
      style={{ pointerEvents: 'auto', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="flex gap-3 items-start">
        <span className="font-bold text-sm text-slate-600 dark:text-slate-400 min-w-fit">{verseNum}.</span>
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{text}</p>
          {highlightInfo?.hasNoteText && (
            <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-600">
              <span className="inline-block bg-slate-200 dark:bg-slate-700 text-xs px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                📝 Note attached
              </span>
            </div>
          )}
        </div>
        {highlightInfo && (
          <span className="text-lg" title={`${highlightInfo.isBookmark ? '🔖 Bookmarked' : highlightInfo.isNoteOnly ? '📝 Note' : `📌 Highlighted (${highlightColor})`}`}>
            {highlightInfo.isBookmark ? '🔖' : highlightInfo.isNoteOnly ? '📝' : '📌'}
          </span>
        )}
      </div>
    </div>
  );
}
