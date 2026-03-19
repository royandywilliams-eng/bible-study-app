import { useBibleStore } from '../../store/useBibleStore';

const BIBLE_VERSIONS = [
  { id: 'esv', name: 'English Standard Version', abbreviation: 'ESV' },
  { id: 'kjv', name: 'King James Version', abbreviation: 'KJV' },
  { id: 'niv', name: 'New International Version', abbreviation: 'NIV' },
  { id: 'nkjv', name: 'New King James Version', abbreviation: 'NKJV' },
  { id: 'nasb', name: 'New American Standard Bible', abbreviation: 'NASB' },
  { id: 'csb', name: 'Christian Standard Bible', abbreviation: 'CSB' },
] as const;

interface VersionSelectorProps {
  compact?: boolean;
}

export default function VersionSelector({ compact = false }: VersionSelectorProps) {
  const { bibleVersion, setBibleVersion } = useBibleStore();

  if (compact) {
    // Compact dropdown version
    return (
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Version:</label>
        <select
          value={bibleVersion}
          onChange={(e) => setBibleVersion(e.target.value as any)}
          className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {BIBLE_VERSIONS.map((version) => (
            <option key={version.id} value={version.id}>
              {version.abbreviation}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Full radio button version
  return (
    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-semibold mb-3 text-slate-900 dark:text-slate-50">Bible Version</h3>
      <div className="space-y-2">
        {BIBLE_VERSIONS.map((version) => (
          <label
            key={version.id}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <input
              type="radio"
              name="bible-version"
              value={version.id}
              checked={bibleVersion === version.id}
              onChange={(e) => setBibleVersion(e.target.value as any)}
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {version.abbreviation}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {version.name}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
