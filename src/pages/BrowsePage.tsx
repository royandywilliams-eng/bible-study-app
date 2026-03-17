import React from 'react';
import { BooksBrowser } from '../components/Search/BooksBrowser';
import { useBibleStore } from '../store/useBibleStore';

interface BrowsePageProps {
  isDarkMode: boolean;
  onNavigateToPage?: (page: 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'settings') => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ isDarkMode, onNavigateToPage }) => {
  const { bibleBooks } = useBibleStore();

  const otBooks = bibleBooks.filter(b => b.testament === 'OT');
  const ntBooks = bibleBooks.filter(b => b.testament === 'NT');

  const handleChapterSelect = (book: any, chapter: number) => {
    // Update Bible store to navigate to the selected passage
    useBibleStore.setState({
      currentPassage: {
        testament: book.testament,
        bookNumber: book.bookNumber,
        bookName: book.bookName,
        chapterNum: chapter,
        verseNum: 1
      }
    });

    // Switch to Bible page if callback provided
    onNavigateToPage?.('bible');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: isDarkMode ? '#f1f5f9' : '#1f2937',
            marginBottom: '0.5rem',
            fontSize: '2rem',
            margin: 0
          }}>
            📚 Browse Bible
          </h1>
          <p style={{
            color: isDarkMode ? '#cbd5e1' : '#64748b',
            margin: 0
          }}>
            Explore all {bibleBooks.length} books organized by testament
          </p>
        </div>

        {/* Old Testament */}
        <div style={{ marginBottom: '3rem' }}>
          <BooksBrowser
            books={otBooks}
            isDarkMode={isDarkMode}
            onChapterSelect={handleChapterSelect}
          />
        </div>

        {/* New Testament */}
        <div>
          <BooksBrowser
            books={ntBooks}
            isDarkMode={isDarkMode}
            onChapterSelect={handleChapterSelect}
          />
        </div>
      </div>
    </div>
  );
};
