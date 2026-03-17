import React, { useEffect } from 'react';
import { SearchBar } from '../components/Search/SearchBar';
import { SearchResults } from '../components/Search/SearchResults';
import { Discovery } from '../components/Search/Discovery';
import type { SearchResult } from '../services/SearchService';
import { SearchService } from '../services/SearchService';
import { useBibleStore } from '../store/useBibleStore';
import { useSearchStore } from '../store/useSearchStore';

interface SearchPageProps {
  isDarkMode: boolean;
  onNavigateToPage?: (page: 'home' | 'search' | 'browse' | 'bible' | 'devotionals' | 'notes' | 'settings') => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ isDarkMode, onNavigateToPage }) => {
  const { bibleBooks } = useBibleStore();
  const { query, clearHistory, clearResults } = useSearchStore();

  // Build search index on component mount
  useEffect(() => {
    if (bibleBooks.length > 0) {
      SearchService.buildSearchIndex(bibleBooks).catch(error => {
        console.error('Failed to build search index:', error);
      });
    }
  }, [bibleBooks]);

  const handleResultSelect = (result: SearchResult) => {
    // Update Bible store to navigate to the selected passage
    useBibleStore.setState({
      currentPassage: {
        testament: result.testament,
        bookNumber: result.bookNumber,
        bookName: result.bookName,
        chapterNum: result.chapterNum,
        verseNum: result.verseNum
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
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start'
        }}>
          <div>
            <h1 style={{
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              marginBottom: '0.5rem',
              fontSize: '2rem',
              margin: 0
            }}>
              🔍 Search & Discover
            </h1>
            <p style={{
              color: isDarkMode ? '#cbd5e1' : '#64748b',
              margin: 0
            }}>
              Find verses, explore books, and discover popular passages
            </p>
          </div>

          {/* Clear buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {query && (
              <button
                onClick={() => clearResults()}
                title="Clear current search"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                }}
              >
                ✕ Clear Search
              </button>
            )}
            <button
              onClick={() => clearHistory()}
              title="Clear search history"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isDarkMode ? '#475569' : '#d1d5db',
                color: isDarkMode ? '#f1f5f9' : '#1f2937',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#64748b' : '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#475569' : '#d1d5db';
              }}
            >
              🗑️ Clear History
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar isDarkMode={isDarkMode} />

        {/* Content based on search state */}
        {query ? (
          <SearchResults isDarkMode={isDarkMode} onResultClick={handleResultSelect} />
        ) : (
          <Discovery isDarkMode={isDarkMode} onPassageSelect={handleResultSelect} />
        )}
      </div>
    </div>
  );
};
