import React, { useState } from 'react';
import type { BibleBook } from '../../types/bible';

interface BooksBrowserProps {
  books: BibleBook[];
  isDarkMode: boolean;
  onChapterSelect: (book: BibleBook, chapter: number) => void;
}

export const BooksBrowser: React.FC<BooksBrowserProps> = ({ books, isDarkMode, onChapterSelect }) => {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const otBooks = books.filter(b => b.testament === 'OT');
  const ntBooks = books.filter(b => b.testament === 'NT');

  const renderBookSection = (title: string, sectionBooks: BibleBook[]) => (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{
        color: isDarkMode ? '#f1f5f9' : '#1f2937',
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
      }}>
        {title}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {sectionBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => setExpandedBookId(expandedBookId === book.id ? null : book.id)}
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: `2px solid ${expandedBookId === book.id ? '#2563eb' : (isDarkMode ? '#334155' : '#e2e8f0')}`,
            }}
            onMouseEnter={(e) => {
              if (expandedBookId !== book.id) {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f0f0f0';
              }
            }}
            onMouseLeave={(e) => {
              if (expandedBookId !== book.id) {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f8f9fa';
              }
            }}
          >
            {/* Book Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: expandedBookId === book.id ? '1rem' : '0'
            }}>
              <div>
                <h4 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  margin: '0 0 0.25rem 0',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  {book.bookName}
                </h4>
                <p style={{
                  color: isDarkMode ? '#94a3b8' : '#64748b',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  {book.totalChapters} chapter{book.totalChapters !== 1 ? 's' : ''}
                </p>
              </div>
              <span style={{
                fontSize: '1.25rem',
                transition: 'transform 0.2s',
                transform: expandedBookId === book.id ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>

            {/* Chapters Grid */}
            {expandedBookId === book.id && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
                gap: '0.5rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                {Array.from({ length: Math.min(book.totalChapters, 3) }, (_, i) => i + 1).map((chapter) => (
                  <button
                    key={chapter}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChapterSelect(book, chapter);
                    }}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                    }}
                  >
                    {chapter}
                  </button>
                ))}
                {book.totalChapters > 3 && (
                  <div style={{
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    +{book.totalChapters - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{
        backgroundColor: isDarkMode ? '#0f172a' : '#e0e7ff',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        borderLeft: `4px solid #2563eb`
      }}>
        <p style={{
          color: isDarkMode ? '#e0e7ff' : '#1e3a8a',
          margin: 0,
          fontSize: '0.95rem'
        }}>
          📚 Click on any book to see its chapters (first 3 shown), then select a chapter to read it in the Bible viewer.
        </p>
      </div>

      {renderBookSection('📖 Old Testament', otBooks)}
      {renderBookSection('✝️ New Testament', ntBooks)}
    </div>
  );
};
