interface HeaderProps {
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export default function Header({ isDarkMode, onThemeChange }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📖</span>
            <h1 className="text-2xl font-bold">Bible Study App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onThemeChange(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="text-sm opacity-90">
              For New Christians
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
