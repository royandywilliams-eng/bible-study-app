import React, { useMemo, useState } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { useBibleStore } from '../store/useBibleStore';
import type { PageType } from '../App';

interface BookmarksSidebarPageProps {
  isDarkMode: boolean;
  onNavigateToPage: (page: PageType) => void;
}

export const BookmarksSidebarPage: React.FC<BookmarksSidebarPageProps> = ({
  isDarkMode,
  onNavigateToPage
}) => {
  const notes = useNotesStore((state) => state.notes);
  const removeNote = useNotesStore((state) => state.removeNote);
  const { bibleBooks, setCurrentPassage } = useBibleStore();
  const [sortBy, setSortBy] = useState<'book' | 'date-asc' | 'date-desc' | 'chapter'>('book');
  const [filterBook, setFilterBook] = useState<string>('');

  // Get all bookmarks (filter by type === 'bookmark')
  const bookmarks = useMemo(() => {
    const bookmarkNotes = notes.filter(note => note.type === 'bookmark');

    // Filter by book if selected
    let filtered = filterBook
      ? bookmarkNotes.filter(b => b.bookName === filterBook)
      : bookmarkNotes;

    // Sort
    switch (sortBy) {
      case 'date-asc':
        return filtered.sort((a, b) => a.createdAt - b.createdAt);
      case 'date-desc':
        return filtered.sort((a, b) => b.createdAt - a.createdAt);
      case 'chapter':
        return filtered.sort((a, b) => {
          if (a.chapterNum === b.chapterNum) {
            return a.verseNum - b.verseNum;
          }
          return a.chapterNum - b.chapterNum;
        });
      case 'book':
      default:
        return filtered.sort((a, b) => {
          if (a.bookName === b.bookName) {
            if (a.chapterNum === b.chapterNum) {
              return a.verseNum - b.verseNum;
            }
            return a.chapterNum - b.chapterNum;
          }
          return a.bookName.localeCompare(b.bookName);
        });
    }
  }, [notes, sortBy, filterBook]);

  // Get unique books from bookmarks
  const booksWithBookmarks = useMemo(() => {
    const books = new Set(notes.filter(n => n.type === 'bookmark').map(n => n.bookName));
    return Array.from(books).sort();
  }, [notes]);

  const handleJumpToVerse = (bookName: string, chapterNum: number, verseNum: number) => {
    // Find the book in bibleBooks to get its testament and number
    const book = bibleBooks.find(b => b.bookName === bookName);
    if (book) {
      setCurrentPassage({
        testament: book.testament,
        bookNumber: book.bookNumber,
        bookName: book.bookName,
        chapterNum,
        verseNum
      });
    }
    onNavigateToPage('bible');
  };

  const handleRemoveBookmark = (passageId: string) => {
    removeNote(passageId);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100%'
    }}>
      {/* Sidebar - Filters and Controls */}
      <div style={{
        width: '280px',
        backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        borderRight: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
        height: 'fit-content'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          color: isDarkMode ? '#f1f5f9' : '#1f2937',
          fontSize: '1.1rem'
        }}>
          🔖 Bookmarks ({bookmarks.length})
        </h3>

        {/* Sort Controls */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <option value="book">By Book</option>
            <option value="chapter">By Chapter</option>
            <option value="date-asc">Date Added (Old First)</option>
            <option value="date-desc">Date Added (New First)</option>
          </select>
        </div>

        {/* Book Filter */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            Filter by Book:
          </label>
          <select
            value={filterBook}
            onChange={(e) => setFilterBook(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#f1f5f9' : '#1f2937',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <option value="">All Books</option>
            {booksWithBookmarks.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div style={{
          padding: '1rem',
          backgroundColor: isDarkMode ? '#0f172a' : '#e0e7ff',
          borderRadius: '4px'
        }}>
          <p style={{
            margin: '0 0 0.5rem 0',
            fontSize: '0.875rem',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            📊 Total Bookmarks
          </p>
          <p style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: isDarkMode ? '#f1f5f9' : '#1f2937'
          }}>
            {bookmarks.length}
          </p>
        </div>
      </div>

      {/* Main Content - Bookmark List */}
      <div style={{ flex: 1 }}>
        {bookmarks.length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            color: isDarkMode ? '#cbd5e1' : '#64748b'
          }}>
            <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>🔖</p>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>No bookmarks yet!</p>
            <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
              Add bookmarks while reading to quickly access your favorite verses.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.passageId}
                style={{
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8f9fa',
                  borderLeft: `4px solid #facc15`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <h4 style={{
                      margin: 0,
                      color: isDarkMode ? '#f1f5f9' : '#1f2937',
                      fontSize: '1.1rem'
                    }}>
                      {bookmark.bookName} {bookmark.chapterNum}:{bookmark.verseNum}
                    </h4>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      backgroundColor: isDarkMode ? '#0f172a' : '#e0e7ff',
                      color: isDarkMode ? '#93c5fd' : '#1e40af'
                    }}>
                      Added {new Date(bookmark.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p style={{
                    margin: 0,
                    color: isDarkMode ? '#cbd5e1' : '#64748b',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {bookmark.verseText}
                  </p>

                  {bookmark.noteText && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: isDarkMode ? '#0f172a' : '#f0f0f0',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      color: isDarkMode ? '#cbd5e1' : '#64748b'
                    }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>📝 Note:</p>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {bookmark.noteText}
                      </p>
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexDirection: 'column'
                }}>
                  <button
                    onClick={() => handleJumpToVerse(
                      bookmark.bookName,
                      bookmark.chapterNum,
                      bookmark.verseNum
                    )}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                    }}
                  >
                    📖 Jump
                  </button>

                  <button
                    onClick={() => handleRemoveBookmark(bookmark.passageId)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                    }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
