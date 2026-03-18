import { useState, useEffect } from 'react';
import { useBibleStore } from './store/useBibleStore';
import { useNotesStore } from './store/useNotesStore';
import { useMemoryVerseStore } from './store/useMemoryVerseStore';
import { NotesService } from './services/NotesService';
import { MemoryVerseService } from './services/MemoryVerseService';
import { SearchPage } from './pages/SearchPage';
import { BrowsePage } from './pages/BrowsePage';
import { DevotionalsPage } from './pages/DevotionalsPage';
import { StudyGuidesPage } from './pages/StudyGuidesPage';
import { ProgressDashboardPage } from './pages/ProgressDashboardPage';
import { BookmarksSidebarPage } from './pages/BookmarksSidebarPage';
import { MemoryVersePage } from './pages/MemoryVersePage';
import { NotesPanel } from './components/Notes/NotesPanel';
import BibleReader from './components/Bible/BibleReader';
import './index.css';

export type PageType = 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'studyGuides' | 'progress' | 'bookmarks' | 'memory' | 'settings';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isInitialized, setIsInitialized] = useState(false);

  const { bibleBooks, initializeBibleData } = useBibleStore();
  const notes = useNotesStore((state) => state.notes);
  const memoryVerses = useMemoryVerseStore((state) => state.memoryVerses);

  // Initialize Bible data on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (bibleBooks.length === 0) {
          await initializeBibleData();
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [bibleBooks.length, initializeBibleData]);

  // Keep NotesService in sync with store (critical for highlights to work)
  useEffect(() => {
    NotesService.hydrate(notes);
  }, [notes]);

  // Keep MemoryVerseService in sync with store
  useEffect(() => {
    MemoryVerseService.hydrate(memoryVerses);
  }, [memoryVerses]);

  const renderNavigationButton = (page: PageType, label: string, emoji: string) => (
    <button
      onClick={() => setCurrentPage(page)}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: currentPage === page
          ? '#2563eb'
          : (isDarkMode ? '#1e293b' : '#f0f0f0'),
        color: currentPage === page
          ? 'white'
          : (isDarkMode ? '#cbd5e1' : '#64748b'),
        fontWeight: '500',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        if (currentPage !== page) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#e0e0e0';
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage !== page) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f0f0f0';
        }
      }}
    >
      {emoji} {label}
    </button>
  );

  const renderContent = () => {
    if (!isInitialized) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
            Loading Bible data...
          </p>
        </div>
      );
    }

    switch (currentPage) {
      case 'search':
        return <SearchPage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'browse':
        return <BrowsePage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'bible':
        return <BibleReader isDarkMode={isDarkMode} />;
      case 'devotionals':
        return <DevotionalsPage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'studyGuides':
        return <StudyGuidesPage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'progress':
        return <ProgressDashboardPage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'notes':
        return <NotesPanel isDarkMode={isDarkMode} />;
      case 'bookmarks':
        return <BookmarksSidebarPage isDarkMode={isDarkMode} onNavigateToPage={setCurrentPage} />;
      case 'memory':
        return <MemoryVersePage isDarkMode={isDarkMode} />;
      case 'home':
      default:
        return (
          <div style={{ padding: '2rem' }}>
            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px'
            }}>
              <h2 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937' }}>Welcome to Bible Study App! 📚</h2>
              <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>For New Christians</p>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937' }}>✅ Phase 1 Foundation Complete:</h3>
                <ul style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
                  <li>✓ Project Setup (React + TypeScript + Vite)</li>
                  <li>✓ Database Architecture (IndexedDB Ready)</li>
                  <li>✓ State Management (Zustand Configured)</li>
                  <li>✓ Dark/Light Theme Toggle</li>
                  <li>✓ Responsive Design</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937' }}>🚀 Phase 2 - In Progress:</h3>
                <ul style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
                  <li>✅ Full-text Search Implementation</li>
                  <li>✅ Popular Passages Quick Access</li>
                  <li>✅ Browse Books by Testament</li>
                  <li>⏳ Interactive Bible Reader</li>
                  <li>⏳ Notes & Highlights System</li>
                  <li>⏳ Daily Devotionals</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: isDarkMode ? '#0f172a' : '#e0e7ff', borderRadius: '4px' }}>
                <p style={{ color: isDarkMode ? '#f1f5f9' : '#1f2937' }}>
                  <strong>📊 App Status:</strong> Phase 1 Complete ✅ | Phase 2 In Progress 🚀
                </p>
                <p style={{ color: isDarkMode ? '#cbd5e1' : '#64748b', marginBottom: 0 }}>
                  Try the Search feature to explore the Bible! Use the navigation tabs above.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#2563eb',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>📖 Bible Study App</h1>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            backgroundColor: isDarkMode ? '#334155' : '#1d4ed8'
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: isDarkMode ? '#0f172a' : '#f8f9fa',
        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        padding: '1rem',
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto'
      }}>
        {renderNavigationButton('home', 'Home', '🏠')}
        {renderNavigationButton('search', 'Search', '🔍')}
        {renderNavigationButton('browse', 'Browse', '📚')}
        {renderNavigationButton('bible', 'Bible', '📖')}
        {renderNavigationButton('notes', 'Notes', '📋')}
        {renderNavigationButton('bookmarks', 'Bookmarks', '🔖')}
        {renderNavigationButton('memory', 'Memory', '🧠')}
        {renderNavigationButton('devotionals', 'Devotionals', '✨')}
        {renderNavigationButton('studyGuides', 'Study Guides', '🎓')}
        {renderNavigationButton('progress', 'Progress', '📊')}
      </nav>

      {/* Main Content */}
      <div style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
        color: isDarkMode ? '#f1f5f9' : '#1f2937',
        overflowY: 'auto'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
