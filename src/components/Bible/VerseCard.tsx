interface VerseCardProps {
  verseNum: number;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VerseCard({ verseNum, text, isSelected, onSelect }: VerseCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 border-l-4 ${
        isSelected
          ? 'bg-yellow-100 dark:bg-yellow-900 border-l-yellow-400 dark:border-l-yellow-600'
          : 'bg-slate-50 dark:bg-slate-800 border-l-slate-300 dark:border-l-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
      }`}
    >
      <div className="flex gap-3">
        <span className="font-bold text-sm text-slate-600 dark:text-slate-400 min-w-fit">{verseNum}.</span>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
