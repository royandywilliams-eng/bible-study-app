interface ChapterSelectorProps {
  totalChapters: number;
  currentChapter: number;
  onChapterChange: (chapterNum: number) => void;
}

export default function ChapterSelector({ totalChapters, currentChapter, onChapterChange }: ChapterSelectorProps) {
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Chapter:</label>
      <select
        value={currentChapter}
        onChange={(e) => onChapterChange(parseInt(e.target.value, 10))}
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {chapters.map(ch => (
          <option key={ch} value={ch}>
            Chapter {ch} of {totalChapters}
          </option>
        ))}
      </select>
    </div>
  );
}
