import React, { useState } from 'react';
import { SearchService } from '../../services/SearchService';
import type { SearchResult } from '../../services/SearchService';
import { useBibleStore } from '../../store/useBibleStore';
import { BooksBrowser } from './BooksBrowser';

interface DiscoveryProps {
  isDarkMode: boolean;
  onPassageSelect?: (result: SearchResult) => void;
}

export const Discovery: React.FC<DiscoveryProps> = ({ isDarkMode, onPassageSelect }) => {
  const { bibleBooks } = useBibleStore();
  const [activeTab, setActiveTab] = useState<'popular' | 'ot' | 'nt'>('popular');

  const popularPassages = SearchService.getPopularPassages(bibleBooks);
  const booksByTestament = SearchService.getBooksByTestament(bibleBooks);

  const renderTabButton = (tab: 'popular' | 'ot' | 'nt', label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        backgroundColor: activeTab === tab
          ? '#2563eb'
          : (isDarkMode ? '#1e293b' : '#f0f0f0'),
        color: activeTab === tab
          ? 'white'
          : (isDarkMode ? '#cbd5e1' : '#64748b'),
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        if (activeTab !== tab) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#e0e0e0';
        }
      }}
      onMouseLeave={(e) => {
        if (activeTab !== tab) {
          e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f0f0f0';
        }
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{
      marginTop: '2rem'
    }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        paddingBottom: '1rem'
      }}>
        {renderTabButton('popular', '⭐ Popular Passages')}
        {renderTabButton('ot', `📖 Old Testament (${booksByTestament.OT.length})`)}
        {renderTabButton('nt', `📖 New Testament (${booksByTestament.NT.length})`)}
      </div>

      {/* Popular Passages */}
      {activeTab === 'popular' && (
        <div>
          <h3 style={{
            color: isDarkMode ? '#f1f5f9' : '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Most Read Passages
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {popularPassages.map((passage) => (
              <div
                key={`${passage.bookId}-${passage.chapterNum}-${passage.verseNum}`}
                onClick={() => onPassageSelect?.(passage)}
                style={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
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
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  marginBottom: '0.75rem'
                }}>
                  {passage.bookName} {passage.chapterNum}:{passage.verseNum}
                </div>
                <p style={{
                  color: isDarkMode ? '#cbd5e1' : '#64748b',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {passage.verseText.substring(0, 150)}
                  {passage.verseText.length > 150 ? '...' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Old Testament */}
      {activeTab === 'ot' && (
        <BooksBrowser
          books={booksByTestament.OT}
          isDarkMode={isDarkMode}
          onChapterSelect={(book, chapter) => {
            if (onPassageSelect) {
              // Create a synthetic SearchResult for passage selection
              const result: SearchResult = {
                bookId: book.id,
                bookName: book.bookName,
                bookNumber: book.bookNumber,
                testament: book.testament,
                chapterNum: chapter,
                verseNum: 1,
                verseText: `${book.bookName} ${chapter}:1`,
                score: 0
              };
              onPassageSelect(result);
            }
          }}
        />
      )}

      {/* New Testament */}
      {activeTab === 'nt' && (
        <BooksBrowser
          books={booksByTestament.NT}
          isDarkMode={isDarkMode}
          onChapterSelect={(book, chapter) => {
            if (onPassageSelect) {
              // Create a synthetic SearchResult for passage selection
              const result: SearchResult = {
                bookId: book.id,
                bookName: book.bookName,
                bookNumber: book.bookNumber,
                testament: book.testament,
                chapterNum: chapter,
                verseNum: 1,
                verseText: `${book.bookName} ${chapter}:1`,
                score: 0
              };
              onPassageSelect(result);
            }
          }}
        />
      )}
    </div>
  );
};
