import React, { useMemo } from 'react';
import { useSearchStore } from '../../store/useSearchStore';
import type { SearchResult } from '../../services/SearchService';
import { VerseHighlight } from '../Notes/VerseHighlight';
import { useNotesStore } from '../../store/useNotesStore';

interface SearchResultsProps {
  isDarkMode: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ isDarkMode, onResultClick }) => {
  const { results, query, isSearching } = useSearchStore();
  const notes = useNotesStore((state) => state.notes);
  const getNote = useNotesStore((state) => state.getNote);

  // Memoize getHighlightColor so it updates when notes change
  const getHighlightColor = useMemo(() => {
    return (result: SearchResult) => {
      const passageId = `${result.bookName} ${result.chapterNum}:${result.verseNum}`;
      const note = getNote(passageId);
      if (note?.type === 'highlight' && note.highlightColor && note.highlightColor !== 'none') {
        const highlightMap: Record<string, { light: string; dark: string }> = {
          yellow: { light: '#fef08a', dark: '#78350f' },
          blue: { light: '#bfdbfe', dark: '#1e3a8a' },
          green: { light: '#bbf7d0', dark: '#065f46' },
          pink: { light: '#fbcfe8', dark: '#831843' },
        };
        return highlightMap[note.highlightColor];
      }
      return null;
    };
  }, [notes, getNote]);

  if (isSearching) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: isDarkMode ? '#cbd5e1' : '#64748b'
      }}>
        <p>🔍 Searching...</p>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        color: isDarkMode ? '#cbd5e1' : '#64748b'
      }}>
        <p>No results found for "{query}"</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Try searching for different keywords or book names
        </p>
      </div>
    );
  }

  return (
    <div style={{
      marginTop: '2rem'
    }}>
      <div style={{
        marginBottom: '1.5rem',
        color: isDarkMode ? '#cbd5e1' : '#64748b',
        fontSize: '0.95rem'
      }}>
        Found <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for "{query}"
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {results.map((result) => {
          const highlightColor = getHighlightColor(result);
          return (
          <div
            key={`${result.bookId}-${result.chapterNum}-${result.verseNum}`}
            onClick={() => onResultClick?.(result)}
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1.25rem',
              borderRadius: '8px',
              borderLeft: `4px solid ${
                result.testament === 'OT' ? '#3b82f6' : '#8b5cf6'
              }`,
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                fontWeight: '600',
                color: isDarkMode ? '#f1f5f9' : '#1f2937',
                fontSize: '1.05rem'
              }}>
                {result.bookName} {result.chapterNum}:{result.verseNum}
              </div>
              <span style={{
                backgroundColor: result.testament === 'OT' ? '#3b82f6' : '#8b5cf6',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}>
                {result.testament}
              </span>
            </div>

            <p style={{
              color: isDarkMode ? '#cbd5e1' : '#64748b',
              margin: '0.75rem 0',
              lineHeight: '1.6',
              fontSize: '0.95rem',
              backgroundColor: highlightColor ? (isDarkMode ? highlightColor.dark : highlightColor.light) : 'transparent',
              padding: highlightColor ? '0.5rem 0.75rem' : '0',
              borderRadius: highlightColor ? '4px' : '0',
              transition: 'background-color 0.2s'
            }}>
              {result.verseText}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
            }}>
              <span style={{
                fontSize: '0.85rem',
                color: isDarkMode ? '#64748b' : '#94a3b8'
              }}>
                Score: {(result.score * 100).toFixed(0)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onResultClick?.(result);
                }}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                View
              </button>
            </div>

            {/* Highlight and Notes */}
            <VerseHighlight result={result} isDarkMode={isDarkMode} />
          </div>
        );
        })}
      </div>
    </div>
  );
};
