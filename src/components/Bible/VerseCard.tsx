import { useMemo } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { useBibleStore } from '../../store/useBibleStore';

interface VerseCardProps {
  verseNum: number;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  bookName: string;
  chapterNum: number;
  isLoading?: boolean;
  versions?: {
    esv: string;
    kjv: string;
    niv?: string;
    nkjv?: string;
    nasb?: string;
    csb?: string;
  };
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
  chapterNum,
  isLoading = false,
  versions
}: VerseCardProps) {
  const notes = useNotesStore(state => state.notes);
  const bibleVersion = useBibleStore(state => state.bibleVersion);

  // Get the text for the selected version
  const displayText = useMemo(() => {
    if (versions && versions[bibleVersion]) {
      return versions[bibleVersion];
    }
    return text; // fallback to original text
  }, [versions, bibleVersion, text]);

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

  if (highlightInfo) {
    console.log('🎨 VerseCard rendering highlight - color:', highlightColor, 'bg class:', colorClasses.bg, 'border:', colorClasses.border);
  }

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

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div className="p-3 rounded-lg border-l-4 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
        <div className="flex gap-3 items-start">
          <span className="font-bold text-sm text-slate-400 dark:text-slate-600 min-w-fit">{verseNum}.</span>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get highlight color for inline style
  let bgColor = '#f8fafc'; // default slate-50
  let borderColor = '#cbd5e1'; // default border-l-slate-300

  if (highlightInfo) {
    // Use the bgLight value from VerseHighlight for inline style
    const bgMap: Record<string, string> = {
      yellow: '#fef08a',
      blue: '#bfdbfe',
      green: '#bbf7d0',
      pink: '#fbcfe8',
    };
    const borderMap: Record<string, string> = {
      yellow: '#facc15',
      blue: '#60a5fa',
      green: '#4ade80',
      pink: '#ec4899',
    };
    bgColor = bgMap[highlightInfo.color] || '#fef08a';
    borderColor = borderMap[highlightInfo.color] || '#facc15';
  } else if (isSelected) {
    bgColor = '#fef3c7'; // yellow-100
    borderColor = '#fbbf24'; // yellow-400
  }

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 border-l-4 relative`}
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        backgroundColor: bgColor,
        borderLeftColor: borderColor,
      }}
    >
      <div className="flex gap-3 items-start">
        <span className="font-bold text-sm text-slate-600 dark:text-slate-400 min-w-fit">{verseNum}.</span>
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{displayText}</p>
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
