export default function Navigation() {
  return (
    <nav className="w-full md:w-64 bg-slate-100 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 p-4">
      <div className="space-y-2">
        <a
          href="#"
          className="block px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          📖 Bible Reading
        </a>
        <a
          href="#"
          className="block px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          ✨ Daily Devotional
        </a>
        <a
          href="#"
          className="block px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          📚 Study Guides
        </a>
        <a
          href="#"
          className="block px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          📝 My Notes
        </a>
        <a
          href="#"
          className="block px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          📊 Progress
        </a>
        <a
          href="#"
          className="block px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          🔍 Search
        </a>
      </div>
    </nav>
  );
}
